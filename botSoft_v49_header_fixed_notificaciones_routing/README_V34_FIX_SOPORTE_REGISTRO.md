# ISM Robosoft v34

## Cambios
- Restaura página de registro para Docentes/Alumnos/Administradores solicitantes.
- Agrega ruta limpia `/registro` mediante archivo extensionless, `.htaccess`, `_redirects` y `vercel.json`.
- Mantiene oculto el acceso demo en login.
- Corrige Soporte Ticket usando RPC SECURITY DEFINER para evitar falsos 403 por RLS al crear/editar tickets e incidencias.
- Agrega notificaciones automáticas al crear o actualizar tickets.

## Supabase
Ejecutar completo:
`supabase/migrations/20260504_v34_support_rpc_rls_registro_fix.sql`

Luego refrescar la app con Ctrl+Shift+R.
