-- ISM ROBOSOFT v8.3 - Reparación completa de Inventario, CSV, barcodes, condiciones y vistas
-- Ejecutar completo en Supabase SQL Editor.

begin;

create extension if not exists pgcrypto;
create sequence if not exists public.inventory_asset_code_seq start 1;

-- Columnas faltantes / compatibilidad
alter table if exists public.inventory_assets add column if not exists location_detail text;
alter table if exists public.inventory_assets add column if not exists zone text;
alter table if exists public.inventory_catalog_items add column if not exists default_location_detail text;
alter table if exists public.inventory_catalog_items add column if not exists default_zone text;
alter table if exists public.team_members add column if not exists role_in_team text default 'student';
alter table if exists public.teams add column if not exists backup_teacher_id uuid;

do $$ begin
  if to_regclass('public.inventory_conditions') is null then
    create table public.inventory_conditions (
      id uuid primary key default gen_random_uuid(),
      name text not null unique,
      color text not null default '#64748b',
      sort_order int not null default 100,
      is_active boolean not null default true,
      created_at timestamptz default now(),
      updated_at timestamptz default now()
    );
  end if;
end $$;

insert into public.inventory_conditions(name,color,sort_order) values
('Nuevo','#3b82f6',1),('Usado','#6366f1',2),('Reparado','#22c55e',3),('Falta piezas','#f59e0b',4),('Defectuoso','#ef4444',5),('Usado, completo','#8b5cf6',6),('Usado, completo, faltantes','#f97316',7),('Sin observaciones','#64748b',99)
on conflict (name) do update set color=excluded.color, sort_order=excluded.sort_order, is_active=true, updated_at=now();

