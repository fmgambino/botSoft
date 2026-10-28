# ISM ROBOSOFT — EmailJS y Google OAuth (actualización parcial)

## Google OAuth
1. Supabase Dashboard → Authentication → Providers → Google: habilitar proveedor y configurar Client ID y Client Secret de Google Cloud.
2. En Google Cloud, configurar como URI de redirección autorizada la URL callback indicada por Supabase: `https://<PROJECT_REF>.supabase.co/auth/v1/callback`.
3. Supabase → Authentication → URL Configuration: establecer Site URL al dominio real de GitHub Pages y agregar `https://<usuario>.github.io/<repositorio>/index.html` y `https://<usuario>.github.io/<repositorio>/reset-password.html` como Redirect URLs. Adaptar al dominio propio si corresponde.
4. Los usuarios de Google sin perfil activo NO ingresan; requieren aprobación. No activar alta automática de administradores por metadatos OAuth.

## EmailJS (Edge Function)
- Función incluida: `supabase/functions/ism-email-notify/index.ts`. Desplegar con `supabase functions deploy ism-email-notify` (JWT habilitado).
- Configurar secretos con `supabase secrets set EMAILJS_SERVICE_ID=... EMAILJS_TEMPLATE_ID=... EMAILJS_PUBLIC_KEY=... EMAILJS_PRIVATE_KEY=... SITE_ORIGIN=https://<usuario>.github.io EMAIL_LOGO_URL=https://<ruta-publica-logo>`.
- En EmailJS crear plantilla con destinatario `{{to_email}}`, asunto `{{subject}}` y cuerpo HTML `{{{message_html}}}` (según soporte de HTML sin escape del editor de plantillas). Probar en un buzón real.
- El endpoint requiere JWT de administrador activo; acepta `kind` entre `new_user`, `inventory`, `profile_changed`, `loan`, `support`, `library`, `access` y campos `recipient`, `name`, `title`, `details` (objeto). No exponer la clave privada en GitHub Pages.
- IMPORTANTE: **No se han conectado disparadores automáticos** para los siete eventos; la función permite envío manual autenticado desde una integración futura. Tampoco reemplaza los emails de recuperación/confirmación de Supabase Auth: para unificar su diseño se deben configurar las plantillas de Authentication → Email Templates y un proveedor SMTP adecuado. No usar EmailJS desde el navegador para emails de seguridad.
- Los correos de préstamos necesitan enriquecer `details` con curso/división/docente mediante relaciones `teams`, `courses`, `divisions`, `profiles`. La estructura SQL suministrada no incluye tablas de biblioteca ni control de acceso físico: identificar sus fuentes antes de conectar triggers.

## Verificación
- Probar inicio Google con usuario aprobado y usuario pendiente.
- Probar Edge Function con JWT administrador y rechazos 401/403 para usuarios comunes.
- Probar el diseño oscuro en Gmail y Outlook; algunos clientes limitan CSS y HTML dinámico.
- GitHub Pages no ejecuta backend: Supabase Edge Functions aloja la lógica privada.
