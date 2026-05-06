-- v46: Fix definitivo para duplicados de notificaciones, alta de inventario y navegación desde campana.
-- Ejecutar este archivo en Supabase SQL Editor después de los scripts anteriores.

-- Inserta notificaciones para administradores sin romper operaciones de inventario
-- aunque exista uq_notifications_exact_dedupe u otra restricción UNIQUE.
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
begin
  insert into public.notifications(recipient_profile_id, title, message, section, created_by)
  select p.id, p_title, p_message, coalesce(p_section,'inventory'), p_created_by
  from public.profiles p
  join public.roles r on r.id = p.role_id
  where r.code in ('administrator','admin')
    and coalesce(p.is_active,true) is true
  on conflict do nothing;

  get diagnostics v_count = row_count;
  return v_count;
exception when unique_violation then
  return 0;
end;
$$;

grant execute on function public.notify_admins(text,text,text,uuid) to authenticated, anon;

-- Re-crea el trigger de inventario para que nunca bloquee el INSERT/UPDATE del activo.
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
  select ci.name into v_item from public.inventory_catalog_items ci where ci.id = new.catalog_item_id;
  v_code := coalesce(new.asset_code, new.barcode, new.id::text);

  begin
    if tg_op = 'INSERT' then
      perform public.notify_admins(
        'Nuevo insumo/equipo cargado',
        coalesce(v_item,'Inventario') || ' (' || v_code || ') fue cargado en inventario.',
        'inventory',
        auth.uid()
      );
      return new;
    end if;

    if old.status_id is distinct from new.status_id then
      select coalesce(frontend_status, name, code) into v_old_status from public.inventory_status_catalog where id = old.status_id;
      select coalesce(frontend_status, name, code) into v_new_status from public.inventory_status_catalog where id = new.status_id;
      perform public.notify_admins(
        'Cambio de estado en inventario',
        coalesce(v_item,'Inventario') || ' (' || v_code || ') cambió de estado: ' || coalesce(v_old_status,'Sin estado') || ' → ' || coalesce(v_new_status,'Sin estado') || '.',
        'inventory',
        auth.uid()
      );
    end if;

    if coalesce(old.condition_note,'') is distinct from coalesce(new.condition_note,'') then
      perform public.notify_admins(
        'Cambio de condición en inventario',
        coalesce(v_item,'Inventario') || ' (' || v_code || ') cambió de condición: ' || coalesce(nullif(old.condition_note,''),'Sin condición') || ' → ' || coalesce(nullif(new.condition_note,''),'Sin condición') || '.',
        'inventory',
        auth.uid()
      );
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

-- Envío manual de notificaciones con dedupe seguro.
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
begin
  if v_sender is null then raise exception 'No autorizado'; end if;
  if nullif(trim(p_title),'') is null or nullif(trim(p_message),'') is null then raise exception 'Título y mensaje son obligatorios'; end if;

  if p_target = 'all' then
    insert into public.notifications(recipient_profile_id, title, message, section, created_by)
    select p.id, p_title, p_message, coalesce(p_section,'notifications'), v_sender from public.profiles p where coalesce(p.is_active,true) is true
    on conflict do nothing;
  elsif p_target = 'teachers' then
    insert into public.notifications(recipient_profile_id, title, message, section, created_by)
    select p.id, p_title, p_message, coalesce(p_section,'notifications'), v_sender from public.profiles p join public.roles r on r.id = p.role_id where r.code = 'teacher' and coalesce(p.is_active,true) is true
    on conflict do nothing;
  elsif p_target = 'students' then
    insert into public.notifications(recipient_profile_id, title, message, section, created_by)
    select p.id, p_title, p_message, coalesce(p_section,'notifications'), v_sender from public.profiles p join public.roles r on r.id = p.role_id where r.code = 'student' and coalesce(p.is_active,true) is true
    on conflict do nothing;
  elsif p_target in ('individual','multi') then
    insert into public.notifications(recipient_profile_id, title, message, section, created_by)
    select distinct p.id, p_title, p_message, coalesce(p_section,'notifications'), v_sender from public.profiles p where p.id::text = any(coalesce(p_recipient_ids, array[]::text[])) and coalesce(p.is_active,true) is true
    on conflict do nothing;
  elsif p_target = 'team' then
    insert into public.notifications(recipient_profile_id, title, message, section, created_by)
    select distinct tm.profile_id, p_title, p_message, coalesce(p_section,'notifications'), v_sender from public.team_members tm join public.profiles p on p.id = tm.profile_id where tm.team_id::text = any(coalesce(p_recipient_ids, array[]::text[])) and coalesce(p.is_active,true) is true
    on conflict do nothing;
  else
    raise exception 'Destino no válido: %', p_target;
  end if;

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

grant execute on function public.send_notification(text,text,text,text[],text) to authenticated;
notify pgrst, 'reload schema';
