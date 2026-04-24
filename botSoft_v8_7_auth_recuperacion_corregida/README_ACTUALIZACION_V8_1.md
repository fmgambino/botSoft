# ISM Robosoft v8.1 - Inventario corregido

## Pasos de actualización

1. En Supabase > SQL Editor, ejecutar completo el archivo:
   `supabase_patch_inventario_v8_1.sql`

2. Reemplazar los archivos del proyecto por los de este ZIP.

3. Borrar caché del navegador y, si está activo, desregistrar el Service Worker.

## Correcciones incluidas

- Importación CSV de inventario reparada.
- Compatibilidad con el CSV `Control_Inventario_ISM_FINAL_DASHBOARD - Inventario.csv`.
- Manejo de códigos de barra repetidos del CSV para evitar conflictos `unique`.
- Alta de inventario con marca, empresa/proveedor, locación, zona, serie y barcode.
- Vista previa de barcode legible en modo claro y oscuro.
- Impresión de barcodes con SVG embebido, sin depender de fondos CSS del navegador.
- Fallback frontend para Supabase cuando la cache de funciones aún no refrescó.

