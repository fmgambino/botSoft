# ISM Robosoft v23

1. En Supabase > SQL Editor, ejecutar completo:

`supabase/sql/2026_04_27_v23_FINAL_BACKEND_FIX.sql`

2. Esperar 5 segundos y hacer Ctrl+F5.
3. Reemplazar todos los archivos de la webapp por los de este ZIP.

Notas:
- `inventory_assets.id` es UUID por diseño de tu base; no puede reiniciarse a 1 sin romper claves foráneas. El SQL reinicia `asset_code`/barcode automático desde 1.
- Las condiciones se limpian con `DELETE FROM inventory_conditions;` para que puedas cargarlas manualmente sin duplicados.
- El barcode automático ahora es solo numérico. Si escribís un barcode manual con letras/guiones, se limpian caracteres no numéricos.
