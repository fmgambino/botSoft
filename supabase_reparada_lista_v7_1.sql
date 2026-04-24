-- ================================================================
-- ISM ROBOSOFT - SQL REPARACION SUPABASE v7.1
-- Ejecutar completo en Supabase > SQL Editor.
-- Corrige:
--  - error de comillas en auth.users / password Jamboree0342$$
--  - admin_delete_profile: columna requester_id inexistente
--  - team_members.role_in_team inexistente
--  - vistas con columnas cambiadas: se dropean antes de recrear
--  - ABM Usuarios, Roles, Equipos, Inventario y Prestamos
-- ================================================================

begin;

create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------
-- 0) Limpiar vistas dependientes para evitar ERROR 42P16
-- ---------------------------------------------------------------
drop view if exists public.users_frontend_view cascade;
drop view if exists public.roles_frontend_view cascade;
drop view if exists public.permissions_frontend_view cascade;
drop view if exists public.teams_frontend_view cascade;
drop view if exists public.team_members_frontend_view cascade;
drop view if exists public.inventory_frontend_view cascade;
drop view if exists public.inventory_assets_frontend_view cascade;
drop view if exists public.inventory_loans_frontend_view cascade;
drop view if exists public.dashboard_stats_view cascade;

-- ---------------------------------------------------------------
-- 1) Tablas base faltantes/idempotentes
-- ---------------------------------------------------------------
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  is_system boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
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

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level text,
  created_at timestamptz default now()
);

create table if not exists public.divisions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete set null,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz default now()
);

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

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  teacher_id uuid references public.profiles(id) on delete set null,
  backup_teacher_id uuid references public.profiles(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  division_id uuid references public.divisions(id) on delete set null,
  status text default 'activo',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  is_leader boolean default false,
  created_at timestamptz default now(),
  unique(team_id, profile_id)
);

-- columnas faltantes en instalaciones existentes
alter table public.team_members add column if not exists role_in_team text default 'student';
alter table public.teams add column if not exists backup_teacher_id uuid references public.profiles(id) on delete set null;
alter table public.profiles add column if not exists birth_date date;
alter table public.profiles add column if not exists whatsapp text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists title text;
alter table public.profiles add column if not exists teacher_subject_id uuid references public.subjects(id) on delete set null;
alter table public.profiles add column if not exists student_course_id uuid references public.courses(id) on delete set null;
alter table public.profiles add column if not exists student_division_id uuid references public.divisions(id) on delete set null;
alter table public.profiles add column if not exists is_active boolean default true;

