# V48 - Notificaciones header + header sticky mobile

Cambios aplicados:

1. Redirección de notificaciones del header
   - Se reemplazó el ruteo por un handler final V48.
   - Se normalizan acentos y aliases de módulos.
   - Tickets/Soporte redirige a `supportTickets`.
   - Préstamos redirige a `loanManagement`.
   - Inventario redirige a `inventory`.
   - Inicio de sesión / usuarios redirige a `users`.
   - `Ver historial` redirige siempre a `notifications`.
   - Se agregaron listeners en `pointerdown`, `mousedown`, `touchstart` y `click` en fase capture para evitar que el dropdown se cierre antes de ejecutar la navegación.
   - Las filas del dropdown ahora incluyen `onclick` defensivo y `data-target-view`.

2. Mobile
   - Header `.topbar` / `.page-header` queda sticky mientras se scrollea.
   - Se elevó z-index del header y del popup de notificaciones para evitar que queden por detrás de tablas/cards.

Actualización:
- Reemplazar los archivos del hosting con esta versión.
- No requiere SQL adicional respecto de V47.
