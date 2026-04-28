# ISM Robosoft v13 - Notificaciones con destinatarios reales

## Qué corrige
- El formulario de Notificaciones ahora lista usuarios o equipos según el destino elegido.
- `Usuario individual` y `Selección múltiple` muestran usuarios cargados desde Supabase.
- `Mis equipos` / `Equipo específico` muestra equipos cargados desde Supabase.
- El envío usa la RPC `send_notification` y crea notificaciones reales en Supabase para los destinatarios.

## Pasos
1. Subí/reemplazá los archivos del proyecto.
2. En Supabase → SQL Editor, ejecutá completo:

`supabase/sql/2026_04_27_v13_notifications_recipients_FIX.sql`

3. Refrescá la app con Ctrl+F5.

## Nota
Para que aparezcan destinatarios reales, deben existir perfiles activos en `profiles` y equipos en `teams`. Para notificar a un equipo, el equipo debe tener integrantes en `team_members`.
