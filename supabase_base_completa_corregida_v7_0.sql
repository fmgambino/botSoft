-- ISM ROBOSOFT v7.0 - SQL COMPLETO DE REPARACION PARA SUPABASE
-- Corrige:
-- 1) cannot change name of view column "serial" to "category"
-- 2) column tm.role_in_team does not exist
-- 3) requester_id does not exist en admin_delete_profile
-- 4) firmas viejas de RPC admin_update_profile_full / admin_upsert_profile_by_email
-- Ejecutar COMPLETO en Supabase > SQL Editor.

begin;

create extension if not exists pgcrypto;

-- =========================================================
-- LIMPIEZA SEGURA DE VISTAS Y RPC CAMBIANTES
-- =========================================================
drop view if exists public.inventory_frontend_view cascade;
drop view if exists public.users_abm_view cascade;
drop view if exists public.teams_frontend_view cascade;
drop view if exists public.loans_frontend_view cascade;

drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,boolean,text);
drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,bigint,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,uuid,text,text,boolean);
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,text);
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,text,date,text,text,boolean);
drop function if exists public.admin_delete_profile(uuid);

-- =========================================================
-- ESTRUCTURA BASE / COMPATIBILIDAD
-- =========================================================
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text,
  is_system boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  module text not null,
  created_at timestamptz default now()
);

create table if not exists public.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  unique(role_id, permission_id)
);

create table if not exists public.courses (id uuid primary key default gen_random_uuid(), name text not null, level text, created_at timestamptz default now());
create table if not exists public.divisions (id uuid primary key default gen_random_uuid(), name text not null, course_id uuid references public.courses(id) on delete cascade, created_at timestamptz default now());
create table if not exists public.subjects (id uuid primary key default gen_random_uuid(), name text not null, created_at timestamptz default now());

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role_id uuid references public.roles(id) on delete set null,
  full_name text not null,
  dni text unique,
  birth_date date,
  whatsapp text,
  avatar_url text,
  title text,
  teacher_subject_id uuid references public.subjects(id) on delete set null,
  student_course_id uuid references public.courses(id) on delete set null,
  student_division_id uuid references public.divisions(id) on delete set null,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.profiles
  add column if not exists birth_date date,
  add column if not exists whatsapp text,
  add column if not exists avatar_url text,
  add column if not exists title text,
  add column if not exists teacher_subject_id uuid references public.subjects(id) on delete set null,
  add column if not exists student_course_id uuid references public.courses(id) on delete set null,
  add column if not exists student_division_id uuid references public.divisions(id) on delete set null,
  add column if not exists is_active boolean default true,
  add column if not exists updated_at timestamptz default now();

insert into public.roles (code, name, description, is_system) values
('administrator', 'Administrador', 'Control total del sistema', true),
('teacher', 'Docente', 'Gestiona módulos, equipos e inventario asignado', true),
('student', 'Alumno', 'Consulta contenido, préstamos y notificaciones', true)
on conflict (code) do update set name = excluded.name, description = excluded.description, updated_at = now();

insert into public.permissions (code, name, module) values
('users.read', 'Ver usuarios', 'usuarios'),
('users.manage', 'Alta, baja y modificación de usuarios', 'usuarios'),
('roles.manage', 'Gestionar roles y permisos', 'seguridad'),
('teams.read', 'Ver equipos', 'equipos'),
('teams.manage', 'Gestionar equipos', 'equipos'),
('inventory.read', 'Ver inventario', 'inventario'),
('inventory.manage', 'Gestionar inventario', 'inventario'),
('inventory.loan', 'Solicitar préstamos', 'prestamos'),
('inventory.approve', 'Aprobar y cerrar préstamos', 'prestamos')
on conflict (code) do update set name = excluded.name, module = excluded.module;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on
  (r.code='administrator') or
  (r.code='teacher' and p.code in ('users.read','teams.read','teams.manage','inventory.read','inventory.loan','inventory.approve')) or
  (r.code='student' and p.code in ('inventory.read','inventory.loan','teams.read'))
