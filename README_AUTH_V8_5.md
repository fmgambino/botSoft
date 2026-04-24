# ISM Robosoft v8.5 - Login, registro, recuperación y aprobación

## 1) Supabase SQL
Ejecutar completo en SQL Editor:

`supabase_auth_users_v8_5.sql`

Esto repara funciones RPC, crea registro inactivo por defecto, vista `users_abm_view`, trigger de Auth y validación de perfiles.

## 2) URL Configuration
En Supabase > Authentication > URL Configuration:

- Site URL: `https://fmgambino.github.io`
- Redirect URLs:
  - `https://fmgambino.github.io/index.html`
  - `https://fmgambino.github.io/reset-password.html`
  - `http://127.0.0.1:5501/index.html`
  - `http://127.0.0.1:5501/reset-password.html`

## 3) Edge Function para alta desde Administrador
Para que el administrador cree usuarios sin habilitarlos manualmente en Auth:

```bash
supabase functions deploy admin-create-user
supabase secrets set SERVICE_ROLE_KEY="TU_SERVICE_ROLE_KEY"
```

La función está en:

`supabase/functions/admin-create-user/index.ts`

No pegues la service role key en `config.js`.

## 4) Email HTML
En Supabase > Authentication > Email Templates, usar:

`supabase_email_template_invite.html`

El logo usa URL pública: `https://fmgambino.github.io/assets/img/logo-Coordinacion-Robotica.png`.

## 5) Flujo nuevo
- Login: permite entrar solo si `profiles.is_active = true`.
- Registro público: crea solicitud inactiva.
- Recuperar contraseña: envía enlace a `reset-password.html`.
- Alta por admin: crea usuario Auth con Edge Function, deja perfil inactivo y envía invitación para contraseña.
