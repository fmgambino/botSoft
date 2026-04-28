# ISM Robosoft v19

## Orden de actualización

1. En Supabase > SQL Editor ejecutá completo:

`supabase/sql/2026_04_27_v19_roles_inventory_conditions_bulk.sql`

2. Reemplazá los archivos de la webapp por los de este ZIP.
3. Limpiá caché del navegador con Ctrl+F5.

## Qué corrige

- Lista completa de permisos en Nuevo/Editar rol.
- Persistencia real de condiciones y colores en `inventory_conditions`.
- Alerta SweetAlert2 al crear condición, duplicar condición o modificar color.
- Bloqueo de duplicados de condiciones por nombre normalizado.
- Campo Cantidad en Nuevo/Editar inventario.
- Botón duplicar insumo/equipo en acciones de inventario.
- Edición masiva ampliada: estado, condición, marca, tipo, empresa/proveedor, número de serie, ubicación, localización, zona y cantidad.

