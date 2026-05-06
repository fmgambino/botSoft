-- ============================================================
-- ISM ROBOSOFT V47 FIX REAL
-- Corrige 409 por uq_notifications_exact_dedupe en altas de inventario,
-- navegación de campana y tolerancia de notificaciones duplicadas.
-- Ejecutar COMPLETO en Supabase SQL Editor.
-- ============================================================

begin;

-- 1) El índice UNIQUE uq_notifications_exact_dedupe no debe bloquear operaciones del sistema.
--    Lo reemplazamos por índices no únicos para consulta/dedupe visual desde la app.
do $$
begin
  if exists (select 1 from pg_constraint where conname = 'uq_notifications_exact_dedupe' and conrelid = 'public.notifications'::regclass) then
    alter table public.notifications drop constraint uq_notifications_exact_dedupe;
  end if;
  if exists (select 1 from pg_indexes where schemaname='public' and indexname='uq_notifications_exact_dedupe') then
    drop index public.uq_notifications_exact_dedupe;
  end if;
end $$;

with ranked as (
  select id,
         row_number() over(
           partition by recipient_profile_id, title, message, coalesce(section,''), coalesce(created_by,'00000000-0000-0000-0000-000000000000'::uuid), date_trunc('minute', created_at)
           order by created_at desc, id desc
         ) rn
  from public.notifications
)
delete from public.notifications n using ranked r where n.id = r.id and r.rn > 1;

create index if not exists idx_notifications_recipient_read_created_v47
on public.notifications(recipient_profile_id, read_at, created_at desc);

create index if not exists idx_notifications_dedupe_lookup_v47
on public.notifications(recipient_profile_id, title, message, section, created_by, created_at desc);

