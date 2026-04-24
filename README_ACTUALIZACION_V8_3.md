# ISM Robosoft v8.3

## Pasos
1. En Supabase > SQL Editor ejecutar completo: `supabase_repair_v8_3_inventory.sql`.
2. Reemplazar archivos del proyecto en GitHub Pages/local.
3. Borrar caché y desregistrar Service Worker si el navegador sigue mostrando JS viejo.

## Correcciones incluidas
- Reparación de vistas dependientes con `DROP VIEW ... CASCADE`.
- RPC `admin_create_inventory_asset` con firma compatible con el frontend.
- Importación CSV tolerante a duplicados: actualiza si encuentra `asset_code` o `barcode` existente.
- Código de barras visible en modo claro y oscuro.
- Etiquetas con `by Ing. Gambino`.
- Condiciones de insumo con selector y alta rápida con color.
- Paginación 5/10/25/50/100.
- Gráficos de inventario por estado, condición, categoría, marca o ubicación.
