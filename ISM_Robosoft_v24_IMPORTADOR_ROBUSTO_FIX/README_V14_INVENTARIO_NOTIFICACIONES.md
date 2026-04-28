# ISM Robosoft v14 - Inventario + notificaciones a administradores

## 1) Ejecutar SQL
En Supabase > SQL Editor ejecutá completo:

`supabase/sql/2026_04_27_v14_inventory_admin_notifications_conditions.sql`

## 2) Publicar archivos
Subí/reemplazá el proyecto completo.

## Cambios incluidos
- Cuando se carga un nuevo insumo/equipo en Inventario, se notifica a todos los usuarios con rol `administrator`.
- Cuando cambia el estado de un insumo/equipo, se notifica a administradores.
- Cuando cambia la condición de un insumo/equipo, se notifica a administradores.
- En el formulario de Inventario, el botón `🎨` permite editar el color de una condición existente.
- Se elimina la ambigüedad del RPC `admin_update_inventory_asset` dejando una firma única compatible con el frontend.

## Importante
Después de ejecutar el SQL, hacé Ctrl+F5 en el navegador.
