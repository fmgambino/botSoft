-- ISM ROBOSOFT 2026
-- Módulo avanzado de inventario para Supabase
-- Ejecutar luego de sql/supabase_schema.sql

create extension if not exists pgcrypto;

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
  created_at timestamptz default now()
);

create table if not exists public.inventory_status_catalog (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
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
  quantity integer not null default 1,
  quantity_available integer not null default 1,
  tags text[],
  notes text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint inventory_assets_serial_or_generated check (serial_number is not null or generated_barcode = true)
);

create table if not exists public.inventory_lots (
  id uuid primary key default gen_random_uuid(),
  catalog_item_id uuid not null references public.inventory_catalog_items(id) on delete cascade,
  lot_code text unique,
  supplier_id uuid references public.inventory_suppliers(id) on delete set null,
  received_at date,
  expiration_date date,
  quantity_received integer not null default 0,
  quantity_available integer not null default 0,
  location_id uuid references public.inventory_locations(id) on delete set null,
  notes text,
  created_at timestamptz default now()
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
  status text not null default 'abierto' check (status in ('borrador','abierto','parcial','cerrado','vencido','cancelado')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inventory_loan_items (
  id uuid primary key default gen_random_uuid(),
  loan_id uuid not null references public.inventory_loans(id) on delete cascade,
  asset_id uuid references public.inventory_assets(id) on delete set null,
  lot_id uuid references public.inventory_lots(id) on delete set null,
  quantity integer not null default 1,
  checkout_condition text,
  return_condition text,
  returned_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  constraint inventory_loan_items_asset_or_lot check (asset_id is not null or lot_id is not null)
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
  quantity integer not null default 1,
  barcode text,
  serial_number text,
  item_snapshot text,
  constraint inventory_transaction_lines_asset_or_lot check (asset_id is not null or lot_id is not null)
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
  constraint inventory_location_history_asset_or_lot check (asset_id is not null or lot_id is not null)
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
  copies integer default 1,
  constraint inventory_barcode_labels_asset_or_lot check (asset_id is not null or lot_id is not null)
);

insert into public.inventory_status_catalog (code, name, is_available, sort_order)
values
  ('nuevo','NUEVO', true, 10),
  ('usado','USADO', true, 20),
  ('en_revision','EN REVISION', false, 30),
  ('en_reparacion','EN REPARACIÓN', false, 40),
  ('danado','DAÑADO', false, 50),
  ('falta_piezas','FALTA PIEZAS', false, 60),
  ('completo','COMPLETO', true, 70),
  ('en_prestamo','EN PRESTAMO', false, 80)
on conflict (code) do nothing;
