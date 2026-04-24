-- Seed inicial
insert into public.roles (code, name, description) values
('administrator', 'Administrador', 'Control total del sistema'),
('teacher', 'Docente', 'Gestiona módulos y equipos asignados'),
('student', 'Alumno', 'Acceso a contenido y seguimiento')
on conflict (code) do nothing;

insert into public.permissions (code, name, module) values
('users.manage', 'Gestionar usuarios', 'usuarios'),
('roles.manage', 'Gestionar roles y permisos', 'seguridad'),
('inventory.manage', 'Gestionar inventario', 'inventario'),
('teams.manage', 'Gestionar equipos', 'equipos'),
('courses.manage', 'Gestionar módulos, lecciones y tareas', 'campus'),
('library.manage', 'Gestionar biblioteca digital', 'biblioteca'),
('notifications.manage', 'Gestionar notificaciones', 'notificaciones'),
('settings.manage', 'Gestionar configuración global', 'configuraciones')
on conflict (code) do nothing;

insert into public.courses (name, level) values
('5°', 'Secundario'),
('6°', 'Secundario')
on conflict do nothing;

insert into public.subjects (name) values
('Robótica'),
('Electrónica'),
('Programación')
on conflict do nothing;

insert into public.inventory_categories (name, description) values
('Microcontroladores', 'Arduino, ESP32 y similares'),
('Sensores', 'Sensores analógicos y digitales'),
('Kits', 'Kits y estructuras robóticas')
on conflict (name) do nothing;

insert into public.system_settings (setting_key, setting_value)
values
('branding', '{"institution_name":"Instituto San Miguel","footer":"ISM ROBOSOFT© 2026"}'),
('ui', '{"default_theme":"dark","allow_theme_switch":true}'),
('notifications', '{"email_enabled":false,"in_app_enabled":true}')
on conflict (setting_key) do nothing;
