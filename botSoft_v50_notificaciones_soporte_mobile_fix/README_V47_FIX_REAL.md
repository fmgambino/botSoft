# V47 FIX REAL — Inventario, notificaciones y alertas

## Qué corrige

1. **Inventario / duplicar insumo**: elimina el bloqueo `409` causado por `uq_notifications_exact_dedupe` y reemplaza la deduplicación rígida por inserción segura.
2. **Campana del header**: al hacer clic en una notificación redirige al módulo correcto: Soporte Ticket, Inventario, Préstamos, Usuarios, etc.
3. **Ver historial**: abre siempre el Centro de notificaciones.
4. **Alertas superior derecha**: fuerza z-index y `target: document.body` para que los toast sean visibles sobre header, overlays y paneles.

## Pasos obligatorios

1. Subir/reemplazar los archivos del proyecto.
2. En Supabase SQL Editor ejecutar completo:

`supabase/sql/2026_05_06_v47_FIX_REAL_inventory_notifications_click_toast.sql`

3. Limpiar caché del navegador o abrir en incógnito.

## Archivos modificados

- `js/app.js`
- `styles.css`
- `supabase/sql/2026_05_06_v47_FIX_REAL_inventory_notifications_click_toast.sql`
