# ISM Robosoft v6.8 - Reparación Usuarios/Supabase

## Qué corrige

- Error al ejecutar SQL: `cannot change name of input parameter p_role_code`.
- Error al eliminar usuario: `column requester_id does not exist`.
- Error al crear usuario por conflicto de tipo de `role_id` en bases que venían de versiones anteriores.
- RPC finales robustas usando `public.roles.id%TYPE`, compatible con instalaciones donde `roles.id` quedó como `uuid` o `bigint`.

## Cómo actualizar

1. Abrí Supabase > SQL Editor.
2. Ejecutá completo el archivo `supabase_backend_inventario_abm_usuarios.sql` incluido en este ZIP.
3. Reemplazá los archivos del proyecto en tu servidor/GitHub Pages.
4. Borrá caché del navegador y desregistrá el Service Worker.
5. Volvé a iniciar sesión y probá crear/eliminar usuario.

> No elimines tu propio usuario administrador desde la sesión activa. La función lo bloquea por seguridad.
