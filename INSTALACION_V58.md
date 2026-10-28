# ISM ROBOSOFT v58 — Agrupaciones y correo

## Instalación
1. Respaldar archivos y datos.
2. Publicar el contenido de este paquete sobre la versión v57, preservando las configuraciones propias.
3. **Volver a desplegar** Supabase Edge Function `ism-user-mail` con el contenido de `supabase/functions/ism-user-mail/index.ts`. El cambio de CORS no funciona hasta desplegarla.
4. Mantener activada la verificación JWT y los secretos `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`.
5. Recargar la web con Ctrl+F5.

## Cambios
- Botón Eliminar agrupación en el inventario y en la ventana de agrupaciones; confirma antes de eliminar. El borrado elimina la agrupación y sus vínculos, **no los activos**.
- Edición de componentes con tabla, casillas de selección, seleccionar resultados, seleccionar todos, quitar selección, acción individual de quitar, contador y búsqueda de varios códigos/series separados por coma, punto y coma o salto de línea.
- Buscar `Carrito STEAM` en Inventario muestra el grupo, pero no todos sus activos miembros solo por pertenecer a ese grupo. Los activos siguen apareciendo si coinciden por su propio nombre, código, serie, etc.
- CORS en `ism-user-mail` permite la aplicación publicada y el entorno de prueba `127.0.0.1:5501` y `localhost:5501`. No se usa `*`.
- La interfaz intenta mostrar el error real devuelto por la Edge Function.

## SQL
**No se requiere una nueva migración SQL para v58**: utiliza las tablas `inventory_groups` e `inventory_group_members` creadas en v56 y el campo `color` de v57. Si la base no tiene las migraciones v56 y v57, ejecutarlas antes.

## Pruebas
- Inventario → Agrupaciones: seleccionar dos series con coma, guardar, recargar, confirmar que persisten.
- Quitar un componente y verificar que el activo individual continúa en Inventario.
- Eliminar una agrupación y verificar que sus activos siguen existiendo.
- Buscar el nombre de una agrupación: no deben aparecer automáticamente sus activos por su pertenencia.
- Usuarios → Correo → Bienvenida: verificar envío en EmailJS, Logs de `ism-user-mail` y Gmail. Probar desde localhost **solo en entorno de desarrollo**.

## Alcance de validación
Se comprobó sintaxis de `js/app.js` y estructura del ZIP, pero no se probó contra la base de producción ni se ejecutó una entrega real por EmailJS. Un HTTP 403 adicional en consola puede corresponder a RLS de otras consultas; revisar el endpoint exacto en Network.
