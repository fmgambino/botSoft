# ISM Robosoft v8.7 - Recuperacion de contraseña reparada

Cambios:
- Login, registro y recuperacion separados.
- Recuperacion usa URL automatica segun ambiente: localhost o GitHub Pages.
- Si Supabase rechaza el redirect configurado, reintenta usando el Site URL del proyecto.

Configurar en Supabase > Authentication > URL Configuration:

Site URL:
https://fmgambino.github.io

Redirect URLs recomendadas:
http://127.0.0.1:5501/reset-password.html
http://127.0.0.1:5501/botSoft/reset-password.html
https://fmgambino.github.io/reset-password.html
https://fmgambino.github.io/botSoft/reset-password.html

Si el error persiste, revisar Authentication > Email Templates y SMTP.
