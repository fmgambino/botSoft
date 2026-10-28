# ISM ROBOSOFT v55 — Correo de usuarios desde Supabase Auth

## Diagnóstico
La tabla `public.profiles` no tiene columna `email`. Los correos de acceso están en `auth.users`. La interfaz anterior consultaba `profiles`/`users_abm_view` y mostraba vacío, y el campo de edición tenía `readonly`.

## Instalación
1. Respaldar la web y Supabase antes de actualizar.
2. Reemplazar los archivos web con este paquete (conservar la configuración de producción `js/config.js` si difiere de la incluida).
3. En Supabase → Edge Functions → Deploy a new function, crear **`ism-admin-user-email`** y pegar `supabase/functions/ism-admin-user-email/index.ts`.
4. Desplegar la función con verificación de JWT habilitada para el proyecto si utiliza claves JWT legacy; la función valida de todos modos el token y el rol desde `profiles` + `roles`. Asegurar que los secretos del servidor `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` estén disponibles (normalmente son automáticos en Edge Functions). Nunca copiar la service role key al navegador o repositorio.
5. Probar con sesión de administrador activo: Usuarios → Ver detalle → Editar email → Guardar → recargar. Verificar también el nuevo correo en Supabase → Authentication → Users.
6. Si la función devuelve 403, comprobar que `roles.code` del administrador sea `administrator`, `admin`, `superadmin` o `super_admin`, y `profiles.is_active=true`.
7. Si el listado queda vacío, inspeccionar logs de `ism-admin-user-email`, la consola del navegador y las políticas de acceso a `profiles`.

## SQL
**No ejecutar migraciones históricas**: esta corrección no requiere nueva columna ni SQL. La función usa `auth.admin.listUsers` y `auth.admin.updateUserById` desde un entorno protegido. Es necesario desplegar la función; reemplazar solamente archivos estáticos no alcanza.

## Consideraciones
- La modificación administrativa del correo se confirma inmediatamente en Supabase Auth (`email_confirm: true`). Es una operación privilegiada, auditada en `user_audit_log` cuando es posible. La institución debe validar previamente la titularidad del nuevo correo.
- El envío de una notificación por correo sobre el cambio no está incluido; las configuraciones de plantillas de Supabase Auth son independientes.
- No se realizaron pruebas reales sobre el proyecto remoto ni se modificó su base de datos desde aquí.
