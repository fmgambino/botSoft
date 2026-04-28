# ISM Robosoft v18

## 1) Base de datos
En Supabase > SQL Editor ejecutar completo:

`supabase/sql/2026_04_27_v18_persistencia_notificaciones_equipos_inventario.sql`

Este patch corrige:
- Notificaciones leídas persistentes por usuario.
- Condiciones de inventario persistentes con color real en `inventory_conditions`.
- Edición y eliminación masiva de inventario por checkbox.
- Guardado/listado/edición de equipos con RPC `admin_save_team_full` y `admin_list_teams_full`.
- Listado completo de permisos en roles.

## 2) Reemplazo de archivos
Subir/reemplazar todos los archivos del proyecto.
Luego hacer Ctrl+F5 o abrir en incógnito.

## 3) Verificación rápida
- Crear condición nueva con color, cerrar sesión y volver a entrar: debe seguir visible.
- Marcar una notificación como leída, cerrar sesión y volver a entrar: debe seguir leída.
- Crear/editar equipo: debe cargar mentores/alumnos y guardar la card completa.
- En inventario, seleccionar filas con checkbox para edición/eliminación masiva.
