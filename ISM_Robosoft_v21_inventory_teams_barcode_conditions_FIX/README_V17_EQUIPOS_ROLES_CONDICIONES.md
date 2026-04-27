# ISM Robosoft v17 - Correcciones

## Orden de actualización

1. Subí/reemplazá los archivos del proyecto.
2. En Supabase → SQL Editor ejecutá completo:

`supabase/sql/2026_04_27_v17_equipos_roles_condiciones_FIX.sql`

3. Esperá unos segundos y recargá la web con Ctrl+F5.

## Correcciones incluidas

- Equipo: crea/edita equipos usando `admin_save_team_full` y fallback directo.
- Roles y permisos: el formulario lista todos los permisos disponibles desde Supabase.
- Inventario / condiciones: las condiciones nuevas y sus colores se guardan en `inventory_conditions` con RPC `save_inventory_condition_v17`.
- Inventario: se limpia ambigüedad del RPC `admin_update_inventory_asset`.
