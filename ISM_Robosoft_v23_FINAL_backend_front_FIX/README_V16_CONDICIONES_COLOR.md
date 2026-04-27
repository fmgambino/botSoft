# ISM Robosoft v16 - Fix condiciones y colores

## Qué corrige

- Las condiciones nuevas ahora se guardan en `public.inventory_conditions`.
- El color de una condición existente se actualiza y persiste después de cerrar sesión.
- Se agrega una RPC nueva `save_inventory_condition_v16` para evitar conflictos con funciones antiguas/cacheadas.
- Se deduplican condiciones repetidas por mayúsculas/minúsculas o espacios.

## Instalación

1. Entrá a Supabase > SQL Editor.
2. Ejecutá completo:

```txt
supabase/sql/2026_04_27_v16_inventory_conditions_color_persistence_FIX.sql
```

3. Subí/reemplazá los archivos del proyecto.
4. Hacé Ctrl+F5 o abrí en incógnito.

## Prueba rápida

1. Inventario > editar insumo.
2. En Condición, presioná `+`.
3. Creá una condición con color.
4. Guardá.
5. Cerrá sesión y volvé a entrar.
6. La condición y su color deben seguir disponibles.

Para editar color: seleccionar condición > botón 🎨 > guardar color.
