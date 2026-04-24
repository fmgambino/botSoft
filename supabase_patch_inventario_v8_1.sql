-- =========================================================
-- ISM ROBOSOFT - PATCH INVENTARIO v8.1
-- Ejecutar completo en Supabase SQL Editor.
-- Repara importación CSV, alta completa, vista frontend y barcodes.
-- =========================================================

begin;

create extension if not exists pgcrypto;

-- Columnas necesarias para alta completa de inventario
alter table if exists public.inventory_catalog_items
  add column if not exists default_location_detail text,
  add column if not exists default_zone text;

alter table if exists public.inventory_assets
  add column if not exists location_detail text,
  add column if not exists zone text;

-- Catálogos mínimos
insert into public.inventory_locations(code, name, is_active)
values ('LAB-ROB', 'Laboratorio de Robótica', true)
on conflict (code) do update set name = excluded.name, is_active = true;

insert into public.inventory_status_catalog(code, name, frontend_status, is_available, sort_order)
values
  ('nuevo', 'Nuevo / disponible', 'Disponible', true, 10),
  ('prestado', 'Prestado', 'Prestado', false, 20),
  ('mantenimiento', 'En mantenimiento', 'En mantenimiento', false, 30),
  ('baja', 'Baja', 'Baja', false, 99)
on conflict (code) do update set
  name = excluded.name,
  frontend_status = excluded.frontend_status,
  is_available = excluded.is_available,
  sort_order = excluded.sort_order;

-- Evita errores por cambio de columnas en vistas anteriores
drop view if exists public.inventory_frontend_view cascade;

create or replace view public.inventory_frontend_view as
select
  a.id,
  a.asset_code as code,
  a.asset_code,
  ci.name as item,
  ci.name,
  case when ci.tracking_mode = 'consumible' then 'Insumo' else 'Equipo' end as type,
  coalesce(c.name, 'General') as category,
  coalesce(b.name, 'Sin marca') as brand,
  coalesce(s.name, 'Sin empresa') as supplier,
  coalesce(a.serial_number, '') as serial,
  a.serial_number,
  a.barcode,
  coalesce(st.frontend_status, 'Disponible') as status,
  coalesce(a.condition_note, '') as condition,
  a.condition_note,
  coalesce(l.name, 'Laboratorio de Robótica') as location,
  coalesce(a.location_detail, ci.default_location_detail, '') as location_detail,
  coalesce(a.zone, ci.default_zone, '') as zone,
  a.quantity,
  a.quantity_available,
  a.is_active,
  a.created_at,
  a.updated_at
from public.inventory_assets a
join public.inventory_catalog_items ci on ci.id = a.catalog_item_id
left join public.inventory_categories c on c.id = ci.category_id
left join public.inventory_brands b on b.id = ci.brand_id
left join public.inventory_suppliers s on s.id = ci.supplier_id
left join public.inventory_status_catalog st on st.id = a.status_id
left join public.inventory_locations l on l.id = a.current_location_id;

grant select on public.inventory_frontend_view to authenticated;

-- Reemplazo seguro de funciones con firmas anteriores
revoke all on function public.admin_create_inventory_asset(text,text,text,text,text,text,text) from public;
drop function if exists public.admin_create_inventory_asset(text,text,text,text,text,text,text);
revoke all on function public.admin_create_inventory_asset(text,text,text,text,text,text,text,text,text,text,text) from public;
drop function if exists public.admin_create_inventory_asset(text,text,text,text,text,text,text,text,text,text,text);

create or replace function public.admin_create_inventory_asset(
  p_name text,
  p_category text default 'General',
  p_asset_code text default null,
  p_serial_number text default null,
  p_barcode text default null,
  p_location_code text default 'LAB-ROB',
  p_condition_note text default null,
  p_brand text default null,
  p_supplier text default null,
  p_location_detail text default null,
  p_zone text default null
)
returns public.inventory_assets
language plpgsql
security definer
set search_path = public
as $$
declare
  v_category_id uuid;
  v_brand_id uuid;
  v_supplier_id uuid;
  v_catalog_id uuid;
  v_location_id uuid;
  v_status_id uuid;
  v_asset public.inventory_assets;
  v_barcode text;
  v_asset_code text;
  v_suffix int := 1;
