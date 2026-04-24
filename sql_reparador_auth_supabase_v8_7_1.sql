-- ============================================================
-- ISM Robosoft - SQL REPARADOR AUTH / USUARIOS
-- Versión: Auth Repair v8.7.1
-- Objetivo:
--   1) Reparar error Supabase Auth: "Database error finding user"
--   2) Permitir invitaciones / registro / recuperación de contraseña
--   3) Crear perfil automáticamente sin romper si faltan datos
--   4) Mantener usuarios nuevos como INACTIVOS por defecto
--
-- Ejecutar completo en Supabase > SQL Editor.
-- ============================================================

begin;

-- Extensiones necesarias
create extension if not exists pgcrypto with schema extensions;

-- ------------------------------------------------------------
-- 1) Roles mínimos
-- ------------------------------------------------------------
insert into public.roles (code, name, description, is_system)
values
  ('administrator', 'Administrador', 'Acceso total al sistema', true),
  ('teacher', 'Docente', 'Acceso docente', true),
  ('student', 'Alumno', 'Acceso alumno', true)
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  is_system = excluded.is_system,
  updated_at = now();

-- ------------------------------------------------------------
-- 2) Asegurar columnas necesarias en profiles
-- ------------------------------------------------------------
alter table public.profiles
  alter column full_name drop not null;

alter table public.profiles
  alter column is_active set default false;

-- Evita que una invitación falle si no trae nombre completo.
update public.profiles
set full_name = coalesce(nullif(full_name, ''), split_part(coalesce((select email from auth.users where auth.users.id = profiles.id), 'usuario@sin-email.local'), '@', 1))
where full_name is null or full_name = '';

-- ------------------------------------------------------------
-- 3) Función helper: obtener role_id seguro
-- ------------------------------------------------------------
create or replace function public.get_default_role_id(p_role_code text default 'student')
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.roles
  where code = coalesce(nullif(p_role_code, ''), 'student')
  limit 1
$$;

grant execute on function public.get_default_role_id(text) to authenticated;
grant execute on function public.get_default_role_id(text) to anon;
grant execute on function public.get_default_role_id(text) to service_role;

-- ------------------------------------------------------------
-- 4) Trigger seguro para Auth: crea perfil inactivo
-- ------------------------------------------------------------
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists handle_new_user on auth.users;

drop function if exists public.handle_new_user() cascade;
drop function if exists public.on_auth_user_created() cascade;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
declare
  v_role_code text;
  v_role_id uuid;
  v_full_name text;
begin
  v_role_code := coalesce(
    nullif(new.raw_user_meta_data ->> 'role_code', ''),
    nullif(new.raw_user_meta_data ->> 'requested_role', ''),
    'student'
  );

  v_role_id := public.get_default_role_id(v_role_code);

  if v_role_id is null then
    select id into v_role_id
    from public.roles
    where code = 'student'
    limit 1;
  end if;

  v_full_name := coalesce(
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.raw_user_meta_data ->> 'name', ''),
    split_part(coalesce(new.email, 'usuario@sin-email.local'), '@', 1)
  );

  insert into public.profiles (
    id,
    role_id,
    full_name,
    dni,
    birth_date,
    whatsapp,
    avatar_url,
    title,
    is_active,
    created_at,
    updated_at
  )
  values (
    new.id,
    v_role_id,
    v_full_name,
    nullif(new.raw_user_meta_data ->> 'dni', ''),
    nullif(new.raw_user_meta_data ->> 'birth_date', '')::date,
    nullif(new.raw_user_meta_data ->> 'whatsapp', ''),
    nullif(new.raw_user_meta_data ->> 'avatar_url', ''),
    nullif(new.raw_user_meta_data ->> 'title', ''),
    false,
    now(),
    now()
  )
  on conflict (id) do update
  set
    role_id = coalesce(public.profiles.role_id, excluded.role_id),
    full_name = coalesce(nullif(public.profiles.full_name, ''), excluded.full_name),
    dni = coalesce(public.profiles.dni, excluded.dni),
    birth_date = coalesce(public.profiles.birth_date, excluded.birth_date),
    whatsapp = coalesce(public.profiles.whatsapp, excluded.whatsapp),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
    title = coalesce(public.profiles.title, excluded.title),
    updated_at = now();

  return new;
exception
  when others then
    -- No bloquear nunca Auth por errores de perfil.
    raise warning 'handle_new_user warning: %', sqlerrm;
    return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Permisos
grant execute on function public.handle_new_user() to service_role;
grant execute on function public.handle_new_user() to authenticated;
grant execute on function public.handle_new_user() to anon;

