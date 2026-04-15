# Mapeo de la planilla de inventario

## Hoja: Inventario
Columnas detectadas:
- ID
- Código de Barras
- Descripción
- Etiquetas
- ESTADO
- MARCA
- Categoría
- Proveedor
- Fecha de Ingreso
- Fecha de Vencimiento
- Cantidad
- Stock Actual
- Ubicación
- Domicilio
- Latitud
- Longitud
- Mapa

## Mapeo sugerido
- `ID` -> `inventory_assets.asset_code`
- `Código de Barras` -> `inventory_assets.barcode`
- `Descripción` -> `inventory_catalog_items.name`
- `Etiquetas` -> `inventory_assets.tags`
- `ESTADO` -> `inventory_asset_status_history.condition_note` + `inventory_assets.status_id`
- `MARCA` -> `inventory_brands.name`
- `Categoría` -> `inventory_categories.name`
- `Proveedor` -> `inventory_suppliers.name`
- `Fecha de Ingreso` -> `inventory_assets.received_at`
- `Fecha de Vencimiento` -> `inventory_assets.expiration_date`
- `Cantidad` -> `inventory_lots.quantity_received`
- `Stock Actual` -> `inventory_lots.quantity_available`
- `Ubicación` -> `inventory_locations.name`
- `Domicilio` -> `inventory_locations.address`
- `Latitud` -> `inventory_locations.latitude`
- `Longitud` -> `inventory_locations.longitude`
- `Mapa` -> `inventory_locations.map_url`

## Hoja: Movimientos
- Fecha -> `inventory_transactions.created_at`
- Tipo -> `inventory_transactions.transaction_type`
- Código de Barras -> `inventory_assets.barcode`
- Producto -> `inventory_catalog_items.name`
- Lote -> `inventory_lots.lot_code`
- Cantidad -> `inventory_transaction_lines.quantity`
- Motivo / Observación -> `inventory_transactions.notes`