drop function if exists public.ensure_inventory_lookup(text,text);
create or replace function public.ensure_inventory_lookup(p_table text, p_name text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_clean text;
begin
  v_clean := nullif(trim(coalesce(p_name,'')), '');
  if v_clean is null then return null; end if;
  if p_table not in ('inventory_categories','inventory_brands','inventory_suppliers') then raise exception 'Invalid lookup table'; end if;
  execute format('select id from public.%I where lower(name)=lower($1) limit 1', p_table) into v_id using v_clean;
  if v_id is null then
    execute format('insert into public.%I(name) values ($1) on conflict (name) do update set name=excluded.name returning id', p_table) into v_id using v_clean;
  end if;
  return v_id;
end $$;

-- Limpieza de overloads anteriores incompatibles
drop function if exists public.admin_create_inventory_asset(text,text,text,text,text,text,text,text,text,text,text);
drop function if exists public.admin_create_inventory_asset(text,text,text,text,text,text,text);
drop function if exists public.admin_update_inventory_asset(uuid,text,text,text,text,text,text,text,text,text,text,text);

-- Firma EXACTA que usa el frontend: p_name, p_category, p_asset_code, p_serial_number, p_barcode, p_location_code, p_condition_note, p_brand, p_supplier, p_location_detail, p_zone
create or replace function public.admin_create_inventory_asset(
  p_name text,
  p_category text,
  p_asset_code text,
  p_serial_number text,
  p_barcode text,
  p_location_code text,
  p_condition_note text,
  p_brand text,
  p_supplier text,
  p_location_detail text,
  p_zone text
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_category uuid; v_brand uuid; v_supplier uuid; v_location uuid; v_status uuid; v_catalog uuid; v_asset uuid;
  v_code text; v_barcode text; v_name text; v_location_name text; v_condition text;
begin
  v_name := nullif(trim(coalesce(p_name,'')), '');
  if v_name is null then raise exception 'El nombre del insumo es obligatorio'; end if;

  v_code := nullif(trim(coalesce(p_asset_code,'')), '');
  v_barcode := nullif(trim(coalesce(p_barcode,'')), '');
  if v_code is null then v_code := 'ACT-' || lpad(nextval('public.inventory_asset_code_seq')::text, 6, '0'); end if;
  if v_barcode is null then v_barcode := 'ISMROB-' || regexp_replace(v_code, '[^A-Za-z0-9]', '', 'g'); end if;
  v_condition := coalesce(nullif(trim(p_condition_note),''),'Sin observaciones');

  v_category := public.ensure_inventory_lookup('inventory_categories', coalesce(nullif(p_category,''),'General'));
  v_brand := public.ensure_inventory_lookup('inventory_brands', coalesce(nullif(p_brand,''),'Sin marca'));
  v_supplier := public.ensure_inventory_lookup('inventory_suppliers', coalesce(nullif(p_supplier,''),'Sin empresa'));

  v_location_name := coalesce(nullif(p_location_detail,''),'Laboratorio de Robótica');
  select id into v_location from public.inventory_locations where code = coalesce(nullif(p_location_code,''),'LAB-ROB') limit 1;
  if v_location is null then
    insert into public.inventory_locations(code,name) values (coalesce(nullif(p_location_code,''),'LAB-ROB'), v_location_name)
    on conflict (code) do update set name=excluded.name returning id into v_location;
  end if;

  select id into v_status from public.inventory_status_catalog where code='disponible' or frontend_status='Disponible' order by sort_order limit 1;
  if v_status is null then
    insert into public.inventory_status_catalog(code,name,frontend_status,is_available,sort_order) values ('disponible','Disponible','Disponible',true,1)
    on conflict (code) do update set name=excluded.name returning id into v_status;
  end if;

  insert into public.inventory_conditions(name) values (v_condition) on conflict (name) do nothing;

  select id into v_catalog from public.inventory_catalog_items where lower(name)=lower(v_name) and coalesce(brand_id,'00000000-0000-0000-0000-000000000000'::uuid)=coalesce(v_brand,'00000000-0000-0000-0000-000000000000'::uuid) limit 1;
  if v_catalog is null then
    insert into public.inventory_catalog_items(name, category_id, brand_id, supplier_id, tracking_mode, item_code, barcode_prefix, is_active, default_location_detail, default_zone)
    values (v_name, v_category, v_brand, v_supplier, 'serializado', v_code, 'ISMROB', true, nullif(p_location_detail,''), nullif(p_zone,''))
    returning id into v_catalog;
  else
    update public.inventory_catalog_items set category_id=coalesce(v_category,category_id), brand_id=coalesce(v_brand,brand_id), supplier_id=coalesce(v_supplier,supplier_id), default_location_detail=coalesce(nullif(p_location_detail,''),default_location_detail), default_zone=coalesce(nullif(p_zone,''),default_zone), updated_at=now() where id=v_catalog;
  end if;

  -- Upsert tolerante: si el CSV repite código o barcode, actualiza el registro existente en lugar de fallar.
  select id into v_asset from public.inventory_assets where asset_code=v_code or barcode=v_barcode limit 1;
  if v_asset is null then
    insert into public.inventory_assets(catalog_item_id, asset_code, barcode, serial_number, generated_barcode, status_id, condition_note, current_location_id, location_detail, zone, notes, is_active, quantity, quantity_available)
    values (v_catalog, v_code, v_barcode, nullif(p_serial_number,''), true, v_status, v_condition, v_location, nullif(p_location_detail,''), nullif(p_zone,''), concat_ws(' | ', nullif(p_location_detail,''), nullif(p_zone,'')), true, 1, 1)
    returning id into v_asset;
  else
    update public.inventory_assets set catalog_item_id=v_catalog, barcode=v_barcode, serial_number=nullif(p_serial_number,''), status_id=coalesce(status_id,v_status), condition_note=v_condition, current_location_id=coalesce(v_location,current_location_id), location_detail=nullif(p_location_detail,''), zone=nullif(p_zone,''), notes=concat_ws(' | ', nullif(p_location_detail,''), nullif(p_zone,'')), is_active=true, updated_at=now() where id=v_asset;
  end if;
  return v_asset;
end $$;

-- Firma corta legacy
create or replace function public.admin_create_inventory_asset(
  p_name text,
  p_category text,
  p_asset_code text,
  p_serial_number text,
  p_barcode text,
  p_location_code text,
  p_condition_note text
) returns uuid language sql security definer set search_path=public as $$
  select public.admin_create_inventory_asset(p_name,p_category,p_asset_code,p_serial_number,p_barcode,p_location_code,p_condition_note,null,null,null,null);
$$;

create or replace function public.admin_update_inventory_asset(
  p_asset_id uuid,
  p_name text,
  p_category text,
  p_asset_code text,
  p_serial_number text,
  p_barcode text,
  p_location_code text,
  p_condition_note text,
  p_brand text,
  p_supplier text,
  p_location_detail text,
  p_zone text
) returns uuid language plpgsql security definer set search_path=public as $$
declare v_id uuid;
begin
  update public.inventory_assets set asset_code=coalesce(nullif(p_asset_code,''), asset_code), barcode=coalesce(nullif(p_barcode,''), barcode), serial_number=nullif(p_serial_number,''), condition_note=coalesce(nullif(p_condition_note,''),condition_note), location_detail=nullif(p_location_detail,''), zone=nullif(p_zone,''), updated_at=now() where id=p_asset_id returning id into v_id;
  perform public.admin_create_inventory_asset(p_name,p_category,p_asset_code,p_serial_number,p_barcode,p_location_code,p_condition_note,p_brand,p_supplier,p_location_detail,p_zone);
  return coalesce(v_id,p_asset_id);
end $$;

-- Vistas: borrar dependientes con CASCADE para evitar ERROR 2BP01
DROP VIEW IF EXISTS public.inventory_assets_frontend_view CASCADE;
DROP VIEW IF EXISTS public.inventory_frontend_view CASCADE;

create view public.inventory_frontend_view as
select
  a.id,
  a.asset_code as code,
  ci.name as item,
  coalesce(ci.tracking_mode,'serializado') as type,
  a.serial_number as serial,
  a.barcode,
  coalesce(st.frontend_status, st.name, 'Disponible') as status,
  coalesce(a.condition_note,'Sin observaciones') as condition,
  '-'::text as assigned_to,
  '-'::text as requested_at,
  '-'::text as returned_at,
  '-'::text as teacher,
  coalesce(loc.name,'Laboratorio de Robótica') as location,
  cat.name as category,
  br.name as brand,
  sup.name as supplier,
  coalesce(a.location_detail, ci.default_location_detail, split_part(coalesce(a.notes,''),' | ',1)) as location_detail,
  coalesce(a.zone, ci.default_zone, split_part(coalesce(a.notes,''),' | ',2)) as zone,
  a.is_active,
  a.created_at,
  a.updated_at
from public.inventory_assets a
join public.inventory_catalog_items ci on ci.id=a.catalog_item_id
left join public.inventory_categories cat on cat.id=ci.category_id
left join public.inventory_brands br on br.id=ci.brand_id
left join public.inventory_suppliers sup on sup.id=ci.supplier_id
left join public.inventory_status_catalog st on st.id=a.status_id
left join public.inventory_locations loc on loc.id=a.current_location_id;

create view public.inventory_assets_frontend_view as select * from public.inventory_frontend_view;

grant select on public.inventory_frontend_view to authenticated;
grant select on public.inventory_assets_frontend_view to authenticated;
grant select, insert, update, delete on public.inventory_conditions to authenticated;
grant execute on function public.ensure_inventory_lookup(text,text) to authenticated;
grant execute on function public.admin_create_inventory_asset(text,text,text,text,text,text,text,text,text,text,text) to authenticated;
grant execute on function public.admin_create_inventory_asset(text,text,text,text,text,text,text) to authenticated;
grant execute on function public.admin_update_inventory_asset(uuid,text,text,text,text,text,text,text,text,text,text,text) to authenticated;

commit;
