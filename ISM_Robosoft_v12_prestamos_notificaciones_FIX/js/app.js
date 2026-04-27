const icons = {
  dashboard: `<svg viewBox="0 0 24 24" class="icon"><path d="M3 13h8V3H3v10Zm10 8h8V11h-8v10ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z"></path></svg>`,
  users: `<svg viewBox="0 0 24 24" class="icon"><path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4ZM8 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4ZM8 14c-.29 0-.62.02-.97.05C5.7 14.16 2 14.82 2 17v2h4v-1c0-1.46.8-2.68 2.29-3.64A9.79 9.79 0 0 0 8 14Z"></path></svg>`,
  roles: `<svg viewBox="0 0 24 24" class="icon"><path d="m12 1 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4Zm0 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6c-1.83 0-3.8.93-4 2v1h8v-1c-.2-1.07-2.17-2-4-2Z"></path></svg>`,
  team: `<svg viewBox="0 0 24 24" class="icon"><path d="M16 11c1.66 0 2.99-1.79 2.99-4S17.66 3 16 3s-3 1.79-3 4 1.34 4 3 4Zm-8 0c1.66 0 2.99-1.79 2.99-4S9.66 3 8 3 5 4.79 5 7s1.34 4 3 4Zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.95 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5Z"></path></svg>`,
  inventory: `<svg viewBox="0 0 24 24" class="icon"><path d="M21 16V8l-9-5-9 5v8l9 5 9-5Zm-9 2.7-6-3.33V9.3l6 3.33 6-3.33v6.07l-6 3.33Zm0-8.37L6.04 7 12 3.7 17.96 7 12 10.33Z"></path></svg>`,
  courses: `<svg viewBox="0 0 24 24" class="icon"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-7 9.18V17l7 4 7-4v-4.82l-7 3.82-7-3.82Z"></path></svg>`,
  library: `<svg viewBox="0 0 24 24" class="icon"><path d="M18 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10v-2H8V4h10V2Zm-3 4h5a1 1 0 0 1 1 1v15l-3-2-3 2V7a1 1 0 0 1 1-1Z"></path></svg>`,
  notifications: `<svg viewBox="0 0 24 24" class="icon"><path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 1 0-14 0v5L3 18v1h18v-1l-2-2Z"></path></svg>`,
  profile: `<svg viewBox="0 0 24 24" class="icon"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4Z"></path></svg>`,
  settings: `<svg viewBox="0 0 24 24" class="icon"><path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.16 7.16 0 0 0-1.63-.94l-.36-2.54a.49.49 0 0 0-.49-.42h-3.84a.49.49 0 0 0-.49.42l-.36 2.54c-.58.22-1.12.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.83 14.52a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.51.41 1.05.72 1.63.94l.36 2.54c.05.24.25.42.49.42h3.84c.24 0 .44-.18.49-.42l.36-2.54c.58-.22 1.12-.53 1.63-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"></path></svg>`,
  logout: `<svg viewBox="0 0 24 24" class="icon"><path d="M10 17v-3H3v-4h7V7l5 5-5 5Zm4-14h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5v-2h5V5h-5V3Z"></path></svg>`,
  fullscreen: `<svg viewBox="0 0 24 24" class="icon"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" class="icon"><path d="M12 5c5.05 0 9.27 3.11 11 7-1.73 3.89-5.95 7-11 7S2.73 15.89 1 12c1.73-3.89 5.95-7 11-7Zm0 2C8.36 7 5.17 9.06 3.33 12 5.17 14.94 8.36 17 12 17s6.83-2.06 8.67-5C18.83 9.06 15.64 7 12 7Zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"></path></svg>`,
  edit: `<svg viewBox="0 0 24 24" class="icon"><path d="m3 17.25 9.81-9.81 3.75 3.75L6.75 21H3v-3.75ZM14.87 5.38l1.77-1.77a1.5 1.5 0 0 1 2.12 0l1.63 1.63a1.5 1.5 0 0 1 0 2.12l-1.77 1.77-3.75-3.75Z"></path></svg>`,
  trash: `<svg viewBox="0 0 24 24" class="icon"><path d="M6 7h12l-1 14H7L6 7Zm3-4h6l1 2h4v2H4V5h4l1-2Z"></path></svg>`,
  import: `<svg viewBox="0 0 24 24" class="icon"><path d="M12 3v10.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L11 13.17V3h1ZM5 19h14v2H5v-2Z"></path></svg>`,
  export: `<svg viewBox="0 0 24 24" class="icon"><path d="M12 21V10.83l-3.59 3.58L7 13l5-5 5 5-1.41 1.41L13 10.83V21h-1ZM5 3h14v2H5V3Z"></path></svg>`,
  barcode: `<svg viewBox="0 0 24 24" class="icon"><path d="M4 5h1v14H4V5Zm3 0h2v14H7V5Zm4 0h1v14h-1V5Zm3 0h3v14h-3V5Zm5 0h1v14h-1V5Z"></path></svg>`,
  chart: `<svg viewBox="0 0 24 24" class="icon"><path d="M4 19h16v2H4zM7 10h2v7H7zm4-4h2v11h-2zm4 6h2v5h-2z"></path></svg>`,
  filter: `<svg viewBox="0 0 24 24" class="icon"><path d="M3 5h18v2l-7 7v5l-4 2v-7L3 7V5Z"></path></svg>`,
  access: `<svg viewBox="0 0 24 24" class="icon"><path d="M12 2a7 7 0 0 0-7 7v3H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V9a7 7 0 0 0-7-7Zm5 10H7V9a5 5 0 0 1 10 0v3Zm-5 2a2 2 0 0 1 1 3.73V19h-2v-1.27A2 2 0 0 1 12 14Z"></path></svg>`,
  approve: `<svg viewBox="0 0 24 24" class="icon"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path></svg>`,
  reject: `<svg viewBox="0 0 24 24" class="icon"><path d="m18.3 5.71-1.41-1.41L12 9.17 7.11 4.3 5.7 5.71 10.59 10.6 5.7 15.49l1.41 1.41L12 12.01l4.89 4.89 1.41-1.41-4.89-4.89z"></path></svg>`,
  returnIcon: `<svg viewBox="0 0 24 24" class="icon"><path d="M19 7v4h-4l1.4-1.4-2.9-2.9a3 3 0 0 0-4.2 0L4 12l1.4 1.4 5.3-5.3a1 1 0 0 1 1.4 0l2.9 2.9L13 13h6V7zM5 17v-4h4l-1.4 1.4 2.9 2.9a3 3 0 0 0 4.2 0L20 12l-1.4-1.4-5.3 5.3a1 1 0 0 1-1.4 0l-2.9-2.9L11 11H5v6z"></path></svg>`
};

const demoUser = JSON.parse(localStorage.getItem('ism_demo_user') || 'null') || {
  name: 'Administrador General', role: 'administrator', email: 'admin@ism.edu.ar', avatar_url: './assets/avatar-default.svg'
};

const state = {
  user: demoUser,
  currentView: 'dashboard',
  charts: [],
  inventoryPage: 1,
  inventoryPageSize: 10,
  inventoryConditions: [
    { name: 'Nuevo', color: '#3b82f6' },
    { name: 'Usado', color: '#6366f1' },
    { name: 'Reparado', color: '#22c55e' },
    { name: 'Falta piezas', color: '#f59e0b' },
    { name: 'Defectuoso', color: '#ef4444' },
    { name: 'Usado, completo', color: '#8b5cf6' },
    { name: 'Usado, completo, faltantes', color: '#f97316' }
  ],
  filters: { period: 'month', inventoryState: 'all', inventoryType: 'all', inventorySearch: '', userSearch: '', userRole: 'all' },
  notificationsOpen: false,
  users: [
    { id: 1, name: 'Fernando Gambino', role: 'Administrador', email: 'fgambino@ism.edu.ar', whatsapp: '+54 9 11 5555 1111', dni: '30111222', status: 'Activo' },
    { id: 2, name: 'María López', role: 'Docente', email: 'mlopez@ism.edu.ar', whatsapp: '+54 9 11 4444 2222', dni: '28999888', status: 'Activo' },
    { id: 3, name: 'Lucas Méndez', role: 'Docente', email: 'lmendez@ism.edu.ar', whatsapp: '+54 9 11 4000 1000', dni: '29666777', status: 'Activo' },
    { id: 4, name: 'Thiago Benjamín Luna', role: 'Alumno', email: 'thiago.luna@ism.edu.ar', whatsapp: '+54 9 11 3333 1111', dni: '49442589', status: 'Pendiente' },
    { id: 5, name: 'Tomás Cáceres', role: 'Alumno', email: 'tcaceres@ism.edu.ar', whatsapp: '+54 9 11 2222 7777', dni: '48205464', status: 'Activo' }
  ],
  rolesData: [
    { id: 'administrator', code: 'administrator', name: 'Administrador', description: 'Control total del sistema', permissions: ['users.read','users.manage','roles.manage','inventory.read','inventory.manage','inventory.loan','inventory.approve'] },
    { id: 'teacher', code: 'teacher', name: 'Docente', description: 'Gestiona módulos, equipos e inventario asignado', permissions: ['users.read','inventory.read','inventory.loan','inventory.approve'] },
    { id: 'student', code: 'student', name: 'Alumno', description: 'Consulta contenido, préstamos y notificaciones', permissions: ['inventory.read','inventory.loan'] }
  ],
  teams: [
    { id: 1, name: 'Equipo Rover A', teachers: ['María López', 'Lucas Méndez'], students: 8, courses: ['6° C', '6° B'], divisions: ['C', 'B'], project: 'Rover autónomo' },
    { id: 2, name: 'Equipo AeroLab', teachers: ['María López'], students: 6, courses: ['5° A'], divisions: ['A'], project: 'Drones educativos' },
    { id: 3, name: 'Equipo Maker Mix', teachers: ['Lucas Méndez', 'María López'], students: 10, courses: ['4° A', '5° B', '6° C'], divisions: ['A', 'B', 'C'], project: 'IoT y automatización' }
  ],
  inventory: [
    { id: 1, code: 'AR000322', item: 'Kit Prog. de las Cosas', type: 'Equipo', serial: 'KIT-ISM-322', barcode: 'ISM-AR000322', status: 'Disponible', condition: 'Usado, completo', assignedTo: 'Depósito', requestedAt: '-', returnedAt: '-', teacher: '-', location: 'Armario A1' },
    { id: 2, code: 'AR000311', item: 'Kit Prog. de las Cosas', type: 'Equipo', serial: 'KIT-ISM-311', barcode: 'ISM-AR000311', status: 'Prestado', condition: 'Usado, dañado, falta piezas', assignedTo: 'Equipo Rover A', requestedAt: '2026-04-14 10:00', returnedAt: '-', teacher: 'María López', location: 'Taller revisión' },
    { id: 3, code: 'AR000362', item: 'Kit Prog. de las Cosas', type: 'Equipo', serial: '', barcode: 'ISM-BAR-000362', status: 'Disponible', condition: 'Nuevo', assignedTo: 'Depósito', requestedAt: '-', returnedAt: '-', teacher: '-', location: 'Depósito' },
    { id: 4, code: 'SEN-0021', item: 'Sensor ultrasónico', type: 'Insumo', serial: '', barcode: 'ISM-BAR-0021', status: 'Disponible', condition: 'Nuevo', assignedTo: 'Depósito', requestedAt: '-', returnedAt: '-', teacher: '-', location: 'Gaveta S2' },
    { id: 5, code: 'ROB-0098', item: 'Placa Arduino UNO', type: 'Equipo', serial: 'ARD-U-0098', barcode: 'ISM-ROB-0098', status: 'En mantenimiento', condition: 'Revisión', assignedTo: 'Laboratorio', requestedAt: '2026-04-10 09:30', returnedAt: '2026-04-12 13:20', teacher: 'Lucas Méndez', location: 'Mesa técnica' }
  ],
  modules: [
    { id: 1, title: 'Electrónica aplicada', teacher: 'María López', status: 'Publicado', lessons: 8, tasks: 4, evaluations: 2, visibility: 'Solo equipos asignados', code: 'ELEC-ISM-26', accessKey: 'robotica26', enrolled: ['Thiago Benjamín Luna'], team: 'Equipo Rover A' },
    { id: 2, title: 'Programación de robots', teacher: 'Lucas Méndez', status: 'Borrador', lessons: 5, tasks: 3, evaluations: 1, visibility: 'Visible para todos', code: 'PROG-ROB-26', accessKey: 'motores', enrolled: ['Tomás Cáceres'], team: 'Equipo Maker Mix' },
    { id: 3, title: 'Diseño e impresión 3D', teacher: 'María López', status: 'Publicado', lessons: 6, tasks: 2, evaluations: 1, visibility: 'Visible para todos', code: 'IMP3D-26', accessKey: 'makerlab', enrolled: [], team: 'Abierto' }
  ],
  studentCourses: [
    { id: 1, title: 'Electrónica aplicada', teacher: 'María López', team: 'Equipo Rover A', progress: 68, lessons: 8, tasks: 4, evaluations: 2, access: 'Incripto', visibility: 'Equipo asignado' },
    { id: 2, title: 'Diseño e impresión 3D', teacher: 'María López', team: 'Abierto', progress: 0, lessons: 6, tasks: 2, evaluations: 1, access: 'Disponible con código', visibility: 'Visible para todos' }
  ],
  library: [
    { id: 1, title: 'Manual Arduino ISM', type: 'PDF', area: 'Electrónica' },
    { id: 2, title: 'Guía Diseño 3D', type: 'PDF', area: 'Fabricación digital' },
    { id: 3, title: 'Seguridad del laboratorio', type: 'Video', area: 'Normas' }
  ],
  notifications: [
    { id: 1, title: 'Préstamo vencido', message: 'El kit AR000311 debía devolverse hoy a las 16:00.', unread: true, section: 'inventory' },
    { id: 2, title: 'Ingreso de inventario', message: 'Se registraron 6 sensores ultrasónicos nuevos.', unread: true, section: 'inventory' },
    { id: 3, title: 'Evaluativo publicado', message: 'Electrónica aplicada tiene un nuevo evaluativo.', unread: false, section: 'courses' },
    { id: 4, title: 'Equipo mixto actualizado', message: 'Equipo Maker Mix ahora tiene dos docentes asignados.', unread: true, section: 'team' }
  ],
  audit: [
    { date: 'Abr 10', loans: 2, returns: 1, issues: 0 },
    { date: 'Abr 11', loans: 4, returns: 2, issues: 1 },
    { date: 'Abr 12', loans: 3, returns: 3, issues: 0 },
    { date: 'Abr 13', loans: 5, returns: 2, issues: 2 },
    { date: 'Abr 14', loans: 6, returns: 3, issues: 1 },
    { date: 'Abr 15', loans: 4, returns: 5, issues: 0 }
  ],
  loans: [
    { id: 1, requester: 'María López', team: 'Equipo Rover A / 6°C', date: '2026-04-16', from: '08:00', to: '11:20', items: ['AR000322','SEN-0021'], notes: 'Práctica de sensores', status: 'Pendiente' },
    { id: 2, requester: 'Lucas Méndez', team: 'Maker Mix / 5°B', date: '2026-04-15', from: '13:00', to: '16:00', items: ['ROB-0098'], notes: 'Clase de programación', status: 'Aprobado' },
    { id: 3, requester: 'María López', team: 'AeroLab / 5°A', date: '2026-04-14', from: '09:00', to: '10:30', items: ['AR000311'], notes: 'Devuelto con revisión', status: 'Devuelto' }
  ],
  accessLogs: [
    { id: 1, user: 'Thiago Benjamín Luna', role: 'Alumno', card: 'RFID-1001', category: 'Alumno', room: 'Lab. Robótica', entry: '2026-04-15 07:58', exit: '2026-04-15 10:02', inside: false },
    { id: 2, user: 'Tomás Cáceres', role: 'Alumno', card: 'RFID-1002', category: 'Alumno', room: 'Lab. Robótica', entry: '2026-04-15 08:02', exit: '-', inside: true },
    { id: 3, user: 'María López', role: 'Docente', card: 'RFID-2001', category: 'Docente', room: 'Sala Informática', entry: '2026-04-15 07:40', exit: '-', inside: true }
  ],
  currentCourseScreen: 'list',
  selectedStudentCourse: null,
  courseContentTab: 'lesson'
};