-- ---------------------------------------------------------------
-- 2) Inventario: crear/ajustar columnas necesarias
-- ---------------------------------------------------------------
create table if not exists public.inventory_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inventory_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.inventory_suppliers (
  id uuid primary key default gen_random_uuid(),
  supplier_code text unique,
  name text not null unique,
  cuit text,
  address text,
  phone text,
  email text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.inventory_locations (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  name text not null,
  address text,
  latitude numeric,
  longitude numeric,
  map_url text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inventory_status_catalog (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  frontend_status text not null default 'Disponible',
  is_available boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now()
);

create table if not exists public.inventory_catalog_items (
  id uuid primary key default gen_random_uuid(),
  item_code text unique,
  name text not null,
  description text,
  category_id uuid references public.inventory_categories(id) on delete set null,
  brand_id uuid references public.inventory_brands(id) on delete set null,
  supplier_id uuid references public.inventory_suppliers(id) on delete set null,
  tracking_mode text not null default 'serializado',
  requires_expiration boolean default false,
  barcode_prefix text default 'ISMROB',
  minimum_stock integer default 0,
  default_location_detail text,
  default_zone text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inventory_assets (
  id uuid primary key default gen_random_uuid(),
  catalog_item_id uuid not null references public.inventory_catalog_items(id) on delete cascade,
  asset_code text not null unique,
  barcode text not null unique,
  serial_number text,
  generated_barcode boolean default false,
  status_id uuid references public.inventory_status_catalog(id) on delete set null,
  condition_note text,
  current_location_id uuid references public.inventory_locations(id) on delete set null,
  current_holder_profile_id uuid references public.profiles(id) on delete set null,
  current_holder_team_id uuid references public.teams(id) on delete set null,
  received_at date,
  expiration_date date,
  purchase_date date,
  quantity integer not null default 1,
  quantity_available integer not null default 1,
  tags text[],
  notes text,
  location_detail text,
  zone text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.inventory_catalog_items add column if not exists default_location_detail text;
alter table public.inventory_catalog_items add column if not exists default_zone text;
alter table public.inventory_assets add column if not exists location_detail text;
alter table public.inventory_assets add column if not exists zone text;

create table if not exists public.inventory_loans (
  id uuid primary key default gen_random_uuid(),
  loan_code text not null unique,
  requester_profile_id uuid references public.profiles(id) on delete set null,
  teacher_profile_id uuid references public.profiles(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  requested_at timestamptz not null default now(),
  approved_at timestamptz,
  checked_out_at timestamptz,
  due_at timestamptz,
  returned_at timestamptz,
  checkout_condition text,
  return_condition text,
  notes text,
  status text not null default 'abierto',
  created_by uuid references public.profiles(id) on delete set null,
  approved_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.inventory_loans add column if not exists approved_by uuid references public.profiles(id) on delete set null;

create table if not exists public.inventory_loan_items (
  id uuid primary key default gen_random_uuid(),
  loan_id uuid not null references public.inventory_loans(id) on delete cascade,
  asset_id uuid references public.inventory_assets(id) on delete set null,
  quantity integer not null default 1,
  checkout_condition text,
  return_condition text,
  returned_at timestamptz,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  transaction_code text unique,
  transaction_type text not null,
  related_loan_id uuid references public.inventory_loans(id) on delete set null,
  related_profile_id uuid references public.profiles(id) on delete set null,
  related_team_id uuid references public.teams(id) on delete set null,
  location_from_id uuid references public.inventory_locations(id) on delete set null,
  location_to_id uuid references public.inventory_locations(id) on delete set null,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists public.user_audit_log (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  previous_data jsonb,
  new_data jsonb,
  changed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------
-- 3) Datos semilla
-- ---------------------------------------------------------------
insert into public.roles(code, name, description, is_system) values
('administrator','Administrador','Acceso total al sistema', true),
('teacher','Docente','Gestiona campus, equipos, prestamos e inventario asignado', true),
('student','Alumno','Acceso a campus, certificados y solicitudes', true)
on conflict (code) do update set name = excluded.name, description = excluded.description;

insert into public.permissions(code, name, module) values
('dashboard.read','Ver dashboard','dashboard'),
('users.manage','Gestionar usuarios','usuarios'),
('roles.manage','Gestionar roles y permisos','roles'),
('teams.manage','Gestionar equipos','equipos'),
('inventory.manage','Gestionar inventario','inventario'),
('loans.manage','Gestionar prestamos','prestamos')
on conflict (code) do update set name = excluded.name, module = excluded.module;

insert into public.role_permissions(role_id, permission_id)
select r.id, p.id from public.roles r cross join public.permissions p
where r.code='administrator'
on conflict do nothing;

insert into public.role_permissions(role_id, permission_id)
select r.id, p.id from public.roles r join public.permissions p on p.code in ('dashboard.read','teams.manage','inventory.manage','loans.manage')
where r.code='teacher'
on conflict do nothing;

insert into public.role_permissions(role_id, permission_id)
select r.id, p.id from public.roles r join public.permissions p on p.code in ('dashboard.read')
where r.code='student'
on conflict do nothing;

insert into public.inventory_status_catalog(code,name,frontend_status,is_available,sort_order) values
('available','Disponible','Disponible',true,1),
('assigned','Asignado','Asignado',false,2),
('loaned','Prestado','Prestado',false,3),
('maintenance','Mantenimiento','Mantenimiento',false,4),
('inactive','Inactivo','Inactivo',false,99)
on conflict (code) do update set name=excluded.name, frontend_status=excluded.frontend_status, is_available=excluded.is_available;

insert into public.inventory_locations(code,name,address) values
('LAB_ROBOTICA','Laboratorio de Robotica','Instituto San Miguel'),
('GABINETE','Gabinete','Instituto San Miguel'),
('MALETIN','Maletin','Instituto San Miguel'),
('CAJON','Cajon','Instituto San Miguel')
on conflict (code) do update set name=excluded.name;

-- ---------------------------------------------------------------
-- 4) Vistas frontend
-- ---------------------------------------------------------------
create or replace view public.users_frontend_view as
select
  p.id,
  au.email,
  p.full_name,
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
left join public.roles r on r.id = p.role_id
left join auth.users au on au.id = p.id;

create or replace view public.roles_frontend_view as
select
  r.id,
  r.code,
  r.name,
  r.description,
  r.is_system,
  coalesce(count(rp.permission_id),0) as permissions_count,
  r.created_at,
  r.updated_at
from public.roles r
left join public.role_permissions rp on rp.role_id = r.id
group by r.id;

create or replace view public.permissions_frontend_view as
select id, code, name, module, created_at
from public.permissions;

create or replace view public.teams_frontend_view as
select
  t.id,
  t.name,
  t.description,
  t.status,
  t.teacher_id,
  teacher.full_name as teacher_name,
  t.backup_teacher_id,
  backup_teacher.full_name as backup_teacher_name,
  t.course_id,
  c.name as course_name,
  t.division_id,
  d.name as division_name,
  t.created_at,
  t.updated_at,
  coalesce(count(tm.profile_id) filter (where coalesce(tm.role_in_team,'student') = 'student'), 0) as students_count
from public.teams t
left join public.profiles teacher on teacher.id = t.teacher_id
left join public.profiles backup_teacher on backup_teacher.id = t.backup_teacher_id
left join public.courses c on c.id = t.course_id
left join public.divisions d on d.id = t.division_id
left join public.team_members tm on tm.team_id = t.id
group by t.id, teacher.full_name, backup_teacher.full_name, c.name, d.name;

create or replace view public.team_members_frontend_view as
select
  tm.id,
  tm.team_id,
  tm.profile_id,
  p.full_name,
  au.email,
  r.code as role_code,
  r.name as role,
  coalesce(tm.role_in_team,'student') as role_in_team,
  tm.is_leader,
  tm.created_at
from public.team_members tm
join public.profiles p on p.id = tm.profile_id
left join public.roles r on r.id = p.role_id
left join auth.users au on au.id = p.id;

create or replace view public.inventory_frontend_view as
select
  a.id,
  a.asset_code as code,
  ci.name,
  coalesce(cat.name,'Sin categoria') as category,
  coalesce(b.name,'Sin marca') as brand,
  coalesce(s.name,'Sin empresa') as supplier,
  ci.tracking_mode as type,
  a.serial_number as serial,
  a.barcode,
  coalesce(st.frontend_status, st.name, 'Disponible') as status,
  a.condition_note as condition,
  coalesce(a.location_detail, ci.default_location_detail, loc.name, '-') as location_detail,
  coalesce(a.zone, ci.default_zone, '-') as zone,
  loc.name as location,
  holder.full_name as assigned_to,
  team.name as assigned_team,
  a.quantity,
  a.quantity_available,
  a.is_active,
  a.created_at,
  a.updated_at
from public.inventory_assets a
join public.inventory_catalog_items ci on ci.id = a.catalog_item_id
left join public.inventory_categories cat on cat.id = ci.category_id
left join public.inventory_brands b on b.id = ci.brand_id
left join public.inventory_suppliers s on s.id = ci.supplier_id
left join public.inventory_status_catalog st on st.id = a.status_id
left join public.inventory_locations loc on loc.id = a.current_location_id
left join public.profiles holder on holder.id = a.current_holder_profile_id
left join public.teams team on team.id = a.current_holder_team_id;

create or replace view public.inventory_assets_frontend_view as
select * from public.inventory_frontend_view;

create or replace view public.inventory_loans_frontend_view as
select
  l.id,
  l.loan_code,
  l.status,
  l.requested_at,
  l.due_at,
  l.returned_at,
  requester.full_name as requester_name,
  teacher.full_name as teacher_name,
  team.name as team_name,
  l.notes,
  l.created_at,
  l.updated_at
from public.inventory_loans l
left join public.profiles requester on requester.id = l.requester_profile_id
left join public.profiles teacher on teacher.id = l.teacher_profile_id
left join public.teams team on team.id = l.team_id;

create or replace view public.dashboard_stats_view as
select
  (select count(*) from public.profiles where is_active=true) as active_users,
  (select count(*) from public.teams where status='activo') as active_teams,
  (select count(*) from public.inventory_assets where is_active=true) as inventory_assets,
  (select count(*) from public.inventory_loans where status not in ('cerrado','cancelado','rechazado')) as open_loans;

-- ---------------------------------------------------------------
-- 5) Funciones RPC Usuarios
-- ---------------------------------------------------------------
drop function if exists public.admin_create_profile_full(text,text,text,text,text,date,text,text,boolean);
drop function if exists public.admin_create_profile_full(text,text,text,text,text,text,text,date,text,text,boolean);
create or replace function public.admin_create_profile_full(
  p_full_name text,
  p_email text,
  p_password text default 'Jamboree0342$$',
  p_role_code text default 'student',
  p_dni text default null,
  p_birth_date date default null,
  p_whatsapp text default null,
  p_avatar_url text default null,
  p_title text default null,
  p_is_active boolean default true
) returns uuid
language plpgsql
security definer
set search_path = public, auth
as $fn$
declare
  v_profile_id uuid := gen_random_uuid();
  v_role_id uuid;
  v_password text := coalesce(nullif(p_password,''), 'Jamboree0342$$');
begin
  select id into v_role_id from public.roles where code = coalesce(nullif(p_role_code,''),'student') limit 1;
  if v_role_id is null then
    select id into v_role_id from public.roles where code='student' limit 1;
  end if;

  if exists(select 1 from auth.users where lower(email)=lower(p_email)) then
    raise exception 'Ya existe un usuario con ese email';
  end if;

  insert into auth.users(
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at
  ) values (
    v_profile_id,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    lower(trim(p_email)),
    crypt(v_password, gen_salt('bf')),
    now(),
    jsonb_build_object('provider','email','providers',array['email']),
    jsonb_build_object('full_name',p_full_name),
    now(),
    now()
  );

  insert into public.profiles(id, role_id, full_name, dni, birth_date, whatsapp, avatar_url, title, is_active, created_at, updated_at)
  values(v_profile_id, v_role_id, p_full_name, nullif(p_dni,''), p_birth_date, nullif(p_whatsapp,''), nullif(p_avatar_url,''), nullif(p_title,''), coalesce(p_is_active,true), now(), now());

  return v_profile_id;
end;
$fn$;

grant execute on function public.admin_create_profile_full(text,text,text,text,text,date,text,text,text,boolean) to authenticated;

-- compatibilidad por si el frontend llama sin titulo
create or replace function public.admin_create_profile_full(
  p_full_name text,
  p_email text,
  p_password text,
  p_role_code text,
  p_dni text,
  p_birth_date date,
  p_whatsapp text,
  p_avatar_url text,
  p_is_active boolean
) returns uuid
language sql
security definer
as $fn$
  select public.admin_create_profile_full($1,$2,$3,$4,$5,$6,$7,$8,null,$9);
$fn$;

grant execute on function public.admin_create_profile_full(text,text,text,text,text,date,text,text,boolean) to authenticated;

drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,text,boolean);
create or replace function public.admin_update_profile_full(
  p_profile_id uuid,
  p_full_name text default null,
  p_email text default null,
  p_role_code text default null,
  p_dni text default null,
  p_birth_date date default null,
  p_whatsapp text default null,
  p_avatar_url text default null,
  p_title text default null,
  p_is_active boolean default null
) returns uuid
language plpgsql
security definer
set search_path = public, auth
as $fn$
declare
  v_role_id uuid;
begin
  if p_role_code is not null and p_role_code <> '' then
    select id into v_role_id from public.roles where code=p_role_code limit 1;
  end if;

  update auth.users
  set email = coalesce(nullif(lower(trim(p_email)),''), email),
      raw_user_meta_data = coalesce(raw_user_meta_data,'{}'::jsonb) || jsonb_build_object('full_name', coalesce(nullif(p_full_name,''), raw_user_meta_data->>'full_name')),
      updated_at = now()
  where id = p_profile_id;

  update public.profiles
  set full_name = coalesce(nullif(p_full_name,''), full_name),
      role_id = coalesce(v_role_id, role_id),
      dni = nullif(p_dni,''),
      birth_date = p_birth_date,
      whatsapp = nullif(p_whatsapp,''),
      avatar_url = nullif(p_avatar_url,''),
      title = nullif(p_title,''),
      is_active = coalesce(p_is_active, is_active),
      updated_at = now()
  where id = p_profile_id;

  return p_profile_id;
end;
$fn$;

grant execute on function public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,text,boolean) to authenticated;

create or replace function public.admin_update_profile_full(
  p_profile_id uuid,
  p_full_name text,
  p_email text,
  p_role_code text,
  p_dni text,
  p_birth_date date,
  p_whatsapp text,
  p_avatar_url text,
  p_is_active boolean
) returns uuid
language sql
security definer
as $fn$
  select public.admin_update_profile_full($1,$2,$3,$4,$5,$6,$7,$8,null,$9);
$fn$;

grant execute on function public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,boolean) to authenticated;

drop function if exists public.admin_delete_profile(uuid);
create or replace function public.admin_delete_profile(p_profile_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $fn$
begin
  -- No usa requester_id. Usa los nombres reales de tu esquema.
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
    update public.inventory_transactions set related_profile_id = null where related_profile_id = p_profile_id;
    update public.inventory_transactions set created_by = null where created_by = p_profile_id;
  end if;

  if to_regclass('public.user_audit_log') is not null then
    update public.user_audit_log set changed_by = null where changed_by = p_profile_id;
    delete from public.user_audit_log where profile_id = p_profile_id;
  end if;

  delete from public.profiles where id = p_profile_id;
  delete from auth.users where id = p_profile_id;
  return true;
end;
$fn$;

grant execute on function public.admin_delete_profile(uuid) to authenticated;

-- ---------------------------------------------------------------
-- 6) Funciones RPC Roles
-- ---------------------------------------------------------------
drop function if exists public.admin_create_role(text,text,text,boolean);
create or replace function public.admin_create_role(p_code text, p_name text, p_description text default null, p_is_system boolean default false)
returns uuid
language plpgsql security definer set search_path=public as $fn$
declare v_id uuid;
begin
  insert into public.roles(code,name,description,is_system)
  values(lower(trim(p_code)), trim(p_name), p_description, coalesce(p_is_system,false))
  returning id into v_id;
  return v_id;
end;
$fn$;
grant execute on function public.admin_create_role(text,text,text,boolean) to authenticated;

drop function if exists public.admin_update_role(uuid,text,text,text,boolean);
create or replace function public.admin_update_role(p_role_id uuid, p_code text, p_name text, p_description text default null, p_is_system boolean default null)
returns uuid
language plpgsql security definer set search_path=public as $fn$
begin
  update public.roles
  set code=coalesce(nullif(lower(trim(p_code)),''),code),
      name=coalesce(nullif(trim(p_name),''),name),
      description=p_description,
      is_system=coalesce(p_is_system,is_system),
      updated_at=now()
  where id=p_role_id;
  return p_role_id;
end;
$fn$;
grant execute on function public.admin_update_role(uuid,text,text,text,boolean) to authenticated;

drop function if exists public.admin_delete_role(uuid);
create or replace function public.admin_delete_role(p_role_id uuid)
returns boolean
language plpgsql security definer set search_path=public as $fn$
begin
  delete from public.role_permissions where role_id=p_role_id;
  update public.profiles set role_id=(select id from public.roles where code='student' limit 1) where role_id=p_role_id;
  delete from public.roles where id=p_role_id and coalesce(is_system,false)=false;
  return true;
end;
$fn$;
grant execute on function public.admin_delete_role(uuid) to authenticated;

-- ---------------------------------------------------------------
-- 7) Funciones RPC Equipos
-- ---------------------------------------------------------------
drop function if exists public.admin_upsert_team(uuid,text,text,uuid,uuid,uuid[]);
create or replace function public.admin_upsert_team(
  p_team_id uuid default null,
  p_name text default null,
  p_description text default null,
  p_teacher_id uuid default null,
  p_backup_teacher_id uuid default null,
  p_student_ids uuid[] default '{}'
) returns uuid
language plpgsql security definer set search_path=public as $fn$
declare v_id uuid;
declare v_student uuid;
begin
  if p_team_id is null then
    insert into public.teams(name, description, teacher_id, backup_teacher_id, status)
    values(trim(p_name), p_description, p_teacher_id, p_backup_teacher_id, 'activo')
    returning id into v_id;
  else
    update public.teams
    set name=coalesce(nullif(trim(p_name),''),name),
        description=p_description,
        teacher_id=p_teacher_id,
        backup_teacher_id=p_backup_teacher_id,
        updated_at=now()
    where id=p_team_id
    returning id into v_id;
  end if;

  delete from public.team_members where team_id=v_id;
  if p_teacher_id is not null then
    insert into public.team_members(team_id, profile_id, role_in_team, is_leader)
    values(v_id, p_teacher_id, 'mentor', true) on conflict do nothing;
  end if;
  if p_backup_teacher_id is not null then
    insert into public.team_members(team_id, profile_id, role_in_team, is_leader)
    values(v_id, p_backup_teacher_id, 'backup_mentor', false) on conflict do nothing;
  end if;
  if p_student_ids is not null then
    foreach v_student in array p_student_ids loop
      insert into public.team_members(team_id, profile_id, role_in_team, is_leader)
      values(v_id, v_student, 'student', false) on conflict do nothing;
    end loop;
  end if;
  return v_id;
end;
$fn$;
grant execute on function public.admin_upsert_team(uuid,text,text,uuid,uuid,uuid[]) to authenticated;

drop function if exists public.admin_delete_team(uuid);
create or replace function public.admin_delete_team(p_team_id uuid)
returns boolean
language plpgsql security definer set search_path=public as $fn$
begin
  delete from public.team_members where team_id=p_team_id;
  update public.inventory_assets set current_holder_team_id=null where current_holder_team_id=p_team_id;
  update public.inventory_loans set team_id=null where team_id=p_team_id;
  delete from public.teams where id=p_team_id;
  return true;
end;
$fn$;
grant execute on function public.admin_delete_team(uuid) to authenticated;

-- ---------------------------------------------------------------
-- 8) Funcion RPC Inventario
-- ---------------------------------------------------------------
drop function if exists public.admin_upsert_inventory_asset(uuid,text,text,text,text,text,text,text,text,text,text,text);
create or replace function public.admin_upsert_inventory_asset(
  p_asset_id uuid default null,
  p_name text default null,
  p_category text default null,
  p_brand text default null,
  p_supplier text default null,
  p_type text default 'Equipo',
  p_asset_code text default null,
  p_serial_number text default null,
  p_barcode text default null,
  p_location text default null,
  p_location_detail text default null,
  p_zone text default null,
  p_condition_note text default null
) returns uuid
language plpgsql security definer set search_path=public as $fn$
declare
  v_category_id uuid;
  v_brand_id uuid;
  v_supplier_id uuid;
  v_location_id uuid;
  v_catalog_id uuid;
  v_status_id uuid;
  v_asset_id uuid;
  v_code text;
  v_barcode text;
