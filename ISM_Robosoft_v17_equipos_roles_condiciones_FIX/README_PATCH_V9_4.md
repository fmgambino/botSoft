# Cambios v9.4

- Corregido patch SQL con `DROP VIEW ... CASCADE`.
- Recreadas vistas `inventory_frontend_view` e `inventory_assets_frontend_view`.
- Recreada RPC `admin_update_inventory_asset` con firma compatible con el frontend.
- Agregado `notify pgrst, 'reload schema'` para resolver cache de Supabase.
- Agregado guardado real de condiciones en `inventory_conditions` con color HEX.
- Corregidos IDs duplicados de paginación de inventario; ahora funcionan ambos pagers superior e inferior.
- Deshabilitadas acciones editar/eliminar en modo demo.
- Incluida Edge Function `admin-create-user` y guía para `SERVICE_ROLE_KEY`.
