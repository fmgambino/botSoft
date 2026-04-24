# BotSoft v6.4 - Reparación Usuarios + Roles y Permisos

## Qué se corrigió
- Error `invalid input syntax for type bigint` al editar usuarios.
- Vista del popup de detalle de usuario.
- Guardado persistente de foto de perfil en `profiles.avatar_url`.
- ABM del módulo Roles y Permisos conectado a Supabase.
- Se mantiene la estructura modular en `/js`.

## Pasos
1. En Supabase > SQL Editor ejecutá `supabase_backend_inventario_abm_usuarios.sql`.
2. Reemplazá los archivos del sitio con este paquete.
3. Borrá caché/desregistrá el Service Worker para evitar que cargue JS viejo.
