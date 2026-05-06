# ISM Robosoft v33 - Fix final Soporte Ticket

## SQL obligatorio
Ejecutar en Supabase SQL Editor:

`supabase/migrations/20260504_v33_rls_notifications_config_fix.sql`

## Cambios incluidos
- Fix RLS definitivo para `support_ticket_incidents`: reconoce roles `administrator`, `admin` y permisos `support.manage` / `support.status.manage`.
- RPC segura `admin_upsert_support_ticket_incident()` para evitar bloqueos 403 al crear incidencias.
- Notificaciones automáticas al crear tickets, con solicitante, fecha/hora, urgencia, sala e incidencia.
- Vista previa de campanita con fondo/acento según color de incidencia.
- Persistencia de Configuraciones generales en `app_settings`.
- Eliminados accesos demo visibles y deshabilitado login demo por usuario/clave.
- `registro.html` redirige al login; el alta queda solo por administrador.
- Cache busting actualizado a `v=10.0`.

## Después de ejecutar SQL
1. Esperar unos segundos o ejecutar `notify pgrst, 'reload schema';`.
2. Subir los archivos del ZIP.
3. Abrir la app con Ctrl+F5.
