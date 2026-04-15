# Módulo de Inventario ISM Robosoft

## Objetivo
Controlar en forma integral cada equipo, kit, componente o insumo del Laboratorio de Robótica, sabiendo:

- qué es
- dónde está
- quién lo tiene
- cuándo lo pidió
- en qué estado salió
- en qué estado volvió
- cuándo volvió
- qué movimientos tuvo
- si tiene serie real o barcode interno

## Alcance funcional

### 1. Catálogo unificado
Cada activo o insumo se registra con:
- código interno
- barcode
- número de serie
- descripción
- marca
- categoría
- proveedor
- ubicación
- estado
- fecha de ingreso
- fecha de vencimiento, si aplica
- stock mínimo
- observaciones

### 2. Tipos de control
Se contemplan tres modos:
- **Activo serializado**: un objeto físico individual con seguimiento unitario.
- **Consumible**: insumo sin serie, controlado por cantidad/lote.
- **Lote**: grupo de unidades homogéneas con un mismo ingreso.

### 3. Trazabilidad
Cada salida o cambio registra:
- responsable solicitante
- docente o equipo
- fecha/hora
- estado al salir
- fecha prevista de devolución
- estado al devolver
- observaciones
- usuario que operó el movimiento

### 4. Código de barras
Si el insumo no tiene serie de fábrica:
- el sistema genera un código interno con prefijo `ISMROB`
- se guarda como barcode oficial
- se puede imprimir como etiqueta

### 5. Historial
Se separan:
- movimientos de inventario
- ubicaciones históricas
- préstamos/devoluciones
- eventos de mantenimiento

## Migración desde planilla
La planilla actual tiene estas hojas útiles:
- Inventario
- Movimientos
- Proveedores
- MARCAS
- Categorías
- HistorialUbicaciones
- STATUS

## Integración con Supabase
El modelo recomendado está en `sql/inventory_module_supabase.sql`.
