-- ISM Robosoft 2026 - Backend Supabase
-- Módulos urgentes: Inventario + ABM de Usuarios
-- Proyecto: https://pwailgchrwnwhutdfujb.supabase.co
-- Ejecutar completo en Supabase > SQL Editor. Es idempotente y no borra datos.

begin;

create extension if not exists pgcrypto;

-- =========================
-- Helpers
-- =========================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- =========================
-- Seguridad / Usuarios ABM
-- =========================
create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null check (code in ('administrator','teacher','student')),
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
  created_at timestamptz default now(),
  unique(course_id, name)
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

create table if not exists public.user_audit_log (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  previous_data jsonb,
  new_data jsonb,
  changed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

insert into public.roles (code, name, description) values
('administrator', 'Administrador', 'Control total del sistema'),
('teacher', 'Docente', 'Gestiona módulos, equipos e inventario asignado'),
('student', 'Alumno', 'Consulta contenido, préstamos y notificaciones')
on conflict (code) do update set name = excluded.name, description = excluded.description, updated_at = now();

insert into public.permissions (code, name, module) values
('users.read', 'Ver usuarios', 'usuarios'),
('users.manage', 'Alta, baja y modificación de usuarios', 'usuarios'),
('roles.manage', 'Gestionar roles y permisos', 'seguridad'),
('inventory.read', 'Ver inventario', 'inventario'),
('inventory.manage', 'Gestionar inventario', 'inventario'),
('inventory.loan', 'Solicitar préstamos', 'inventario'),
('inventory.approve', 'Aprobar y cerrar préstamos', 'inventario')
on conflict (code) do update set name = excluded.name, module = excluded.module;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p on
  (r.code='administrator') or
  (r.code='teacher' and p.code in ('users.read','inventory.read','inventory.loan','inventory.approve')) or
  (r.code='student' and p.code in ('inventory.read','inventory.loan'))
on conflict do nothing;

create or replace function public.is_admin(uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p join public.roles r on r.id = p.role_id
    where p.id = uid and p.is_active = true and r.code = 'administrator'
  );
$$;

create or replace function public.has_permission(uid uuid, permission_code text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.profiles pr
    join public.role_permissions rp on rp.role_id = pr.role_id
    join public.permissions pe on pe.id = rp.permission_id
    where pr.id = uid and pr.is_active = true and pe.code = permission_code
  );
$$;

create or replace function public.handle_new_auth_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  default_role uuid;
begin
  select id into default_role from public.roles where code = 'student';
  insert into public.profiles (id, role_id, full_name, avatar_url)
  values (
    new.id,
    default_role,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1), 'Usuario'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created_create_profile on auth.users;
create trigger on_auth_user_created_create_profile
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();

create or replace function public.admin_update_profile(
  p_profile_id uuid,
  p_role_code text,
  p_full_name text,
  p_dni text default null,
  p_whatsapp text default null,
  p_birth_date date default null,
  p_title text default null,
  p_is_active boolean default true
)
returns public.profiles language plpgsql security definer set search_path = public as $$
declare
  v_role_id uuid;
  v_old jsonb;
  v_new public.profiles;
begin
  if not public.is_admin(auth.uid()) then raise exception 'Solo administradores'; end if;
  select id into v_role_id from public.roles where code = p_role_code;
  if v_role_id is null then raise exception 'Rol inválido: %', p_role_code; end if;
  select to_jsonb(p.*) into v_old from public.profiles p where p.id = p_profile_id;
  update public.profiles set
    role_id = v_role_id, full_name = p_full_name, dni = p_dni, whatsapp = p_whatsapp,
    birth_date = p_birth_date, title = p_title, is_active = p_is_active, updated_at = now()
  where id = p_profile_id
  returning * into v_new;
  insert into public.user_audit_log(profile_id, action, previous_data, new_data, changed_by)
  values (p_profile_id, 'admin_update_profile', v_old, to_jsonb(v_new), auth.uid());
  return v_new;
end $$;

create or replace view public.users_abm_view as
select
  p.id, au.email, p.full_name, p.dni, p.whatsapp, p.birth_date, p.avatar_url, p.title,
  r.code as role_code, r.name as role_name,
  p.is_active, p.created_at, p.updated_at,
  c.name as course_name, d.name as division_name, s.name as subject_name,
  au.last_sign_in_at
from public.profiles p
left join auth.users au on au.id = p.id
left join public.roles r on r.id = p.role_id
left join public.courses c on c.id = p.student_course_id
left join public.divisions d on d.id = p.student_division_id
left join public.subjects s on s.id = p.teacher_subject_id;

-- =========================
-- Equipos base para préstamos
-- =========================
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  teacher_id uuid references public.profiles(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  division_id uuid references public.divisions(id) on delete set null,
  status text default 'activo' check (status in ('activo','inactivo','archivado')),
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

-- =========================
-- Inventario completo
-- =========================
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
  latitude numeric(10,7),
  longitude numeric(10,7),
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
  tracking_mode text not null default 'serializado' check (tracking_mode in ('serializado','consumible','lote')),
  requires_expiration boolean default false,
  barcode_prefix text default 'ISMROB',
  minimum_stock integer default 0,
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
  quantity integer not null default 1 check (quantity >= 0),
  quantity_available integer not null default 1 check (quantity_available >= 0),
  tags text[],
  notes text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint assets_serial_or_generated check (serial_number is not null or generated_barcode = true),
  constraint assets_available_lte_quantity check (quantity_available <= quantity)
);

create sequence if not exists public.inventory_barcode_seq start 1;
create or replace function public.generate_inventory_barcode(prefix text default 'ISMROB')
returns text language sql volatile as $$
  select prefix || '-' || lpad(nextval('public.inventory_barcode_seq')::text, 6, '0')
$$;

create table if not exists public.inventory_lots (
  id uuid primary key default gen_random_uuid(),
  catalog_item_id uuid not null references public.inventory_catalog_items(id) on delete cascade,
  lot_code text unique,
  supplier_id uuid references public.inventory_suppliers(id) on delete set null,
  received_at date,
  expiration_date date,
  quantity_received integer not null default 0 check (quantity_received >= 0),
  quantity_available integer not null default 0 check (quantity_available >= 0),
  location_id uuid references public.inventory_locations(id) on delete set null,
  notes text,
  created_at timestamptz default now(),
  constraint lots_available_lte_received check (quantity_available <= quantity_received)
);

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
  status text not null default 'abierto' check (status in ('borrador','abierto','aprobado','retirado','parcial','cerrado','vencido','cancelado','rechazado')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inventory_loan_items (
  id uuid primary key default gen_random_uuid(),
  loan_id uuid not null references public.inventory_loans(id) on delete cascade,
  asset_id uuid references public.inventory_assets(id) on delete set null,
  lot_id uuid references public.inventory_lots(id) on delete set null,
  quantity integer not null default 1 check (quantity > 0),
  checkout_condition text,
  return_condition text,
  returned_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  constraint loan_items_asset_or_lot check (asset_id is not null or lot_id is not null)
);

create table if not exists public.inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  transaction_code text unique,
  transaction_type text not null check (transaction_type in ('alta','entrada','salida','prestamo','devolucion','ajuste','traslado','mantenimiento','baja')),
  related_loan_id uuid references public.inventory_loans(id) on delete set null,
  related_profile_id uuid references public.profiles(id) on delete set null,
  related_team_id uuid references public.teams(id) on delete set null,
  location_from_id uuid references public.inventory_locations(id) on delete set null,
  location_to_id uuid references public.inventory_locations(id) on delete set null,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists public.inventory_transaction_lines (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.inventory_transactions(id) on delete cascade,
  asset_id uuid references public.inventory_assets(id) on delete set null,
  lot_id uuid references public.inventory_lots(id) on delete set null,
  quantity integer not null default 1 check (quantity > 0),
  barcode text,
  serial_number text,
  item_snapshot text,
  constraint transaction_lines_asset_or_lot check (asset_id is not null or lot_id is not null)
);

create table if not exists public.inventory_location_history (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid references public.inventory_assets(id) on delete cascade,
  lot_id uuid references public.inventory_lots(id) on delete cascade,
  previous_location_id uuid references public.inventory_locations(id) on delete set null,
  new_location_id uuid references public.inventory_locations(id) on delete set null,
  changed_by uuid references public.profiles(id) on delete set null,
  changed_at timestamptz default now(),
  notes text,
  constraint location_history_asset_or_lot check (asset_id is not null or lot_id is not null)
);

create table if not exists public.inventory_asset_status_history (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.inventory_assets(id) on delete cascade,
  previous_status_id uuid references public.inventory_status_catalog(id) on delete set null,
  new_status_id uuid references public.inventory_status_catalog(id) on delete set null,
  changed_by uuid references public.profiles(id) on delete set null,
  changed_at timestamptz default now(),
  condition_note text
);

create table if not exists public.inventory_maintenance_events (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.inventory_assets(id) on delete cascade,
  event_type text not null check (event_type in ('revision','reparacion','limpieza','baja_tecnica')),
  opened_at timestamptz default now(),
  closed_at timestamptz,
  detail text,
  resolved_detail text,
  provider_name text,
  estimated_cost numeric(12,2),
  created_by uuid references public.profiles(id) on delete set null
);

create table if not exists public.inventory_barcode_labels (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid references public.inventory_assets(id) on delete cascade,
  lot_id uuid references public.inventory_lots(id) on delete cascade,
  barcode text not null,
  label_format text default 'CODE128',
  printed_at timestamptz,
  printed_by uuid references public.profiles(id) on delete set null,
  copies integer default 1 check (copies > 0),
  constraint barcode_labels_asset_or_lot check (asset_id is not null or lot_id is not null)
);

insert into public.inventory_status_catalog (code, name, frontend_status, is_available, sort_order) values
('nuevo','NUEVO','Disponible', true, 10),
('usado','USADO','Disponible', true, 20),
('completo','COMPLETO','Disponible', true, 30),
('en_prestamo','EN PRESTAMO','Prestado', false, 40),
('en_revision','EN REVISION','En mantenimiento', false, 50),
('en_reparacion','EN REPARACIÓN','En mantenimiento', false, 60),
('danado','DAÑADO','En mantenimiento', false, 70),
('falta_piezas','FALTA PIEZAS','En mantenimiento', false, 80),
('baja','BAJA','En mantenimiento', false, 90)
on conflict (code) do update set name=excluded.name, frontend_status=excluded.frontend_status, is_available=excluded.is_available, sort_order=excluded.sort_order;

insert into public.inventory_categories (name, description) values
('Microcontroladores', 'Arduino, ESP32 y placas similares'),
('Sensores', 'Sensores analógicos y digitales'),
('Kits', 'Kits y estructuras robóticas'),
('Herramientas', 'Herramientas de laboratorio'),
('Insumos', 'Consumibles y repuestos')
on conflict (name) do nothing;

insert into public.inventory_locations (code, name, address) values
('LAB-ROB', 'Laboratorio de Robótica', 'Instituto San Miguel'),
('DEPOSITO', 'Depósito', 'Instituto San Miguel'),
('AULA', 'Aula / uso temporal', 'Instituto San Miguel')
on conflict (code) do nothing;

-- Vistas útiles para el frontend actual
create or replace view public.inventory_frontend_view as
select
  a.id,
  a.asset_code as code,
  case when ci.tracking_mode = 'consumible' then 'Insumo' else 'Equipo' end as type,
  ci.name as item,
  a.serial_number as serial,
  a.barcode,
  coalesce(st.frontend_status, 'Disponible') as status,
  coalesce(a.condition_note, st.name, 'Sin observaciones') as condition,
  coalesce(holder.full_name, team.name, '-') as assigned_to,
  coalesce(teacher.full_name, '-') as teacher,
  to_char(last_loan.requested_at, 'YYYY-MM-DD HH24:MI') as requested_at,
  to_char(last_loan.returned_at, 'YYYY-MM-DD HH24:MI') as returned_at,
  coalesce(loc.name, '-') as location,
  a.quantity,
  a.quantity_available,
  a.is_active,
  a.created_at,
  a.updated_at
from public.inventory_assets a
join public.inventory_catalog_items ci on ci.id = a.catalog_item_id
left join public.inventory_status_catalog st on st.id = a.status_id
left join public.inventory_locations loc on loc.id = a.current_location_id
left join public.profiles holder on holder.id = a.current_holder_profile_id
left join public.teams team on team.id = a.current_holder_team_id
left join lateral (
  select l.* from public.inventory_loan_items li
  join public.inventory_loans l on l.id = li.loan_id
  where li.asset_id = a.id
  order by l.created_at desc limit 1
) last_loan on true
left join public.profiles teacher on teacher.id = last_loan.teacher_profile_id;

-- RPC mínima para alta rápida de activo serializado desde la UI
create or replace function public.admin_create_inventory_asset(
  p_name text,
  p_category text,
  p_asset_code text default null,
  p_serial_number text default null,
  p_barcode text default null,
  p_location_code text default 'LAB-ROB',
  p_condition_note text default null
)
returns public.inventory_assets language plpgsql security definer set search_path = public as $$
declare
  v_category_id uuid;
  v_catalog_id uuid;
  v_location_id uuid;
  v_status_id uuid;
  v_asset public.inventory_assets;
  v_barcode text;
  v_asset_code text;
begin
  if not public.has_permission(auth.uid(), 'inventory.manage') then raise exception 'Sin permiso para gestionar inventario'; end if;
  insert into public.inventory_categories(name) values (p_category) on conflict (name) do update set name=excluded.name returning id into v_category_id;
  insert into public.inventory_catalog_items(name, category_id, tracking_mode) values (p_name, v_category_id, 'serializado') returning id into v_catalog_id;
  select id into v_location_id from public.inventory_locations where code = p_location_code;
  select id into v_status_id from public.inventory_status_catalog where code = 'nuevo';
  v_barcode := coalesce(nullif(p_barcode,''), public.generate_inventory_barcode('ISMROB'));
  v_asset_code := coalesce(nullif(p_asset_code,''), 'ACT-' || replace(v_barcode, 'ISMROB-', ''));
  insert into public.inventory_assets(catalog_item_id, asset_code, barcode, serial_number, generated_barcode, status_id, current_location_id, condition_note)
  values (v_catalog_id, v_asset_code, v_barcode, nullif(p_serial_number,''), p_serial_number is null or p_serial_number = '', v_status_id, v_location_id, p_condition_note)
  returning * into v_asset;
  insert into public.inventory_transactions(transaction_type, notes, created_by) values ('alta', 'Alta rápida de activo '||v_asset_code, auth.uid());
  return v_asset;
end $$;

-- =========================
-- Triggers updated_at
-- =========================
do $$
begin
  perform 1;
end $$;

drop trigger if exists trg_roles_updated_at on public.roles;
create trigger trg_roles_updated_at before update on public.roles for each row execute procedure public.set_updated_at();
drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists trg_teams_updated_at on public.teams;
create trigger trg_teams_updated_at before update on public.teams for each row execute procedure public.set_updated_at();
drop trigger if exists trg_inventory_categories_updated_at on public.inventory_categories;
create trigger trg_inventory_categories_updated_at before update on public.inventory_categories for each row execute procedure public.set_updated_at();
drop trigger if exists trg_inventory_locations_updated_at on public.inventory_locations;
create trigger trg_inventory_locations_updated_at before update on public.inventory_locations for each row execute procedure public.set_updated_at();
drop trigger if exists trg_inventory_catalog_items_updated_at on public.inventory_catalog_items;
create trigger trg_inventory_catalog_items_updated_at before update on public.inventory_catalog_items for each row execute procedure public.set_updated_at();
drop trigger if exists trg_inventory_assets_updated_at on public.inventory_assets;
create trigger trg_inventory_assets_updated_at before update on public.inventory_assets for each row execute procedure public.set_updated_at();
drop trigger if exists trg_inventory_loans_updated_at on public.inventory_loans;
create trigger trg_inventory_loans_updated_at before update on public.inventory_loans for each row execute procedure public.set_updated_at();

-- =========================
-- RLS
-- =========================
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.courses enable row level security;
alter table public.divisions enable row level security;
alter table public.subjects enable row level security;
alter table public.profiles enable row level security;
alter table public.user_audit_log enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.inventory_categories enable row level security;
alter table public.inventory_brands enable row level security;
alter table public.inventory_suppliers enable row level security;
alter table public.inventory_locations enable row level security;
alter table public.inventory_status_catalog enable row level security;
alter table public.inventory_catalog_items enable row level security;
alter table public.inventory_assets enable row level security;
alter table public.inventory_lots enable row level security;
alter table public.inventory_loans enable row level security;
alter table public.inventory_loan_items enable row level security;
alter table public.inventory_transactions enable row level security;
alter table public.inventory_transaction_lines enable row level security;
alter table public.inventory_location_history enable row level security;
alter table public.inventory_asset_status_history enable row level security;
alter table public.inventory_maintenance_events enable row level security;
alter table public.inventory_barcode_labels enable row level security;

-- Recrea políticas para que el script se pueda re-ejecutar sin errores.
do $$
declare pol record;
begin
  for pol in select schemaname, tablename, policyname from pg_policies where schemaname='public' loop
    execute format('drop policy if exists %I on %I.%I', pol.policyname, pol.schemaname, pol.tablename);
  end loop;
end $$;

create policy roles_read on public.roles for select to authenticated using (true);
create policy permissions_read on public.permissions for select to authenticated using (true);
create policy role_permissions_read on public.role_permissions for select to authenticated using (true);
create policy courses_read on public.courses for select to authenticated using (true);
create policy divisions_read on public.divisions for select to authenticated using (true);
create policy subjects_read on public.subjects for select to authenticated using (true);

create policy profiles_read on public.profiles for select to authenticated using (auth.uid() = id or public.has_permission(auth.uid(),'users.read') or public.is_admin(auth.uid()));
create policy profiles_self_update on public.profiles for update to authenticated using (auth.uid() = id or public.is_admin(auth.uid())) with check (auth.uid() = id or public.is_admin(auth.uid()));
create policy profiles_admin_insert on public.profiles for insert to authenticated with check (public.is_admin(auth.uid()));
create policy audit_admin_read on public.user_audit_log for select to authenticated using (public.is_admin(auth.uid()));

create policy teams_read on public.teams for select to authenticated using (true);
create policy team_members_read on public.team_members for select to authenticated using (true);
create policy teams_admin_manage on public.teams for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy team_members_admin_manage on public.team_members for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy inv_categories_read on public.inventory_categories for select to authenticated using (true);
create policy inv_brands_read on public.inventory_brands for select to authenticated using (true);
create policy inv_suppliers_read on public.inventory_suppliers for select to authenticated using (true);
create policy inv_locations_read on public.inventory_locations for select to authenticated using (true);
create policy inv_status_read on public.inventory_status_catalog for select to authenticated using (true);
create policy inv_catalog_read on public.inventory_catalog_items for select to authenticated using (true);
create policy inv_assets_read on public.inventory_assets for select to authenticated using (true);
create policy inv_lots_read on public.inventory_lots for select to authenticated using (true);
create policy inv_loans_read on public.inventory_loans for select to authenticated using (
  public.has_permission(auth.uid(),'inventory.approve') or requester_profile_id = auth.uid() or teacher_profile_id = auth.uid() or created_by = auth.uid()
);
create policy inv_loan_items_read on public.inventory_loan_items for select to authenticated using (
  exists (select 1 from public.inventory_loans l where l.id = loan_id and (public.has_permission(auth.uid(),'inventory.approve') or l.requester_profile_id = auth.uid() or l.teacher_profile_id = auth.uid() or l.created_by = auth.uid()))
);
create policy inv_history_read on public.inventory_transactions for select to authenticated using (public.has_permission(auth.uid(),'inventory.read'));
create policy inv_transaction_lines_read on public.inventory_transaction_lines for select to authenticated using (public.has_permission(auth.uid(),'inventory.read'));
create policy inv_location_history_read on public.inventory_location_history for select to authenticated using (public.has_permission(auth.uid(),'inventory.read'));
create policy inv_status_history_read on public.inventory_asset_status_history for select to authenticated using (public.has_permission(auth.uid(),'inventory.read'));
create policy inv_maintenance_read on public.inventory_maintenance_events for select to authenticated using (public.has_permission(auth.uid(),'inventory.read'));
create policy inv_labels_read on public.inventory_barcode_labels for select to authenticated using (public.has_permission(auth.uid(),'inventory.read'));

create policy inv_manage_categories on public.inventory_categories for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_brands on public.inventory_brands for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_suppliers on public.inventory_suppliers for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_locations on public.inventory_locations for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_catalog on public.inventory_catalog_items for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_assets on public.inventory_assets for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_lots on public.inventory_lots for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_loans on public.inventory_loans for all to authenticated using (public.has_permission(auth.uid(),'inventory.approve') or created_by = auth.uid() or requester_profile_id = auth.uid()) with check (public.has_permission(auth.uid(),'inventory.approve') or created_by = auth.uid() or requester_profile_id = auth.uid());
create policy inv_manage_loan_items on public.inventory_loan_items for all to authenticated using (exists (select 1 from public.inventory_loans l where l.id=loan_id and (public.has_permission(auth.uid(),'inventory.approve') or l.created_by=auth.uid() or l.requester_profile_id=auth.uid()))) with check (exists (select 1 from public.inventory_loans l where l.id=loan_id and (public.has_permission(auth.uid(),'inventory.approve') or l.created_by=auth.uid() or l.requester_profile_id=auth.uid())));
create policy inv_manage_transactions on public.inventory_transactions for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_transaction_lines on public.inventory_transaction_lines for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_location_history on public.inventory_location_history for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_status_history on public.inventory_asset_status_history for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_maintenance on public.inventory_maintenance_events for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));
create policy inv_manage_labels on public.inventory_barcode_labels for all to authenticated using (public.has_permission(auth.uid(),'inventory.manage')) with check (public.has_permission(auth.uid(),'inventory.manage'));

