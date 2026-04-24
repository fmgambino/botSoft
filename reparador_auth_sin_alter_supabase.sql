-- REPARADOR AUTH SUPABASE SIN ALTER TABLE
-- Error objetivo:
-- error finding user: sql: Scan error on column index 3, name "confirmation_token":
-- converting NULL to string is unsupported
--
-- Este script NO usa ALTER TABLE auth.users porque Supabase no permite cambiar
-- estructura/defaults de auth.users desde SQL Editor en proyectos hosted.
--
-- Ejecutar completo en Supabase > SQL Editor.

begin;

-- 1) Completa tokens NULL con string vacío.
-- Esto repara usuarios existentes que rompen /recover, /invite y /magiclink.
update auth.users
set confirmation_token = ''
where confirmation_token is null;

update auth.users
set recovery_token = ''
where recovery_token is null;

update auth.users
set email_change_token_new = ''
where email_change_token_new is null;

update auth.users
set email_change_token_current = ''
where email_change_token_current is null;

update auth.users
set phone_change_token = ''
where phone_change_token is null;

update auth.users
set reauthentication_token = ''
where reauthentication_token is null;

-- 2) Normaliza metadatos nulos.
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

-- 3) Corrige confirmed/sent timestamps inconsistentes.
update auth.users
set confirmation_sent_at = coalesce(confirmation_sent_at, created_at, now())
where confirmation_sent_at is null
  and email_confirmed_at is not null;

commit;

-- 4) Verificación: todos estos valores deben dar 0.
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
from auth.users where reauthentication_token is null;

-- 5) Verificación específica del usuario que fallaba.
-- Debe mostrar confirmation_token y recovery_token como texto vacío, no NULL.
select
  id,
  email,
  confirmation_token,
  recovery_token,
  email_confirmed_at,
  created_at
from auth.users
where lower(email) = lower('carolinajuarezlopz@gmail.com');
