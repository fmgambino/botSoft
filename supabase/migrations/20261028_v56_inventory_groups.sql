-- v56: Agrupaciones persistentes. Ejecutar una vez en SQL Editor.
create table if not exists public.inventory_groups (
 id uuid primary key default gen_random_uuid(),
 name text not null unique check(length(trim(name)) between 2 and 150),
 description text not null default '',
 created_by uuid references public.profiles(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.inventory_group_members (
 group_id uuid not null references public.inventory_groups(id) on delete cascade,
 asset_id uuid not null unique references public.inventory_assets(id) on delete restrict,
 added_at timestamptz not null default now(),
 primary key(group_id,asset_id)
);
create index if not exists idx_inventory_group_members_group on public.inventory_group_members(group_id);
alter table public.inventory_groups enable row level security;
alter table public.inventory_group_members enable row level security;
-- Roles se validan en la base de datos, no en el frontend.
create or replace function public.ism_is_inventory_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.profiles p join public.roles r on r.id=p.role_id
 where p.id=(select auth.uid()) and p.is_active=true and lower(r.code) in ('administrator','admin','superadmin','super_admin'));
$$;
revoke all on function public.ism_is_inventory_admin() from public;
grant execute on function public.ism_is_inventory_admin() to authenticated;
drop policy if exists ism_groups_read on public.inventory_groups;
create policy ism_groups_read on public.inventory_groups for select to authenticated using (true);
drop policy if exists ism_groups_write on public.inventory_groups;
create policy ism_groups_write on public.inventory_groups for all to authenticated using (public.ism_is_inventory_admin()) with check (public.ism_is_inventory_admin());
drop policy if exists ism_group_members_read on public.inventory_group_members;
create policy ism_group_members_read on public.inventory_group_members for select to authenticated using (true);
drop policy if exists ism_group_members_write on public.inventory_group_members;
create policy ism_group_members_write on public.inventory_group_members for all to authenticated using (public.ism_is_inventory_admin()) with check (public.ism_is_inventory_admin());
create table if not exists public.ism_user_mail_log (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id),
 kind text not null,
 sent_by uuid not null references public.profiles(id),
 sent_at timestamptz not null default now(),
 provider_status text not null,
 error_message text
);
alter table public.ism_user_mail_log enable row level security;
drop policy if exists ism_mail_log_admin_read on public.ism_user_mail_log;
create policy ism_mail_log_admin_read on public.ism_user_mail_log for select to authenticated using(public.ism_is_inventory_admin());
