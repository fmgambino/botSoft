# ISM Robosoft - Proyecto conectado a Supabase

Este paquete ya incluye la integración para conectar los módulos **Usuarios** e **Inventario** con Supabase.

## 1) Ejecutar SQL

En Supabase abrí **SQL Editor** y ejecutá:

```text
sql/supabase_backend_complete.sql
```

Ese archivo crea tablas, vistas, funciones RPC, RLS, roles, permisos y el módulo de inventario.

## 2) Configurar la conexión

Abrí `config.js` y pegá la **anon public key** de tu proyecto Supabase:

```js
window.APP_CONFIG = {
  SUPABASE_URL: 'https://pwailgchrwnwhutdfujb.supabase.co',
  SUPABASE_ANON_KEY: 'TU_ANON_PUBLIC_KEY',
  STORAGE_BUCKET: 'avatars',
  APP_NAME: 'ISM Robosoft',
  DEMO_MODE: false
};
```

La URL ya quedó cargada. La anon key se obtiene en Supabase: **Project Settings > API > Project API keys > anon public**.

## 3) Crear el primer administrador

1. En Supabase > Authentication > Users, creá un usuario.
2. Copiá el UUID del usuario.
3. Ejecutá este SQL cambiando el UUID:

```sql
update public.profiles
set role_id = (select id from public.roles where code = 'administrator'),
    full_name = 'Administrador General',
    is_active = true
where id = 'PEGAR_UUID_DEL_USUARIO';
```

## 4) Abrir el proyecto

Como es una app estática, podés abrirla con Live Server o cualquier servidor local:

```bash
python -m http.server 8080
```

Luego entrá a:

```text
http://localhost:8080
```

## Módulos conectados

- Login con Supabase Auth.
- Usuarios desde `users_abm_view`.
- Alta de usuarios mediante Supabase Auth `signUp`.
- Inventario desde `inventory_frontend_view`.
- Alta rápida de insumos/equipos mediante RPC `admin_create_inventory_asset`.
- Seguridad con RLS y permisos por rol.

## Archivos principales modificados

- `config.js`
- `supabase.js`
- `auth.js`
- `app.js`
- `sql/supabase_backend_complete.sql`
