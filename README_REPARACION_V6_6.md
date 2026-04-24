# ISM Robosoft v6.6

Correcciones incluidas:

- Eliminación real de usuarios corrigiendo `requester_id` inexistente por `requester_profile_id`, `teacher_profile_id` y `created_by`.
- Alta de usuario ampliada: nombre, email, contraseña inicial, rol, DNI, WhatsApp, fecha de nacimiento, título/especialidad y foto de perfil.
- Corrección del error `invalid input syntax for type bigint` en `admin_upsert_profile_by_email`.
- Edición de fecha de nacimiento y título para Administrador/Docente.
- Foto de perfil persistente en `profiles.avatar_url`.
- Footer moderno integrado a la UI.
- Botón Cafecito movido al pie del menú lateral.
- Cards del módulo Equipos con acciones Ver, Editar y Eliminar.
- Alta/edición de equipos con Mentor Docente, Mentor Suplente y hasta 5 alumnos seleccionados desde usuarios cargados.

## Pasos de actualización

1. En Supabase, ejecutar completo `supabase_backend_inventario_abm_usuarios.sql` desde SQL Editor.
2. Reemplazar los archivos del proyecto por esta versión.
3. Borrar caché del navegador y desregistrar Service Worker si usás GitHub Pages/PWA.
4. Volver a iniciar sesión y probar Usuarios y Equipos.

> Nota: la creación de perfiles ABM queda en Supabase `profiles`. Para que un usuario pueda iniciar sesión con contraseña, también debe existir en Supabase Authentication. Desde frontend público no se debe usar service_role; para creación real de Auth con contraseña conviene una Edge Function protegida.
