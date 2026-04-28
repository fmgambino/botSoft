# ISM Robosoft v27 — refactor completo

Incluye correcciones pedidas:

- Barcodes únicos, visibles y generados en CODE128 legible por pistola.
- Impresión de etiquetas con códigos únicos por insumo.
- Popup de imagen grande al hacer clic en la miniatura del insumo.
- Eliminada la card lateral “Inventario optimizado”; inventario usa todo el ancho.
- Notificaciones: “Limpiar contador” actualiza sin repintar como no leído luego de la alerta.
- Usuarios: curso y división se guardan y aparecen en detalle.
- Equipos: muestra integrantes, cursos y divisiones.
- Realtime/Ajax: refresco por canales Supabase para inventario, notificaciones, perfiles y equipos.

## Instalación

1. Subir/reemplazar todos los archivos del ZIP en tu hosting.
2. En Supabase SQL Editor, ejecutar:
   `supabase/sql/2026_04_28_v27_refactor_barcode_ajax_usuarios_equipos.sql`
3. Limpiar caché del navegador o recargar con Ctrl+F5.
4. Verificar que `js/config.js` conserva tus claves Supabase.

## Nota de impresión de barcodes

La app genera visualmente CODE128 y normaliza números a longitud escaneable. Para mejor lectura, imprimir al 100%, sin “ajustar a página”, en buena calidad.