begin
  if nullif(p_category,'') is not null then
    insert into public.inventory_categories(name) values(trim(p_category)) on conflict(name) do update set name=excluded.name returning id into v_category_id;
  end if;
  if nullif(p_brand,'') is not null then
    insert into public.inventory_brands(name) values(trim(p_brand)) on conflict(name) do update set name=excluded.name returning id into v_brand_id;
  end if;
  if nullif(p_supplier,'') is not null then
    insert into public.inventory_suppliers(name) values(trim(p_supplier)) on conflict(name) do update set name=excluded.name returning id into v_supplier_id;
  end if;
  if nullif(p_location,'') is not null then
    insert into public.inventory_locations(code,name) values(upper(regexp_replace(trim(p_location),'\s+','_','g')), trim(p_location))
    on conflict(code) do update set name=excluded.name returning id into v_location_id;
  end if;

  select id into v_status_id from public.inventory_status_catalog where code='available' limit 1;

  if p_asset_id is null then
    insert into public.inventory_catalog_items(name, category_id, brand_id, supplier_id, tracking_mode, default_location_detail, default_zone)
    values(coalesce(nullif(p_name,''),'Sin nombre'), v_category_id, v_brand_id, v_supplier_id, 'serializado', nullif(p_location_detail,''), nullif(p_zone,''))
    returning id into v_catalog_id;

    v_code := coalesce(nullif(p_asset_code,''), 'ACT-' || lpad(nextval('public.inventory_asset_seq')::text,6,'0'));
    v_barcode := coalesce(nullif(p_barcode,''), 'ISMROB-' || lpad(nextval('public.inventory_barcode_seq')::text,6,'0'));

    insert into public.inventory_assets(catalog_item_id, asset_code, barcode, serial_number, generated_barcode, status_id, condition_note, current_location_id, location_detail, zone)
    values(v_catalog_id, v_code, v_barcode, nullif(p_serial_number,''), p_barcode is null or p_barcode='', v_status_id, nullif(p_condition_note,''), v_location_id, nullif(p_location_detail,''), nullif(p_zone,''))
    returning id into v_asset_id;
  else
    select catalog_item_id into v_catalog_id from public.inventory_assets where id=p_asset_id;
    update public.inventory_catalog_items
    set name=coalesce(nullif(p_name,''),name), category_id=coalesce(v_category_id,category_id), brand_id=coalesce(v_brand_id,brand_id), supplier_id=coalesce(v_supplier_id,supplier_id),
        default_location_detail=coalesce(nullif(p_location_detail,''),default_location_detail), default_zone=coalesce(nullif(p_zone,''),default_zone), updated_at=now()
    where id=v_catalog_id;
    update public.inventory_assets
    set asset_code=coalesce(nullif(p_asset_code,''),asset_code), barcode=coalesce(nullif(p_barcode,''),barcode), serial_number=nullif(p_serial_number,''),
        condition_note=nullif(p_condition_note,''), current_location_id=coalesce(v_location_id,current_location_id), location_detail=nullif(p_location_detail,''), zone=nullif(p_zone,''), updated_at=now()
    where id=p_asset_id returning id into v_asset_id;
  end if;
  return v_asset_id;
