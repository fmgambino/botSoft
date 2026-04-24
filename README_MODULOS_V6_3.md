# ISM Robosoft v6.3 - Refactor modular Supabase

## Estructura JS

```txt
/js
  config.js
  supabaseClient.js
  auth.js
  ui.js
  dashboard.js
  usuarios.js
  roles.js
  equipos.js
  inventario.js
  prestamos.js
  utils.js
  app.js
```

## Pasos de actualización

1. Ejecutar `supabase_backend_inventario_abm_usuarios.sql` en Supabase SQL Editor.
2. Verificar que `/js/config.js` tenga tu `SUPABASE_URL` y `SUPABASE_ANON_KEY`.
3. Reemplazar los archivos en GitHub Pages.
4. Borrar caché del navegador o desregistrar el Service Worker si seguís viendo el error viejo.

## Correcciones incluidas

- Eliminado el flujo que llamaba alta Auth desde frontend para no cerrar sesión del admin.
- El alta de Usuarios ABM ahora guarda en `profiles` vía RPC.
- Ver, editar y eliminar funcionan para Usuarios e Inventario.
- Los módulos solicitados quedaron individualizados en `/js`.
- Scripts con `?v=6.3` para evitar caché viejo de GitHub Pages/PWA.

Nota: crear usuarios reales de Supabase Auth con contraseña desde el frontend requiere una Edge Function con service role. Por seguridad, no se debe publicar la service role key en GitHub Pages.
