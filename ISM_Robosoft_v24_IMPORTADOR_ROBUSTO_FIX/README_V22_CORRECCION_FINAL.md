# V22 corrección final

1. En Supabase > SQL Editor ejecutá completo:
   `supabase/sql/2026_04_27_v22_FIX_FINAL_inventory_teams_profile.sql`

2. Este SQL limpia `inventory_conditions` para cargarlas manualmente desde cero, evita duplicados y crea RPC v22.

3. Reemplazá los archivos del hosting por esta carpeta completa y hacé Ctrl+F5.

4. El barcode automático ahora es numérico para pistola lectora.