end;
$fn$;

-- secuencias para codigos si no existen
create sequence if not exists public.inventory_asset_seq start 1;
create sequence if not exists public.inventory_barcode_seq start 1;

grant execute on function public.admin_upsert_inventory_asset(uuid,text,text,text,text,text,text,text,text,text,text,text,text) to authenticated;

drop function if exists public.admin_delete_inventory_asset(uuid);
create or replace function public.admin_delete_inventory_asset(p_asset_id uuid)
returns boolean
language plpgsql security definer set search_path=public as $fn$
begin
  update public.inventory_assets set is_active=false, updated_at=now() where id=p_asset_id;
  return true;
end;
$fn$;
grant execute on function public.admin_delete_inventory_asset(uuid) to authenticated;

-- ---------------------------------------------------------------
-- 9) RLS permisiva para app autenticada
-- ---------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.inventory_assets enable row level security;
alter table public.inventory_catalog_items enable row level security;
alter table public.inventory_categories enable row level security;
alter table public.inventory_brands enable row level security;
alter table public.inventory_suppliers enable row level security;
alter table public.inventory_locations enable row level security;
alter table public.inventory_status_catalog enable row level security;
alter table public.inventory_loans enable row level security;

do $fn$
declare t text;
begin
  foreach t in array array[
    'profiles','roles','permissions','role_permissions','teams','team_members',
    'inventory_assets','inventory_catalog_items','inventory_categories','inventory_brands','inventory_suppliers','inventory_locations','inventory_status_catalog','inventory_loans'
  ] loop
    execute format('drop policy if exists authenticated_all on public.%I', t);
    execute format('create policy authenticated_all on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end;
$fn$;

-- permisos generales
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

grant select on public.users_frontend_view to authenticated;
grant select on public.roles_frontend_view to authenticated;
grant select on public.permissions_frontend_view to authenticated;
grant select on public.teams_frontend_view to authenticated;
grant select on public.team_members_frontend_view to authenticated;
grant select on public.inventory_frontend_view to authenticated;
grant select on public.inventory_assets_frontend_view to authenticated;
grant select on public.inventory_loans_frontend_view to authenticated;
grant select on public.dashboard_stats_view to authenticated;

commit;
