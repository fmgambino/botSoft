# ISM Robosoft v25 - Refactor usuarios, notificaciones e inventario

Cambios incluidos:

1. Alta de usuarios desde Administrador
- El administrador puede crear usuarios con rol Administrador, Docente o Alumno.
- Si el rol elegido es Alumno, el formulario muestra y exige Curso y División.
- Si el rol elegido no es Alumno, oculta Curso/División y muestra Título/Especialidad.

2. Mi Perfil de Alumno
- Si el usuario logueado es Alumno, el rol queda fijo como Alumno.
- El alumno no puede modificar su rol ni estado desde Mi Perfil.
- Se muestran labels y selects de Curso y División.

3. Notificaciones
- Todas las notificaciones mantienen el remitente visible usando el formato “De: ...”.
- Se agregó checkbox “Seleccionar todo”.
- Se agregaron acciones masivas: Marcar leídas, Marcar sin leer y Limpiar contador.
- El contador de la campanita se recalcula luego de acciones masivas.

4. Inventario
- Después de alta manual o importación CSV se fuerza recarga desde Supabase y render inmediato.
- La consulta de inventario ahora pide hasta 5000 registros para evitar quedarse con la página inicial.
- Se desduplican registros en memoria por id/código/barcode.
- El importador mantiene salto de duplicados y no corta todo el proceso por un duplicado.

5. Cache/PWA
- Se actualizó el nombre de cache del Service Worker a v25 para evitar que el navegador siga usando archivos viejos.

Después de copiar esta versión, hacer hard refresh o cerrar y abrir la app. Si estaba instalada como PWA, reinstalar o limpiar datos del sitio.
