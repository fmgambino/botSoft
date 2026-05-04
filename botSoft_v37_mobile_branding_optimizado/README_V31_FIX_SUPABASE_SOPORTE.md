# v31 - Fix Supabase + Soporte Ticket UI

## Correcciones incluidas

- Migración Supabase corregida: ahora elimina previamente `admin_delete_profile(uuid)` para evitar el error `42P13: cannot change return type of existing function`.
- Se otorga permiso `SELECT` sobre `support_tickets_frontend_view`.
- El módulo Soporte Ticket conserva fallback a `support_tickets` si la vista no está disponible.
- Se reordenaron los filtros, botones masivos, paginación superior/inferior y tabla para evitar elementos amontonados.
- Se agregaron SweetAlert2 de confirmación al guardar, editar masivamente, eliminar y agregar incidencias.

## Orden de actualización

1. En Supabase SQL Editor ejecutar:
   `supabase/migrations/20260504_support_tickets_and_delete_fix.sql`

2. Publicar los archivos del proyecto.

3. Si Supabase REST sigue mostrando 404 inmediatamente después de la migración, refrescar la app y esperar unos segundos a que PostgREST recargue el schema cache. El error anterior aparecía porque la migración se cortaba antes de crear las tablas.
