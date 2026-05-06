# V46 - Fix inventario + notificaciones

Cambios incluidos:

1. **Inventario / alta por duplicado**
   - Se agregó `supabase/sql/2026_05_06_v46_inventory_notifications_routing_fix.sql`.
   - Corrige el error `duplicate key value violates unique constraint "uq_notifications_exact_dedupe"`.
   - El trigger de notificaciones de inventario ya no bloquea la creación/edición del activo si la notificación está duplicada.

2. **Campana / historial de notificaciones**
   - Corrección de rutas: soporte ahora redirige a `supportTickets` y no a una vista inexistente.
   - Clic en notificación y clic en **Ver historial** funcionan con delegación capturante para evitar que el dropdown cierre antes de navegar.

3. **Alertas superiores derechas**
   - Se elevó el `z-index` de los toast de SweetAlert2.
   - Se fuerza render sobre `document.body` para evitar recortes por contenedores del header.

## Pasos de actualización

1. Subir/reemplazar los archivos del proyecto.
2. En Supabase SQL Editor, ejecutar completo:
   `supabase/sql/2026_05_06_v46_inventory_notifications_routing_fix.sql`
3. Limpiar caché del navegador o abrir en incógnito para evitar JS/CSS viejo.