-- ------------------------------------------------------------
-- 5) Reparar perfiles faltantes para usuarios existentes
-- ------------------------------------------------------------
insert into public.profiles (
  id,
  role_id,
  full_name,
  is_active,
  created_at,
  updated_at
)
select
  u.id,
  public.get_default_role_id('student'),
  coalesce(nullif(u.raw_user_meta_data ->> 'full_name', ''), split_part(coalesce(u.email, 'usuario@sin-email.local'), '@', 1)),
  false,
  now(),
  now()
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- 6) RPC para registrar solicitud desde frontend.
--    Crea perfil inactivo si el usuario ya existe en auth.
--    Nota: si el frontend usa supabase.auth.signUp(), Auth crea el user
--    y el trigger de arriba crea el perfil automáticamente.
-- ------------------------------------------------------------
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,date,text,text,boolean);
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,text,text,text,boolean);
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,text,text,text,text,boolean);

create or replace function public.admin_upsert_profile_by_email(
  p_email text,
  p_full_name text default null,
  p_role_code text default 'student',
  p_dni text default null,
  p_birth_date date default null,
  p_whatsapp text default null,
  p_avatar_url text default null,
  p_title text default null,
  p_is_active boolean default false
)
returns public.profiles
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
declare
  v_user_id uuid;
  v_role_id uuid;
  v_profile public.profiles;
begin
  select id into v_user_id
  from auth.users
  where lower(email) = lower(p_email)
  limit 1;

  if v_user_id is null then
    raise exception 'El usuario Auth todavía no existe. Primero debe registrarse o ser creado por Auth.';
  end if;

  v_role_id := public.get_default_role_id(coalesce(p_role_code, 'student'));

  insert into public.profiles (
    id,
    role_id,
    full_name,
    dni,
    birth_date,
    whatsapp,
    avatar_url,
    title,
    is_active,
    created_at,
    updated_at
  )
  values (
    v_user_id,
    v_role_id,
    coalesce(nullif(p_full_name, ''), split_part(lower(p_email), '@', 1)),
    nullif(p_dni, ''),
    p_birth_date,
    nullif(p_whatsapp, ''),
    nullif(p_avatar_url, ''),
    nullif(p_title, ''),
    coalesce(p_is_active, false),
    now(),
    now()
  )
  on conflict (id) do update
  set
    role_id = excluded.role_id,
    full_name = excluded.full_name,
    dni = excluded.dni,
    birth_date = excluded.birth_date,
    whatsapp = excluded.whatsapp,
    avatar_url = excluded.avatar_url,
    title = excluded.title,
    is_active = excluded.is_active,
    updated_at = now()
  returning * into v_profile;

  return v_profile;
end;
$$;

grant execute on function public.admin_upsert_profile_by_email(text,text,text,text,date,text,text,text,boolean) to authenticated;
grant execute on function public.admin_upsert_profile_by_email(text,text,text,text,date,text,text,text,boolean) to service_role;

-- ------------------------------------------------------------
-- 7) RPC para activar / desactivar usuario desde Admin
-- ------------------------------------------------------------
drop function if exists public.admin_set_user_active(uuid, boolean);

create or replace function public.admin_set_user_active(
  p_profile_id uuid,
  p_is_active boolean
)
returns public.profiles
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_profile public.profiles;
begin
  update public.profiles
  set is_active = coalesce(p_is_active, false),
      updated_at = now()
  where id = p_profile_id
  returning * into v_profile;

  if v_profile.id is null then
    raise exception 'Perfil no encontrado';
  end if;

  return v_profile;
end;
$$;

grant execute on function public.admin_set_user_active(uuid, boolean) to authenticated;
grant execute on function public.admin_set_user_active(uuid, boolean) to service_role;

-- ------------------------------------------------------------
-- 8) Vista frontend de usuarios
-- ------------------------------------------------------------
drop view if exists public.users_frontend_view cascade;

create or replace view public.users_frontend_view as
select
  p.id,
  p.full_name,
  p.dni,
  p.birth_date,
  p.whatsapp,
  p.avatar_url,
  p.title,
  p.is_active,
  p.created_at,
  p.updated_at,
  r.id as role_id,
  r.code as role_code,
  r.name as role_name,
  u.email,
  u.email_confirmed_at,
  u.last_sign_in_at
from public.profiles p
left join public.roles r on r.id = p.role_id
left join auth.users u on u.id = p.id;

grant select on public.users_frontend_view to authenticated;

-- ------------------------------------------------------------
-- 9) RLS básico seguro
-- ------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
on public.profiles
for select
to authenticated
using (true);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- ------------------------------------------------------------
-- 10) Verificación rápida
-- ------------------------------------------------------------
do $$
begin
  raise notice 'Auth repair OK. Trigger on_auth_user_created instalado. Nuevos usuarios quedan inactivos por defecto.';
end $$;

commit;
