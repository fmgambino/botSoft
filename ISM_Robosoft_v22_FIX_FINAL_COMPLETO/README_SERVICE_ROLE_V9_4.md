# ISM Robosoft v9.4 - Implementación Supabase

## 1) Ejecutar el SQL

1. Entrar a Supabase > SQL Editor.
2. Abrir `supabase/sql/2026_04_27_v9_4_patch_final.sql`.
3. Copiar todo el contenido.
4. Pegar en SQL Editor y ejecutar `Run`.

Este patch usa `DROP VIEW ... CASCADE` y vuelve a crear `inventory_frontend_view` e `inventory_assets_frontend_view`, por eso corrige el error:

`cannot drop view inventory_frontend_view because other objects depend on it`

También crea/recrea la RPC:

`public.admin_update_inventory_asset(...)`

Y ejecuta:

`notify pgrst, 'reload schema';`

para que Supabase/PostgREST refresque el cache.

## 2) Configurar SERVICE_ROLE_KEY para crear usuarios

El alta de usuarios de Auth no puede hacerse desde el navegador con la anon key. Debe hacerse con la Edge Function `admin-create-user`.

### Opción A: desde la terminal con Supabase CLI

Desde la carpeta raíz del proyecto:

```bash
supabase login
supabase link --project-ref pwailgchrwnwhutdfujb
supabase secrets set SERVICE_ROLE_KEY="PEGAR_SERVICE_ROLE_KEY"
supabase secrets set SUPABASE_ANON_KEY="PEGAR_SUPABASE_ANON_KEY"
supabase functions deploy admin-create-user --no-verify-jwt
```

La `SERVICE_ROLE_KEY` está en Supabase > Project Settings > API. No va en `js/config.js`, no va en GitHub, no va en el frontend.

### Opción B: desde Supabase Dashboard

1. Supabase > Edge Functions.
2. Crear o abrir `admin-create-user`.
3. Copiar el contenido de `supabase/functions/admin-create-user/index.ts`.
4. En Edge Functions > Secrets, agregar:
   - `SERVICE_ROLE_KEY`
   - `SUPABASE_ANON_KEY`
5. Deploy.

## 3) Publicar la webapp

Después de ejecutar el SQL y desplegar la Edge Function, subir/publicar todos los archivos del proyecto.

## Importante de seguridad

Si compartiste una `SERVICE_ROLE_KEY` por chat, documentación, captura o repositorio, rotala desde Supabase inmediatamente y actualizá el secret de la Edge Function.
