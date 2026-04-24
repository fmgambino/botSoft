-- REPARADOR DEFINITIVO AUTH SUPABASE / GoTrue tokens NULL
-- Corrige errores 500 en /recover, /invite y /magiclink como:
-- converting NULL to string is unsupported en confirmation_token o email_change.
--
-- IMPORTANTE:
-- Este script NO usa ALTER TABLE sobre auth.users.
-- Solo actualiza filas existentes, por eso funciona desde Supabase SQL Editor.
--
-- Ejecutar completo en Supabase > SQL Editor.

begin;

-- Tokens y campos string que GoTrue puede leer como string no-null.
do $$
declare
  col text;
  cols text[] := array[
    'confirmation_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token',
    'reauthentication_token',
    'email_change',
    'phone_change'
  ];
begin
  foreach col in array cols loop
    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'auth'
        and table_name = 'users'
        and column_name = col
    ) then
      execute format('update auth.users set %I = '''' where %I is null', col, col);
    end if;
  end loop;
end $$;

-- Metadata / aud / role básicos.
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

-- Timestamps inconsistentes.
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema='auth'
      and table_name='users'
      and column_name='confirmation_sent_at'
  ) then
    update auth.users
    set confirmation_sent_at = coalesce(confirmation_sent_at, created_at, now())
    where confirmation_sent_at is null
      and email_confirmed_at is not null;
  end if;
end $$;

commit;

-- VERIFICACIÓN GENERAL.
-- Todos deben devolver 0.
select 'confirmation_token_null' as check_name, count(*) as total
from auth.users where confirmation_token is null
union all
select 'recovery_token_null', count(*)
from auth.users where recovery_token is null
union all
select 'email_change_token_new_null', count(*)
from auth.users where email_change_token_new is null
union all
select 'email_change_token_current_null', count(*)
from auth.users where email_change_token_current is null
union all
select 'phone_change_token_null', count(*)
from auth.users where phone_change_token is null
union all
select 'reauthentication_token_null', count(*)
from auth.users where reauthentication_token is null
union all
select 'email_change_null', count(*)
from auth.users where email_change is null
union all
select 'phone_change_null', count(*)
from auth.users where phone_change is null;

-- VERIFICACIÓN DEL USUARIO DE PRUEBA.
select
  id,
  email,
  confirmation_token,
  recovery_token,
  email_change,
  email_confirmed_at,
  created_at
from auth.users
where lower(email) = lower('carolinajuarezlopz@gmail.com');