const roleViews = {
  administrator: ['dashboard', 'users', 'roles', 'team', 'inventory', 'loanManagement', 'accessControl', 'courses', 'library', 'notifications', 'profile', 'settings'],
  teacher: ['dashboard', 'team', 'inventory', 'loanManagement', 'courses', 'library', 'notifications', 'profile'],
  student: ['dashboard', 'loanManagement', 'courses', 'library', 'notifications', 'profile']
};

const baseLabels = {
  administrator: {
    dashboard: ['Dashboard', 'Vista general con métricas, filtros y gráficos del laboratorio'],
    users: ['Usuarios', 'ABM con roles, permisos y perfil extendido'],
    roles: ['Roles y permisos', 'Perfiles, permisos por módulo y alcance'],
    team: ['Equipos', 'Equipos mixtos con múltiples docentes y cursos/divisiones'],
    inventory: ['Inventario', 'Trazabilidad por serie o código de barras, préstamos y devoluciones'],
    loanManagement: ['Gestión de préstamos', 'Solicitudes, aprobaciones, devoluciones y seguimiento horario'],
    accessControl: ['Control de acceso', 'Historial RFID, permanencia, personas dentro y acciones de gestión'],
    courses: ['Campus docente', 'Módulos, lecciones, tareas y evaluativos'],
    library: ['Biblioteca digital', 'Recursos del laboratorio disponibles para consulta'],
    notifications: ['Notificaciones', 'Avisos masivos, individuales y por equipo'],
    profile: ['Mi perfil', 'Ver y editar datos personales y foto'],
    settings: ['Configuraciones', 'Parámetros globales del sistema y branding institucional']
  },
  teacher: {
    dashboard: ['Dashboard docente', 'Resumen de equipos, clases, inventario solicitado y actividad reciente'],
    team: ['Equipos asignados', 'Equipos mixtos, cursos y divisiones a cargo'],
    inventory: ['Inventario', 'Solicitud de préstamo, estado de insumos y seguimiento de devoluciones'],
    loanManagement: ['Gestión de préstamos', 'Tus solicitudes, estados y devoluciones'],
    courses: ['Campus docente', 'Tus cursos, módulos, lecciones, tareas y evaluativos'],
    library: ['Biblioteca digital', 'Recursos para tus clases y laboratorios'],
    notifications: ['Notificaciones', 'Avisos recibidos y envío a equipos asignados'],
    profile: ['Mi perfil', 'Datos del docente y foto de perfil']
  },
  student: {
    dashboard: ['Dashboard alumno', 'Cursos inscriptos, tareas pendientes y actividad reciente'],
    loanManagement: ['Gestión de préstamos', 'Tus solicitudes, estados y devoluciones'],
    courses: ['Campus alumno', 'Cursos inscriptos y cursos disponibles con código de acceso'],
    library: ['Biblioteca digital', 'Material de consulta disponible'],
    notifications: ['Notificaciones', 'Avisos académicos y del laboratorio'],
    profile: ['Mi perfil', 'Datos personales y seguimiento académico']
  }
};

const nav = [
  { key: 'dashboard', icon: 'dashboard', label: { administrator: 'Dashboard', teacher: 'Dashboard', student: 'Dashboard' } },
  { key: 'users', icon: 'users', label: { administrator: 'Usuarios' } },
  { key: 'roles', icon: 'roles', label: { administrator: 'Roles y permisos' } },
  { key: 'team', icon: 'team', label: { administrator: 'Equipos', teacher: 'Equipos' } },
  { key: 'inventory', icon: 'inventory', label: { administrator: 'Inventario', teacher: 'Inventario' } },
  { key: 'loanManagement', icon: 'inventory', label: { administrator: 'Gestión de préstamos', teacher: 'Gestión de préstamos', student: 'Gestión de préstamos' } },
  { key: 'accessControl', icon: 'access', label: { administrator: 'Control de acceso' } },
  { key: 'courses', icon: 'courses', label: { administrator: 'Campus docente', teacher: 'Campus docente', student: 'Campus alumno' } },
  { key: 'library', icon: 'library', label: { administrator: 'Biblioteca digital', teacher: 'Biblioteca digital', student: 'Biblioteca digital' } },
  { key: 'notifications', icon: 'notifications', label: { administrator: 'Notificaciones', teacher: 'Notificaciones', student: 'Notificaciones' } },
  { key: 'profile', icon: 'profile', label: { administrator: 'Mi perfil', teacher: 'Mi perfil', student: 'Mi perfil' } },
  { key: 'settings', icon: 'settings', label: { administrator: 'Configuraciones' } }
];

