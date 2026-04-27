# Fix crear usuarios v9.9

El error anterior venía de que la Edge Function devolvía 400/500 y la webapp solo mostraba “non-2xx”. Esta versión incluye una Edge Function robusta para `admin-create-user` y `rapid-service`.

## 1) Ejecutar SQL
Ejecutá en Supabase SQL Editor el SQL de la carpeta:

`supabase/sql/2026_04_27_v9_6_DATABASE_ONLY_CORREGIDA.sql`

## 2) Secret correcto
En Edge Functions > Secrets deben existir:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SERVICE_ROLE_KEY`

También acepta `SUPABASE_SERVICE_ROLE_KEY`, pero se recomienda mantener `SERVICE_ROLE_KEY`.

## 3) Desplegar función
En Supabase Edge Functions, podés usar cualquiera de estas dos opciones:

### Opción A: usar `rapid-service`
Abrí `rapid-service`, reemplazá todo `index.ts` por el contenido de:

`supabase/functions/rapid-service/index.ts`

Luego presioná **Deploy updates**.

### Opción B: crear función `admin-create-user`
Creá una función llamada `admin-create-user`, pegá el contenido de:

`supabase/functions/admin-create-user/index.ts`

Luego presioná **Deploy updates**.

## 4) Permisos del usuario administrador
El usuario que crea otros usuarios debe tener en `profiles`:

- `is_active = true`
- `role_id` apuntando a un rol cuyo `roles.code` sea `administrator`

La función también acepta `admin` o `superadmin`, pero el estándar del sistema es `administrator`.
