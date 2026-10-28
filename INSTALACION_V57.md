# ISM ROBOSOFT v57 — agrupaciones integradas en inventario y préstamos

## Instalación
1. Hacer copia de seguridad de la base de datos y del sitio.
2. Haber ejecutado previamente `supabase/migrations/20261028_v56_inventory_groups.sql`.
3. Ejecutar **únicamente** `supabase/migrations/20261028_v57_inventory_group_color.sql` en Supabase → SQL Editor. No ejecutar el volcado de esquema como SQL.
4. Publicar los archivos de este ZIP en GitHub Pages, conservando la configuración propia del proyecto.
5. Recargar sin caché (Ctrl+F5) e iniciar sesión.

## Cambios
- Cada agrupación es una **fila virtual** de tipo Agrupación en la tabla Inventario, con nombre, cantidad y color. No duplica ni crea un activo físico en `inventory_assets`.
- El botón Ver detalle de esa fila muestra descripción, cantidad y lista de activos con código, serie y estado.
- En Inventario → Agrupaciones de insumos se configura el color al crear y editar.
- Solicitud de préstamo: una **única lista** de selección múltiple muestra primero las agrupaciones coloreadas y después los activos individuales. Se eliminó el campo independiente «Agrupaciones completas».
- Seleccionar una agrupación agrega automáticamente sus componentes individuales a la solicitud y deja constancia del nombre de la agrupación en observaciones. No se admiten agrupaciones vacías o con activos no disponibles.
- Los activos individuales permanecen identificables por serie y código de barras.

## Comprobaciones recomendadas
- Crear una agrupación con 2 activos y elegir color; verificar fila en Inventario y detalle.
- Solicitar préstamo seleccionando la agrupación; confirmar que se agregan ambos activos y que figura su nombre en observaciones.
- Cambiar estado de uno de los activos a no disponible; verificar que el grupo ya no se puede seleccionar.
- Verificar permisos RLS existentes de v56 y probar con administrador y docente.

## Alcance
El código se validó con `node --check`, pero no se realizó una prueba conectada a la instancia real de Supabase. El despliegue de la migración es obligatorio para persistir el color.