const appContent = document.getElementById('appContent');
const navMenu = document.getElementById('navMenu');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const appShell = document.getElementById('appShell');
const notificationsPreview = document.getElementById('notificationsPreview');
const notificationsBtn = document.getElementById('notificationsBtn');

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function escapeAttr(value) { return escapeHtml(value).replace(/`/g, '&#96;'); }

function barcodePatternSvg(value, opts = {}) {
  const text = String(value || 'ISM-BAR-000001');
  let x = 8;
  const bars = [];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    const widths = [1 + (code % 3), 1 + ((code >> 2) % 2), 2 + ((code >> 3) % 3), 1 + ((code >> 5) % 3)];
    widths.forEach((w, idx) => {
      if (idx % 2 === 0) bars.push(`<rect x="${x}" y="8" width="${w}" height="48" rx="0.2" fill="#050505"/>`);
      x += w + 1;
    });
    x += 1;
  }
  const vb = Math.max(160, x + 8);
  return `<svg class="barcode-svg" viewBox="0 0 ${vb} 64" preserveAspectRatio="none" role="img" aria-label="Barcode ${escapeAttr(text)}" xmlns="http://www.w3.org/2000/svg"><rect class="barcode-bg" width="100%" height="100%" rx="8" fill="#fff"/>${bars.join('')}</svg>`;
}
function barcodePreviewMarkup(value, small = false) {
  const safe = escapeHtml(value || 'ISM-BAR-000001');
  return `<div class="barcode-visual ${small ? 'barcode-visual-sm' : ''}">${barcodePatternSvg(value)}<strong>${safe}</strong></div>`;
}

function conditionPill(value) {
  const name = safeText(value, 'Sin condición');
  const found = (state.inventoryConditions || []).find(c => c.name.toLowerCase() === name.toLowerCase());
  const color = found?.color || '#64748b';
  return `<span class="condition-pill" style="--cond:${escapeAttr(color)}"><i></i>${escapeHtml(name)}</span>`;
}
function addLocalCondition(name, color) {
  const n = String(name || '').trim().replace(/\s+/g, ' ');
  if (n && !state.inventoryConditions.some(c => c.name.toLowerCase() === n.toLowerCase())) state.inventoryConditions.push({ name: n, color: color || '#64748b' });
}

function debounce(fn, wait = 280) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); }; }
function safeText(value, fallback='-') { const v = String(value ?? '').trim(); return v || fallback; }

function getRoleLabels() {
  return baseLabels[state.user.role] || baseLabels.administrator;
}

function getVisibleViews() {
  return roleViews[state.user.role] || roleViews.administrator;
}

function setTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  localStorage.setItem('ism_theme', theme);
}

function applySavedTheme() {
  setTheme(localStorage.getItem('ism_theme') || 'dark');
}

function unreadCount() {
  return state.notifications.filter(n => n.unread).length;
}

function updateHeader() {
  const labels = getRoleLabels();
  const [title, subtitle] = labels[state.currentView] || labels.dashboard;
  pageTitle.textContent = title;
  pageSubtitle.textContent = subtitle;
  document.getElementById('headerUserName').textContent = state.user.name;
  document.getElementById('headerAvatar').src = state.user.avatar_url || './assets/avatar-default.svg';
  notificationsBtn.innerHTML = `${icons.notifications}<span class="badge-dot">${unreadCount()}</span>`;
  document.getElementById('fullscreenBtn').innerHTML = icons.fullscreen;
  document.getElementById('headerLogoutBtn').innerHTML = icons.logout;
}

function renderNav() {
  const allowed = getVisibleViews();
  navMenu.innerHTML = nav
    .filter(item => allowed.includes(item.key))
    .map(item => `
      <button class="nav-item ${state.currentView === item.key ? 'active' : ''}" data-view="${item.key}">
        ${icons[item.icon]}<span>${item.label[state.user.role] || item.label.administrator || item.key}</span>
      </button>
    `).join('') + `
      <button class="nav-item" id="sidebarLogoutBtn">${icons.logout}<span>Cerrar sesión</span></button>
    `;
}

function showToast(title, text = '', icon = 'success') {
  Swal.fire({ toast: true, position: 'top-end', timer: 2300, showConfirmButton: false, icon, title, text, background: getComputedStyle(document.documentElement).getPropertyValue('--panel') });
}

function statusPill(status) {
  const map = {
    'Activo': 'status-approved', 'Pendiente': 'status-pending', 'Disponible': 'status-approved',
    'Prestado': 'status-pending', 'En mantenimiento': 'status-rejected', 'Publicado': 'status-approved',
    'Borrador': 'status-pending', 'Inscripto': 'status-approved', 'Disponible con código': 'status-pending',
    'Aprobado': 'status-approved', 'Rechazado': 'status-rejected', 'Devuelto': 'status-info',
    'Dentro': 'status-approved', 'Fuera': 'status-rejected'
  };
  return `<span class="status-pill ${map[status] || 'status-pending'}">${status}</span>`;
}

function isDemoMode() {
  return !window.sb?.enabled;
}

function actionButtons(type = "", id = "") {
  const demo = isDemoMode();
  const inventoryRestricted = type === "inventory" && state.user.role !== "administrator";
    const locked = (demo || inventoryRestricted) ? "disabled aria-disabled=\"true\" data-demo-disabled=\"1\"" : "";
  const editTitle = demo ? "Acción deshabilitada en demo" : (inventoryRestricted ? "Solo administrador puede editar insumos" : "Editar");
  const deleteTitle = demo ? "Acción deshabilitada en demo" : (inventoryRestricted ? "Solo administrador puede eliminar insumos" : "Eliminar");
  return `<div class="actions">
    <button class="action-btn" data-action="view" data-type="${type}" data-id="${id}" title="Ver">${icons.eye}</button>
    <button class="action-btn" data-action="edit" data-type="${type}" data-id="${id}" ${locked} title="${editTitle}">${icons.edit}</button>
    <button class="action-btn" data-action="delete" data-type="${type}" data-id="${id}" ${locked} title="${deleteTitle}">${icons.trash}</button>
  </div>`;
}
function currentTeacherModules() {
  return state.modules.filter(mod => state.user.role !== 'teacher' || mod.teacher === state.user.name);
}

function renderDashboard() {
  if (state.user.role === 'teacher') {
    const myModules = currentTeacherModules();
    const myLoans = state.inventory.filter(i => i.teacher === state.user.name).length;
    return `
      <section class="grid-cards grid-cards-4">
        <article class="card glass"><p>Equipos</p><div class="kpi">${state.teams.filter(t => t.teachers.includes(state.user.name)).length}</div><small>Equipos a cargo y mixtos.</small></article>
        <article class="card glass"><p>Cursos</p><div class="kpi">${myModules.length}</div><small>Módulos y cursos gestionados.</small></article>
        <article class="card glass"><p>Préstamos</p><div class="kpi">${myLoans}</div><small>Insumos solicitados o asignados.</small></article>
        <article class="card glass"><p>Notificaciones</p><div class="kpi">${unreadCount()}</div><small>Avisos pendientes de lectura.</small></article>
      </section>
      <section class="layout-two">
        <article class="card glass">
          <div class="section-header"><h3>Resumen docente</h3><button class="btn btn-primary btn-sm" data-view-btn="courses">Abrir campus</button></div>
          <div class="list-simple">
            ${myModules.map(mod => `<div class="list-item"><strong>${mod.title}</strong><span>${mod.lessons} lecciones · ${mod.tasks} tareas · ${mod.evaluations} evaluativos</span></div>`).join('')}
          </div>
        </article>
        <article class="card glass">
          <div class="section-header"><h3>Alertas</h3><button class="btn btn-secondary btn-sm" data-view-btn="notifications">Ver todas</button></div>
          <div class="list-simple">
            ${state.notifications.slice(0,3).map(n => `<button class="notification-row list-item notification-select" data-id="${n.id}"><div><strong>${escapeHtml(n.title)}</strong><span>${escapeHtml(n.message)}</span></div>${n.unread ? '<span class="status-pill status-pending">Sin leer</span>' : '<span class="status-pill status-approved">Leída</span>'}</button>`).join('')}
          </div>
        </article>
      </section>`;
  }

  if (state.user.role === 'student') {
    return `
      <section class="grid-cards grid-cards-4">
        <article class="card glass"><p>Cursos inscriptos</p><div class="kpi">${state.studentCourses.filter(c => c.access === 'Incripto').length}</div><small>Accesos activos en tu campus.</small></article>
        <article class="card glass"><p>Tareas</p><div class="kpi">6</div><small>Actividades pendientes esta semana.</small></article>
        <article class="card glass"><p>Evaluativos</p><div class="kpi">2</div><small>Instancias próximas de evaluación.</small></article>
        <article class="card glass"><p>Notificaciones</p><div class="kpi">${unreadCount()}</div><small>Avisos del laboratorio y docentes.</small></article>
        <article class="card glass"><p>Equipo de robótica</p><div class="kpi">1</div><small>Equipo Rover A · docente María López.</small></article>
      </section>
      <section class="layout-two">
        <article class="card glass">
          <div class="section-header"><h3>Mis cursos</h3><button class="btn btn-primary btn-sm" data-view-btn="courses">Abrir campus alumno</button></div>
          <div class="list-simple">
            ${state.studentCourses.map(course => `<div class="list-item"><strong>${course.title}</strong><span>${course.teacher} · Progreso ${course.progress}%</span></div>`).join('')}
          </div>
        </article>
        <article class="card glass"><div class="section-header"><h3>Biblioteca y avisos</h3></div><div class="list-simple"><div class="list-item"><strong>Material recomendado</strong><span>Manual Arduino ISM y guía de seguridad.</span></div><div class="list-item"><strong>Acceso a cursos abiertos</strong><span>Podés sumarte con código de curso y clave.</span></div></div></article>
      </section>`;
  }

  const totalUsers = state.users.length;
  const totalTeams = state.teams.length;
  const totalInventory = state.inventory.length;
  const openLoans = state.inventory.filter(i => i.status === 'Prestado').length;

  return `
    <section class="grid-cards grid-cards-4">
      <article class="card glass"><p>Usuarios</p><div class="kpi">${totalUsers}</div><small>Administradores, docentes y alumnos.</small></article>
      <article class="card glass"><p>Equipos</p><div class="kpi">${totalTeams}</div><small>Equipos mixtos con múltiples docentes.</small></article>
      <article class="card glass"><p>Inventario</p><div class="kpi">${totalInventory}</div><small>Activos serializados e insumos.</small></article>
      <article class="card glass"><p>Préstamos abiertos</p><div class="kpi">${openLoans}</div><small>Con seguimiento y devolución pendiente.</small></article>
    </section>

    <section class="card glass dashboard-panel">
      <div class="section-header">
        <div>
          <h3>Dashboard principal del administrador</h3>
          <p class="muted">Filtros globales y gráficos estadísticos con Chart.js.</p>
        </div>
        <div class="toolbar">
          <select id="periodFilter">
            <option value="week" ${state.filters.period === 'week' ? 'selected' : ''}>Última semana</option>
            <option value="month" ${state.filters.period === 'month' ? 'selected' : ''}>Último mes</option>
            <option value="quarter" ${state.filters.period === 'quarter' ? 'selected' : ''}>Último trimestre</option>
          </select>
          <button class="btn btn-secondary btn-sm" data-export="dashboard">${icons.export} Exportar resumen</button>
        </div>
      </div>
      <div class="charts-grid">
        <article class="chart-card glass-soft"><div class="chart-head"><strong>Movimientos del inventario</strong><span>Línea</span></div><canvas id="loansLineChart"></canvas></article>
        <article class="chart-card glass-soft"><div class="chart-head"><strong>Usuarios por rol</strong><span>Torta</span></div><canvas id="rolesPieChart"></canvas></article>
        <article class="chart-card glass-soft"><div class="chart-head"><strong>Estado del inventario</strong><span>Barras</span></div><canvas id="inventoryBarChart"></canvas></article>
      </div>
    </section>

    <section class="layout-two">
      <article class="card glass">
        <div class="section-header"><h3>Resumen operativo</h3><span class="tag">Módulos</span></div>
        <div class="list-simple">
          <div class="list-item"><strong>ABM de usuarios</strong><span>Alta, baja y modificación con roles, permisos y perfiles.</span></div>
          <div class="list-item"><strong>Campus E-learning</strong><span>Docentes crean cursos y alumnos acceden con inscripción o código de acceso.</span></div>
          <div class="list-item"><strong>Inventario inteligente</strong><span>Trazabilidad por serie o código de barras, préstamos y devoluciones.</span></div>
        </div>
      </article>
      <article class="card glass">
        <div class="section-header"><h3>Alertas del día</h3><button class="btn btn-secondary btn-sm" data-view-btn="notifications">Ver todas</button></div>
        <div class="list-simple">
          ${state.notifications.slice(0,3).map(n => `<button class="notification-row list-item notification-select" data-id="${n.id}"><div><strong>${escapeHtml(n.title)}</strong><span>${escapeHtml(n.message)}</span></div>${n.unread ? '<span class="status-pill status-pending">Sin leer</span>' : '<span class="status-pill status-approved">Leída</span>'}</button>`).join('')}
        </div>
      </article>
    </section>

    <section class="card glass">
      <div class="section-header"><div><h3>Inventario destacado</h3><p class="muted">Basado en la planilla de control adjunta.</p></div><button class="btn btn-primary btn-sm" data-view-btn="inventory">Abrir módulo</button></div>
      <div class="inventory-highlight">
        ${state.inventory.slice(0,3).map(item => `<article class="mini-card glass-soft"><strong>${item.code}</strong><h4>${item.item}</h4><p>${item.type} · ${item.location}</p><div class="metric-inline"><span>${item.serial || item.barcode}</span>${statusPill(item.status)}</div></article>`).join('')}
      </div>
    </section>`;
}

function getFilteredUsers() {
  return state.users.filter(user => {
    const matchesSearch = `${user.name} ${user.email} ${user.dni}`.toLowerCase().includes(state.filters.userSearch.toLowerCase());
    const matchesRole = state.filters.userRole === 'all' || user.role === state.filters.userRole;
    return matchesSearch && matchesRole;
  });
}

function renderUsers() {
  const filtered = getFilteredUsers();
  return `
    <section class="card glass">
      <div class="section-header">
        <div><h3>Usuarios registrados</h3><p class="muted">Campos sugeridos: WhatsApp, fecha de nacimiento, curso/división o materia/título.</p></div>
        <div class="toolbar">
          <button class="btn btn-secondary btn-sm" data-import="users">${icons.import} Importar CSV</button>
          <button class="btn btn-secondary btn-sm" data-export="users">${icons.export} Exportar CSV</button>
          <button class="btn btn-primary btn-sm" data-create="user">Nuevo usuario</button>
        </div>
      </div>
      <div class="toolbar filters-row">
        <input type="search" id="userSearch" placeholder="Buscar por nombre, email o DNI" value="${escapeHtml(state.filters.userSearch)}" />
        <select id="userRoleFilter"><option value="all" ${state.filters.userRole === 'all' ? 'selected' : ''}>Todos los roles</option><option ${state.filters.userRole === 'Administrador' ? 'selected' : ''}>Administrador</option><option ${state.filters.userRole === 'Docente' ? 'selected' : ''}>Docente</option><option ${state.filters.userRole === 'Alumno' ? 'selected' : ''}>Alumno</option></select>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Nombre</th><th>Rol</th><th>Email</th><th>WhatsApp</th><th>DNI</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            ${filtered.map(user => `<tr><td><strong>${user.name}</strong></td><td>${user.role}</td><td>${user.email}</td><td>${user.whatsapp}</td><td>${user.dni}</td><td>${statusPill(user.status)}</td><td>${actionButtons('user', user.id)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

function renderRoles() {
  const roles = state.rolesData || [];
  return `<section class="card glass"><div class="section-header"><div><h3>Perfiles y permisos</h3><p class="muted">ABM conectado a Supabase para roles y permisos por módulo.</p></div><div class="toolbar"><button class="btn btn-primary btn-sm" id="newRoleBtn">Nuevo rol</button><button class="btn btn-secondary btn-sm" data-export="roles">${icons.export} Exportar CSV</button></div></div><div class="grid-cards">${roles.map(role => `<article class="card glass-soft"><div class="role-card-head"><div><h3>${escapeHtml(role.name)}</h3><p>${escapeHtml(role.description || '')}</p><small class="muted">Código: ${escapeHtml(role.code)}</small></div><div class="table-actions"><button class="action-btn" data-role-action="view" data-id="${role.id}" title="Ver">${icons.eye}</button><button class="action-btn" data-role-action="edit" data-id="${role.id}" title="Editar">${icons.edit}</button><button class="action-btn" data-role-action="delete" data-id="${role.id}" title="Eliminar">${icons.trash}</button></div></div><div class="permissions-list">${(role.permissions || []).map(p => `<span class="tag">${escapeHtml(p)}</span>`).join('') || '<span class="muted">Sin permisos</span>'}</div></article>`).join('')}</div></section>`;
}

function renderTeams() {
  const rows = state.user.role === 'teacher' ? state.teams.filter(team => (team.teachers || []).includes(state.user.name)) : state.teams;
  return `
    <section class="card glass">
      <div class="section-header">
        <div><h3>${state.user.role === 'teacher' ? 'Equipos asignados' : 'Equipos mixtos'}</h3><p class="muted">Cada equipo debe tener un mentor docente, un mentor suplente opcional y hasta 5 alumnos.</p></div>
        <div class="toolbar"><button class="btn btn-secondary btn-sm" data-import="teams">${icons.import} Importar CSV</button><button class="btn btn-secondary btn-sm" data-export="teams">${icons.export} Exportar CSV</button><button class="btn btn-primary btn-sm" data-create="team">Nuevo equipo</button></div>
      </div>
      <div class="grid-cards">
        ${rows.map(team => `<article class="card glass-soft"><div class="section-header"><h3>${escapeHtml(team.name)}</h3><span class="tag">${team.students || (team.student_ids || []).length || 0} alumnos</span></div><p><strong>Mentores:</strong> ${escapeHtml((team.teachers || []).join(', ') || '-')}</p><p><strong>Cursos:</strong> ${escapeHtml((team.courses || []).join(', ') || '-')}</p><p><strong>Divisiones:</strong> ${escapeHtml((team.divisions || []).join(', ') || '-')}</p><p><strong>Proyecto:</strong> ${escapeHtml(team.project || '-')}</p><div class="card-actions"><button class="btn btn-secondary btn-sm" data-action="view" data-type="team" data-id="${team.id}">${icons.eye}</button><button class="btn btn-secondary btn-sm" data-action="edit" data-type="team" data-id="${team.id}">${icons.edit}</button><button class="btn btn-secondary btn-sm" data-action="delete" data-type="team" data-id="${team.id}">${icons.trash}</button></div></article>`).join('')}
      </div>
    </section>`;
}

function getFilteredInventory() {
  return state.inventory.filter(item => {
    const byStatus = state.filters.inventoryState === 'all' || item.status === state.filters.inventoryState;
    const byType = state.filters.inventoryType === 'all' || item.type === state.filters.inventoryType;
    const bySearch = !state.filters.inventorySearch || `${item.code} ${item.item} ${item.serial} ${item.barcode} ${item.location} ${item.brand || ''} ${item.supplier || ''} ${item.location_detail || ''} ${item.zone || ''} ${item.category || ''}`.toLowerCase().includes(state.filters.inventorySearch.toLowerCase());
    return byStatus && byType && bySearch;
  });
}

function renderInventory() {
  const allRows = getFilteredInventory();
  const totalPages = Math.max(1, Math.ceil(allRows.length / state.inventoryPageSize));
  if (state.inventoryPage > totalPages) state.inventoryPage = totalPages;
  const start = (state.inventoryPage - 1) * state.inventoryPageSize;
  const rows = allRows.slice(start, start + state.inventoryPageSize);
  const pager = `<div class="pager inventory-pager"><div class="pager-size"><span class="muted small">Listar</span><select class="inventory-page-size"><option ${state.inventoryPageSize===5?'selected':''}>5</option><option ${state.inventoryPageSize===10?'selected':''}>10</option><option ${state.inventoryPageSize===25?'selected':''}>25</option><option ${state.inventoryPageSize===50?'selected':''}>50</option><option ${state.inventoryPageSize===100?'selected':''}>100</option></select><span class="muted small">${allRows.length} registros</span></div><div class="pager-buttons"><button class="btn btn-secondary btn-sm inventory-prev-page" ${state.inventoryPage<=1?'disabled':''}>← Anterior</button><span class="pager-current">${state.inventoryPage} / ${totalPages}</span><button class="btn btn-secondary btn-sm inventory-next-page" ${state.inventoryPage>=totalPages?'disabled':''}>Siguiente →</button></div></div>`;
  const teacherActions = state.user.role === 'teacher' ? `<button class="btn btn-primary btn-sm" id="loanRequestBtn">Solicitud de préstamo</button>` : `<button class="btn btn-primary btn-sm" id="newInventoryItemBtn">Nuevo insumo</button>`;
  return `
    <section class="inventory-layout inventory-full-width">
      <div class="card glass">
        <div class="section-header">
          <div><h3>Control y trazabilidad</h3><p class="muted">Cada insumo permite saber quién lo tiene, marca, empresa/proveedor, locación, zona, estado y código de barras.</p></div>
          <div class="toolbar">
            <button class="btn btn-secondary btn-sm" data-import="inventory">${icons.import} Importar CSV</button>
            <button class="btn btn-secondary btn-sm" data-export="inventory">${icons.export} Exportar CSV</button>
            <button class="btn btn-secondary btn-sm" id="printBarcodesBtn">${icons.barcode} Imprimir barcodes</button>
            <button class="btn btn-secondary btn-sm" id="inventoryChartsBtn">${icons.chart} Ver gráficos</button>
            ${teacherActions}
          </div>
        </div>
        <div class="toolbar filters-row">
          <input type="search" id="inventorySearch" placeholder="Buscar por código, item, marca, empresa, serie, barcode, locación o zona" value="${escapeAttr(state.filters.inventorySearch)}" autocomplete="off" />
          <select id="inventoryStateFilter"><option value="all" ${state.filters.inventoryState === 'all' ? 'selected' : ''}>Todos los estados</option><option ${state.filters.inventoryState === 'Disponible' ? 'selected' : ''}>Disponible</option><option ${state.filters.inventoryState === 'Prestado' ? 'selected' : ''}>Prestado</option><option ${state.filters.inventoryState === 'En mantenimiento' ? 'selected' : ''}>En mantenimiento</option></select>
          <select id="inventoryTypeFilter"><option value="all" ${state.filters.inventoryType === 'all' ? 'selected' : ''}>Todos los tipos</option><option ${state.filters.inventoryType === 'Equipo' ? 'selected' : ''}>Equipo</option><option ${state.filters.inventoryType === 'Insumo' ? 'selected' : ''}>Insumo</option></select>
        </div>
        <div class="toolbar filters-row">
          <button class="btn btn-secondary btn-sm" id="generateBarcodeBtn">${icons.barcode} Generar código</button>
          <span class="muted small">El buscador usa espera corta para permitir escribir de corrido.</span>
        </div>
        ${pager}
        <div class="table-wrap">
          <table class="table inventory-table">
            <thead><tr><th>Código</th><th>Tipo</th><th>Marca</th><th>Empresa</th><th>N° serie</th><th>Barcode</th><th>Estado</th><th>Condición</th><th>Locación</th><th>Zona</th><th>Ubicación</th><th>Acciones</th></tr></thead>
            <tbody>
              ${rows.map(item => `<tr><td><strong>${escapeHtml(item.code)}</strong><br><span class="muted small">${escapeHtml(item.item)}</span></td><td>${escapeHtml(item.type)}</td><td>${escapeHtml(item.brand || '-')}</td><td>${escapeHtml(item.supplier || '-')}</td><td>${escapeHtml(item.serial || 'Sin serie')}</td><td><button class="barcode-cell barcode-print-btn" data-print-barcode="${escapeAttr(item.id)}" title="Imprimir barcode">${barcodePreviewMarkup(item.barcode || item.code, true)}</button></td><td>${statusPill(item.status)}</td><td>${conditionPill(item.condition)}</td><td>${escapeHtml(item.location_detail || '-')}</td><td>${escapeHtml(item.zone || '-')}</td><td>${escapeHtml(item.location)}</td><td>${actionButtons('inventory', item.id)}</td></tr>`).join('') || `<tr><td colspan="12" class="muted">Sin resultados.</td></tr>`}
            </tbody>
          </table>
        </div>
        ${pager}
      </div>
      <aside class="card glass inventory-side-help">
        <h3>Inventario optimizado</h3>
        <div class="flow-steps">
          <div class="flow-step"><strong>Alta completa</strong><span>Marca, empresa, locación, zona, serie y barcode.</span></div>
          <div class="flow-step"><strong>CSV</strong><span>Importación con mapeo automático de la planilla ISM.</span></div>
          <div class="flow-step"><strong>Barcodes</strong><span>Impresión individual o masiva de etiquetas.</span></div>
        </div>
        <div class="barcode-preview glass-soft"><span class="tag">Vista previa de barcode</span><div id="barcodePreviewBox">${barcodePreviewMarkup('ISM-BAR-000001')}</div></div>
      </aside>
    </section>`;
}

function getStudentCourseItems(course) {
  return [
    { key: 'lesson', group: 'MASTER CLASS EN VIVO', title: 'Clase 01 – Bienvenida & Mentalidad del laboratorio', meta: '76 minutos', icon: '📘' },
    { key: 'task', group: 'CLASES GRABADAS', title: 'Tarea 01 – Calendario Económico', meta: '7 días', icon: '📝' },
    { key: 'quiz', group: 'CLASES GRABADAS', title: 'Evaluativo 01 – Herramientas del laboratorio', meta: '10 preguntas · 20 minutos', icon: '✅' }
  ];
}

function renderStudentCourseContent(course, tab = 'lesson') {
  if (tab === 'task') return `
    <div class="course-content-rich">
      <div class="course-meta-strip">Hora de finalización estimada: 21 de abril de 2026 · 18:13</div>
      <h2>Tarea 01 – Calendario Económico</h2>
      <div class="course-summary-list"><span><strong>Duración:</strong> 7 días</span><span><strong>Total grade:</strong> 10 puntos</span><span><strong>Calificación aprobatoria:</strong> 7 puntos</span><span><strong>Reintentos:</strong> 3</span></div>
      <div class="lp-block">
        <h3>📋 Instrucciones</h3>
        <ol>
          <li>Ingresá a una plataforma con calendario económico y detectá noticias de alto impacto.</li>
          <li>Elegí un activo fuerte y uno débil, explicando su tendencia.</li>
          <li>Redactá una breve conclusión con tu decisión como estudiante.</li>
        </ol>
      </div>
      <div class="lp-block">
        <h3>🧾 Se requiere entrega</h3>
        <ul>
          <li>Capturas del calendario económico.</li>
          <li>Mapa de calor o análisis del mercado.</li>
          <li>Documento o texto explicativo.</li>
        </ul>
      </div>
      <div class="lp-answer-box">
        <label><span>Escriba su respuesta</span><textarea rows="7" placeholder="Desarrollá tu análisis aquí..."></textarea></label>
        <div class="toolbar"><button class="btn btn-primary btn-sm">Guardar respuesta</button><button class="btn btn-secondary btn-sm">Adjuntar archivo</button></div>
      </div>
    </div>`;
  if (tab === 'quiz') return `
    <div class="course-content-rich">
      <div class="course-meta-strip">Pregunta 1 de 10 · Tiempo estimado 20 minutos</div>
      <h2>Evaluativo 01 – Herramientas del laboratorio</h2>
      <div class="quiz-panel">
        <p class="quiz-question">¿Cuál es el objetivo principal del calendario económico?</p>
        <button class="quiz-option" data-quiz-option="a"><span class="quiz-radio"></span><span>a) Analizar gráficos técnicos</span></button>
        <button class="quiz-option selected correct" data-quiz-option="b"><span class="quiz-radio"></span><span>b) Identificar eventos que impactan el mercado</span></button>
        <button class="quiz-option" data-quiz-option="c"><span class="quiz-radio"></span><span>c) Ejecutar operaciones automáticamente</span></button>
        <button class="quiz-option" data-quiz-option="d"><span class="quiz-radio"></span><span>d) Crear estrategias de trading</span></button>
        <div class="quiz-feedback success">✔ Correcto. El calendario económico muestra eventos clave que pueden generar movimientos en el mercado.</div>
        <div class="toolbar"><button class="btn btn-secondary btn-sm">Pregunta anterior</button><button class="btn btn-primary btn-sm">Siguiente</button></div>
      </div>
    </div>`;
  return `
    <div class="course-content-rich">
      <div class="course-meta-strip">MASTER CLASS – ${course.title} · 2 de 37 elementos</div>
      <h2>Clase 01 – Bienvenida & Mentalidad del laboratorio</h2>
      <p>En esta primera clase damos inicio al curso <strong>${course.title}</strong>. Vas a encontrar objetivos, video, archivos adjuntos y navegación secuencial, siguiendo un formato similar al aula virtual que compartiste.</p>
      <div class="lesson-video-card">
        <div class="lesson-video-thumb">
          <div class="video-overlay-title">Clase 01: Bienvenida y Mentalidad</div>
          <div class="play-button">▶</div>
        </div>
        <div class="lesson-video-actions"><button class="btn btn-secondary btn-sm">Descargar PDF</button><button class="btn btn-primary btn-sm">Completar</button></div>
      </div>
      <table class="table lesson-files-table"><thead><tr><th>Nombre</th><th>Tipo</th><th>Tamaño</th><th>Descarga</th></tr></thead><tbody><tr><td>Clase 01 - Bienvenida y Mentalidad del laboratorio</td><td>pdf</td><td>265 KB</td><td>${icons.export}</td></tr></tbody></table>
      <div class="lesson-nav"><button class="btn btn-secondary btn-sm">◀ Anterior</button><button class="btn btn-secondary btn-sm">Siguiente ▶</button></div>
    </div>`;
}

function renderTeacherCampus() {
  const rows = currentTeacherModules();
  return `<section class="card glass"><div class="section-header"><div><h3>Gestión de cursos</h3><p class="muted">Creación de cursos, visibilidad, códigos de acceso y contenido tipo e-learning.</p></div><div class="toolbar"><button class="btn btn-secondary btn-sm" data-import="courses">${icons.import} Importar CSV</button><button class="btn btn-secondary btn-sm" data-export="courses">${icons.export} Exportar CSV</button><button class="btn btn-secondary btn-sm" id="addModuleBtn">${icons.courses} Agregar módulo</button><button class="btn btn-primary btn-sm" id="newCourseBtn">Nuevo curso</button></div></div><div class="toolbar filters-row"><input type="search" placeholder="Buscar por nombre, código o detalle"><select><option>Todos los estados</option></select><select><option>Todos los tipos</option></select><button class="btn btn-secondary btn-sm" id="courseChartsBtn">${icons.chart} Ver gráficos</button></div><div class="grid-cards">${rows.map(mod => `<article class="card glass-soft"><div class="metric-inline"><h3>${mod.title}</h3>${statusPill(mod.status)}</div><p><strong>Docente:</strong> ${mod.teacher}</p><p><strong>Visibilidad:</strong> ${mod.visibility}</p><p><strong>Código:</strong> ${mod.code}</p><p><strong>Clave:</strong> ${mod.accessKey}</p><p><strong>Equipo/alcance:</strong> ${mod.team}</p><div class="course-metrics"><span>${mod.lessons} lecciones</span><span>${mod.tasks} tareas</span><span>${mod.evaluations} evaluativos</span></div><div class="toolbar"><button class="btn btn-secondary btn-sm" data-preview-form="course">${icons.eye} Ver formulario</button><button class="btn btn-secondary btn-sm" data-preview-form="lesson">Agregar lección</button><button class="btn btn-secondary btn-sm" data-preview-form="task">Agregar tarea</button><button class="btn btn-secondary btn-sm" data-preview-form="quiz">Agregar evaluativo</button></div></article>`).join('')}</div><div class="layout-two" style="margin-top:18px"><article class="card glass-soft"><h3>Cómo carga contenido el docente</h3><div class="flow-steps"><div class="flow-step"><strong>1. Crear curso</strong><span>Nombre, descripción, código automático, clave, visibilidad y equipos.</span></div><div class="flow-step"><strong>2. Agregar módulos</strong><span>Organizá el contenido por unidades temáticas.</span></div><div class="flow-step"><strong>3. Cargar lecciones</strong><span>Texto, video, archivos y enlaces.</span></div><div class="flow-step"><strong>4. Tareas y evaluativos</strong><span>Consignas, puntaje, intentos y feedback.</span></div></div></article><article class="card glass-soft"><h3>Vistas previas disponibles</h3><div class="list-simple"><button class="btn btn-secondary btn-sm full-width" data-preview-form="course">Ver formulario de curso</button><button class="btn btn-secondary btn-sm full-width" data-preview-form="module">Ver formulario de módulo</button><button class="btn btn-secondary btn-sm full-width" data-preview-form="lesson">Ver formulario de lección</button><button class="btn btn-secondary btn-sm full-width" data-preview-form="task">Ver formulario de tarea</button><button class="btn btn-secondary btn-sm full-width" data-preview-form="quiz">Ver formulario de evaluativo</button></div></article></div></section>`;
}

function renderStudentCampus() {
  const enrolled = state.studentCourses.filter(c => c.access === 'Incripto');
  const openCourses = state.studentCourses.filter(c => c.access !== 'Incripto');
  if (state.currentCourseScreen === 'detail' && state.selectedStudentCourse) {
    const course = state.selectedStudentCourse;
    const items = getStudentCourseItems(course);
    const groups = [...new Set(items.map(i => i.group))];
    return `
      <section class="learnpress-shell">
        <aside class="learnpress-sidebar card glass">
          <div class="learnpress-search"><input type="search" placeholder="Buscar contenido de cursos"></div>
          ${groups.map(group => `
            <div class="lp-group">
              <div class="lp-group-head"><strong>${group}</strong><span>${items.filter(i => i.group === group).length}</span></div>
              <div class="lp-items">
                ${items.filter(i => i.group === group).map(item => `
                  <button class="lp-item ${state.courseContentTab === item.key ? 'active' : ''}" data-course-tab="${item.key}">
                    <div class="lp-item-main"><strong>${item.icon} ${item.title}</strong><span>${item.meta}</span></div>
                    <span class="lp-item-check">✓</span>
                  </button>`).join('')}
              </div>
            </div>`).join('')}
        </aside>
        <article class="learnpress-content card glass">
          <div class="learnpress-topbar"><span>MASTER CLASS – ${course.title}</span><span>2 de 37 elementos</span></div>
          ${renderStudentCourseContent(course, state.courseContentTab)}
          <div class="toolbar" style="justify-content:flex-end"><button class="btn btn-secondary btn-sm" id="backCampusBtn">Volver al campus</button></div>
        </article>
      </section>`;
  }
  return `
    <section class="card glass">
      <div class="section-header"><div><h3>Mis cursos</h3><p class="muted">Tus cursos activos con vista previa tipo aula virtual.</p></div><button class="btn btn-primary btn-sm" id="joinCourseBtn">Sumarme a un curso</button></div>
      <div class="student-course-grid">
        ${enrolled.map(course => `
          <article class="student-course-card glass-soft">
            <div class="student-course-cover"><div class="student-course-cover-overlay"><span class="cover-badge">${course.team}</span><h3>${course.title}</h3><small>${course.teacher}</small></div></div>
            <div class="student-course-body">
              <div class="course-metrics"><span>${course.lessons} módulos/lecciones</span><span>${course.tasks} tareas</span><span>${course.evaluations} evaluativos</span></div>
              <div class="student-progress"><div class="student-progress-bar"><span style="width:${course.progress}%"></span></div><strong>Progreso ${course.progress}%</strong></div>
              <div class="toolbar" style="justify-content:flex-end"><button class="btn btn-secondary btn-sm" data-open-student-course="${course.title}">${icons.eye} Ver curso</button></div>
            </div>
          </article>`).join('')}
      </div>
    </section>
    <section class="layout-two">
      <article class="card glass">
        <h3>Cursos abiertos</h3>
        <div class="grid-cards">${openCourses.map(course => `<article class="card glass-soft"><div class="metric-inline"><h3>${course.title}</h3>${statusPill('Disponible con código')}</div><p><strong>Docente:</strong> ${course.teacher}</p><p><strong>Visibilidad:</strong> ${course.visibility}</p><div class="course-metrics"><span>${course.lessons} lecciones</span><span>${course.tasks} tareas</span><span>${course.evaluations} evaluativos</span></div></article>`).join('')}</div>
      </article>
      <aside class="card glass">
        <h3>Cómo acceder</h3>
        <div class="flow-steps"><div class="flow-step"><strong>Código del curso</strong><span>Se genera automáticamente cuando el docente crea el curso.</span></div><div class="flow-step"><strong>Clave de acceso</strong><span>La define el docente para cursos restringidos.</span></div><div class="flow-step"><strong>Visibilidad</strong><span>Puede ser abierta o limitada a equipos.</span></div></div>
      </aside>
    </section>`;
}

function renderCourses() {
  if (state.user.role === 'student') return renderStudentCampus();
  return renderTeacherCampus();
}

function renderLibrary() {
  return `<section class="card glass"><div class="section-header"><div><h3>Biblioteca digital</h3><p class="muted">Repositorio de documentos, videos, PDFs, TXT, ZIP y links externos como GitHub o Drive.</p></div><div class="toolbar"><button class="btn btn-primary btn-sm" id="newResourceBtn">Nuevo recurso</button><button class="btn btn-secondary btn-sm" data-import="library">${icons.import} Importar CSV</button><button class="btn btn-secondary btn-sm" data-export="library">${icons.export} Exportar CSV</button><button class="btn btn-secondary btn-sm" id="libraryChartsBtn">${icons.chart} Ver gráficos</button></div></div><div class="toolbar filters-row"><input type="search" placeholder="Buscar por nombre, código o detalle"><select><option>Todos los tipos</option><option>PDF</option><option>Video</option><option>Documento</option><option>TXT</option><option>ZIP</option><option>GitHub</option></select><button class="btn btn-secondary btn-sm" id="resourceCategoryBtn">${icons.filter} Categorías</button></div><div class="file-grid">${state.library.map(file => `<article class="file-item glass-soft"><strong>${file.title}</strong><p>${file.area}</p><span class="tag">${file.type}</span><div class="toolbar" style="margin-top:8px"><button class="btn btn-secondary btn-sm" data-view-resource="${file.id}">${icons.eye} Ver</button></div></article>`).join('')}</div><article class="card glass-soft" style="margin-top:16px"><h3>Cómo agregar recursos</h3><div class="flow-steps"><div class="flow-step"><strong>1. Nuevo recurso</strong><span>Elegí tipo: PDF, Video, Documento, TXT, ZIP, Link o Repositorio GitHub.</span></div><div class="flow-step"><strong>2. Datos</strong><span>Completá título, categoría, descripción y archivo/URL.</span></div><div class="flow-step"><strong>3. Publicación</strong><span>Guardá y el recurso queda visible en la grilla.</span></div></div></article></section>`;
}

function renderNotifications() {
  const helper = state.user.role === 'administrator' ? 'Las notificaciones se pueden enviar de forma masiva, individual, por equipos o selección múltiple.' : 'Leé tus avisos y seguí novedades de cursos, equipos e inventario.';
  const button = state.user.role === 'student' ? '' : '<button class="btn btn-primary btn-sm" id="massNotifyBtn">Enviar notificación</button>';
  return `<section class="card glass"><div class="section-header"><div><h3>Centro de notificaciones</h3><p class="muted">${helper}</p></div><div class="toolbar">${button}</div></div><div class="list-simple">${state.notifications.map(n => `<button class="notification-row list-item notification-select" data-id="${n.id}"><div><strong>${n.title}</strong><span>${n.message}</span></div>${n.unread ? '<span class="status-pill status-pending">Sin leer</span>' : '<span class="status-pill status-approved">Leída</span>'}</button>`).join('')}</div></section>`;
}

function renderLoanManagement() {
  const rows = state.user.role === 'administrator' ? state.loans : state.loans.filter(l => l.requester === state.user.name || String(l.requester_id || '') === String(state.user.id || ''));
  const rightButton = state.user.role === 'administrator'
    ? '<button class="btn btn-secondary btn-sm" id="loanChartsBtn">'+icons.chart+' Ver gráficos</button>'
    : '<button class="btn btn-primary btn-sm" id="loanRequestBtn2">Nueva solicitud</button>';
  return `<section class="card glass"><div class="section-header"><div><h3>Centro de préstamos</h3><p class="muted">Solicitudes, franjas horarias, estados y devoluciones.</p></div><div class="toolbar"><button class="btn btn-secondary btn-sm" data-export="loanManagement">${icons.export} Exportar CSV</button>${rightButton}</div></div><div class="toolbar filters-row"><input type="search" placeholder="Buscar por solicitante, equipo o insumo"><select><option>Todos los estados</option><option>Pendiente</option><option>Aprobado</option><option>Rechazado</option><option>Devuelto</option></select><button class="btn btn-secondary btn-sm" id="loanFilterBtn">${icons.filter} Filtros</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Solicitante</th><th>Curso / equipo</th><th>Fecha</th><th>Horario</th><th>Insumos</th><th>Observaciones</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${rows.map(l=>`<tr><td>${escapeHtml(l.requester)}</td><td>${escapeHtml(l.team)}</td><td>${escapeHtml(l.date)}</td><td>${escapeHtml(l.from)} a ${escapeHtml(l.to)}</td><td>${(l.items||[]).map(escapeHtml).join(', ')}</td><td>${escapeHtml(l.notes)}</td><td>${statusPill(l.status)}</td><td><div class="actions">${state.user.role==='administrator'?`<button class="action-btn" data-approve-loan="${l.id}" title="Aprobar">${icons.approve}</button><button class="action-btn" data-reject-loan="${l.id}" title="Rechazar">${icons.reject}</button><button class="action-btn" data-return-loan="${l.id}" title="Marcar devolución">${icons.returnIcon}</button>`:`<button class="action-btn" data-action="view" data-type="loanManagement" data-id="${l.id}" title="Ver">${icons.eye}</button>`}</div></td></tr>`).join('') || '<tr><td colspan="8" class="muted">No hay solicitudes registradas.</td></tr>'}</tbody></table></div></section>`;
}

function renderAccessControl() {
  const inside = state.accessLogs.filter(i=>i.inside).length;
  return `<section class="layout-two"><article class="card glass"><div class="section-header"><div><h3>Control de acceso RFID</h3><p class="muted">Historial de ingresos al laboratorio y permanencia estimada.</p></div><div class="toolbar"><button class="btn btn-secondary btn-sm" data-export="accessControl">${icons.export} Exportar CSV</button><button class="btn btn-primary btn-sm" data-preview-form="access">Nuevo registro</button><button class="btn btn-secondary btn-sm" id="accessChartsBtn">${icons.chart} Ver gráficos</button></div></div><div class="toolbar filters-row"><input type="search" placeholder="Buscar por usuario, tarjeta o sala"><select><option>Todas las categorías</option><option>Alumno</option><option>Docente</option><option>Administrador</option></select><button class="btn btn-secondary btn-sm" id="manageCategoriesBtn">${icons.filter} Categorías</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Usuario</th><th>Rol</th><th>Tarjeta RFID</th><th>Sala</th><th>Ingreso</th><th>Salida</th><th>Permanencia</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${state.accessLogs.map(r=>`<tr><td>${r.user}</td><td>${r.role}</td><td>${r.card}</td><td>${r.room}</td><td>${r.entry}</td><td>${r.exit}</td><td>${r.exit==='-'?'En curso':'2h 04m'}</td><td>${statusPill(r.inside?'Dentro':'Fuera')}</td><td>${actionButtons()}</td></tr>`).join('')}</tbody></table></div></article><aside class="card glass"><h3>Resumen de sala</h3><div class="list-simple"><div class="list-item"><strong>Personas dentro</strong><span>${inside}</span></div><div class="list-item"><strong>Lab. Robótica</strong><span>${state.accessLogs.filter(i=>i.inside && i.room.includes('Robótica')).length} personas</span></div><div class="list-item"><strong>Sala Informática</strong><span>${state.accessLogs.filter(i=>i.inside && i.room.includes('Informática')).length} personas</span></div><div class="list-item"><strong>Integración ESP32</strong><span>Lista para insertar registros RFID en la base.</span></div></div></aside></section>`;
}

function renderProfile() {
  const teacherData = state.user.role === 'teacher' ? '<p><strong>Materia:</strong> Robótica y Electrónica</p><p><strong>Título:</strong> Prof. en Tecnología</p>' : '';
  const studentData = state.user.role === 'student' ? '<p><strong>Curso:</strong> 6° C</p><p><strong>División:</strong> C</p>' : '';
  return `<section class="profile-layout"><article class="card glass"><div class="section-header"><div><h3>Mi perfil</h3><p class="muted">La foto se cambia desde la imagen del header.</p></div><button class="btn btn-primary btn-sm" id="editProfileBtn">Editar datos</button></div><div class="profile-box"><img src="${state.user.avatar_url || './assets/avatar-default.svg'}" alt="Avatar" class="profile-large" /><div><h3>${state.user.name}</h3><p><strong>Rol:</strong> ${state.user.role}</p><p><strong>Email:</strong> ${state.user.email}</p><p><strong>WhatsApp:</strong> ${escapeHtml(state.user.whatsapp || '-')}</p><p><strong>DNI:</strong> ${escapeHtml(state.user.dni || '-')}</p><p><strong>Fecha nacimiento:</strong> ${escapeHtml(state.user.birth_date || '-')}</p>${teacherData}${studentData}</div></div></article><aside class="card glass"><h3>Accesos rápidos</h3><div class="list-simple"><button class="btn btn-secondary btn-sm" data-view-btn="notifications">Notificaciones</button><button class="btn btn-secondary btn-sm" data-view-btn="inventory">Inventario</button><button class="btn btn-secondary btn-sm" data-view-btn="courses">${state.user.role === 'student' ? 'Campus alumno' : 'Campus'}</button></div></aside></section>`;
}

function renderSettings() {
  return `<section class="settings-layout"><article class="card glass"><div class="section-header"><div><h3>Configuraciones generales</h3><p class="muted">Carga del logo institucional, apariencia y parámetros del sistema.</p></div><button class="btn btn-primary btn-sm" id="saveSettingsBtn">Guardar</button></div><form class="form-grid"><label><span>Nombre de la institución</span><input value="Instituto San Miguel" /></label><label><span>Email institucional</span><input value="robotica@ism.edu.ar" /></label><label class="full-span"><span>Logo de la institución</span><input type="file" /></label></form></article><aside class="card glass"><h3>Apariencia</h3><div class="list-simple"><div class="list-item"><strong>Tema actual</strong><span>${document.body.classList.contains('light') ? 'Claro' : 'Oscuro'}</span></div><div class="list-item"><strong>Alertas</strong><span>SweetAlert2 habilitado</span></div><div class="list-item"><strong>Exportación</strong><span>CSV disponible en todos los módulos</span></div></div></aside></section>`;
}

function renderView() {
  updateHeader();
  renderNav();
  const views = { dashboard: renderDashboard, users: renderUsers, roles: renderRoles, team: renderTeams, inventory: renderInventory, loanManagement: renderLoanManagement, accessControl: renderAccessControl, courses: renderCourses, library: renderLibrary, notifications: renderNotifications, profile: renderProfile, settings: renderSettings };
  appContent.innerHTML = (views[state.currentView] || renderDashboard)();
  attachViewEvents();
  renderNotificationDropdown();
  renderCharts();
}

function destroyCharts() {
  state.charts.forEach(chart => chart.destroy());
  state.charts = [];
}

function chartTextColor() {
  return getComputedStyle(document.body).getPropertyValue('--text').trim() || '#e8eefc';
}

function chartGridColor() {
  return getComputedStyle(document.body).getPropertyValue('--border').trim() || 'rgba(148,163,184,0.18)';
}

function renderCharts() {
  destroyCharts();
  if (state.currentView !== 'dashboard' || state.user.role !== 'administrator') return;
  const line = document.getElementById('loansLineChart');
  const pie = document.getElementById('rolesPieChart');
  const bar = document.getElementById('inventoryBarChart');
  if (!line || !pie || !bar) return;

  const commonScales = { x: { ticks: { color: chartTextColor() }, grid: { color: chartGridColor() } }, y: { ticks: { color: chartTextColor() }, grid: { color: chartGridColor() } } };

  state.charts.push(new Chart(line, { type: 'line', data: { labels: state.audit.map(i => i.date), datasets: [{ label: 'Préstamos', data: state.audit.map(i => i.loans), tension: .35 }, { label: 'Devoluciones', data: state.audit.map(i => i.returns), tension: .35 }] }, options: { responsive: true, maintainAspectRatio: false, scales: commonScales, plugins: { legend: { labels: { color: chartTextColor() } } } } }));
  const roleCounts = ['Administrador', 'Docente', 'Alumno'].map(role => state.users.filter(u => u.role === role).length);
  state.charts.push(new Chart(pie, { type: 'pie', data: { labels: ['Administradores', 'Docentes', 'Alumnos'], datasets: [{ data: roleCounts }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: chartTextColor() } } } } }));
  const statusNames = ['Disponible', 'Prestado', 'En mantenimiento'];
  state.charts.push(new Chart(bar, { type: 'bar', data: { labels: statusNames, datasets: [{ label: 'Activos', data: statusNames.map(s => state.inventory.filter(i => i.status === s).length) }] }, options: { responsive: true, maintainAspectRatio: false, scales: commonScales, plugins: { legend: { labels: { color: chartTextColor() } } } } }));
}

function openView(view) {
  state.currentView = view;
  renderView();
}

function renderNotificationDropdown() {
  notificationsPreview.innerHTML = state.notifications.length ? state.notifications.slice(0, 4).map(n => `
    <button class="notification-row notification-select ${n.unread ? 'unread' : ''}" data-id="${n.id}">
      <div><strong>${escapeHtml(n.title)}</strong><span>${escapeHtml(n.message)}</span></div>
      <small>${n.unread ? 'Sin leer' : 'Leída'}</small>
    </button>
  `).join('') + `<button class="btn btn-secondary btn-sm full-width" data-view-btn="notifications">Ir al área de notificaciones</button>` : '<p class="muted">No hay notificaciones.</p>';
  notificationsPreview.classList.toggle('open', state.notificationsOpen);
}

async function selectNotification(id) {
  const target = state.notifications.find(n => String(n.id) === String(id));
  if (!target) return;
  target.unread = false;
  state.notificationsOpen = false;
  try { await window.sb?.markNotificationRead?.(id); } catch (_) {}
  const destination = target.section || target.module || target.target_view || 'notifications';
  openView(destination === 'loans' || destination === 'prestamos' ? 'loanManagement' : destination);
  setTimeout(() => {
    const el = appContent.querySelector(`.notification-select[data-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 80);
}

