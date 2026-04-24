-- ISM ROBOSOFT 2026 - Supabase PostgreSQL Schema
-- Ejecutar en SQL Editor de Supabase

create extension if not exists pgcrypto;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text,
  is_system boolean default true,
  created_at timestamptz default now()
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
  created_at timestamptz default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role_id uuid references public.roles(id) on delete set null,
  full_name text not null,
  dni text,
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
  course_id uuid references public.courses(id) on delete set null,
  division_id uuid references public.divisions(id) on delete set null,
  status text default 'activo',
  created_at timestamptz default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  is_leader boolean default false,
  unique(team_id, profile_id)
);

create table if not exists public.inventory_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.inventory_categories(id) on delete set null,
  code text unique not null,
  name text not null,
  description text,
  stock integer default 0,
  min_stock integer default 0,
  unit text default 'unidad',
  location text,
  purchase_date date,
  condition text default 'operativo',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.inventory_items(id) on delete cascade,
  movement_type text not null check (movement_type in ('entrada', 'salida', 'ajuste', 'prestamo', 'devolucion')),
  quantity integer not null,
  notes text,
  team_id uuid references public.teams(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references public.profiles(id) on delete set null,
  title text not null,
  description text,
  cover_url text,
  status text default 'borrador',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.module_assignments (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  team_id uuid references public.teams(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  division_id uuid references public.divisions(id) on delete cascade
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  content text,
  position integer default 1,
  created_at timestamptz default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  instructions text,
  due_date timestamptz,
  max_score numeric(6,2),
  task_type text default 'tarea' check (task_type in ('tarea', 'evaluativo')),
  created_at timestamptz default now()
);

create table if not exists public.task_submissions (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  submission_text text,
  attachment_url text,
  score numeric(6,2),
  feedback text,
  submitted_at timestamptz default now(),
  unique(task_id, student_id)
);

create table if not exists public.library_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  resource_type text default 'archivo',
  file_url text,
  access_scope text default 'todos',
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  sender_id uuid references public.profiles(id) on delete set null,
  target_type text not null check (target_type in ('all', 'individual', 'team', 'multiple')),
  created_at timestamptz default now()
);

create table if not exists public.notification_recipients (
  id uuid primary key default gen_random_uuid(),
  notification_id uuid not null references public.notifications(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  is_read boolean default false,
  read_at timestamptz,
  unique(notification_id, profile_id)
);

create table if not exists public.system_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text unique not null,
  setting_value jsonb not null,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz default now()
);

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    join public.roles r on r.id = p.role_id
    where p.id = uid and r.code = 'administrator'
  );
$$;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.handle_updated_at();

create trigger trg_inventory_items_updated_at
before update on public.inventory_items
for each row execute procedure public.handle_updated_at();

create trigger trg_modules_updated_at
before update on public.modules
for each row execute procedure public.handle_updated_at();

alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.courses enable row level security;
alter table public.divisions enable row level security;
alter table public.subjects enable row level security;
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.inventory_categories enable row level security;
alter table public.inventory_items enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.modules enable row level security;
alter table public.module_assignments enable row level security;
alter table public.lessons enable row level security;
alter table public.tasks enable row level security;
alter table public.task_submissions enable row level security;
alter table public.library_resources enable row level security;
alter table public.notifications enable row level security;
alter table public.notification_recipients enable row level security;
alter table public.system_settings enable row level security;

create policy "authenticated_read_common" on public.roles for select to authenticated using (true);
create policy "authenticated_read_permissions" on public.permissions for select to authenticated using (true);
create policy "authenticated_read_role_permissions" on public.role_permissions for select to authenticated using (true);
create policy "authenticated_read_courses" on public.courses for select to authenticated using (true);
create policy "authenticated_read_divisions" on public.divisions for select to authenticated using (true);
create policy "authenticated_read_subjects" on public.subjects for select to authenticated using (true);

create policy "profile_self_or_admin_select" on public.profiles for select to authenticated using (auth.uid() = id or public.is_admin(auth.uid()));
create policy "profile_self_or_admin_update" on public.profiles for update to authenticated using (auth.uid() = id or public.is_admin(auth.uid())) with check (auth.uid() = id or public.is_admin(auth.uid()));
create policy "admin_insert_profiles" on public.profiles for insert to authenticated with check (public.is_admin(auth.uid()));

create policy "teams_visible_authenticated" on public.teams for select to authenticated using (true);
create policy "team_members_visible_authenticated" on public.team_members for select to authenticated using (true);
create policy "admin_manage_teams" on public.teams for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "admin_manage_team_members" on public.team_members for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "inventory_read_authenticated" on public.inventory_categories for select to authenticated using (true);
create policy "inventory_items_read_authenticated" on public.inventory_items for select to authenticated using (true);
create policy "inventory_movements_read_authenticated" on public.inventory_movements for select to authenticated using (true);
create policy "admin_manage_inventory_categories" on public.inventory_categories for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "admin_manage_inventory_items" on public.inventory_items for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "admin_manage_inventory_movements" on public.inventory_movements for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "modules_read_authenticated" on public.modules for select to authenticated using (true);
create policy "lessons_read_authenticated" on public.lessons for select to authenticated using (true);
create policy "tasks_read_authenticated" on public.tasks for select to authenticated using (true);
create policy "module_assignments_read_authenticated" on public.module_assignments for select to authenticated using (true);
create policy "task_submissions_select_self_or_teacher" on public.task_submissions for select to authenticated using (student_id = auth.uid() or public.is_admin(auth.uid()));
create policy "teacher_manage_modules" on public.modules for all to authenticated using (public.is_admin(auth.uid()) or teacher_id = auth.uid()) with check (public.is_admin(auth.uid()) or teacher_id = auth.uid());
create policy "teacher_manage_lessons" on public.lessons for all to authenticated using (public.is_admin(auth.uid()) or exists (select 1 from public.modules m where m.id = module_id and m.teacher_id = auth.uid())) with check (public.is_admin(auth.uid()) or exists (select 1 from public.modules m where m.id = module_id and m.teacher_id = auth.uid()));
create policy "teacher_manage_tasks" on public.tasks for all to authenticated using (public.is_admin(auth.uid()) or exists (select 1 from public.modules m where m.id = module_id and m.teacher_id = auth.uid())) with check (public.is_admin(auth.uid()) or exists (select 1 from public.modules m where m.id = module_id and m.teacher_id = auth.uid()));
create policy "student_submit_task" on public.task_submissions for insert to authenticated with check (student_id = auth.uid());
create policy "student_update_task_submission" on public.task_submissions for update to authenticated using (student_id = auth.uid()) with check (student_id = auth.uid());

create policy "library_read_authenticated" on public.library_resources for select to authenticated using (true);
create policy "admin_manage_library" on public.library_resources for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "notifications_read_sender_or_recipient" on public.notifications for select to authenticated using (
  sender_id = auth.uid() or exists (select 1 from public.notification_recipients nr where nr.notification_id = id and nr.profile_id = auth.uid())
);
create policy "notification_recipients_read_own" on public.notification_recipients for select to authenticated using (profile_id = auth.uid() or public.is_admin(auth.uid()));
create policy "admin_manage_notifications" on public.notifications for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "admin_manage_notification_recipients" on public.notification_recipients for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "settings_read_authenticated" on public.system_settings for select to authenticated using (true);
create policy "admin_manage_settings" on public.system_settings for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