begin
  if p_name is null or btrim(p_name) = '' then
    raise exception 'El nombre/descripción del insumo es obligatorio';
  end if;

  insert into public.inventory_categories(name)
  values (coalesce(nullif(btrim(p_category), ''), 'General'))
  on conflict (name) do update set name = excluded.name
  returning id into v_category_id;

  if nullif(btrim(coalesce(p_brand, '')), '') is not null then
    insert into public.inventory_brands(name)
    values (btrim(p_brand))
    on conflict (name) do update set name = excluded.name
    returning id into v_brand_id;
  end if;

  if nullif(btrim(coalesce(p_supplier, '')), '') is not null then
    insert into public.inventory_suppliers(name)
    values (btrim(p_supplier))
    on conflict (name) do update set name = excluded.name
    returning id into v_supplier_id;
  end if;

  insert into public.inventory_catalog_items(
    name, category_id, brand_id, supplier_id, tracking_mode,
    default_location_detail, default_zone, is_active
  )
  values (
    btrim(p_name),
    v_category_id,
    v_brand_id,
    v_supplier_id,
    case when lower(coalesce(p_category, '')) like '%insumo%' then 'consumible' else 'serializado' end,
    nullif(btrim(coalesce(p_location_detail, '')), ''),
    nullif(btrim(coalesce(p_zone, '')), ''),
    true
  )
  returning id into v_catalog_id;

  select id into v_location_id
  from public.inventory_locations
  where code = coalesce(nullif(btrim(coalesce(p_location_code, '')), ''), 'LAB-ROB')
  limit 1;

  if v_location_id is null then
    insert into public.inventory_locations(code, name, is_active)
    values (coalesce(nullif(btrim(coalesce(p_location_code, '')), ''), 'LAB-ROB'), coalesce(nullif(btrim(coalesce(p_location_detail, '')), ''), 'Laboratorio de Robótica'), true)
    on conflict (code) do update set name = excluded.name, is_active = true
    returning id into v_location_id;
  end if;

  select id into v_status_id from public.inventory_status_catalog where code = 'nuevo' limit 1;

  v_barcode := coalesce(nullif(btrim(coalesce(p_barcode, '')), ''), public.generate_inventory_barcode('ISMROB'));
  v_asset_code := coalesce(nullif(btrim(coalesce(p_asset_code, '')), ''), 'ACT-' || replace(v_barcode, 'ISMROB-', ''));

  -- Si el CSV trae códigos de barra repetidos, se conservan legibles pero únicos.
  while exists (select 1 from public.inventory_assets where barcode = v_barcode and asset_code <> v_asset_code) loop
    v_barcode := coalesce(nullif(btrim(coalesce(p_barcode, '')), ''), 'ISMROB') || '-' || v_asset_code || case when v_suffix > 1 then '-' || v_suffix::text else '' end;
    v_suffix := v_suffix + 1;
  end loop;

  insert into public.inventory_assets(
    catalog_item_id, asset_code, barcode, serial_number, generated_barcode,
    status_id, current_location_id, condition_note, location_detail, zone,
    quantity, quantity_available, is_active
  )
  values (
    v_catalog_id,
    v_asset_code,
    v_barcode,
    nullif(btrim(coalesce(p_serial_number, '')), ''),
    nullif(btrim(coalesce(p_barcode, '')), '') is null,
    v_status_id,
    v_location_id,
    nullif(btrim(coalesce(p_condition_note, '')), ''),
    nullif(btrim(coalesce(p_location_detail, '')), ''),
    nullif(btrim(coalesce(p_zone, '')), ''),
    1,
    1,
    true
  )
  on conflict (asset_code) do update set
    catalog_item_id = excluded.catalog_item_id,
    barcode = excluded.barcode,
    serial_number = excluded.serial_number,
    generated_barcode = excluded.generated_barcode,
    status_id = excluded.status_id,
    current_location_id = excluded.current_location_id,
    condition_note = excluded.condition_note,
    location_detail = excluded.location_detail,
    zone = excluded.zone,
    is_active = true,
    updated_at = now()
  returning * into v_asset;

  insert into public.inventory_transactions(transaction_type, notes, created_by)
  values ('alta', 'Alta/importación de activo ' || v_asset_code, auth.uid())
  on conflict do nothing;

  return v_asset;
