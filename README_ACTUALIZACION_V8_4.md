# ISM Robosoft v8.4

Corrección del ABM Usuarios:

1. En Supabase > SQL Editor ejecutá completo `supabase_repair_v8_4_users.sql`.
2. Esperá unos segundos o recargá el proyecto para que PostgREST refresque la caché.
3. Reemplazá los archivos del proyecto.
4. Borrá caché del navegador o desregistrá el Service Worker si ves JS viejo.

Corrige el error:
`Could not find the function public.admin_upsert_profile_by_email(...) in the schema cache`.