on conflict do nothing;

-- =========================================================
-- FUNCIONES DE SEGURIDAD
-- =========================================================
create or replace function public.is_admin(p_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    join public.roles r on r.id = p.role_id
    where p.id = p_user_id and r.code = 'administrator' and coalesce(p.is_active,true)
  );
$$;

grant execute on function public.is_admin(uuid) to authenticated;

create or replace function public.has_permission(p_user_id uuid, p_permission_code text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.profiles pr
    join public.roles r on r.id = pr.role_id
    join public.role_permissions rp on rp.role_id = r.id
    join public.permissions pe on pe.id = rp.permission_id
    where pr.id = p_user_id
      and coalesce(pr.is_active,true)
      and (r.code = 'administrator' or pe.code = p_permission_code)
  );
$$;

grant execute on function public.has_permission(uuid,text) to authenticated;

-- =========================================================
-- EQUIPOS
-- =========================================================
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  teacher_id uuid references public.profiles(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  division_id uuid references public.divisions(id) on delete set null,
  status text default 'activo',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.teams
  add column if not exists description text,
  add column if not exists project text,
  add column if not exists teacher_id uuid references public.profiles(id) on delete set null,
  add column if not exists mentor_backup_id uuid references public.profiles(id) on delete set null,
  add column if not exists course_id uuid references public.courses(id) on delete set null,
  add column if not exists division_id uuid references public.divisions(id) on delete set null,
  add column if not exists status text default 'activo',
  add column if not exists updated_at timestamptz default now();

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  is_leader boolean default false,
  created_at timestamptz default now(),
  unique(team_id, profile_id)
);

alter table if exists public.team_members
  add column if not exists is_leader boolean default false,
  add column if not exists role_in_team text default 'student';

update public.team_members tm
set role_in_team = case when r.code = 'teacher' then 'mentor' else 'student' end
from public.profiles p
left join public.roles r on r.id = p.role_id
where p.id = tm.profile_id and (tm.role_in_team is null or tm.role_in_team = '');

