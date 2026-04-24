-- ISM ROBOSOFT v8.4 - Reparación ABM Usuarios
-- Ejecutar completo en Supabase SQL Editor.

begin;

-- Roles base
insert into public.roles (code, name, description, is_system)
values
  ('administrator','Administrador','Acceso total al sistema', true),
  ('teacher','Docente','Perfil docente', true),
  ('student','Alumno','Perfil alumno', true)
on conflict (code) do update set name = excluded.name, description = excluded.description, updated_at = now();

-- Normalizador de roles
create or replace function public.ism_role_code(p_role text)
returns text
language sql
immutable
as $$
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

-- Elimina versiones viejas con firmas conflictivas
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT oid::regprocedure AS sig
    FROM pg_proc
    WHERE pronamespace = 'public'::regnamespace
      AND proname IN ('admin_upsert_profile_by_email','admin_delete_profile')
  LOOP
    EXECUTE 'DROP FUNCTION IF EXISTS ' || r.sig || ' CASCADE';
  END LOOP;
END $$;

-- Crea/actualiza usuario Auth mínimo + perfil público por email.
-- Importante: evita crypt/gen_salt y evita depender de firmas anteriores cacheadas.
create or replace function public.admin_upsert_profile_by_email(
  p_email text,
  p_full_name text,
  p_role_code text default 'student',
  p_dni text default null,
  p_whatsapp text default null,
  p_birth_date date default null,
  p_title text default null,
  p_avatar_url text default null,
  p_is_active boolean default true
)
returns uuid
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid;
  v_role_id uuid;
  v_role_code text;
begin
  if nullif(trim(p_email),'') is null then
    raise exception 'El email es obligatorio';
  end if;
  if nullif(trim(p_full_name),'') is null then
    raise exception 'El nombre completo es obligatorio';
  end if;

  v_role_code := public.ism_role_code(p_role_code);

  insert into public.roles(code, name, description, is_system)
  values
    ('administrator','Administrador','Acceso total al sistema', true),
    ('teacher','Docente','Perfil docente', true),
    ('student','Alumno','Perfil alumno', true)
  on conflict (code) do nothing;

  select id into v_role_id from public.roles where code = v_role_code limit 1;

  select id into v_user_id
  from auth.users
  where lower(email) = lower(trim(p_email))
  limit 1;

  if v_user_id is null then
    v_user_id := gen_random_uuid();
    insert into auth.users (
      id, instance_id, aud, role, email,
      email_confirmed_at, confirmation_sent_at,
      raw_app_meta_data, raw_user_meta_data,
      is_super_admin, created_at, updated_at
    ) values (
      v_user_id,
      '00000000-0000-0000-0000-000000000000'::uuid,
      'authenticated',
      'authenticated',
      lower(trim(p_email)),
      now(), now(),
      jsonb_build_object('provider','email','providers',jsonb_build_array('email')),
      jsonb_build_object('full_name', p_full_name, 'role_code', v_role_code),
      false,
      now(), now()
    );
  else
    update auth.users
    set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
          || jsonb_build_object('full_name', p_full_name, 'role_code', v_role_code),
        updated_at = now()
    where id = v_user_id;
  end if;

  insert into public.profiles (
    id, role_id, full_name, dni, birth_date, whatsapp, avatar_url, title, is_active, created_at, updated_at
  ) values (
    v_user_id,
    v_role_id,
    trim(p_full_name),
    nullif(trim(coalesce(p_dni,'')),''),
    p_birth_date,
    nullif(trim(coalesce(p_whatsapp,'')),''),
    coalesce(nullif(trim(coalesce(p_avatar_url,'')),''), './assets/avatar-default.svg'),
    case when v_role_code = 'student' then null else nullif(trim(coalesce(p_title,'')),'') end,
    coalesce(p_is_active, true),
    now(), now()
  )
  on conflict (id) do update set
    role_id = excluded.role_id,
    full_name = excluded.full_name,
    dni = excluded.dni,
    birth_date = excluded.birth_date,
    whatsapp = excluded.whatsapp,
    avatar_url = excluded.avatar_url,
    title = excluded.title,
    is_active = excluded.is_active,
    updated_at = now();

  return v_user_id;
end;
$$;

grant execute on function public.admin_upsert_profile_by_email(text,text,text,text,text,date,text,text,boolean) to authenticated, anon;

-- Borrado real del perfil y del usuario auth, limpiando dependencias si existen.
create or replace function public.admin_delete_profile(p_profile_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if p_profile_id is null then
    raise exception 'profile_id requerido';
  end if;

  if to_regclass('public.team_members') is not null then
    delete from public.team_members where profile_id = p_profile_id;
  end if;

  if to_regclass('public.teams') is not null then
    update public.teams set teacher_id = null where teacher_id = p_profile_id;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='teams' and column_name='backup_teacher_id') then
      update public.teams set backup_teacher_id = null where backup_teacher_id = p_profile_id;
    end if;
  end if;

  if to_regclass('public.inventory_assets') is not null then
    update public.inventory_assets set current_holder_profile_id = null where current_holder_profile_id = p_profile_id;
  end if;

  if to_regclass('public.inventory_loans') is not null then
    update public.inventory_loans set requester_profile_id = null where requester_profile_id = p_profile_id;
    update public.inventory_loans set teacher_profile_id = null where teacher_profile_id = p_profile_id;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='created_by') then
      update public.inventory_loans set created_by = null where created_by = p_profile_id;
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='approved_by') then
      update public.inventory_loans set approved_by = null where approved_by = p_profile_id;
    end if;
  end if;

  if to_regclass('public.inventory_transactions') is not null then
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_transactions' and column_name='created_by') then
      update public.inventory_transactions set created_by = null where created_by = p_profile_id;
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_transactions' and column_name='related_profile_id') then
      update public.inventory_transactions set related_profile_id = null where related_profile_id = p_profile_id;
    end if;
  end if;

  if to_regclass('public.user_audit_log') is not null then
    update public.user_audit_log set changed_by = null where changed_by = p_profile_id;
    update public.user_audit_log set profile_id = null where profile_id = p_profile_id;
  end if;

  delete from public.profiles where id = p_profile_id;
  delete from auth.users where id = p_profile_id;
  return true;
end;
$$;

grant execute on function public.admin_delete_profile(uuid) to authenticated, anon;

-- Vista de usuarios para frontend, recreada sin romper dependencias.
drop view if exists public.users_frontend_view cascade;
create or replace view public.users_frontend_view as
select
  p.id,
  p.full_name,
  p.full_name as name,
  u.email,
  r.name as role,
  r.code as role_code,
  p.dni,
  p.whatsapp,
  p.birth_date,
  p.title,
  p.avatar_url,
  p.is_active,
  case when p.is_active then 'Activo' else 'Inactivo' end as status,
  p.created_at,
  p.updated_at
from public.profiles p
left join auth.users u on u.id = p.id
left join public.roles r on r.id = p.role_id;

grant select on public.users_frontend_view to authenticated, anon;

-- Refresca caché de PostgREST
notify pgrst, 'reload schema';

commit;
