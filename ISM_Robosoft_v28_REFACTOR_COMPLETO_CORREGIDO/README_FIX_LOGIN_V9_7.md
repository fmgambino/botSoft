# Fix v9.7 - Login Supabase

Se corrigió `js/supabaseClient.js`: tenía un error de sintaxis en la línea de `saveInventoryCondition`, por eso no se inicializaba `window.sb` y el login mostraba:

`Supabase no está configurado. Usá demo o completá config.js.`

## Implementación

1. Reemplazar los archivos del proyecto por los de este ZIP.
2. Abrir en modo incógnito o hacer Ctrl+F5.
3. Si estabas probando como PWA instalada, desinstalar la PWA y volver a abrir desde `index.html`.

## Importante

Los secrets de Edge Functions (`SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`) no configuran el login del navegador. El login lee `js/config.js`.