function csvFromRows(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  rows.forEach(row => lines.push(headers.map(h => `"${String(row[h] ?? '').replaceAll('"', '""')}"`).join(',')));
  return lines.join('\n');
}

function triggerDownload(name, content) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function dataByModule(module) {
  return {
    users: state.users,
    teams: state.teams.map(t => ({ ...t, teachers: t.teachers.join(' | '), courses: t.courses.join(' | '), divisions: t.divisions.join(' | ') })),
    inventory: state.inventory,
    loanManagement: state.loans.map(l => ({ ...l, items: l.items.join(' | ') })),
    accessControl: state.accessLogs,
    courses: state.user.role === 'student' ? state.studentCourses : state.modules,
    library: state.library,
    roles: [{ role: 'Administrador', alcance: 'Total' }, { role: 'Docente', alcance: 'Equipos y campus' }, { role: 'Alumno', alcance: 'Consulta y seguimiento' }],
    dashboard: [{ metrica: 'Usuarios', valor: state.users.length }, { metrica: 'Equipos', valor: state.teams.length }, { metrica: 'Inventario', valor: state.inventory.length }]
  }[module] || [];
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (c === '"') {
      if (inQuotes && n === '"') { cell += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) { row.push(cell); cell = ''; }
    else if ((c === '\n' || c === '\r') && !inQuotes) {
      if (c === '\r' && n === '\n') i++;
      row.push(cell); if (row.some(v => String(v).trim() !== '')) rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  row.push(cell); if (row.some(v => String(v).trim() !== '')) rows.push(row);
  if (!rows.length) return [];
  const headers = rows.shift().map(h => String(h || '').trim());
  return rows.map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ''])));
}
function csvField(row, names) {
  const entries = Object.entries(row);
  const clean = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const name of names) {
    const wanted = clean(name);
    const found = entries.find(([k]) => clean(k).includes(wanted) || wanted.includes(clean(k)));
    if (found) return String(found[1] ?? '').trim();
  }
  return '';
}
async function importInventoryCsv(file, text) {
  const rows = parseCsv(text);
  if (!rows.length) throw new Error('El CSV no contiene filas válidas.');
  const seenBarcodes = new Set();
  const mapped = rows.map((row, idx) => {
    const code = csvField(row, ['ID', 'codigo interno', 'codigo', 'asset_code']);
    let barcode = csvField(row, ['codigo de barras', 'barras', 'barcode', 'etiquetas']);
    const item = csvField(row, ['descripcion', 'descripción', 'nombre', 'item', 'producto']) || code || `Item ${idx + 1}`;
    const condition = csvField(row, ['estado', 'condicion', 'condición', 'observacion']);
    const brand = csvField(row, ['marca']);
    const category = csvField(row, ['categoria', 'categoría']);
    const supplier = csvField(row, ['proveedor', 'empresa']);
    const location = csvField(row, ['ubicacion', 'ubicación', 'domicilio', 'locacion']);
    const zone = csvField(row, ['zona']);
    const serial = csvField(row, ['serie', 'serial', 'n serie']);
    const qty = csvField(row, ['stock actual', 'cantidad']);
    const cleanCode = code || `CSV-${idx + 1}`;
    if (!barcode) barcode = `ISMROB-${String(idx + 1).padStart(6, '0')}`;
    if (seenBarcodes.has(barcode)) barcode = `${barcode}-${cleanCode}`;
    seenBarcodes.add(barcode);
    return { code: cleanCode, barcode, item, type: 'Equipo', serial, category: category || 'General', brand, supplier, location_detail: location, zone, location_code: 'LAB-ROB', condition: condition || 'Sin observaciones', quantity: Number(qty) || 1 };
  }).filter(x => x.item || x.code || x.barcode);
  if (!mapped.length) throw new Error('No pude mapear productos desde el CSV. Revisá encabezados como ID, Código de Barras, Descripción, Marca, Categoría y Proveedor.');
  if (window.sb?.enabled) {
    let ok = 0;
    for (const item of mapped) { await window.sb.createInventoryAsset(item); ok++; }
    await refreshSupabaseData();
    return ok;
  }
  state.inventory.unshift(...mapped.map((x, i) => ({ ...x, id: Date.now() + i, status: 'Disponible', assignedTo: '-', requestedAt: '-', returnedAt: '-', teacher: '-', location: x.location_detail || 'Lab. Robótica' })));
  renderView();
  return mapped.length;
}
function openImport(module) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv,text/csv';
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        if (module === 'inventory') {
          Swal.fire({ title: 'Importando inventario...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
          const count = await importInventoryCsv(file, String(reader.result || ''));
          Swal.fire({ icon: 'success', title: 'CSV importado', text: `${count} productos importados correctamente.` });
        } else {
          Swal.fire({ icon: 'success', title: 'CSV importado', text: `${file.name} cargado para el módulo ${module}.` });
        }
      } catch (error) { Swal.fire({ icon:'error', title:'No se pudo importar CSV', text: error.message }); }
    };
    reader.readAsText(file, 'utf-8');
  };
  input.click();
}