-- =========================================================
-- INVENTARIO / PRESTAMOS: COLUMNAS DE COMPATIBILIDAD
-- =========================================================
create table if not exists public.inventory_categories (id uuid primary key default gen_random_uuid(), name text not null unique, description text, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists public.inventory_brands (id uuid primary key default gen_random_uuid(), name text not null unique, created_at timestamptz default now());
create table if not exists public.inventory_suppliers (id uuid primary key default gen_random_uuid(), name text not null unique, contact text, created_at timestamptz default now());
create table if not exists public.inventory_locations (id uuid primary key default gen_random_uuid(), code text unique, name text not null, description text, created_at timestamptz default now());
create table if not exists public.inventory_status_catalog (id uuid primary key default gen_random_uuid(), code text unique not null, name text not null, frontend_status text not null, sort_order integer default 0);

insert into public.inventory_status_catalog(code,name,frontend_status,sort_order) values
('nuevo','Nuevo','Disponible',1),('disponible','Disponible','Disponible',2),('prestado','Prestado','Prestado',3),('mantenimiento','Mantenimiento','Mantenimiento',4),('baja','Baja','Baja',5)
on conflict(code) do update set name=excluded.name, frontend_status=excluded.frontend_status, sort_order=excluded.sort_order;

create table if not exists public.inventory_catalog_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references public.inventory_categories(id) on delete set null,
  brand_id uuid references public.inventory_brands(id) on delete set null,
  supplier_id uuid references public.inventory_suppliers(id) on delete set null,
  tracking_mode text default 'serializado',
  default_location_id uuid references public.inventory_locations(id) on delete set null,
  default_location_detail text,
  default_zone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.inventory_catalog_items
  add column if not exists brand_id uuid references public.inventory_brands(id) on delete set null,
  add column if not exists supplier_id uuid references public.inventory_suppliers(id) on delete set null,
  add column if not exists default_location_id uuid references public.inventory_locations(id) on delete set null,
  add column if not exists default_location_detail text,
  add column if not exists default_zone text;

create table if not exists public.inventory_assets (
  id uuid primary key default gen_random_uuid(),
  catalog_item_id uuid references public.inventory_catalog_items(id) on delete set null,
  asset_code text unique,
  serial_number text,
  barcode text,
  status_id uuid references public.inventory_status_catalog(id) on delete set null,
  current_location_id uuid references public.inventory_locations(id) on delete set null,
  current_holder_profile_id uuid references public.profiles(id) on delete set null,
  current_team_id uuid references public.teams(id) on delete set null,
  condition_note text,
  location_detail text,
  zone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.inventory_assets
  add column if not exists location_detail text,
  add column if not exists zone text,
  add column if not exists current_holder_profile_id uuid references public.profiles(id) on delete set null,
  add column if not exists current_team_id uuid references public.teams(id) on delete set null,
  add column if not exists condition_note text;

create table if not exists public.inventory_loans (
  id uuid primary key default gen_random_uuid(),
  loan_code text unique,
  requester_profile_id uuid references public.profiles(id) on delete set null,
  teacher_profile_id uuid references public.profiles(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  requested_at timestamptz default now(),
  approved_at timestamptz,
  checked_out_at timestamptz,
  due_at timestamptz,
  returned_at timestamptz,
  notes text,
  status text default 'abierto',
  created_by uuid references public.profiles(id) on delete set null,
  approved_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table if exists public.inventory_loans
  add column if not exists requester_profile_id uuid references public.profiles(id) on delete set null,
  add column if not exists teacher_profile_id uuid references public.profiles(id) on delete set null,
  add column if not exists created_by uuid references public.profiles(id) on delete set null,
  add column if not exists approved_by uuid references public.profiles(id) on delete set null;

-- =========================================================
-- VISTAS CORREGIDAS
-- =========================================================
create view public.users_abm_view as
select
  p.id,
  au.email,
  p.full_name,
  p.dni,
  p.whatsapp,
  p.birth_date,
  p.avatar_url,
  p.title,
  r.code as role_code,
  r.name as role_name,
  coalesce(p.is_active,true) as is_active,
  p.created_at,
  p.updated_at,
  c.name as course_name,
  d.name as division_name,
  s.name as subject_name,
  au.last_sign_in_at
from public.profiles p
left join auth.users au on au.id = p.id
left join public.roles r on r.id = p.role_id
left join public.courses c on c.id = p.student_course_id
left join public.divisions d on d.id = p.student_division_id
left join public.subjects s on s.id = p.teacher_subject_id;

grant select on public.users_abm_view to authenticated;

create view public.teams_frontend_view as
select
  t.id,
  t.name,
  coalesce(t.project, t.description, '') as project,
  t.description,
  t.status,
  t.teacher_id,
  t.mentor_backup_id,
  mentor.full_name as mentor_name,
  backup.full_name as mentor_backup_name,
  array_remove(array[mentor.full_name, backup.full_name], null) as teachers,
  coalesce(array_remove(array_agg(distinct c.name) filter (where c.name is not null), null), array[]::text[]) as courses,
  coalesce(array_remove(array_agg(distinct d.name) filter (where d.name is not null), null), array[]::text[]) as divisions,
  count(distinct tm.profile_id) filter (where r.code = 'student')::int as students,
  count(distinct tm.profile_id) filter (where r.code = 'student')::int as students_count,
  t.created_at,
  t.updated_at
from public.teams t
left join public.profiles mentor on mentor.id = t.teacher_id
left join public.profiles backup on backup.id = t.mentor_backup_id
left join public.courses c on c.id = t.course_id
left join public.divisions d on d.id = t.division_id
left join public.team_members tm on tm.team_id = t.id
left join public.profiles mp on mp.id = tm.profile_id
left join public.roles r on r.id = mp.role_id
group by t.id, t.name, t.project, t.description, t.status, t.teacher_id, t.mentor_backup_id, mentor.full_name, backup.full_name, t.created_at, t.updated_at;

grant select on public.teams_frontend_view to authenticated;

create view public.inventory_frontend_view as
select
  a.id,
  a.asset_code as code,
  case when ci.tracking_mode = 'consumible' then 'Insumo' else 'Equipo' end as type,
  ci.name as item,
  cat.name as category,
  br.name as brand,
  sup.name as supplier,
  a.serial_number as serial,
  a.barcode,
  coalesce(st.frontend_status, 'Disponible') as status,
  coalesce(a.condition_note, st.name, 'Sin observaciones') as condition,
  coalesce(holder.full_name, team.name, '-') as assigned_to,
  '-'::text as teacher,
  null::text as requested_at,
  null::text as returned_at,
  coalesce(loc.name, '-') as location,
  coalesce(a.location_detail, ci.default_location_detail, '') as location_detail,
  coalesce(a.zone, ci.default_zone, '') as zone,
  a.created_at,
  a.updated_at
from public.inventory_assets a
left join public.inventory_catalog_items ci on ci.id = a.catalog_item_id
left join public.inventory_categories cat on cat.id = ci.category_id
left join public.inventory_brands br on br.id = ci.brand_id
left join public.inventory_suppliers sup on sup.id = ci.supplier_id
left join public.inventory_status_catalog st on st.id = a.status_id
left join public.inventory_locations loc on loc.id = a.current_location_id
left join public.profiles holder on holder.id = a.current_holder_profile_id
left join public.teams team on team.id = a.current_team_id;

grant select on public.inventory_frontend_view to authenticated;

create view public.loans_frontend_view as
select
  l.id,
  l.loan_code,
  coalesce(req.full_name, '-') as requester,
  coalesce(teacher.full_name, '-') as teacher,
  coalesce(team.name, '-') as team,
  to_char(l.requested_at, 'YYYY-MM-DD') as date,
  to_char(l.requested_at, 'HH24:MI') as time,
  l.notes,
  l.status,
  l.requested_at,
  l.due_at,
  l.returned_at,
  l.created_at
from public.inventory_loans l
left join public.profiles req on req.id = l.requester_profile_id
left join public.profiles teacher on teacher.id = l.teacher_profile_id
left join public.teams team on team.id = l.team_id;

grant select on public.loans_frontend_view to authenticated;

-- =========================================================
-- RPC USUARIOS CORREGIDAS
-- =========================================================
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
returns public.profiles
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_role_id uuid;
  v_profile_id uuid;
  v_profile public.profiles;
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Solo administradores pueden crear o editar usuarios';
  end if;

  select id into v_role_id from public.roles where code = coalesce(nullif(p_role_code,''),'student') limit 1;
  if v_role_id is null then raise exception 'Rol inexistente: %', p_role_code; end if;

  select id into v_profile_id from auth.users where lower(email) = lower(p_email) limit 1;
  if v_profile_id is null then
    v_profile_id := gen_random_uuid();
    insert into auth.users(id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    values (v_profile_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', lower(p_email), crypt('Jamboree0342$$', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}'::jsonb, jsonb_build_object('full_name', p_full_name), now(), now())
    on conflict (id) do nothing;
  end if;

  insert into public.profiles (id, role_id, full_name, dni, whatsapp, birth_date, title, avatar_url, is_active, updated_at)
  values (v_profile_id, v_role_id, coalesce(nullif(p_full_name,''), split_part(p_email,'@',1)), nullif(p_dni,''), nullif(p_whatsapp,''), p_birth_date, case when coalesce(p_role_code,'student')='student' then null else nullif(p_title,'') end, coalesce(nullif(p_avatar_url,''),'./assets/avatar-default.svg'), coalesce(p_is_active,true), now())
  on conflict (id) do update set
    role_id = excluded.role_id,
    full_name = excluded.full_name,
    dni = excluded.dni,
    whatsapp = excluded.whatsapp,
    birth_date = excluded.birth_date,
    title = excluded.title,
    avatar_url = excluded.avatar_url,
    is_active = excluded.is_active,
    updated_at = now()
  returning * into v_profile;

  return v_profile;
end;
$$;

grant execute on function public.admin_upsert_profile_by_email(text,text,text,text,text,date,text,text,boolean) to authenticated;

create or replace function public.admin_update_profile_full(
  p_profile_id uuid,
  p_full_name text,
  p_role_code text default null,
  p_dni text default null,
  p_whatsapp text default null,
  p_birth_date date default null,
  p_title text default null,
  p_avatar_url text default null,
  p_is_active boolean default true
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role_id uuid;
  v_profile public.profiles;
  v_role_code text;
begin
  if not public.is_admin(auth.uid()) and auth.uid() <> p_profile_id then
    raise exception 'Solo administradores pueden editar usuarios';
  end if;

  v_role_code := nullif(p_role_code,'');
  if v_role_code is not null then
    select id into v_role_id from public.roles where code = v_role_code limit 1;
    if v_role_id is null then raise exception 'Rol inválido: %', v_role_code; end if;
  end if;

  update public.profiles
  set full_name = coalesce(nullif(p_full_name,''), full_name),
      role_id = coalesce(v_role_id, role_id),
      dni = nullif(p_dni,''),
      whatsapp = nullif(p_whatsapp,''),
      birth_date = p_birth_date,
      title = case when coalesce(v_role_code, (select r.code from public.roles r where r.id = profiles.role_id)) = 'student' then null else nullif(p_title,'') end,
      avatar_url = coalesce(nullif(p_avatar_url,''), avatar_url),
      is_active = coalesce(p_is_active, is_active),
      updated_at = now()
  where id = p_profile_id
  returning * into v_profile;

  if v_profile.id is null then raise exception 'Usuario no encontrado'; end if;
  return v_profile;
end;
$$;

grant execute on function public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,boolean) to authenticated;

create or replace function public.admin_delete_profile(p_profile_id uuid)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Solo administradores pueden eliminar usuarios';
  end if;
  if p_profile_id = auth.uid() then
    raise exception 'No podés eliminar tu propio usuario desde la sesión activa';
  end if;

  if to_regclass('public.team_members') is not null then
    delete from public.team_members where profile_id = p_profile_id;
  end if;

  if to_regclass('public.teams') is not null then
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='teams' and column_name='teacher_id') then
      update public.teams set teacher_id = null where teacher_id = p_profile_id;
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='teams' and column_name='mentor_backup_id') then
      update public.teams set mentor_backup_id = null where mentor_backup_id = p_profile_id;
    end if;
  end if;

  if to_regclass('public.inventory_assets') is not null then
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_assets' and column_name='current_holder_profile_id') then
      update public.inventory_assets set current_holder_profile_id = null where current_holder_profile_id = p_profile_id;
    end if;
  end if;

  if to_regclass('public.inventory_loans') is not null then
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='requester_profile_id') then
      update public.inventory_loans set requester_profile_id = null where requester_profile_id = p_profile_id;
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='teacher_profile_id') then
      update public.inventory_loans set teacher_profile_id = null where teacher_profile_id = p_profile_id;
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='created_by') then
      update public.inventory_loans set created_by = null where created_by = p_profile_id;
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='approved_by') then
      update public.inventory_loans set approved_by = null where approved_by = p_profile_id;
    end if;
  end if;

  if to_regclass('public.inventory_transactions') is not null then
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_transactions' and column_name='actor_id') then
      update public.inventory_transactions set actor_id = null where actor_id = p_profile_id;
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_transactions' and column_name='related_profile_id') then
      update public.inventory_transactions set related_profile_id = null where related_profile_id = p_profile_id;
    end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_transactions' and column_name='created_by') then
      update public.inventory_transactions set created_by = null where created_by = p_profile_id;
    end if;
  end if;

  delete from public.profiles where id = p_profile_id;
  delete from auth.users where id = p_profile_id;
end;
$$;

grant execute on function public.admin_delete_profile(uuid) to authenticated;

commit;
