# V49 - Header mobile fijo y redirección de notificaciones

Correcciones aplicadas:

- Header mobile ahora queda fijo arriba con `position: fixed`, no depende de `sticky` ni del contenedor de scroll.
- Se agrega compensación de espacio superior en `.main-area` para que el contenido no quede tapado.
- Redirección de notificaciones del header centralizada en V49.
- Click en una notificación marca como leída y navega al módulo detectado:
  - Soporte/Ticket/Incidencia -> `supportTickets`
  - Préstamos/Devoluciones -> `loanManagement`
  - Inventario/Stock/Barcode/Serie -> `inventory`
  - Inicio de sesión/Usuarios -> `users`
  - Ver historial -> `notifications`
- Se eliminó el uso de `preventDefault()` en eventos touch/pointer pasivos; la captura final usa solo `click` con `{ passive:false }`.
- Cache busting actualizado: `styles.css?v=49.0` y `app.js?v=49.0`.

No requiere SQL adicional sobre V47/V48.
