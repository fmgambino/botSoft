# Actualización v6.2 - Backend conectado Supabase

## Qué corrige

- Error `client.rpc(...).catch is not a function`.
- Alta de usuario desde el ABM Admin.
- Acciones Ver / Editar / Eliminar en Usuarios.
- Acciones Ver / Editar / Eliminar en Inventario.
- Carga conectada desde Supabase para Dashboard, Usuarios, Roles, Equipos, Inventario y Gestión de préstamos.
- Vistas y RPC necesarias para equipos y préstamos.

## Pasos obligatorios

1. En Supabase, abrir **SQL Editor**.
2. Ejecutar el archivo `supabase_backend_inventario_abm_usuarios.sql` completo.
3. Reemplazar en GitHub Pages / servidor todos los archivos de este ZIP.
4. Verificar `config.js`:

```js
window.APP_CONFIG = {
  SUPABASE_URL: 'https://pwailgchrwnwhutdfujb.supabase.co',
  SUPABASE_ANON_KEY: 'TU_PUBLIC_ANON_KEY'
};
```

## Nota importante sobre usuarios Auth

Desde un frontend público no se puede crear usuarios Auth de forma administrativa con service_role por seguridad. El ABM guarda el perfil en la base. Si Supabase bloquea el alta Auth desde frontend, creá el usuario también en **Authentication > Users > Add user** con el mismo email para que pueda iniciar sesión.

El usuario administrador existente queda activo por el script si el email es:
`roboticanivelsecundario@institutosanmiguel.edu.ar`
