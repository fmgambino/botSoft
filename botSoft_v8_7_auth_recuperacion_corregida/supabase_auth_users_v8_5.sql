-- ISM Robosoft v8.5 - Auth, registro con aprobación e invitación
-- Ejecutar completo en Supabase SQL Editor.

begin;

create extension if not exists pgcrypto;

insert into public.roles (code, name, description, is_system)
values
  ('administrator','Administrador','Acceso total al sistema', true),
  ('teacher','Docente','Perfil docente', true),
  ('student','Alumno','Perfil alumno', true)
on conflict (code) do update set name = excluded.name, description = excluded.description, updated_at = now();

create or replace function public.ism_role_code(p_role text)
returns text language sql immutable as $$
  select case lower(coalesce(p_role,''))
    when 'administrador' then 'administrator'
    when 'admin' then 'administrator'
    when 'administrator' then 'administrator'
    when 'docente' then 'teacher'
    when 'teacher' then 'teacher'
    when 'alumno' then 'student'
    when 'student' then 'student'
    else 'student'
  end
$$;

-- Quitar triggers/funciones viejas conflictivas.
do $$
declare r record;
begin
  for r in select oid::regprocedure sig from pg_proc where pronamespace='public'::regnamespace and proname in ('admin_upsert_profile_by_email','ensure_current_user_profile','handle_new_user','admin_approve_profile_by_email') loop
    execute 'drop function if exists ' || r.sig || ' cascade';
  end loop;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists trg_on_auth_user_created on auth.users;

-- Perfil automático: todo registro queda INACTIVO por defecto, salvo que el admin lo active.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = public, auth
as $$
declare
  v_role_id uuid;
  v_role_code text;
begin
  v_role_code := public.ism_role_code(coalesce(new.raw_user_meta_data->>'role_code', new.raw_user_meta_data->>'requested_role', 'student'));
  select id into v_role_id from public.roles where code = v_role_code limit 1;

  insert into public.profiles(id, role_id, full_name, avatar_url, is_active, created_at, updated_at)
  values (
    new.id,
    v_role_id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name',''), split_part(new.email,'@',1)),
    './assets/avatar-default.svg',
    false,
    now(), now()
  )
  on conflict (id) do update set
    role_id = coalesce(excluded.role_id, public.profiles.role_id),
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    updated_at = now();
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Asegura perfil del usuario actual si falta.
create or replace function public.ensure_current_user_profile()
returns uuid
language plpgsql security definer
set search_path = public, auth
as $$
declare
  v_user auth.users%rowtype;
  v_role_id uuid;
begin
  select * into v_user from auth.users where id = auth.uid();
  if v_user.id is null then return null; end if;
  select id into v_role_id from public.roles where code = public.ism_role_code(coalesce(v_user.raw_user_meta_data->>'role_code','student')) limit 1;
  insert into public.profiles(id, role_id, full_name, avatar_url, is_active, created_at, updated_at)
  values (v_user.id, v_role_id, coalesce(nullif(v_user.raw_user_meta_data->>'full_name',''), split_part(v_user.email,'@',1)), './assets/avatar-default.svg', false, now(), now())
  on conflict (id) do nothing;
  return v_user.id;
end;
$$;

grant execute on function public.ensure_current_user_profile() to authenticated, anon;

-- Upsert de perfil por email. No inserta usuarios manualmente en auth.users: evita errores de login.
create or replace function public.admin_upsert_profile_by_email(
  p_email text,
  p_full_name text,
  p_role_code text default 'student',
  p_dni text default null,
  p_whatsapp text default null,
  p_birth_date date default null,
  p_title text default null,
  p_avatar_url text default null,
  p_is_active boolean default false
)
returns uuid
language plpgsql security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid;
  v_role_id uuid;
  v_role_code text;
