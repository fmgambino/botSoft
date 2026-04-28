# V24 Correcciones aplicadas

## Importador de inventario robusto
- El CSV ya no usa `ID` de la planilla como `asset_code`.
- Solo usa `asset_code` o `barcode` si vienen en columnas explícitas.
- Si un código o barcode ya existe, la RPC v24 genera uno nuevo automáticamente.
- Evita que una importación parcial bloquee los reintentos: los duplicados se saltan y se informa cantidad de saltados.
- Se agregan RPC: `admin_create_inventory_asset_v24`, `admin_update_inventory_asset_v24`.

## Inventario: múltiples condiciones
- Visualización de varias condiciones separadas por coma, punto y coma o barra vertical.
- En el formulario de insumo se habilita selección múltiple de condiciones.

## Notificaciones
- La vista `notifications_frontend_view` expone `sender` y `sender_name`.
- El frontend muestra siempre `De: remitente — mensaje`.

## Usuarios / alumnos
- El formulario de nuevo usuario queda como creación de alumno.
- Rol fijo: Alumno.
- Se agregan Curso y División al formulario.

## Instalación
1. Subir archivos del ZIP reemplazando los anteriores.
2. Ejecutar en Supabase SQL Editor:
   `supabase/sql/2026_04_28_v24_importador_robusto_notificaciones_usuarios.sql`
3. Recargar la app.
