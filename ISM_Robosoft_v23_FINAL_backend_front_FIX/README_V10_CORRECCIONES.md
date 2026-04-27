# ISM Robosoft v10 - Correcciones aplicadas

## 1) Error inventario: RPC ambiguo
Ejecutar en Supabase > SQL Editor:

`supabase/sql/2026_04_27_v10_fix_rpc_roles_avatar.sql`

Corrige el error:

`Could not choose the best candidate function between public.admin_update_inventory_asset(...)`

La causa era que existían dos funciones RPC con el mismo nombre y mismos parámetros, pero con tipos diferentes (`text` y `uuid`).

## 2) Foto de perfil al editar usuario
El formulario de edición ahora permite cargar imagen desde archivo local o pegar URL/base64.

## 3) Perfil docente
El usuario logueado ahora se normaliza con `role_code` (`teacher`, `student`, `administrator`) para que el docente vea el Panel Docente y no el panel administrador.

## Orden recomendado
1. Ejecutar el SQL v10 en Supabase.
2. Subir/reemplazar los archivos del proyecto.
3. Hacer Ctrl+F5 o borrar caché del navegador.