-- 2) Inserción segura: devuelve una notificación existente si fue emitida hace menos de 2 minutos.
create or replace function public.safe_insert_notification_v47(
  p_recipient uuid,
  p_title text,
  p_message text,
  p_section text default 'notifications',
  p_created_by uuid default auth.uid()
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_existing uuid;
  v_id uuid;
begin
  if p_recipient is null then return null; end if;

  select id into v_existing
  from public.notifications
  where recipient_profile_id = p_recipient
    and title = coalesce(p_title,'')
    and message = coalesce(p_message,'')
    and coalesce(section,'') = coalesce(p_section,'notifications')
    and coalesce(created_by,'00000000-0000-0000-0000-000000000000'::uuid) = coalesce(p_created_by,'00000000-0000-0000-0000-000000000000'::uuid)
    and created_at >= now() - interval '2 minutes'
  order by created_at desc
  limit 1;

  if v_existing is not null then return v_existing; end if;

  begin
    insert into public.notifications(recipient_profile_id,title,message,section,created_by,created_at)
    values(p_recipient, coalesce(p_title,''), coalesce(p_message,''), coalesce(p_section,'notifications'), p_created_by, now())
    returning id into v_id;
    return v_id;
  exception when unique_violation then
    select id into v_existing
    from public.notifications
    where recipient_profile_id = p_recipient
      and title = coalesce(p_title,'')
      and message = coalesce(p_message,'')
      and coalesce(section,'') = coalesce(p_section,'notifications')
    order by created_at desc
    limit 1;
    return v_existing;
  end;
end;
$$;

grant execute on function public.safe_insert_notification_v47(uuid,text,text,text,uuid) to authenticated, anon;

create or replace function public.notify_admins(
  p_title text,
  p_message text,
  p_section text default 'inventory',
  p_created_by uuid default auth.uid()
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer := 0;
  r record;
begin
  for r in
    select p.id
    from public.profiles p
    join public.roles ro on ro.id = p.role_id
    where ro.code in ('administrator','admin') and coalesce(p.is_active,true) is true
  loop
    perform public.safe_insert_notification_v47(r.id, p_title, p_message, coalesce(p_section,'inventory'), p_created_by);
    v_count := v_count + 1;
  end loop;
  return v_count;
exception when others then
  raise notice 'notify_admins omitida: %', sqlerrm;
  return 0;
end;
$$;

grant execute on function public.notify_admins(text,text,text,uuid) to authenticated, anon;

-- 3) Trigger de inventario blindado: nunca aborta el alta por notificaciones.
create or replace function public.trg_inventory_admin_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item text;
  v_old_status text;
  v_new_status text;
  v_code text;
begin
  begin
    select ci.name into v_item from public.inventory_catalog_items ci where ci.id = new.catalog_item_id;
    v_code := coalesce(new.asset_code, new.barcode, new.id::text);

    if tg_op = 'INSERT' then
      perform public.notify_admins('Nuevo insumo/equipo cargado', coalesce(v_item,'Inventario') || ' (' || v_code || ') fue cargado en inventario.', 'inventory', auth.uid());
      return new;
    end if;

    if old.status_id is distinct from new.status_id then
      select coalesce(frontend_status, name, code) into v_old_status from public.inventory_status_catalog where id = old.status_id;
      select coalesce(frontend_status, name, code) into v_new_status from public.inventory_status_catalog where id = new.status_id;
      perform public.notify_admins('Cambio de estado en inventario', coalesce(v_item,'Inventario') || ' (' || v_code || ') cambió de estado: ' || coalesce(v_old_status,'Sin estado') || ' → ' || coalesce(v_new_status,'Sin estado') || '.', 'inventory', auth.uid());
    end if;

    if coalesce(old.condition_note,'') is distinct from coalesce(new.condition_note,'') then
      perform public.notify_admins('Cambio de condición en inventario', coalesce(v_item,'Inventario') || ' (' || v_code || ') cambió de condición: ' || coalesce(nullif(old.condition_note,''),'Sin condición') || ' → ' || coalesce(nullif(new.condition_note,''),'Sin condición') || '.', 'inventory', auth.uid());
    end if;
  exception when others then
    raise notice 'Notificación de inventario omitida: %', sqlerrm;
  end;
  return new;
end;
$$;

drop trigger if exists inventory_admin_notifications_iud on public.inventory_assets;
create trigger inventory_admin_notifications_iud
after insert or update of status_id, condition_note on public.inventory_assets
for each row execute function public.trg_inventory_admin_notifications();

-- 4) send_notification seguro para campana/manual.
create or replace function public.send_notification(
  p_title text,
  p_message text,
  p_target text,
  p_recipient_ids text[] default array[]::text[],
  p_section text default 'notifications'
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sender uuid := auth.uid();
  v_count integer := 0;
  r record;
begin
  if v_sender is null then raise exception 'No autorizado'; end if;
  if nullif(trim(p_title),'') is null or nullif(trim(p_message),'') is null then raise exception 'Título y mensaje son obligatorios'; end if;

  for r in
    select distinct p.id
    from public.profiles p
    left join public.roles ro on ro.id = p.role_id
    left join public.team_members tm on tm.profile_id = p.id
    where coalesce(p.is_active,true) is true and (
      p_target = 'all'
      or (p_target = 'teachers' and ro.code = 'teacher')
      or (p_target = 'students' and ro.code = 'student')
      or (p_target in ('individual','multi') and p.id::text = any(coalesce(p_recipient_ids,array[]::text[])))
      or (p_target = 'team' and tm.team_id::text = any(coalesce(p_recipient_ids,array[]::text[])))
    )
  loop
    perform public.safe_insert_notification_v47(r.id, p_title, p_message, coalesce(p_section,'notifications'), v_sender);
    v_count := v_count + 1;
  end loop;

  if v_count = 0 and p_target not in ('all','teachers','students','individual','multi','team') then
    raise exception 'Destino no válido: %', p_target;
  end if;
  return v_count;
end;
$$;

grant execute on function public.send_notification(text,text,text,text[],text) to authenticated;

commit;
notify pgrst, 'reload schema';
