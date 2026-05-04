# ISM Robosoft v37

Cambios incluidos:

- Vista previa de notificaciones por hover/click con scroll.
- Branding editable en Configuraciones: logo, nombre, subtítulo, email y polling.
- Aplicación en tiempo real por AJAX/localStorage y persistencia en Supabase.
- Botón Registrarse del login apuntando a `/registro.html`.
- Zona horaria Argentina para fechas de app.
- Mejoras Mobile First: header compacto y navegación inferior en mobile.
- Tickets privados: administradores ven todos; docentes/alumnos solo los propios.
- RPC/RLS para guardar, editar estado, eliminar y listar tickets respetando privacidad.
- Notificación a administradores al iniciar/cerrar sesión y registro de duración.

Ejecutar primero en Supabase:

`supabase/migrations/20260504_v37_mobile_branding_private_tickets.sql`

Luego reemplazar archivos del hosting y hacer Ctrl+F5.
