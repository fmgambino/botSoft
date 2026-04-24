# ISM Robosoft v6.7 - Inventario optimizado

## Cambios incluidos

- Buscador de inventario corregido: ahora permite escribir de corrido con debounce.
- Alta/edición de inventario ampliada con Marca, Empresa/Proveedor, Locación física y Zona.
- Importación CSV real para inventario con mapeo automático de la planilla ISM.
- Impresión masiva e individual de barcodes.
- Vista de inventario ampliada con columnas nuevas.
- SQL Supabase actualizado con columnas, vista y RPC compatibles.

## Actualización

1. Ejecutar `supabase_backend_inventario_abm_usuarios.sql` en Supabase SQL Editor.
2. Reemplazar los archivos del proyecto en GitHub Pages o servidor local.
3. Borrar caché y desregistrar Service Worker si el navegador sigue cargando JS viejo.

## CSV soportado

Detecta encabezados como: `ID`, `Código de Barras`, `Descripción`, `ESTADO`, `MARCA`, `Categoría`, `Proveedor`, `Ubicación`, `Zona`, `N° serie`, `Cantidad`, `Stock Actual`.
