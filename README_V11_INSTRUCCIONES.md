# ISM Robosoft v11 - Instrucciones

## 1. Base de datos
En Supabase > SQL Editor ejecutá completo:

`supabase/sql/2026_04_27_v11_roles_loans_notifications.sql`

Este patch:
- Elimina las firmas duplicadas de `admin_update_inventory_asset` y deja una sola función compatible con la webapp.
- Ajusta permisos para que docentes/alumnos no vean Usuarios ni puedan editar/eliminar inventario.
- Habilita Gestión de préstamos y Notificaciones para todos los perfiles.
- Crea `notifications`, `notifications_frontend_view`, `loans_frontend_view` y `create_loan_request`.
- Envía notificaciones al administrador cuando se crea una solicitud de préstamo.
- Envía notificaciones al registrar nuevos activos de inventario.

## 2. Webapp
Subí/reemplazá todos los archivos del proyecto.
Luego abrí el navegador con Ctrl+F5 o limpiá caché.

## 3. Edge Function
Para crear usuarios, mantené desplegada `rapid-service` o `admin-create-user` con estos secrets:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SERVICE_ROLE_KEY`

La `SERVICE_ROLE_KEY` nunca va en `js/config.js`.

## 4. Comprobaciones
- Administrador: ve Usuarios, Roles, Inventario completo, Préstamos y Notificaciones.
- Docente: no ve Usuarios, no edita/elimina inventario, sí crea solicitudes y ve sus notificaciones.
- Alumno: ve Gestión de préstamos, Notificaciones, Campus y Biblioteca.
