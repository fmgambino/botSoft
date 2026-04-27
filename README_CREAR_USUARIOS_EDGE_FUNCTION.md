# Alta de usuarios - Edge Function

Tu Supabase muestra desplegada la función `rapid-service`, no `admin-create-user`.
Esta versión de la webapp intenta usar primero `admin-create-user` y, si no existe, usa `rapid-service`.

Para que funcione:

1. En Supabase > Edge Functions > Secrets deben existir:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SERVICE_ROLE_KEY`

2. En Supabase > Edge Functions > Functions debe existir al menos una de estas funciones:
   - `admin-create-user`, recomendado
   - `rapid-service`, compatible con esta versión

3. Si editaste el código de la función desde Supabase, hacé clic en **Deploy updates**.

4. Probá desde el botón **Test** o desde la webapp logueado como administrador activo.

Si querés usar el nombre recomendado, duplicá/renombrá tu función `rapid-service` a `admin-create-user`, o desplegala con Supabase CLI:

```bash
supabase functions deploy admin-create-user --no-verify-jwt
```

Importante: `SERVICE_ROLE_KEY` nunca va en `js/config.js` ni en el frontend. Solo va en Secrets de Edge Functions.
