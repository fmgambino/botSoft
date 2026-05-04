# V36 - Visibilidad privada de Soporte Ticket

Cambios incluidos:

- Administradores pueden ver, editar y eliminar todos los tickets.
- Docentes y alumnos solo pueden ver, editar y eliminar tickets propios.
- Tickets cargados por administradores solo quedan visibles para administradores.
- La vista `support_tickets_frontend_view` se recrea con `security_invoker = true` para respetar RLS.
- El módulo Soporte Ticket queda habilitado también para alumnos.
- La edición masiva de estado queda reservada a administradores.

## SQL a ejecutar

Ejecutar en Supabase SQL Editor:

`supabase/migrations/20260504_v36_support_ticket_visibility_rls.sql`
