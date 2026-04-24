# Actualización botSoft v6.1 - Supabase

## Pasos para publicar

1. Entrá a Supabase > SQL Editor.
2. Ejecutá completo el archivo `supabase_backend_inventario_abm_usuarios.sql` incluido en este proyecto.
   - Si ya lo habías ejecutado antes, podés volver a ejecutarlo: usa `create if not exists` y agrega el patch v6.1.
3. En Supabase > Authentication > Users, verificá que exista este usuario:
   - `roboticanivelsecundario@institutosanmiguel.edu.ar`
4. Definile una contraseña desde Supabase si todavía no la tiene.
5. Si tenés Email Confirmations activo, confirmá el email o desactivá temporalmente esa opción en Authentication > Providers > Email.
6. Subí estos archivos a GitHub Pages reemplazando los anteriores.
7. Abrí la app, recargá con Ctrl+F5 e iniciá sesión.

## Qué se corrigió

- Login real contra Supabase Auth.
- Sincronización automática del perfil público cuando el usuario existe en Auth pero no en `public.profiles`.
- El correo `roboticanivelsecundario@institutosanmiguel.edu.ar` queda como Administrador.
- Módulo Admin > Usuarios conectado a `users_abm_view`.
- Alta de usuarios desde Admin usando Auth signUp y asignación de rol posterior.
- Módulo Admin > Inventario conectado a `inventory_frontend_view` y RPC `admin_create_inventory_asset`.
- Mensajes de error de login más claros.

## Importante

El frontend usa la anon/public key, que no puede crear usuarios con privilegios de servicio. Por eso el alta de usuarios funciona con `auth.signUp`. Si tu proyecto tiene confirmación de email activa, el usuario creado deberá confirmar el email o deberás confirmarlo desde Supabase.
