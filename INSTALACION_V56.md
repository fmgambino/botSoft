# ISM ROBOSOFT v56 — agrupaciones y reenvío de correos

## Instalación (obligatoria para que funcione)
1. Respaldar el sitio y la base de datos antes de instalar.
2. Supabase → SQL Editor: ejecutar `supabase/migrations/20261028_v56_inventory_groups.sql` una sola vez. El script crea agrupaciones, componentes, registro de envíos y políticas RLS.
3. Supabase → Edge Functions: desplegar `ism-user-mail` con `supabase/functions/ism-user-mail/index.ts`. Mantener JWT habilitado.
4. Edge Function Secrets: `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, `SITE_ORIGIN=https://fmgambino.github.io` (además de los valores automáticos `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`). Nunca poner la service role key en el sitio.
5. EmailJS: la plantilla debe aceptar `to_email`, `to_name`, `subject`, `title`, `message`, `details`, `event_date`, `action_url` y `action_text`.
6. Publicar el contenido de este ZIP en la raíz del sitio, conservando `config.js` si contiene claves de entorno distintas. Recargar sin caché.

## Uso
- Inventario → Agrupaciones de insumos → Crear → Administrar componentes. Un activo solo puede pertenecer a una agrupación. Cada equipo conserva su serie y código.
- Gestión de préstamos → Nueva solicitud → Agrupaciones completas. Al elegir una agrupación se agregan los códigos individuales de todos sus activos a la solicitud, y se registra el nombre del grupo en observaciones. La aprobación y devolución siguen los estados existentes por activo.
- Usuarios → botón ✉ en Acciones (administrador) → elegir bienvenida, acceso/registro, recupero o recordatorio de préstamos. El servidor obtiene el correo real desde Supabase Auth. Para recupero y acceso se genera un enlace de un solo uso; no se envían contraseñas. El recordatorio solo se envía si hay préstamos futuros aprobados.

## Seguridad y alcance de verificación
- Las operaciones de agrupación requieren usuario administrador activo en políticas RLS.
- La función de correo exige sesión autenticada, valida rol de administrador y limita a un envío por usuario/tipo/minuto; registra el intento.
- Se verificó la sintaxis JavaScript y la integridad del ZIP. No se han ejecutado migraciones ni pruebas de envío contra tu proyecto remoto. Los correos de recuperación dependen de la configuración correcta de redirecciones de Supabase Auth.
- El botón de bienvenida es una notificación, no crea cuentas. Para usuarios sin email en Auth la función devuelve un error claro.
