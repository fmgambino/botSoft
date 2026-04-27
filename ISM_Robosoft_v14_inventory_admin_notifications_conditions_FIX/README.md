# Versión conectada a Supabase

Leer primero: `README_CONEXION_SUPABASE.md`.

# ISM Robosoft PWA

PWA responsive para la gestión administrativa del Laboratorio de Robótica del Instituto San Miguel.

## Esta entrega
Esta versión incorpora una **Fase Inventario** mucho más desarrollada, tomando como referencia la planilla adjunta `Control_Inventario_ISM_FINAL_DASHBOARD.xlsx`.

## Incluye
- Login listo para GitHub Pages.
- Panel Administrador, Docente y Alumno.
- Sidebar colapsable al hacer clic en el logo.
- Header con toggle tema, fullscreen, notificaciones y acceso a perfil.
- Módulos base: usuarios, roles, equipos, inventario, campus docente, biblioteca, notificaciones, perfil y configuraciones.
- **Módulo de inventario completo a nivel de diseño funcional**:
  - catálogo trazable
  - activos serializados y consumibles
  - préstamos y devoluciones
  - historial de ubicaciones
  - bitácora de movimientos
  - generación de código de barras interno para insumos sin número de serie
  - proveedores, categorías y estados
- Service Worker y manifest para comportamiento PWA.
- Esquema SQL para Supabase con tablas, relaciones y RLS inicial.
- SQL adicional especializado para inventario.

## Estructura
- `index.html`: login.
- `app.html`: shell principal.
- `styles.css`: estilos responsive.
- `auth.js`: login y demo.
- `app.js`: navegación y vistas.
- `supabase.js`: helper de conexión.
- `config.example.js`: variables a completar.
- `sql/`: scripts para crear la base.
- `docs/modulo_inventario.md`: diseño del módulo de inventario.
- `docs/mapeo_planilla_inventario.md`: mapeo de la planilla al nuevo modelo.
- `sql/inventory_module_supabase.sql`: modelo robusto para inventario y trazabilidad.

## Despliegue en GitHub Pages
1. Subí el contenido del proyecto a un repositorio.
2. En GitHub, activá Pages desde la rama principal.
3. Completá `config.example.js` con tu URL y anon key de Supabase.
4. Ejecutá `sql/supabase_schema.sql`.
5. Ejecutá `sql/inventory_module_supabase.sql`.
6. Creá usuarios en Auth y sus perfiles en la tabla `profiles`.

## Importante
- El frontend sigue siendo una base lista para integrarse con CRUD real.
- El SQL nuevo deja preparado el backend del módulo de inventario para hacerlo de forma robusta.
- La planilla adjunta está pensada para migrarse a una tabla staging o a un importador CSV/Sheet -> Edge Function -> tablas finales.
