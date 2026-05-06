# ISM Robosoft v29

Correcciones incluidas:
- Notificaciones con fecha/hora de recepción en admin, docentes y alumnos.
- Fecha/hora de lectura visible para administradores, con destinatario.
- Persistencia reforzada de leídas/sin leer.
- Notificación automática solo a administradores cuando se crea un usuario/perfil.
- Fix de edición masiva de imagen: ya no ejecuta la RPC de inventario si solo se cambia la imagen, evitando el error de barcode duplicado.
- La URL/base64 de imagen masiva se aplica directamente sobre `inventory_assets.image_url`.

## Actualización
1. Reemplazar los archivos del proyecto por los de este paquete.
2. Ejecutar en Supabase SQL Editor:
   `supabase/sql/2026_04_28_v29_notificaciones_fechas_admin_imagen_masiva.sql`
3. Limpiar caché del navegador o recargar con Ctrl+F5.
