# ISM ROBOSOFT — actualización v54 (parcial, verificable)

## Cambios implementados
- Inventario: dos botones, **Exportar filtrado** y **Exportar todo**, con diálogo CSV / XLSX / PDF (imprimir y guardar como PDF). Exporta todas las filas que coinciden con los filtros activos, incluso si no están en la página visible. Excel utiliza SheetJS desde CDN, por lo que requiere conexión.
- Dashboard: agenda mensual interactiva para todos los perfiles, con préstamos en violeta y tickets en naranja. La visualización aplica filtros por usuario según el perfil cargado en el cliente; el control de acceso definitivo debe garantizarse con RLS en Supabase.
- Préstamos: al aprobar, ofrece enlace para agregar el evento a Google Calendar en una ventana nueva. No crea eventos sin consentimiento.
- Usuarios: campo email queda marcado de solo lectura en lugar de deshabilitado; NO se habilita el cambio de correo sin backend seguro.

## Pendientes importantes (NO se consideran implementados)
- La edición segura del email de otro usuario requiere una Edge Function administrativa que sincronice Supabase Auth y la fuente de datos de perfiles, con verificación de rol, validación y auditoría. No se debe editar únicamente el perfil ni llamar a `auth.admin` desde GitHub Pages.
- Envío automático de email con enlace a Google Calendar cuando se aprueba un préstamo: requiere conectar evento backend/Edge Function con EmailJS, garantizar destinatario real y evitar envíos duplicados. Por ahora el enlace se ofrece en la interfaz al aprobar.
- La agenda muestra fechas registradas de préstamos y tickets; no implementa todavía una entidad genérica de eventos ni programación de tickets sin fecha propia.
- No se ha validado en una instancia real de Supabase ni con navegador autenticado. Hacer respaldo y probar en entorno de pruebas antes de producción.

## SQL
Esta revisión no agrega migraciones SQL. No ejecutar las migraciones históricas del ZIP sin auditar su estado en Supabase.

## Instalación
Subir los archivos modificados al repositorio GitHub Pages conservando `js/config.js` y credenciales. Evitar subir `.git` o claves privadas. Recargar la aplicación sin caché. Comprobar el filtro de inventario, cada exportación y la agenda con distintos roles.
