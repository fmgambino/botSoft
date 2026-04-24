# ISM Robosoft v8.2

## Pasos de actualización

1. En Supabase > SQL Editor ejecutá primero:
   `supabase_patch_v8_2_inventory.sql`
2. Reemplazá los archivos del proyecto por los de este ZIP.
3. Borrá caché / desregistrá Service Worker antes de probar.

## Cambios incluidos

- Importación CSV de inventario reparada con función `admin_create_inventory_asset` de 11 parámetros.
- Importación tolerante a duplicados: si el código/barcode ya existe, actualiza el registro y lo reactiva.
- Barcode visible en modo oscuro y claro.
- Impresión de etiquetas con texto `by Ing. Gambino`.
- Formulario de inventario con condición seleccionable/escribible.
- Condiciones con colores visuales.
- Paginación 5/10/25/50/100 con primera/anterior/siguiente/última.
- Botón de gráficos de inventario con barras, torta o línea.
- Icono de eliminar equipo corregido.
