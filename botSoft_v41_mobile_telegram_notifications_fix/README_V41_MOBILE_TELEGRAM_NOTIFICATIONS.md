# V41 Mobile + notificaciones + Telegram

- Corrige `openTeamDetail is not defined`.
- Agrega navegación mobile real flotante inferior con menú hamburguesa.
- Header mobile compacto con logo institucional.
- Ajusta dropdown de notificaciones para que no salga recortado.
- Evita errores 404/CORS de Telegram si el token está incompleto o inválido.
- Agrega migración v41 con RPCs faltantes y deduplicación segura.
- Corrige 409 por duplicados de notificaciones y número de ticket.

Ejecutar primero:
`supabase/migrations/20260504_v41_mobile_notifications_telegram_fix.sql`
