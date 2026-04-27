# ISM Robosoft v20 - Instalación

1. En Supabase → SQL Editor, ejecutá completo:

   `supabase/sql/2026_04_27_v20_inventory_roles_conditions_FINAL.sql`

2. Reemplazá los archivos de tu webapp con este paquete.
3. Refrescá navegador con Ctrl+F5. Si usás Live Server, reinicialo.

## Correcciones incluidas

- Condiciones de inventario persistentes en `inventory_conditions` con color real.
- Alerta SweetAlert2 al crear condición y al cambiar color.
- Bloqueo de condiciones duplicadas por nombre.
- RPC nuevo sin conflictos para crear/editar/duplicar inventario.
- Miniatura de imagen en listado y detalle ampliado 500x500.
- Cantidad en formulario de inventario.
- Duplicar insumo/equipo desde acción individual.
- Edición masiva de estado, condición, marca, tipo, empresa, serie, ubicación, localización, zona y cantidad.
- Popup de roles con lista completa y scroll de permisos.