function generateBarcode() {
  const code = `ISM-BAR-${String(state.inventory.length + 1).padStart(6, '0')}`;
  const target = document.getElementById('barcodePreviewBox');
  if (target) target.innerHTML = barcodePreviewMarkup(code);
  Swal.fire({ icon: 'success', title: 'Código generado', text: `Se generó el código ${code} para un insumo sin número de serie.` });
}

function printInventoryBarcodes(items = getFilteredInventory()) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return Swal.fire({ icon:'info', title:'Sin etiquetas', text:'No hay productos para imprimir con el filtro actual.' });
  const labels = list.map(i => `<div class="label-card"><div class="meta top">${escapeHtml(i.code)} · ${escapeHtml(i.item)}</div>${barcodePatternSvg(i.barcode || i.code)}<strong>${escapeHtml(i.barcode || i.code)}</strong><div class="meta">${escapeHtml(i.location_detail || i.location || '')} ${escapeHtml(i.zone || '')}</div><div class="brand">by Ing. Gambino</div></div>`).join('');
  const html = `<!doctype html><html><head><title>Barcodes ISM</title><style>
    *{box-sizing:border-box} body{font-family:Arial,sans-serif;margin:16px;color:#111;background:#fff}.print-btn{margin:0 0 14px;padding:6px 12px}.sheet{display:grid;grid-template-columns:repeat(3,64mm);gap:7mm;align-items:start}.label-card{width:64mm;min-height:32mm;border:1px solid #111;border-radius:4mm;padding:3mm;text-align:center;break-inside:avoid;background:#fff;color:#111;overflow:hidden}.barcode-svg{display:block;width:52mm;height:14mm;margin:1mm auto;background:#fff}.label-card strong{display:block;font-size:10pt;margin-top:1mm;color:#111}.meta{font-size:7pt;color:#222;line-height:1.15;white-space:normal}.meta.top{min-height:8mm}@media print{.print-btn{display:none}@page{margin:10mm}.sheet{grid-template-columns:repeat(3,64mm);gap:6mm}.label-card{page-break-inside:avoid}}
  </style></head><body><button class="print-btn" onclick="window.print()">Imprimir</button><h2>Etiquetas de inventario ISM</h2><div class="sheet">${labels}</div><script>window.onload=()=>setTimeout(()=>window.print(),450)</script></body></html>`;
  const w = window.open('', '_blank');
  if (!w) return Swal.fire({ icon:'warning', title:'Popup bloqueado', text:'Permití ventanas emergentes para imprimir etiquetas.' });
  w.document.open(); w.document.write(html); w.document.close();
}