-- Permisos de vistas y funciones
revoke all on function public.admin_update_profile(uuid,text,text,text,text,date,text,boolean) from public;
grant execute on function public.admin_update_profile(uuid,text,text,text,text,date,text,boolean) to authenticated;
revoke all on function public.admin_create_inventory_asset(text,text,text,text,text,text,text) from public;
grant execute on function public.admin_create_inventory_asset(text,text,text,text,text,text,text) to authenticated;
grant select on public.users_abm_view to authenticated;
grant select on public.inventory_frontend_view to authenticated;

-- Índices
create index if not exists idx_profiles_role on public.profiles(role_id);
create index if not exists idx_profiles_active on public.profiles(is_active);
create index if not exists idx_assets_catalog on public.inventory_assets(catalog_item_id);
create index if not exists idx_assets_barcode on public.inventory_assets(barcode);
create index if not exists idx_assets_status on public.inventory_assets(status_id);
create index if not exists idx_assets_location on public.inventory_assets(current_location_id);
create index if not exists idx_loans_status on public.inventory_loans(status);
create index if not exists idx_loans_due on public.inventory_loans(due_at);
create index if not exists idx_loan_items_asset on public.inventory_loan_items(asset_id);
create index if not exists idx_transactions_created_at on public.inventory_transactions(created_at desc);

commit;

-- IMPORTANTE PARA EL PRIMER ADMIN:
-- 1) Crear/registrar el usuario desde Supabase Auth o desde la app.
-- 2) Ejecutar una sola vez reemplazando el email:
-- update public.profiles p
-- set role_id = (select id from public.roles where code='administrator'), is_active = true
-- from auth.users u
-- where p.id = u.id and u.email = 'TU_EMAIL_ADMIN@DOMINIO.COM';
