# ISM Robosoft v6.5

Cambios aplicados:

- Reparado ABM de Usuarios: edición de fecha de nacimiento, título/especialidad, WhatsApp, DNI, estado, rol y foto.
- Mejorada la ventana “Detalle de usuario”: ya no muestra el base64 completo de la imagen como texto largo.
- Foto de perfil persistente en Supabase (`profiles.avatar_url`).
- Para alumnos, el campo título queda bloqueado y se reserva para certificados generados por cursos finalizados del Campus Virtual.
- Eliminación real de usuarios desde el ABM: elimina `profiles` y `auth.users` mediante RPC segura para administradores.
- Footer actualizado con enlace a electronicagambino.com y botón de Cafecito.
- Cache del Service Worker actualizada a v6.5.

## Pasos de actualización

1. En Supabase > SQL Editor, ejecutar `supabase_backend_inventario_abm_usuarios.sql` completo.
2. Subir/reemplazar todos los archivos del proyecto.
3. En el navegador, borrar caché o desregistrar el Service Worker antes de probar:
   DevTools > Application > Service Workers > Unregister.
4. Recargar con Ctrl+F5.
