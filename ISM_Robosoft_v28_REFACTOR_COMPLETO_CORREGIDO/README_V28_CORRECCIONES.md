# ISM Robosoft v28 - Correcciones aplicadas

## Frontend
- Card de Detalle de Equipo traducida al español.
- Separación correcta de Mentores y Alumnos.
- Eliminado el `[object Object]` en integrantes.
- Agregadas fotos de perfil de mentores/alumnos y logo del equipo en el detalle.
- Editor masivo de inventario con carga de imagen por archivo o URL para todos los seleccionados.
- Click en imagen del insumo abre popup con imagen grande.
- Área Alumno: habilitado botón Enviar notificación.
- Mi Perfil Alumno: elimina Accesos rápidos y refresca los datos editados sin duplicar información.
- Notificaciones: lectura/sin leer persistente mediante RPC v28.
- Etiquetas de código de barras: texto `by Ing. Gambino` reducido.

## Base de datos
Ejecutar en Supabase SQL Editor:

`supabase/sql/2026_04_28_v28_equipos_imagenes_notificaciones_perfil.sql`