async function openNotificationComposer() {
  const recipientOptions = state.user.role === 'administrator'
    ? `<option value="all">Todos los usuarios</option><option value="teachers">Todos los docentes</option><option value="students">Todos los alumnos</option><option value="team">Equipo específico</option><option value="multi">Selección múltiple</option><option value="individual">Usuario individual</option>`
    : `<option value="team">Mis equipos</option><option value="multi">Selección múltiple</option><option value="individual">Usuario individual</option>`;
  const result = await Swal.fire({
    title: 'Nueva notificación',
    width: 720,
    confirmButtonText: 'Enviar',
    focusConfirm: false,
    html: `
      <div class="swal-form-grid">
        <label><span>Título</span><input id="notifyTitle" class="swal2-input" placeholder="Ej. Cambio de horario"></label>
        <label><span>Destino</span><select id="notifyTarget" class="swal2-select">${recipientOptions}</select></label>
        <label class="full-span"><span>Destinatarios / equipo</span><input id="notifyReceivers" class="swal2-input" placeholder="Ej. Equipo Rover A, María López, alumnos 6°C"></label>
        <label class="full-span"><span>Mensaje</span><textarea id="notifyMessage" class="swal2-textarea" placeholder="Escribí el contenido de la notificación"></textarea></label>
      </div>`,
    preConfirm: () => {
      const title = document.getElementById('notifyTitle').value.trim();
      const target = document.getElementById('notifyTarget').value;
      const receivers = document.getElementById('notifyReceivers').value.trim() || 'Destino demo';
      const message = document.getElementById('notifyMessage').value.trim();
      if (!title || !message) {
        Swal.showValidationMessage('Completá título y mensaje.');
        return false;
      }
      return { title, target, receivers, message };
    }
  });
  if (!result.isConfirmed) return;
  state.notifications.unshift({ id: Date.now(), title: result.value.title, message: `${result.value.message} (${result.value.receivers})`, unread: true, section: 'notifications' });
  renderView();
  Swal.fire({ icon: 'success', title: 'Notificación enviada', text: `Destino: ${result.value.receivers}` });
}

async function openLoanRequest() {
  const items = state.inventory.filter(i => i.status === 'Disponible').map(i => `<option value="${i.code}">${i.code} · ${i.item}</option>`).join('');
  const result = await Swal.fire({
    title: 'Solicitud de préstamo', width: 860, confirmButtonText: 'Solicitar',
    html: `<div class="swal-form-grid"><label><span>Curso / equipo</span><input id="loanCourse" class="swal2-input" placeholder="Ej. Equipo Rover A / 6°C"></label><label><span>Fecha de uso</span><input id="loanDate" type="date" class="swal2-input"></label><label><span>Hora desde</span><input id="loanFrom" type="time" class="swal2-input"></label><label><span>Hora hasta</span><input id="loanTo" type="time" class="swal2-input"></label><label class="full-span"><span>Insumos (1 o más)</span><select id="loanItems" class="swal2-select" multiple size="6">${items}</select></label><label class="full-span"><span>Observaciones</span><textarea id="loanObs" class="swal2-textarea" placeholder="Detalle del pedido y condición esperada"></textarea></label></div>`,
    preConfirm: () => {
      const course = document.getElementById('loanCourse').value.trim();
      const date = document.getElementById('loanDate').value;
      const from = document.getElementById('loanFrom').value;
      const to = document.getElementById('loanTo').value;
      const selected = [...document.getElementById('loanItems').selectedOptions].map(o => o.value);
      const notes = document.getElementById('loanObs').value.trim();
      if (!course || !date || !from || !to || !selected.length) { Swal.showValidationMessage('Completá curso/equipo, fecha, franja horaria y al menos un insumo.'); return false; }
      return { course, date, from, to, selected, notes };
    }
  });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) {
      await window.sb.createLoanRequest(result.value);
      await refreshSupabaseData();
    } else {
      state.loans.unshift({ id: Date.now(), requester: state.user.name, requester_id: state.user.id, team: result.value.course, date: result.value.date, from: result.value.from, to: result.value.to, items: result.value.selected, notes: result.value.notes || '-', status: 'Pendiente' });
      state.notifications.unshift({ id: Date.now()+1, title: 'Nueva solicitud de préstamo', message: state.user.name + ' solicitó ' + result.value.selected.join(', ') + ' para ' + result.value.course + '.', unread: true, section: 'loanManagement' });
    }
    renderView();
    Swal.fire({ icon: 'success', title: 'Solicitud registrada', text: result.value.selected.length + ' insumo(s) solicitados para ' + result.value.course + '.' });
  } catch (error) { Swal.fire({ icon:'error', title:'No se pudo registrar la solicitud', text:error.message || String(error) }); }
}

async function openJoinCourse() {
  const result = await Swal.fire({
    title: 'Suscribirme a un curso',
    width: 640,
    confirmButtonText: 'Ingresar',
    html: `
      <div class="swal-form-grid">
        <label><span>Código del curso</span><input id="joinCode" class="swal2-input" placeholder="Ej. IMP3D-26"></label>
        <label><span>Clave de acceso</span><input id="joinKey" class="swal2-input" placeholder="Ej. makerlab"></label>
      </div>`,
    preConfirm: () => {
      const code = document.getElementById('joinCode').value.trim().toUpperCase();
      const key = document.getElementById('joinKey').value.trim();
      const found = state.modules.find(m => m.code === code && m.accessKey === key);
      if (!found) {
        Swal.showValidationMessage('Código o clave incorrectos.');
        return false;
      }
      return found;
    }
  });
  if (!result.isConfirmed) return;
  const existing = state.studentCourses.find(c => c.title === result.value.title);
  if (!existing) {
    state.studentCourses.unshift({ id: result.value.id, title: result.value.title, teacher: result.value.teacher, team: result.value.team, progress: 0, lessons: result.value.lessons, tasks: result.value.tasks, evaluations: result.value.evaluations, access: 'Incripto', visibility: result.value.visibility });
  }
  openView('courses');
  Swal.fire({ icon: 'success', title: 'Curso agregado', text: `Ahora tenés acceso a ${result.value.title}.` });
}

function openChartPreview(module='dashboard') {
  Swal.fire({ title: 'Ver gráficos', width: 860, showConfirmButton: false, html: `<div class="swal-form-grid"><label><span>Tipo</span><select id="chartTypeSelect" class="swal2-select"><option value="bar">Barras</option><option value="line">Línea</option><option value="pie">Torta</option></select></label><label><span>Módulo</span><input class="swal2-input" value="${module}" disabled></label><div class="full-span" style="height:340px;padding-top:8px"><canvas id="modalChartCanvas"></canvas></div></div>`, didOpen: () => { new Chart(document.getElementById('modalChartCanvas'), { type: 'bar', data: { labels: ['A','B','C'], datasets: [{ label: module, data: [5,3,4] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: chartTextColor() } } }, scales: { x: { ticks: { color: chartTextColor() }, grid: { color: chartGridColor() } }, y: { ticks: { color: chartTextColor() }, grid: { color: chartGridColor() } } } } }); } });
}

function openFormPreview(kind='resource') {
  const forms = {
    resource: ['Nuevo recurso', `<div class="swal-form-grid"><label><span>Título</span><input class="swal2-input" placeholder="Ej. Manual Arduino ISM"></label><label><span>Tipo</span><select class="swal2-select"><option>PDF</option><option>Video</option><option>Documento</option><option>TXT</option><option>ZIP</option><option>GitHub</option></select></label><label><span>Categoría</span><input class="swal2-input" placeholder="Electrónica"></label><label><span>Archivo / URL</span><input class="swal2-input" placeholder="https://... o nombre de archivo"></label><label class="full-span"><span>Descripción</span><textarea class="swal2-textarea" placeholder="Detalle del recurso"></textarea></label></div>`],
    course: ['Nuevo curso', `<div class="swal-form-grid"><label><span>Nombre del curso</span><input class="swal2-input"></label><label><span>Visibilidad</span><select class="swal2-select"><option>Público</option><option>Solo equipos asignados</option></select></label><label><span>Equipo / cursos permitidos</span><input class="swal2-input"></label><label><span>Clave de acceso</span><input class="swal2-input"></label><label class="full-span"><span>Descripción</span><textarea class="swal2-textarea"></textarea></label></div>`],
    module: ['Nuevo módulo', `<div class="swal-form-grid"><label><span>Nombre del módulo</span><input class="swal2-input"></label><label><span>Categoría</span><input class="swal2-input"></label><label class="full-span"><span>Descripción</span><textarea class="swal2-textarea"></textarea></label></div>`],
    lesson: ['Nueva lección', `<div class="swal-form-grid"><label><span>Título</span><input class="swal2-input"></label><label><span>Duración</span><input class="swal2-input" placeholder="45 min"></label><label><span>Video</span><input class="swal2-input" placeholder="URL YouTube"></label><label><span>Archivo adjunto</span><input class="swal2-input" placeholder="PDF / ZIP / Link"></label><label class="full-span"><span>Contenido</span><textarea class="swal2-textarea"></textarea></label></div>`],
    task: ['Nueva tarea', `<div class="swal-form-grid"><label><span>Título</span><input class="swal2-input"></label><label><span>Puntaje</span><input class="swal2-input"></label><label><span>Reintentos</span><input class="swal2-input"></label><label><span>Fecha límite</span><input type="date" class="swal2-input"></label><label class="full-span"><span>Consigna</span><textarea class="swal2-textarea"></textarea></label></div>`],
    quiz: ['Nuevo evaluativo', `<div class="swal-form-grid"><label><span>Título</span><input class="swal2-input"></label><label><span>Intentos</span><input class="swal2-input"></label><label><span>Pregunta</span><input class="swal2-input"></label><label><span>Respuesta correcta</span><input class="swal2-input"></label><label class="full-span"><span>Opciones</span><textarea class="swal2-textarea" placeholder="Una por línea"></textarea></label></div>`],
    access: ['Nuevo registro RFID', `<div class="swal-form-grid"><label><span>Usuario</span><input class="swal2-input"></label><label><span>Tarjeta RFID</span><input class="swal2-input"></label><label><span>Categoría</span><input class="swal2-input"></label><label><span>Sala</span><input class="swal2-input"></label><label><span>Ingreso</span><input type="datetime-local" class="swal2-input"></label><label><span>Salida</span><input type="datetime-local" class="swal2-input"></label></div>`]
  };
  const [title, html] = forms[kind] || forms.resource;
  Swal.fire({ title, width: 860, html, confirmButtonText: 'Guardar demo' });
}

async function updateLoanStatus(id, status) {
  const loan = state.loans.find(l => String(l.id) === String(id));
  if (!loan) return;
  try {
    if (window.sb?.enabled) await window.sb.updateLoanStatus(id, status);
    loan.status = status;
    await refreshSupabaseData();
    renderView();
    showToast('Préstamo actualizado', status);
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'No se pudo actualizar', text: error.message || String(error) });
  }
}


function getRecordByType(type, id) {
  const nId = Number(id);
  if (type === 'user') return state.users.find(x => String(x.id) === String(id) || x.id === nId);
  if (type === 'inventory') return state.inventory.find(x => String(x.id) === String(id) || x.id === nId);
  if (type === 'team') return state.teams.find(x => String(x.id) === String(id) || x.id === nId);
  return null;
}

async function handleTableAction(type, action, id) {
  const row = getRecordByType(type, id);
  if (!row) return Swal.fire({ icon: 'warning', title: 'Registro no encontrado' });
  if (action === 'view') return viewRecord(type, row);
  if (action === 'edit') return editRecord(type, row);
  if (action === 'delete') return deleteRecord(type, row);
}

function viewRecord(type, row) {
  const title = type === 'user' ? 'Detalle de usuario' : type === 'inventory' ? 'Detalle de inventario' : 'Detalle de equipo';
  const labels = type === 'user'
    ? { name:'Nombre completo', email:'Email', role:'Rol', role_code:'Código de rol', whatsapp:'WhatsApp', dni:'DNI', status:'Estado', birth_date:'Fecha de nacimiento', title:'Título / Certificados' }
    : {};
  const preferred = type === 'user' ? ['name','email','role','role_code','whatsapp','dni','status','birth_date','title'] : Object.keys(row);
  const avatarSrc = row.avatar_url || './assets/avatar-default.svg';
  const certText = row.role_code === 'student' || row.role === 'Alumno'
    ? 'Los certificados del alumno se generan desde cursos finalizados del Campus Virtual.'
    : (row.title || '-');
  const html = `<div class="user-detail-card">${type === 'user' ? `<div class="user-detail-header"><img src="${escapeHtml(avatarSrc)}" onerror="this.src='./assets/avatar-default.svg'"/><div><h3>${escapeHtml(row.name || '-')}</h3><p>${escapeHtml(row.email || '-')}</p><span class="status ${row.status === 'Activo' ? 'ok' : 'warn'}">${escapeHtml(row.status || '-')}</span></div></div>` : ''}<div class="detail-grid pretty">${preferred.filter(k => k in row).map(k => `<div class="${k === 'title' ? 'full-span' : ''}"><strong>${escapeHtml(labels[k] || k)}</strong><span>${escapeHtml(k === 'title' ? certText : (Array.isArray(row[k]) ? row[k].join(', ') : row[k] || '-'))}</span></div>`).join('')}</div></div>`;
  return Swal.fire({ title, html, width: 820, confirmButtonText: 'Cerrar' });
}

async function editRecord(type, row) {
  if (type === 'user') return editUserRecord(row);
  if (type === 'inventory') return editInventoryRecord(row);
  if (type === 'team') return editTeamRecord(row);
}

async function editUserRecord(row) {
  const result = await Swal.fire({
    title: 'Editar usuario',
    html: `<div class="swal-form-grid">
      <label><span>Nombre completo</span><input id="editName" class="swal2-input" value="${escapeHtml(row.name)}"></label>
      <label><span>Email</span><input id="editEmail" class="swal2-input" value="${escapeHtml(row.email)}" disabled></label>
      <label><span>Rol</span><select id="editRole" class="swal2-select"><option ${row.role==='Administrador'?'selected':''}>Administrador</option><option ${row.role==='Docente'?'selected':''}>Docente</option><option ${row.role==='Alumno'?'selected':''}>Alumno</option></select></label>
      <label><span>Estado</span><select id="editStatus" class="swal2-select"><option ${row.status==='Activo'?'selected':''}>Activo</option><option ${row.status==='Inactivo'?'selected':''}>Inactivo</option><option ${row.status==='Pendiente'?'selected':''}>Pendiente</option></select></label>
      <label><span>DNI</span><input id="editDni" class="swal2-input" value="${escapeHtml(row.dni || '')}"></label>
      <label><span>WhatsApp</span><input id="editWhatsapp" class="swal2-input" value="${escapeHtml(row.whatsapp || '')}"></label>
      <label><span>Fecha de nacimiento</span><input id="editBirthDate" type="date" class="swal2-input" value="${escapeHtml(row.birth_date || '')}"></label>
      <label><span>Título / Especialidad</span><input id="editTitle" class="swal2-input" value="${escapeHtml(row.title || '')}" placeholder="Disponible para Admin y Docente"></label>
      <label class="full-span"><span>Foto de perfil</span>
        <div class="avatar-edit-box"><img id="editAvatarPreview" src="${escapeAttr(row.avatar_url || './assets/avatar-default.svg')}" onerror="this.src='./assets/avatar-default.svg'" alt="Foto actual"><input id="editAvatarFile" type="file" accept="image/*"></div>
        <input id="editAvatar" class="swal2-input" value="${escapeHtml(row.avatar_url || '')}" placeholder="URL opcional o base64 existente">
        <small class="form-help">Podés cargar una imagen desde tu equipo o pegar una URL. Para alumnos, los certificados se gestionan desde cursos terminados del Campus Virtual.</small></label>
    </div>`,
    showCancelButton: true, confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
    didOpen: () => {
      const roleEl = document.getElementById('editRole');
      const titleEl = document.getElementById('editTitle');
      const syncTitle = () => {
        const isStudent = roleEl.value === 'Alumno';
        titleEl.disabled = isStudent;
        titleEl.placeholder = isStudent ? 'Certificados generados por cursos finalizados' : 'Título, materia o especialidad';
      };
      roleEl.addEventListener('change', syncTitle);
      syncTitle();
      const avatarFile = document.getElementById('editAvatarFile');
      const avatarInput = document.getElementById('editAvatar');
      const avatarPreview = document.getElementById('editAvatarPreview');
      avatarFile?.addEventListener('change', async () => {
        const dataUrl = await readFileAsDataUrl(avatarFile.files?.[0]);
        if (dataUrl) { avatarInput.value = dataUrl; avatarPreview.src = dataUrl; }
      });
    },
    preConfirm: async () => {
      const fileData = await readFileAsDataUrl(document.getElementById('editAvatarFile').files?.[0]);
      const avatarValue = fileData || document.getElementById('editAvatar').value.trim() || row.avatar_url || './assets/avatar-default.svg';
      return {
        name: document.getElementById('editName').value.trim(),
        role: document.getElementById('editRole').value,
        status: document.getElementById('editStatus').value,
        dni: document.getElementById('editDni').value.trim(),
        whatsapp: document.getElementById('editWhatsapp').value.trim(),
        birth_date: document.getElementById('editBirthDate').value || null,
        title: document.getElementById('editRole').value === 'Alumno' ? null : document.getElementById('editTitle').value.trim(),
        avatar_url: avatarValue
      };
    }
  });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) await window.sb.updateProfileFull(row.id, result.value);
    Object.assign(row, result.value);
    await refreshSupabaseData(); renderView(); showToast('Usuario actualizado');
  } catch (error) { Swal.fire({ icon:'error', title:'No se pudo actualizar', text:error.message }); }
}

