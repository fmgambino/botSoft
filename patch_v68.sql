
-- =========================================================
-- PATCH v6.8: reparación definitiva de RPC Usuarios
-- Corrige creación/edición/eliminación real de usuarios y evita requester_id inexistente.
-- =========================================================

drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,boolean,text);
drop function if exists public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,bigint,text,text,boolean);
drop function if exists public.admin_update_profile_full(uuid,text,uuid,text,text,boolean);
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,text);
drop function if exists public.admin_upsert_profile_by_email(text,text,text,text,text,date,text,text,boolean);

create or replace function public.admin_upsert_profile_by_email(
  p_email text, p_full_name text, p_role_code text default 'student', p_dni text default null,
  p_whatsapp text default null, p_birth_date date default null, p_title text default null,
  p_avatar_url text default null, p_is_active boolean default true
)
returns public.profiles language plpgsql security definer set search_path = public, auth as $$
declare
  v_role_id public.roles.id%TYPE;
  v_profile_id uuid;
  v_profile public.profiles;
begin
  if not public.is_admin(auth.uid()) then raise exception 'Solo administradores pueden crear o editar usuarios'; end if;
  select id into v_role_id from public.roles where code = coalesce(nullif(p_role_code,''),'student') limit 1;
  if v_role_id is null then raise exception 'Rol inexistente: %', p_role_code; end if;
  select id into v_profile_id from auth.users where lower(email) = lower(p_email) limit 1;
  if v_profile_id is null then v_profile_id := gen_random_uuid(); end if;
  insert into public.profiles (id, role_id, full_name, dni, whatsapp, birth_date, title, is_active, avatar_url, updated_at)
  values (v_profile_id, v_role_id, coalesce(nullif(p_full_name,''), split_part(p_email,'@',1)), nullif(p_dni,''), nullif(p_whatsapp,''), p_birth_date, case when coalesce(p_role_code,'student')='student' then null else nullif(p_title,'') end, coalesce(p_is_active,true), coalesce(nullif(p_avatar_url,''),'./assets/avatar-default.svg'), now())
  on conflict (id) do update set role_id=excluded.role_id, full_name=excluded.full_name, dni=excluded.dni, whatsapp=excluded.whatsapp, birth_date=excluded.birth_date, title=excluded.title, avatar_url=excluded.avatar_url, is_active=excluded.is_active, updated_at=now()
  returning * into v_profile;
  return v_profile;
end; $$;
grant execute on function public.admin_upsert_profile_by_email(text,text,text,text,text,date,text,text,boolean) to authenticated;

create or replace function public.admin_update_profile_full(
  p_profile_id uuid, p_full_name text, p_role_code text default null, p_dni text default null,
  p_whatsapp text default null, p_birth_date date default null, p_title text default null,
  p_avatar_url text default null, p_is_active boolean default true
)
returns public.profiles language plpgsql security definer set search_path = public as $$
declare
  v_role_id public.roles.id%TYPE;
  v_profile public.profiles;
  v_role_code text;
begin
  if not public.is_admin(auth.uid()) and auth.uid() <> p_profile_id then raise exception 'Solo administradores pueden editar usuarios'; end if;
  v_role_code := nullif(p_role_code,'');
  if v_role_code is not null then
    select id into v_role_id from public.roles where code = v_role_code limit 1;
    if v_role_id is null then raise exception 'Rol inválido: %', v_role_code; end if;
  end if;
  update public.profiles set full_name=coalesce(nullif(p_full_name,''),full_name), role_id=coalesce(v_role_id,role_id), dni=nullif(p_dni,''), whatsapp=nullif(p_whatsapp,''), birth_date=p_birth_date, title=case when coalesce(v_role_code,(select r.code from public.roles r where r.id=profiles.role_id))='student' then null else nullif(p_title,'') end, avatar_url=coalesce(nullif(p_avatar_url,''),avatar_url), is_active=coalesce(p_is_active,is_active), updated_at=now()
  where id=p_profile_id returning * into v_profile;
  if v_profile.id is null then raise exception 'Usuario no encontrado'; end if;
  return v_profile;
end; $$;
grant execute on function public.admin_update_profile_full(uuid,text,text,text,text,date,text,text,boolean) to authenticated;

create or replace function public.admin_delete_profile(p_profile_id uuid)
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin(auth.uid()) then raise exception 'Solo administradores pueden eliminar usuarios'; end if;
  if p_profile_id = auth.uid() then raise exception 'No podés eliminar tu propio usuario desde la sesión activa'; end if;
  if to_regclass('public.team_members') is not null then delete from public.team_members where profile_id = p_profile_id; end if;
  if to_regclass('public.teams') is not null then
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='teams' and column_name='teacher_id') then update public.teams set teacher_id=null where teacher_id=p_profile_id; end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='teams' and column_name='mentor_backup_id') then update public.teams set mentor_backup_id=null where mentor_backup_id=p_profile_id; end if;
  end if;
  if to_regclass('public.inventory_loans') is not null then
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='requester_profile_id') then update public.inventory_loans set requester_profile_id=null where requester_profile_id=p_profile_id; end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='teacher_profile_id') then update public.inventory_loans set teacher_profile_id=null where teacher_profile_id=p_profile_id; end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='created_by') then update public.inventory_loans set created_by=null where created_by=p_profile_id; end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_loans' and column_name='approved_by') then update public.inventory_loans set approved_by=null where approved_by=p_profile_id; end if;
  end if;
  if to_regclass('public.inventory_transactions') is not null then
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_transactions' and column_name='actor_id') then update public.inventory_transactions set actor_id=null where actor_id=p_profile_id; end if;
    if exists (select 1 from information_schema.columns where table_schema='public' and table_name='inventory_transactions' and column_name='related_profile_id') then update public.inventory_transactions set related_profile_id=null where related_profile_id=p_profile_id; end if;
  end if;
  delete from public.profiles where id = p_profile_id;
  delete from auth.users where id = p_profile_id;
end; $$;
grant execute on function public.admin_delete_profile(uuid) to authenticated;
