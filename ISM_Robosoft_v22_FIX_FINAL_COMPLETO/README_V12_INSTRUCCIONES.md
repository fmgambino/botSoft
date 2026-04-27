# ISM Robosoft v12 - instrucciones

## 1) Base de datos
En Supabase > SQL Editor, ejecutá completo:

`supabase/sql/2026_04_27_v12_notifications_loans_status_FIX.sql`

Corrige:
- RPC duplicado/conflictivo `admin_update_inventory_asset`.
- RPC faltante `create_loan_request`.
- Cambio de estado de préstamos con `admin_update_loan_status`.
- Notificaciones reales para nuevas solicitudes y cambios de estado.
- Vista `loans_frontend_view` sin errores de columnas renombradas.
- Vista `notifications_frontend_view`.

## 2) Frontend
Subí/reemplazá todos los archivos del proyecto.

Cambios incluidos:
- Al hacer clic en una notificación con `section = loanManagement`, abre Gestión de préstamos.
- Al aprobar/rechazar/devolver una solicitud, actualiza Supabase y refresca la tabla.
- Marca la notificación como leída.

## 3) Caché
Después de actualizar, ejecutar Ctrl+F5. Si usás PWA instalada, desinstalar/instalar o limpiar datos del sitio.