async function editInventoryRecord(row) {
  if (state.user.role !== 'administrator') return Swal.fire({ icon:'warning', title:'Acción no permitida', text:'Solo el administrador puede editar insumos.' });
  return openInventoryAssetForm(row);
}

async function deleteRecord(type, row) {
  if (type === 'inventory' && state.user.role !== 'administrator') return Swal.fire({ icon:'warning', title:'Acción no permitida', text:'Solo el administrador puede eliminar insumos.' });
  const result = await Swal.fire({ icon: 'warning', title: 'Eliminar registro', text: type === 'user' ? 'Se eliminará el usuario del ABM y de Auth/Profiles. Esta acción no se puede deshacer.' : 'Se eliminará el registro seleccionado.', showCancelButton: true, confirmButtonText: 'Eliminar definitivamente', cancelButtonText: 'Cancelar' });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) {
      if (type === 'user') await window.sb.deleteProfile(row.id);
      if (type === 'inventory') await window.sb.softDeleteInventoryAsset(row.id);
      if (type === 'team') await window.sb.deleteTeam(row.id);
    }
    if (type === 'user') state.users = state.users.filter(x => String(x.id) !== String(row.id));
    if (type === 'inventory') state.inventory = state.inventory.filter(x => String(x.id) !== String(row.id));
    if (type === 'team') state.teams = state.teams.filter(x => String(x.id) !== String(row.id));
    await refreshSupabaseData(); renderView(); showToast('Registro eliminado');
  } catch (error) { Swal.fire({ icon:'error', title:'No se pudo eliminar', text:error.message }); }
}

function openResourceViewer(id) {
  Swal.fire({ title: 'Recurso', text: `Recurso seleccionado: ${id}`, confirmButtonText: 'Cerrar' });
}

function attachViewEvents() {
  appContent.querySelectorAll('[data-view-btn]').forEach(btn => btn.addEventListener('click', () => openView(btn.dataset.viewBtn)));
  appContent.querySelectorAll('.notification-select').forEach(btn => btn.addEventListener('click', () => selectNotification(btn.dataset.id)));
  appContent.querySelectorAll('[data-import]').forEach(btn => btn.addEventListener('click', () => openImport(btn.dataset.import)));
  appContent.querySelectorAll('[data-export]').forEach(btn => btn.addEventListener('click', () => triggerDownload(`${btn.dataset.export}.csv`, csvFromRows(dataByModule(btn.dataset.export)))));
  appContent.querySelectorAll('[data-action][data-type][data-id]').forEach(btn => btn.addEventListener('click', () => handleTableAction(btn.dataset.type, btn.dataset.action, btn.dataset.id)));
  document.getElementById('newRoleBtn')?.addEventListener('click', () => openRoleForm());
  appContent.querySelectorAll('[data-role-action][data-id]').forEach(btn => btn.addEventListener('click', () => handleRoleAction(btn.dataset.roleAction, btn.dataset.id)));
  appContent.querySelectorAll('[data-create]').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.create === 'user') return openUserProfileForm();
    if (btn.dataset.create === 'inventory') return openInventoryAssetForm();
    if (btn.dataset.create === 'team') return openTeamForm();
    return openFormPreview(btn.dataset.create === 'module' ? 'course' : btn.dataset.create);
  }));
  appContent.querySelectorAll('[data-preview-form]').forEach(btn => btn.addEventListener('click', () => openFormPreview(btn.dataset.previewForm)));
  appContent.querySelectorAll('[data-view-resource]').forEach(btn => btn.addEventListener('click', () => openResourceViewer(btn.dataset.viewResource)));
  appContent.querySelectorAll('[data-open-student-course]').forEach(btn => btn.addEventListener('click', () => { state.selectedStudentCourse = state.studentCourses.find(c => c.title === btn.dataset.openStudentCourse); state.currentCourseScreen = 'detail'; state.courseContentTab = 'lesson'; renderView(); }));
  appContent.querySelectorAll('.course-select-tab').forEach(btn => btn.addEventListener('click', () => { state.courseContentTab = btn.dataset.courseTab; renderView(); }));
  document.getElementById('backCampusBtn')?.addEventListener('click', () => { state.currentCourseScreen = 'list'; state.selectedStudentCourse = null; state.courseContentTab = 'lesson'; renderView(); });
  document.getElementById('newCourseBtn')?.addEventListener('click', () => openFormPreview('course'));
  document.getElementById('addModuleBtn')?.addEventListener('click', () => openFormPreview('module'));
  document.getElementById('newResourceBtn')?.addEventListener('click', () => openFormPreview('resource'));
  document.getElementById('courseChartsBtn')?.addEventListener('click', () => openChartPreview('courses'));
  document.getElementById('libraryChartsBtn')?.addEventListener('click', () => openChartPreview('library'));
  document.getElementById('loanChartsBtn')?.addEventListener('click', () => openChartPreview('loanManagement'));
  document.getElementById('accessChartsBtn')?.addEventListener('click', () => openChartPreview('accessControl'));
  document.getElementById('resourceCategoryBtn')?.addEventListener('click', () => Swal.fire({ title: 'Categorías', text: 'Podrás agregar categorías faltantes en la integración real.' }));
  document.getElementById('manageCategoriesBtn')?.addEventListener('click', () => Swal.fire({ title: 'Categorías de acceso', text: 'Podrás agregar categorías personalizadas para RFID.' }));
  appContent.querySelectorAll('[data-approve-loan]').forEach(btn => btn.addEventListener('click', () => updateLoanStatus(btn.dataset.approveLoan, 'Aprobado')));
  appContent.querySelectorAll('[data-reject-loan]').forEach(btn => btn.addEventListener('click', () => updateLoanStatus(btn.dataset.rejectLoan, 'Rechazado')));
  appContent.querySelectorAll('[data-return-loan]').forEach(btn => btn.addEventListener('click', () => updateLoanStatus(btn.dataset.returnLoan, 'Devuelto')));
  document.getElementById('periodFilter')?.addEventListener('change', e => { state.filters.period = e.target.value; renderCharts(); showToast('Filtro aplicado', 'Se actualizaron los gráficos'); });
  document.getElementById('userSearch')?.addEventListener('input', e => { state.filters.userSearch = e.target.value; renderView(); });
  document.getElementById('userRoleFilter')?.addEventListener('change', e => { state.filters.userRole = e.target.value; renderView(); });
  document.getElementById('inventorySearch')?.addEventListener('input', debounce(e => { state.filters.inventorySearch = e.target.value; renderView(); setTimeout(() => { const el = document.getElementById('inventorySearch'); if (el) { el.focus(); const len = el.value.length; el.setSelectionRange(len, len); } }, 0); }, 300));
  document.getElementById('inventoryStateFilter')?.addEventListener('change', e => { state.filters.inventoryState = e.target.value; state.inventoryPage = 1; renderView(); });
  document.getElementById('inventoryTypeFilter')?.addEventListener('change', e => { state.filters.inventoryType = e.target.value; state.inventoryPage = 1; renderView(); });
  document.getElementById('generateBarcodeBtn')?.addEventListener('click', generateBarcode);
  document.getElementById('printBarcodesBtn')?.addEventListener('click', () => printInventoryBarcodes(getFilteredInventory()));
  document.querySelectorAll('.inventory-page-size').forEach(el => el.addEventListener('change', e => { state.inventoryPageSize = Number(e.target.value) || 10; state.inventoryPage = 1; renderView(); }));
  document.querySelectorAll('.inventory-prev-page').forEach(el => el.addEventListener('click', () => { state.inventoryPage = Math.max(1, state.inventoryPage - 1); renderView(); }));
  document.querySelectorAll('.inventory-next-page').forEach(el => el.addEventListener('click', () => { const totalPages = Math.max(1, Math.ceil(getFilteredInventory().length / state.inventoryPageSize)); state.inventoryPage = Math.min(totalPages, state.inventoryPage + 1); renderView(); }));
  document.getElementById('inventoryChartsBtn')?.addEventListener('click', () => openInventoryCharts());
  appContent.querySelectorAll('[data-print-barcode]').forEach(btn => btn.addEventListener('click', () => { const item = state.inventory.find(x => String(x.id) === String(btn.dataset.printBarcode)); if (item) printInventoryBarcodes([item]); }));
  document.getElementById('newInventoryItemBtn')?.addEventListener('click', openInventoryAssetForm);
  document.getElementById('loanRequestBtn')?.addEventListener('click', openLoanRequest);
  document.getElementById('loanRequestBtn2')?.addEventListener('click', openLoanRequest);
  document.getElementById('massNotifyBtn')?.addEventListener('click', openNotificationComposer);
  document.getElementById('joinCourseBtn')?.addEventListener('click', openJoinCourse);
  document.getElementById('editProfileBtn')?.addEventListener('click', () => editUserRecord(state.user));
  document.getElementById('saveSettingsBtn')?.addEventListener('click', () => Swal.fire({ icon: 'success', title: 'Configuración guardada', text: 'Los cambios de branding y sistema fueron guardados en la demo.' }));
}

function bindEvents() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    setTheme(document.body.classList.contains('light') ? 'dark' : 'light');
    renderCharts();
  });
  document.getElementById('sidebarToggle').addEventListener('click', () => appShell.classList.toggle('collapsed'));
  document.getElementById('profileNameBtn').addEventListener('click', () => openView('profile'));
  document.getElementById('avatarUploadBtn').addEventListener('click', () => document.getElementById('avatarInput').click());
  document.getElementById('avatarInput').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        state.user.avatar_url = reader.result;
        localStorage.setItem('ism_demo_user', JSON.stringify(state.user));
        if (window.sb?.enabled) await window.sb.updateMyAvatar(reader.result);
        updateHeader();
        if (state.currentView === 'profile') renderView();
        showToast('Foto actualizada', 'La imagen quedó guardada en Supabase');
      } catch (error) {
        Swal.fire({ icon:'error', title:'No se pudo guardar la foto', text:error.message });
      }
    };
    reader.readAsDataURL(file);
  });
  document.getElementById('fullscreenBtn').addEventListener('click', async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  });
  const doLogout = async () => {
    const result = await Swal.fire({ icon: 'question', title: 'Cerrar sesión', text: '¿Deseás salir del sistema?', showCancelButton: true, confirmButtonText: 'Salir', cancelButtonText: 'Cancelar' });
    if (!result.isConfirmed) return;
    localStorage.removeItem('ism_demo_user');
    await window.sb.signOut();
    window.location.href = './index.html';
  };
  document.getElementById('headerLogoutBtn').addEventListener('click', doLogout);
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('.nav-item[data-view]');
    if (navBtn) openView(navBtn.dataset.view);
    if (e.target.closest('#sidebarLogoutBtn')) doLogout();
    if (e.target.closest('#notificationsBtn')) {
      state.notificationsOpen = !state.notificationsOpen;
      renderNotificationDropdown();
      return;
    }
    if (!e.target.closest('#notificationsWrapper')) {
      state.notificationsOpen = false;
      renderNotificationDropdown();
    }
    const previewAction = e.target.closest('#notificationsPreview [data-view-btn]');
    if (previewAction) openView(previewAction.dataset.viewBtn);
    const previewSelect = e.target.closest('#notificationsPreview .notification-select');
    if (previewSelect) selectNotification(previewSelect.dataset.id);
  });
}


async function refreshSupabaseData() {
  if (!window.sb?.enabled) return;
  try {
    const [profile, users, inventory, teams, loans, roles, notifications] = await Promise.all([
      window.sb.fetchProfile().catch(() => null),
      window.sb.listProfiles().catch(() => null),
      window.sb.listInventory().catch(() => null),
      window.sb.listTeams?.().catch(() => null),
      window.sb.listLoans?.().catch(() => null),
      window.sb.listRoles?.().catch(() => null),
      window.sb.listNotifications?.().catch(() => null)
    ]);
    if (profile) {
      state.user = profile;
      localStorage.setItem('ism_demo_user', JSON.stringify(profile));
      updateHeader();
    }
    if (Array.isArray(users) && users.length) state.users = users;
    if (Array.isArray(inventory)) state.inventory = inventory;
    if (Array.isArray(teams) && teams.length) state.teams = teams;
    if (Array.isArray(loans) && loans.length) state.loans = loans;
    if (Array.isArray(roles) && roles.length) state.rolesData = roles;
    if (Array.isArray(notifications)) state.notifications = notifications;
  } catch (error) {
    console.error(error);
    showToast('Supabase', error.message || 'No se pudieron cargar los datos conectados');
  }
}


function usersByRole(roleLabel) {
  return (state.users || []).filter(u => u.role === roleLabel && u.status !== 'Inactivo');
}

