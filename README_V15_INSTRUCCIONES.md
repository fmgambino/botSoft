# ISM Robosoft v15 - Inventario

## 1. Ejecutar SQL
En Supabase > SQL Editor ejecutá completo:

`supabase/sql/2026_04_27_v15_inventory_conditions_images_charts.sql`

Esto corrige:
- Persistencia real de condiciones nuevas.
- Edición persistente de colores de condiciones.
- RPC de alta/edición de inventario sin firmas duplicadas.
- Campo `image_url` para insumos/equipos.
- Vista de inventario con imagen.
- Notificaciones a administradores por alta/cambio de estado/cambio de condición.

## 2. Publicar archivos
Subí/reemplazá todos los archivos del proyecto.

## 3. Limpiar caché
Después de publicar: Ctrl+F5. Si usás PWA, DevTools > Application > Service Workers > Unregister y Clear site data.

## 4. Gráficos
En Inventario > Ver gráficos podés elegir barras, torta o línea, con filtros por fecha, estado, condición y tipo.
