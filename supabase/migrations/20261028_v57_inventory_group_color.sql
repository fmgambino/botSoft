-- ISM ROBOSOFT v57 - ejecutar una vez después de la migración v56.
-- No modifica los activos individuales ni los préstamos existentes.
ALTER TABLE public.inventory_groups
  ADD COLUMN IF NOT EXISTS color text NOT NULL DEFAULT '#8b5cf6';
ALTER TABLE public.inventory_groups
  DROP CONSTRAINT IF EXISTS inventory_groups_color_hex_check;
ALTER TABLE public.inventory_groups
  ADD CONSTRAINT inventory_groups_color_hex_check CHECK (color ~ '^#[0-9A-Fa-f]{6}$');
