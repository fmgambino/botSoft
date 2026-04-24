-- ISM ROBOSOFT v6.9 - Base de datos corregida Supabase
-- Correcciones: error de VIEW inventory_frontend_view, RPC usuarios, eliminación real sin requester_id.
-- Ejecutar completo en Supabase > SQL Editor.

begin;

create extension if not exists pgcrypto;

-- =========================================================
-- 1) Limpieza segura de vistas que cambiaron columnas
--    Evita: cannot change name of view column "serial" to "category"
-- =========================================================
drop view if exists public.inventory_frontend_view cascade;
drop view if exists public.users_abm_view cascade;
drop view if exists public.teams_frontend_view cascade;
drop view if exists public.loans_frontend_view cascade;

-- =========================================================
-- 2) Columnas nuevas/compatibilidad inventario
-- =========================================================
alter table if exists public.inventory_assets
  add column if not exists location_detail text,
  add column if not exists zone text;

alter table if exists public.inventory_catalog_items
  add column if not exists default_location_detail text,
  add column if not exists default_zone text;

-- =========================================================
-- 3) Vista Usuarios ABM
-- =========================================================
create or replace view public.users_abm_view as
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
  p.is_active,
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

-- =========================================================
-- 4) Vista Inventario corregida final
-- =========================================================
create or replace view public.inventory_frontend_view as
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
  coalesce(teacher.full_name, '-') as teacher,
  to_char(last_loan.requested_at, 'YYYY-MM-DD HH24:MI') as requested_at,
  to_char(last_loan.returned_at, 'YYYY-MM-DD HH24:MI') as returned_at,
  coalesce(loc.name, '-') as location,
  coalesce(a.location_detail, ci.default_location_detail, '') as location_detail,
  coalesce(a.zone, ci.default_zone, '') as zone,
  a.quantity,
  a.quantity_available,
  a.is_active,
  a.created_at,
  a.updated_at
from public.inventory_assets a
join public.inventory_catalog_items ci on ci.id = a.catalog_item_id
left join public.inventory_categories cat on cat.id = ci.category_id
left join public.inventory_brands br on br.id = ci.brand_id
left join public.inventory_suppliers sup on sup.id = ci.supplier_id
left join public.inventory_status_catalog st on st.id = a.status_id
left join public.inventory_locations loc on loc.id = a.current_location_id
left join public.profiles holder on holder.id = a.current_holder_profile_id
left join public.teams team on team.id = a.current_holder_team_id
left join lateral (
  select l.*
  from public.inventory_loan_items li
  join public.inventory_loans l on l.id = li.loan_id
  where li.asset_id = a.id
  order by l.created_at desc
  limit 1
) last_loan on true
left join public.profiles teacher on teacher.id = last_loan.teacher_profile_id;

grant select on public.inventory_frontend_view to authenticated;

-- =========================================================
-- 5) Vistas Equipos y Préstamos, si existen las tablas
-- =========================================================
do $$
begin
  if to_regclass('public.teams') is not null then
    execute $v$
      create or replace view public.teams_frontend_view as
      select
        t.id,
        t.name,
        t.description,
        t.status,
        t.teacher_id,
        teacher.full_name as teacher_name,
        t.created_at,
        t.updated_at,
        coalesce(count(tm.profile_id) filter (where tm.role_in_team = 'student'), 0) as students_count
      from public.teams t
      left join public.profiles teacher on teacher.id = t.teacher_id
      left join public.team_members tm on tm.team_id = t.id
      group by t.id, teacher.full_name
    $v$;
    grant select on public.teams_frontend_view to authenticated;
  end if;

  if to_regclass('public.inventory_loans') is not null then
    execute $v$
      create or replace view public.loans_frontend_view as
      select
        l.id,
        requester.full_name as requester_name,
        teacher.full_name as teacher_name,
        t.name as team_name,
        l.status,
        l.requested_at,
        l.approved_at,
        l.returned_at,
        l.notes,
        l.created_at
      from public.inventory_loans l
      left join public.profiles requester on requester.id = l.requester_profile_id
      left join public.profiles teacher on teacher.id = l.teacher_profile_id
      left join public.teams t on t.id = l.team_id
    $v$;
    grant select on public.loans_frontend_view to authenticated;
  end if;
end $$;

-- =========================================================
-- 6) Reparación definitiva RPC Usuarios
--    Evita errores de cambio de nombres de parámetros y bigint/uuid.
-- =========================================================
drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,boolean,text);
drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,bigint,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,uuid,text,text,boolean);
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,text);
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,text,date,text,text,boolean);
drop function if exists public.admin_delete_profile(uuid);

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
  v_role_id public.roles.id%TYPE;
  v_profile_id uuid;
  v_profile public.profiles;
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Solo administradores pueden crear o editar usuarios';
  end if;

  select id into v_role_id
  from public.roles
  where code = coalesce(nullif(p_role_code,''),'student')
  limit 1;

  if v_role_id is null then
    raise exception 'Rol inexistente: %', p_role_code;
  end if;

  select id into v_profile_id
  from auth.users
  where lower(email) = lower(p_email)
  limit 1;

  -- Para usuarios creados desde el frontend con anon key, se crea perfil operativo.
  -- Si luego se crea el Auth user con el mismo email, el trigger conserva/actualiza el perfil.
  if v_profile_id is null then
    v_profile_id := gen_random_uuid();
  end if;

  insert into public.profiles (
    id, role_id, full_name, dni, whatsapp, birth_date, title, avatar_url, is_active, updated_at
  ) values (
    v_profile_id,
    v_role_id,
    coalesce(nullif(p_full_name,''), split_part(p_email,'@',1)),
    nullif(p_dni,''),
    nullif(p_whatsapp,''),
    p_birth_date,
    case when coalesce(p_role_code,'student')='student' then null else nullif(p_title,'') end,
    coalesce(nullif(p_avatar_url,''),'./assets/avatar-default.svg'),
    coalesce(p_is_active,true),
    now()
  )
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
  v_role_id public.roles.id%TYPE;
  v_profile public.profiles;
  v_role_code text;
begin
  if not public.is_admin(auth.uid()) and auth.uid() <> p_profile_id then
    raise exception 'Solo administradores pueden editar usuarios';
  end if;

  v_role_code := nullif(p_role_code,'');

  if v_role_code is not null then
    select id into v_role_id from public.roles where code = v_role_code limit 1;
    if v_role_id is null then
      raise exception 'Rol inválido: %', v_role_code;
    end if;
  end if;

  update public.profiles set
    full_name = coalesce(nullif(p_full_name,''), full_name),
    role_id = coalesce(v_role_id, role_id),
    dni = nullif(p_dni,''),
    whatsapp = nullif(p_whatsapp,''),
    birth_date = p_birth_date,
    title = case
      when coalesce(v_role_code, (select r.code from public.roles r where r.id = profiles.role_id)) = 'student' then null
      else nullif(p_title,'')
    end,
    avatar_url = coalesce(nullif(p_avatar_url,''), avatar_url),
    is_active = coalesce(p_is_active, is_active),
    updated_at = now()
  where id = p_profile_id
  returning * into v_profile;

  if v_profile.id is null then
    raise exception 'Usuario no encontrado';
  end if;

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
  end if;

  if to_regclass('public.user_audit_log') is not null then
    update public.user_audit_log set profile_id = null where profile_id = p_profile_id;
    update public.user_audit_log set changed_by = null where changed_by = p_profile_id;
  end if;

  delete from public.profiles where id = p_profile_id;
  delete from auth.users where id = p_profile_id;
end;
$$;

grant execute on function public.admin_delete_profile(uuid) to authenticated;

commit;
