# v30 - Soporte Ticket y corrección de eliminación de usuarios

## Cambios incluidos
- Corrección del error al eliminar usuarios causado por referencias en `notifications.created_by` y `notifications.recipient_profile_id`.
- Nuevo módulo **Soporte Ticket** para administradores y docentes.
- Tickets con número trazable, historial, filtros, paginación superior/inferior y tamaños 5/10/25/50/100/500.
- Estados con colores: Pendiente, Aprobado, Rechazado, En proceso, Resolviendo y Resuelto.
- Gestión de incidencias con colores solo para administradores.
- Acciones Ver, Editar, Eliminar y edición/eliminación masiva con checkbox.
- Configuración de copia a canal de Telegram agregada al módulo Configuraciones sin modificar nombre, email ni logo institucional.
- Permisos nuevos para Roles: `support.read`, `support.create`, `support.manage`, `support.status.manage`, `support.delete`.

## Pasos de actualización
1. En Supabase, ejecutar el archivo:
   `supabase/migrations/20260504_support_tickets_and_delete_fix.sql`
2. Subir/reemplazar los archivos del proyecto en producción.
3. Verificar que el rol Administrador tenga los permisos de soporte y que Docente tenga `support.read` y `support.create`.
4. En Configuraciones, cargar Bot Token y Chat ID/Canal para Telegram y activar el envío.

## Nota
Las configuraciones generales existentes de institución, email institucional y logo no fueron cambiadas.
