# Corrección de login Supabase v9.6

El error `Supabase no está configurado. Usá demo o completá config.js` NO se corrige con Edge Functions > Secrets.

Los secrets (`SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`) son solo para Edge Functions. El login del navegador lee `js/config.js`.

Verificá que en el servidor publicado exista este archivo:

```js
window.APP_CONFIG = {
  SUPABASE_URL: 'https://pwailgchrwnwhutdfujb.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_jGoEuOf6vQHte6A429eAaw_Un_HzNH9',
  STORAGE_BUCKET: 'avatars',
  SITE_URL: '',
  APP_NAME: 'ISM Robosoft',
  DEMO_MODE: false
};
```

Pasos después de subir esta versión:

1. Abrir la web.
2. Presionar Ctrl+F5.
3. Si sigue fallando, ir a DevTools > Application > Service Workers > Unregister.
4. En Application > Storage, ejecutar Clear site data.
5. Volver a cargar.

Esta versión cambia el Service Worker para no cachear `js/config.js`, `js/supabaseClient.js`, `auth.js` ni `js/app.js`.
