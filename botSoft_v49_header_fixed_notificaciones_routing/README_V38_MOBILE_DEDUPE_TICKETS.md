# V38 - Mobile First, tickets, notificaciones y permisos

1. Ejecutar en Supabase:
   `supabase/migrations/20260504_v38_mobile_dedupe_ticket_sequence_permissions.sql`
2. Publicar archivos.
3. Forzar recarga: Ctrl+F5.

Cambios:
- Diseño Mobile First reforzado para tablas, modales, header y navegación inferior.
- Corrección de error 409 en tickets: número generado por secuencia en Supabase y no por conteo del cliente.
- Notificaciones de soporte deduplicadas.
- Preview de campanita con scroll y sin mostrar destinatarios.
- Iconos visibles en modo oscuro.
- Campus controlado por permisos `courses.read` / `courses.manage`; se oculta por defecto para docentes/alumnos.
- Visibilidad privada: administradores ven todo; docentes/alumnos solo tickets propios.