begin
  if nullif(trim(p_email),'') is null then raise exception 'El email es obligatorio'; end if;
  if nullif(trim(p_full_name),'') is null then raise exception 'El nombre completo es obligatorio'; end if;

  v_role_code := public.ism_role_code(p_role_code);
  select id into v_role_id from public.roles where code = v_role_code limit 1;
  select id into v_user_id from auth.users where lower(email)=lower(trim(p_email)) limit 1;
  if v_user_id is null then
    raise exception 'El usuario Auth no existe. Crealo con Edge Function admin-create-user o con registro.';
  end if;

  update auth.users set
    raw_user_meta_data = coalesce(raw_user_meta_data,'{}'::jsonb) || jsonb_build_object('full_name', p_full_name, 'role_code', v_role_code),
    email_confirmed_at = coalesce(email_confirmed_at, now()),
    updated_at = now()
  where id = v_user_id;

  insert into public.profiles(id, role_id, full_name, dni, birth_date, whatsapp, avatar_url, title, is_active, created_at, updated_at)
  values (
    v_user_id, v_role_id, trim(p_full_name), nullif(trim(coalesce(p_dni,'')),''), p_birth_date,
    nullif(trim(coalesce(p_whatsapp,'')),''), coalesce(nullif(trim(coalesce(p_avatar_url,'')),''),'./assets/avatar-default.svg'),
    case when v_role_code='student' then null else nullif(trim(coalesce(p_title,'')),'') end,
    coalesce(p_is_active,false), now(), now()
  )
  on conflict (id) do update set
    role_id=excluded.role_id,
    full_name=excluded.full_name,
    dni=excluded.dni,
    birth_date=excluded.birth_date,
    whatsapp=excluded.whatsapp,
    avatar_url=excluded.avatar_url,
    title=excluded.title,
    is_active=excluded.is_active,
    updated_at=now();

  return v_user_id;
end;
$$;

grant execute on function public.admin_upsert_profile_by_email(text,text,text,text,text,date,text,text,boolean) to authenticated, anon;

create or replace function public.admin_approve_profile_by_email(p_email text, p_is_active boolean default true)
returns boolean
language plpgsql security definer
set search_path = public, auth
as $$
declare v_user_id uuid;
begin
  select id into v_user_id from auth.users where lower(email)=lower(trim(p_email)) limit 1;
  if v_user_id is null then raise exception 'Usuario no encontrado'; end if;
  update public.profiles set is_active = coalesce(p_is_active,true), updated_at=now() where id=v_user_id;
  update auth.users set email_confirmed_at = coalesce(email_confirmed_at, now()), updated_at=now() where id=v_user_id;
  return true;
end;
$$;
grant execute on function public.admin_approve_profile_by_email(text,boolean) to authenticated, anon;

-- Vista ABM de usuarios.
drop view if exists public.users_abm_view cascade;
drop view if exists public.users_frontend_view cascade;
create or replace view public.users_abm_view as
select
  p.id,
  p.full_name,
  p.full_name as name,
  u.email,
  r.name as role,
  r.code as role_code,
  p.dni,
  p.birth_date,
  p.whatsapp,
  p.avatar_url,
  p.title,
  p.is_active,
  case when p.is_active then 'Activo' else 'Inactivo' end as status,
  p.created_at,
  p.updated_at
from public.profiles p
left join auth.users u on u.id = p.id
left join public.roles r on r.id = p.role_id;
create or replace view public.users_frontend_view as select * from public.users_abm_view;
grant select on public.users_abm_view to authenticated, anon;
grant select on public.users_frontend_view to authenticated, anon;

-- RLS básica permisiva para frontend autenticado; ajustable a producción.
alter table public.profiles enable row level security;
drop policy if exists profiles_select_auth on public.profiles;
drop policy if exists profiles_update_self_or_admin on public.profiles;
create policy profiles_select_auth on public.profiles for select to authenticated using (true);
create policy profiles_update_self_or_admin on public.profiles for update to authenticated using (
  id = auth.uid() or exists (select 1 from public.profiles p join public.roles r on r.id=p.role_id where p.id=auth.uid() and r.code='administrator' and p.is_active)
) with check (true);

commit;

-- IMPORTANTE en Supabase Dashboard:
-- Authentication > URL Configuration
-- Site URL: https://fmgambino.github.io
-- Redirect URLs:
-- https://fmgambino.github.io/index.html
-- https://fmgambino.github.io/reset-password.html
-- http://127.0.0.1:5501/index.html
-- http://127.0.0.1:5501/reset-password.html