end;
$$;

grant execute on function public.admin_create_inventory_asset(text,text,text,text,text,text,text,text,text,text,text) to authenticated;

-- Repara función de update para campos nuevos
revoke all on function public.admin_update_inventory_asset(uuid,text,text,text,text,text,text,text,text,text,text,text) from public;
drop function if exists public.admin_update_inventory_asset(uuid,text,text,text,text,text,text,text,text,text,text,text);

create or replace function public.admin_update_inventory_asset(
  p_asset_id uuid,
  p_name text,
  p_category text default 'General',
  p_serial_number text default null,
  p_barcode text default null,
  p_status text default 'Disponible',
  p_condition_note text default null,
  p_location_code text default null,
  p_brand text default null,
  p_supplier text default null,
  p_location_detail text default null,
  p_zone text default null
)
returns public.inventory_assets
language plpgsql
security definer
set search_path = public
as $$
declare
  v_asset public.inventory_assets;
  v_status_id uuid;
  v_location_id uuid;
  v_category_id uuid;
  v_brand_id uuid;
  v_supplier_id uuid;
begin
  select id into v_status_id from public.inventory_status_catalog where frontend_status = p_status order by sort_order limit 1;
  if v_status_id is null then select id into v_status_id from public.inventory_status_catalog where code = 'nuevo' limit 1; end if;

  if nullif(btrim(coalesce(p_location_code, '')), '') is not null then
    select id into v_location_id from public.inventory_locations where code = p_location_code limit 1;
  end if;

  if nullif(btrim(coalesce(p_category, '')), '') is not null then
    insert into public.inventory_categories(name) values (btrim(p_category))
      on conflict (name) do update set name=excluded.name returning id into v_category_id;
  end if;
  if nullif(btrim(coalesce(p_brand, '')), '') is not null then
    insert into public.inventory_brands(name) values (btrim(p_brand))
      on conflict (name) do update set name=excluded.name returning id into v_brand_id;
  end if;
  if nullif(btrim(coalesce(p_supplier, '')), '') is not null then
    insert into public.inventory_suppliers(name) values (btrim(p_supplier))
      on conflict (name) do update set name=excluded.name returning id into v_supplier_id;
  end if;

  update public.inventory_assets a
  set serial_number = nullif(btrim(coalesce(p_serial_number, '')), ''),
      barcode = coalesce(nullif(btrim(coalesce(p_barcode, '')), ''), barcode),
      status_id = coalesce(v_status_id, status_id),
      current_location_id = coalesce(v_location_id, current_location_id),
      condition_note = nullif(btrim(coalesce(p_condition_note, '')), ''),
      location_detail = nullif(btrim(coalesce(p_location_detail, '')), ''),
      zone = nullif(btrim(coalesce(p_zone, '')), ''),
      updated_at = now()
  where a.id = p_asset_id
  returning * into v_asset;

  if v_asset.id is null then
    raise exception 'No existe el activo a actualizar';
  end if;

  update public.inventory_catalog_items ci
  set name = coalesce(nullif(btrim(coalesce(p_name, '')), ''), ci.name),
      category_id = coalesce(v_category_id, ci.category_id),
      brand_id = coalesce(v_brand_id, ci.brand_id),
      supplier_id = coalesce(v_supplier_id, ci.supplier_id),
      default_location_detail = coalesce(nullif(btrim(coalesce(p_location_detail, '')), ''), ci.default_location_detail),
      default_zone = coalesce(nullif(btrim(coalesce(p_zone, '')), ''), ci.default_zone),
      updated_at = now()
  where ci.id = v_asset.catalog_item_id;

  return v_asset;
end;
$$;

grant execute on function public.admin_update_inventory_asset(uuid,text,text,text,text,text,text,text,text,text,text,text) to authenticated;

-- Refresca cache PostgREST
notify pgrst, 'reload schema';

commit;