async function openTeamForm(team = null) {
  const teachers = usersByRole('Docente');
  const students = usersByRole('Alumno');
  const mentorOptions = teachers.map(u => `<option value="${u.id}" ${String(team?.mentor_id||'')===String(u.id)?'selected':''}>${escapeHtml(u.name)} · ${escapeHtml(u.email || '')}</option>`).join('');
  const backupOptions = `<option value="">Sin suplente</option>` + teachers.map(u => `<option value="${u.id}" ${String(team?.mentor_backup_id||'')===String(u.id)?'selected':''}>${escapeHtml(u.name)} · ${escapeHtml(u.email || '')}</option>`).join('');
  const selectedStudents = new Set((team?.student_ids || []).map(String));
  const studentOptions = students.map(u => `<option value="${u.id}" ${selectedStudents.has(String(u.id))?'selected':''}>${escapeHtml(u.name)} · ${escapeHtml(u.email || '')}</option>`).join('');
  const result = await Swal.fire({
    title: team ? 'Editar equipo' : 'Nuevo equipo', width: 900,
    html: `<div class="swal-form-grid"><label><span>Nombre del equipo</span><input id="teamName" class="swal2-input" value="${escapeHtml(team?.name || '')}" placeholder="Ej. Equipo Maker"></label><label><span>Proyecto</span><input id="teamProject" class="swal2-input" value="${escapeHtml(team?.project || '')}" placeholder="Ej. Robot sumo"></label><label><span>Mentor docente</span><select id="teamMentor" class="swal2-select"><option value="">Seleccionar docente</option>${mentorOptions}</select></label><label><span>Mentor suplente</span><select id="teamBackup" class="swal2-select">${backupOptions}</select></label><label class="full-span"><span>Alumnos del equipo (máximo 5)</span><select id="teamStudents" class="swal2-select" multiple size="8">${studentOptions}</select><small class="form-help">Usá Ctrl/Cmd para seleccionar varios alumnos.</small></label><label class="full-span"><span>Descripción / observaciones</span><textarea id="teamDescription" class="swal2-textarea" placeholder="Detalle del equipo, curso o división">${escapeHtml(team?.description || '')}</textarea></label></div>`,
    showCancelButton: true, confirmButtonText: 'Guardar equipo', cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('teamName').value.trim();
      const mentor_id = document.getElementById('teamMentor').value;
      const mentor_backup_id = document.getElementById('teamBackup').value || null;
      const student_ids = Array.from(document.getElementById('teamStudents').selectedOptions).map(o => o.value);
      if (!name) return Swal.showValidationMessage('Ingresá el nombre del equipo');
      if (!mentor_id) return Swal.showValidationMessage('Seleccioná el mentor docente');
      if (mentor_backup_id && mentor_backup_id === mentor_id) return Swal.showValidationMessage('El mentor suplente debe ser otro docente');
      if (student_ids.length > 5) return Swal.showValidationMessage('Cada equipo admite hasta 5 alumnos');
      return { id: team?.id || null, name, project: document.getElementById('teamProject').value.trim(), description: document.getElementById('teamDescription').value.trim(), mentor_id, mentor_backup_id, student_ids };
    }
  });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) await window.sb.saveTeam(result.value);
    else state.teams.unshift({ ...result.value, id: result.value.id || Date.now(), teachers: teachers.filter(t => [result.value.mentor_id, result.value.mentor_backup_id].includes(String(t.id))).map(t => t.name), students: result.value.student_ids.length, courses: [], divisions: [] });
    await refreshSupabaseData(); renderView(); showToast('Equipo guardado');
  } catch (error) { Swal.fire({ icon:'error', title:'No se pudo guardar el equipo', text:error.message }); }
}

async function openInventoryAssetForm(row = null) {
  const isEdit = !!row;
  const result = await Swal.fire({
    title: isEdit ? 'Editar insumo / equipo' : 'Nuevo insumo / equipo',
    width: 960,
    html: `<div class="swal-form-grid">
      <label><span>Nombre / descripción</span><input id="assetItem" class="swal2-input" value="${escapeAttr(row?.item || '')}" placeholder="Ej. Arduino UNO"></label>
      <label><span>Categoría</span><input id="assetCategory" class="swal2-input" value="${escapeAttr(row?.category || '')}" placeholder="Robótica / Sensores"></label>
      <label><span>Marca</span><input id="assetBrand" class="swal2-input" value="${escapeAttr(row?.brand || '')}" placeholder="Ej. Arduino, SetVeintiUno"></label>
      <label><span>Empresa / proveedor</span><input id="assetSupplier" class="swal2-input" value="${escapeAttr(row?.supplier || '')}" placeholder="Ej. BQ Educación"></label>
      <label><span>Tipo</span><select id="assetType" class="swal2-select"><option ${row?.type === 'Equipo' ? 'selected' : ''}>Equipo</option><option ${row?.type === 'Insumo' ? 'selected' : ''}>Insumo</option></select></label>
      <label><span>Código interno</span><input id="assetCode" class="swal2-input" value="${escapeAttr(row?.code || '')}" placeholder="Opcional"></label>
      <label><span>N° serie</span><input id="assetSerial" class="swal2-input" value="${escapeAttr(row?.serial || '')}" placeholder="Opcional"></label>
      <label><span>Barcode</span><input id="assetBarcode" class="swal2-input" value="${escapeAttr(row?.barcode || '')}" placeholder="Opcional, se genera solo"></label>
      <label><span>Ubicación general</span><select id="assetLocationCode" class="swal2-select"><option value="LAB-ROB">Laboratorio de Robótica</option><option value="DEP-01">Depósito</option><option value="TALLER">Taller revisión</option></select></label>
      <label><span>Locación física</span><input id="assetLocationDetail" class="swal2-input" value="${escapeAttr(row?.location_detail || '')}" placeholder="Gabinete, Maletín, Cajón"></label>
      <label><span>Zona</span><input id="assetZone" class="swal2-input" value="${escapeAttr(row?.zone || '')}" placeholder="Ej. A1, A2, B3"></label>
      <label><span>Estado</span><select id="assetStatus" class="swal2-select"><option ${row?.status === 'Disponible' ? 'selected' : ''}>Disponible</option><option ${row?.status === 'Prestado' ? 'selected' : ''}>Prestado</option><option ${row?.status === 'En mantenimiento' ? 'selected' : ''}>En mantenimiento</option></select></label>
      <label class="full-span"><span>Condición <button type="button" id="addConditionBtn" class="mini-plus" title="Agregar condición">+</button></span><select id="assetCondition" class="swal2-select">${state.inventoryConditions.map(c => `<option value="${escapeAttr(c.name)}" ${String(row?.condition || '').toLowerCase()===c.name.toLowerCase()?'selected':''}>${escapeHtml(c.name)}</option>`).join('')}<option value="${escapeAttr(row?.condition || '')}" ${row?.condition && !state.inventoryConditions.some(c => c.name.toLowerCase()===String(row.condition).toLowerCase()) ? 'selected' : ''}>${escapeHtml(row?.condition || 'Sin condición')}</option></select><small class="form-help">Usá + para crear una condición y asignarle color.</small></label>
    </div>`,
    showCancelButton: true,
    didOpen: () => {
      const btn = document.getElementById('addConditionBtn');
      if (btn) btn.addEventListener('click', async () => {
        const r = await Swal.fire({ title:'Nueva condición', html:'<input id="newCondName" class="swal2-input" placeholder="Ej. Reparado"><input id="newCondColor" type="color" class="swal2-input" value="#3b82f6">', showCancelButton:true, confirmButtonText:'Agregar', preConfirm:()=>({name:document.getElementById('newCondName').value.trim(), color:document.getElementById('newCondColor').value}) });
        if (r.isConfirmed && r.value.name) {
          const cleanName = r.value.name.trim();
          const cleanColor = r.value.color || '#64748b';
          addLocalCondition(cleanName, cleanColor);
          if (window.sb?.enabled) {
            try { await window.sb.saveInventoryCondition(cleanName, cleanColor); }
            catch (err) { return Swal.fire({ icon:'error', title:'No se pudo guardar la condición', text: err.message || String(err) }); }
          }
          const sel=document.getElementById('assetCondition');
          if(sel){
            const exists = Array.from(sel.options).some(o => o.value.toLowerCase() === cleanName.toLowerCase());
            if (!exists) sel.insertAdjacentHTML('beforeend', `<option value="${escapeAttr(cleanName)}">${escapeHtml(cleanName)}</option>`);
            sel.value=cleanName;
          }
        }
      });
    },
    confirmButtonText: isEdit ? 'Guardar cambios' : 'Guardar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const item = document.getElementById('assetItem').value.trim();
      if (!item) return Swal.showValidationMessage('Ingresá el nombre o descripción del insumo/equipo');
      return {
        item,
        category: document.getElementById('assetCategory').value.trim() || 'General',
        brand: document.getElementById('assetBrand').value.trim(),
        supplier: document.getElementById('assetSupplier').value.trim(),
        type: document.getElementById('assetType').value,
        code: document.getElementById('assetCode').value.trim(),
        serial: document.getElementById('assetSerial').value.trim(),
        barcode: document.getElementById('assetBarcode').value.trim(),
        location_code: document.getElementById('assetLocationCode').value,
        location_detail: document.getElementById('assetLocationDetail').value.trim(),
        zone: document.getElementById('assetZone').value.trim(),
        status: document.getElementById('assetStatus').value,
        condition: document.getElementById('assetCondition').value.trim()
      };
    }
  });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) {
      if (isEdit) await window.sb.updateInventoryAsset(row.id, result.value);
      else await window.sb.createInventoryAsset(result.value);
      await refreshSupabaseData();
    } else {
      if (isEdit) Object.assign(row, result.value, { location: result.value.location_detail || row.location || 'Lab. Robótica' });
      else state.inventory.unshift({ id: Date.now(), ...result.value, code: result.value.code || `TMP-${Date.now()}`, barcode: result.value.barcode || `ISMROB-${Date.now()}`, status: result.value.status || 'Disponible', assignedTo: '-', requestedAt: '-', returnedAt: '-', teacher: '-', location: result.value.location_detail || 'Lab. Robótica' });
    }
    renderView();
    showToast('Inventario', isEdit ? 'Actualizado correctamente' : 'El insumo fue guardado correctamente');
  } catch (error) { Swal.fire({ icon: 'error', title: 'No se pudo guardar', text: error.message }); }
}


function getRoleById(id) { return (state.rolesData || []).find(r => String(r.id) === String(id)); }

async function handleRoleAction(action, id) {
  const role = getRoleById(id);
  if (!role) return Swal.fire({ icon:'warning', title:'Rol no encontrado' });
  if (action === 'view') return Swal.fire({ title:'Detalle de rol', width:760, html:`<div class="detail-grid pretty"><div><strong>Nombre</strong><span>${escapeHtml(role.name)}</span></div><div><strong>Código</strong><span>${escapeHtml(role.code)}</span></div><div class="full-span"><strong>Descripción</strong><span>${escapeHtml(role.description || '-')}</span></div><div class="full-span"><strong>Permisos</strong><span>${escapeHtml((role.permissions || []).join(', ') || '-')}</span></div></div>`, confirmButtonText:'Cerrar' });
  if (action === 'edit') return openRoleForm(role);
  if (action === 'delete') {
    const ok = await Swal.fire({ icon:'warning', title:'Eliminar rol', text:`¿Eliminar ${role.name}? Los roles del sistema no se eliminan.`, showCancelButton:true, confirmButtonText:'Eliminar', cancelButtonText:'Cancelar' });
    if (!ok.isConfirmed) return;
    try { if (window.sb?.enabled) await window.sb.deleteRole(role.id); state.rolesData = state.rolesData.filter(r => String(r.id) !== String(role.id)); renderView(); showToast('Rol eliminado'); }
    catch(error) { Swal.fire({ icon:'error', title:'No se pudo eliminar', text:error.message }); }
  }
}

async function openRoleForm(role=null) {
  const permissionOptions = ['users.read','users.manage','roles.manage','inventory.read','inventory.manage','inventory.loan','inventory.approve'];
  const selected = new Set(role?.permissions || []);
  const result = await Swal.fire({
    title: role ? 'Editar rol' : 'Nuevo rol', width: 820,
    html: `<div class="swal-form-grid"><label><span>Nombre</span><input id="roleName" class="swal2-input" value="${escapeHtml(role?.name || '')}"></label><label><span>Código</span><input id="roleCode" class="swal2-input" value="${escapeHtml(role?.code || '')}" ${role?.code ? 'disabled' : ''} placeholder="ej: preceptor"></label><label class="full-span"><span>Descripción</span><textarea id="roleDescription" class="swal2-textarea">${escapeHtml(role?.description || '')}</textarea></label><div class="full-span permissions-checks">${permissionOptions.map(p => `<label><input type="checkbox" value="${p}" ${selected.has(p) ? 'checked' : ''}> ${p}</label>`).join('')}</div></div>`,
    showCancelButton:true, confirmButtonText:'Guardar', cancelButtonText:'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('roleName').value.trim();
      const code = document.getElementById('roleCode').value.trim().toLowerCase().replace(/\s+/g,'_');
      if (!name || !code) return Swal.showValidationMessage('Nombre y código son obligatorios');
      return { id: role?.id, name, code, description: document.getElementById('roleDescription').value.trim(), permissions: Array.from(document.querySelectorAll('.permissions-checks input:checked')).map(x => x.value) };
    }
  });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) await window.sb.saveRole(result.value);
    const idx = state.rolesData.findIndex(r => String(r.id) === String(role?.id));
    if (idx >= 0) state.rolesData[idx] = { ...state.rolesData[idx], ...result.value };
    else state.rolesData.unshift({ ...result.value, id: result.value.id || result.value.code });
    await refreshSupabaseData(); renderView(); showToast('Rol guardado');
  } catch(error) { Swal.fire({ icon:'error', title:'No se pudo guardar el rol', text:error.message }); }
}


async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function openUserProfileForm() {
  const result = await Swal.fire({
    title: 'Nuevo usuario', width: 900,
    html: `<div class="swal-form-grid">
      <label><span>Nombre completo</span><input id="userFullName" class="swal2-input"></label>
      <label><span>Email</span><input id="userEmail" type="email" class="swal2-input"></label>
      <label><span>Contraseña inicial</span><input id="userPassword" type="text" class="swal2-input" placeholder="Opcional para ABM"></label>
      <label><span>Rol</span><select id="userRole" class="swal2-select"><option>Alumno</option><option>Docente</option><option>Administrador</option></select></label>
      <label><span>DNI</span><input id="userDni" class="swal2-input"></label>
      <label><span>WhatsApp</span><input id="userWhatsapp" class="swal2-input"></label>
      <label><span>Fecha de nacimiento</span><input id="userBirthDate" type="date" class="swal2-input"></label>
      <label><span>Título / Especialidad</span><input id="userTitle" class="swal2-input" placeholder="Admin/Docente"></label>
      <label class="full-span"><span>Foto de perfil</span><input id="userAvatarFile" type="file" accept="image/*"><small class="form-help">Se guarda como imagen base64 en el perfil. Para alumnos, los certificados se generan desde cursos terminados.</small></label>
    </div>`,
    showCancelButton: true,
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
    didOpen: () => {
      const roleEl = document.getElementById('userRole');
      const titleEl = document.getElementById('userTitle');
      const sync = () => { titleEl.disabled = roleEl.value === 'Alumno'; titleEl.placeholder = roleEl.value === 'Alumno' ? 'Certificados desde Campus Virtual' : 'Título, materia o especialidad'; };
      roleEl.addEventListener('change', sync); sync();
    },
    preConfirm: async () => {
      const name = document.getElementById('userFullName').value.trim();
      const email = document.getElementById('userEmail').value.trim().toLowerCase();
      const role = document.getElementById('userRole').value;
      if (!name || !email) return Swal.showValidationMessage('Nombre y email son obligatorios');
      const avatar_url = await readFileAsDataUrl(document.getElementById('userAvatarFile').files?.[0]);
      return { name, full_name: name, email, password: document.getElementById('userPassword').value.trim(), role, dni: document.getElementById('userDni').value.trim(), whatsapp: document.getElementById('userWhatsapp').value.trim(), birth_date: document.getElementById('userBirthDate').value || null, title: role === 'Alumno' ? null : document.getElementById('userTitle').value.trim(), avatar_url };
    }
  });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) {
      await window.sb.inviteUserByAdmin(result.value);
      await refreshSupabaseData();
      renderView();
      Swal.fire({ icon: 'success', title: 'Usuario cargado', text: 'El usuario quedó inactivo hasta autorización y se intentó enviar el email para crear/cambiar contraseña.' });
    } else {
      state.users.unshift({ id: Date.now(), name: result.value.name, role: result.value.role, email: result.value.email, whatsapp: result.value.whatsapp || '-', dni: result.value.dni || '-', birth_date: result.value.birth_date || '', title: result.value.title || '', avatar_url: result.value.avatar_url || './assets/avatar-default.svg', status: 'Activo' });
      renderView();
      showToast('Usuarios', 'Usuario agregado en modo demo');
    }
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'No se pudo crear', text: error.message });
  }
}

async function bootApp() {
  applySavedTheme();
  bindEvents();
  if (window.sb?.enabled) {
    const { data } = await window.sb.getSession();
    if (!data.session && !localStorage.getItem('ism_demo_user')) {
      window.location.href = './index.html';
      return;
    }
    await refreshSupabaseData();
  }
  renderView();
}

bootApp();

