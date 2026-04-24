-- Reparador Supabase Auth: confirmation_token NULL
-- Ejecutar completo en Supabase > SQL Editor.
-- Corrige el error:
-- error finding user: sql: Scan error on column index 3, name "confirmation_token": converting NULL to string is unsupported

begin;

-- 1) Normaliza columnas token nullable que GoTrue espera como texto no NULL en algunas rutas.
do $$
declare
  c text;
  cols text[] := array[
    'confirmation_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token',
    'reauthentication_token'
  ];
begin
  foreach c in array cols loop
    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'auth'
        and table_name = 'users'
        and column_name = c
    ) then
      execute format('update auth.users set %I = '''' where %I is null', c, c);
      execute format('alter table auth.users alter column %I set default ''''', c);
    end if;
  end loop;
end $$;

-- 2) Normaliza confirmation_sent_at si estuviera en NULL junto a email confirmado.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema='auth' and table_name='users' and column_name='confirmation_sent_at'
  ) then
    update auth.users
    set confirmation_sent_at = coalesce(confirmation_sent_at, created_at, now())
    where confirmation_sent_at is null
      and email_confirmed_at is not null;
  end if;
end $$;

-- 3) Asegura defaults básicos de metadata.
update auth.users
set
  raw_app_meta_data = coalesce(raw_app_meta_data, '{"provider":"email","providers":["email"]}'::jsonb),
  raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb),
  aud = coalesce(aud, 'authenticated'),
  role = coalesce(role, 'authenticated')
where raw_app_meta_data is null
   or raw_user_meta_data is null
   or aud is null
   or role is null;

commit;

-- 4) Verificación: debe devolver 0.
select
  count(*) as usuarios_con_confirmation_token_null
from auth.users
where confirmation_token is null;
