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
  filters: { period: 'month', inventoryState: 'all', inventoryType: 'all', inventorySearch: '', userSearch: '', userRole: 'all' },
  notificationsOpen: false,
  users: [
    { id: 1, name: 'Fernando Gambino', role: 'Administrador', email: 'fgambino@ism.edu.ar', whatsapp: '+54 9 11 5555 1111', dni: '30111222', status: 'Activo' },
    { id: 2, name: 'María López', role: 'Docente', email: 'mlopez@ism.edu.ar', whatsapp: '+54 9 11 4444 2222', dni: '28999888', status: 'Activo' },
    { id: 3, name: 'Lucas Méndez', role: 'Docente', email: 'lmendez@ism.edu.ar', whatsapp: '+54 9 11 4000 1000', dni: '29666777', status: 'Activo' },
    { id: 4, name: 'Thiago Benjamín Luna', role: 'Alumno', email: 'thiago.luna@ism.edu.ar', whatsapp: '+54 9 11 3333 1111', dni: '49442589', status: 'Pendiente' },
    { id: 5, name: 'Tomás Cáceres', role: 'Alumno', email: 'tcaceres@ism.edu.ar', whatsapp: '+54 9 11 2222 7777', dni: '48205464', status: 'Activo' }
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
  student: ['dashboard', 'courses', 'library', 'notifications', 'profile']
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
  { key: 'loanManagement', icon: 'inventory', label: { administrator: 'Gestión de préstamos', teacher: 'Gestión de préstamos' } },
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

function actionButtons() {
  return `<div class="actions"><button class="action-btn" title="Ver">${icons.eye}</button><button class="action-btn" title="Editar">${icons.edit}</button><button class="action-btn" title="Eliminar">${icons.trash}</button></div>`;
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
            ${filtered.map(user => `<tr><td><strong>${user.name}</strong></td><td>${user.role}</td><td>${user.email}</td><td>${user.whatsapp}</td><td>${user.dni}</td><td>${statusPill(user.status)}</td><td>${actionButtons()}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

function renderRoles() {
  const roles = [
    ['Administrador', 'Acceso total al sistema, ABM global, configuración, reportes y auditoría.'],
    ['Docente', 'Campus, equipos asignados, préstamos, seguimiento de alumnos y materiales.'],
    ['Alumno', 'Campus alumno, tareas, biblioteca, notificaciones y consulta de cursos habilitados.']
  ];
  return `<section class="card glass"><div class="section-header"><div><h3>Perfiles y permisos</h3><p class="muted">El administrador puede gestionar todos los perfiles y permisos por módulo.</p></div><div class="toolbar"><button class="btn btn-secondary btn-sm" data-export="roles">${icons.export} Exportar CSV</button></div></div><div class="grid-cards">${roles.map(([name, desc]) => `<article class="card glass-soft"><h3>${name}</h3><p>${desc}</p><div class="permissions-list"><span class="tag">Usuarios</span><span class="tag">Inventario</span><span class="tag">Notificaciones</span><span class="tag">Reportes</span></div></article>`).join('')}</div></section>`;
}

function renderTeams() {
  const rows = state.user.role === 'teacher' ? state.teams.filter(team => team.teachers.includes(state.user.name)) : state.teams;
  return `
    <section class="card glass">
      <div class="section-header">
        <div><h3>${state.user.role === 'teacher' ? 'Equipos asignados' : 'Equipos mixtos'}</h3><p class="muted">Se admiten múltiples docentes a cargo y alumnos de distintos cursos/divisiones.</p></div>
        <div class="toolbar"><button class="btn btn-secondary btn-sm" data-import="teams">${icons.import} Importar CSV</button><button class="btn btn-secondary btn-sm" data-export="teams">${icons.export} Exportar CSV</button><button class="btn btn-primary btn-sm" data-create="team">Nuevo equipo</button></div>
      </div>
      <div class="grid-cards">
        ${rows.map(team => `<article class="card glass-soft"><div class="section-header"><h3>${team.name}</h3><span class="tag">${team.students} alumnos</span></div><p><strong>Docentes:</strong> ${team.teachers.join(', ')}</p><p><strong>Cursos:</strong> ${team.courses.join(', ')}</p><p><strong>Divisiones:</strong> ${team.divisions.join(', ')}</p><p><strong>Proyecto:</strong> ${team.project}</p></article>`).join('')}
      </div>
    </section>`;
}

function getFilteredInventory() {
  return state.inventory.filter(item => {
    const byStatus = state.filters.inventoryState === 'all' || item.status === state.filters.inventoryState;
    const byType = state.filters.inventoryType === 'all' || item.type === state.filters.inventoryType;
    const bySearch = !state.filters.inventorySearch || `${item.code} ${item.item} ${item.serial} ${item.barcode} ${item.location}`.toLowerCase().includes(state.filters.inventorySearch.toLowerCase());
    return byStatus && byType && bySearch;
  });
}

function renderInventory() {
  const rows = getFilteredInventory();
  const teacherActions = state.user.role === 'teacher' ? `<button class="btn btn-primary btn-sm" id="loanRequestBtn">Solicitud de préstamo</button>` : `<button class="btn btn-primary btn-sm" id="newInventoryItemBtn">Nuevo insumo</button>`;
  return `
    <section class="inventory-layout">
      <div class="card glass">
        <div class="section-header">
          <div><h3>Control y trazabilidad</h3><p class="muted">Cada insumo permite saber quién lo tiene, cuándo lo pidió, estado de entrega y devolución.</p></div>
          <div class="toolbar">
            <button class="btn btn-secondary btn-sm" data-import="inventory">${icons.import} Importar CSV</button>
            <button class="btn btn-secondary btn-sm" data-export="inventory">${icons.export} Exportar CSV</button>
            ${teacherActions}
          </div>
        </div>
        <div class="toolbar filters-row">
          <input type="search" id="inventorySearch" placeholder="Buscar por código, item, serie, barcode o ubicación" value="${escapeHtml(state.filters.inventorySearch)}" />
          <select id="inventoryStateFilter"><option value="all" ${state.filters.inventoryState === 'all' ? 'selected' : ''}>Todos los estados</option><option ${state.filters.inventoryState === 'Disponible' ? 'selected' : ''}>Disponible</option><option ${state.filters.inventoryState === 'Prestado' ? 'selected' : ''}>Prestado</option><option ${state.filters.inventoryState === 'En mantenimiento' ? 'selected' : ''}>En mantenimiento</option></select>
          <select id="inventoryTypeFilter"><option value="all" ${state.filters.inventoryType === 'all' ? 'selected' : ''}>Todos los tipos</option><option ${state.filters.inventoryType === 'Equipo' ? 'selected' : ''}>Equipo</option><option ${state.filters.inventoryType === 'Insumo' ? 'selected' : ''}>Insumo</option></select>
        </div>
        <div class="toolbar filters-row">
          <button class="btn btn-secondary btn-sm" id="generateBarcodeBtn">${icons.barcode} Generar código</button>
        </div>
        <div class="table-wrap">
          <table class="table inventory-table">
            <thead><tr><th>Código</th><th>Tipo</th><th>N° serie</th><th>Barcode</th><th>Estado</th><th>Condición</th><th>Asignado a</th><th>Docente</th><th>Pedido</th><th>Devolución</th><th>Ubicación</th><th>Acciones</th></tr></thead>
            <tbody>
              ${rows.map(item => `<tr><td><strong>${item.code}</strong><br><span class="muted small">${item.item}</span></td><td>${item.type}</td><td>${item.serial || 'Sin serie'}</td><td><div class="barcode-cell"><span>${item.barcode}</span><span class="mini-icon">${icons.barcode}</span></div></td><td>${statusPill(item.status)}</td><td>${item.condition}</td><td>${item.assignedTo}</td><td>${item.teacher}</td><td>${item.requestedAt}</td><td>${item.returnedAt}</td><td>${item.location}</td><td>${actionButtons()}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <aside class="card glass">
        <h3>Módulo completo de inventario</h3>
        <div class="flow-steps">
          <div class="flow-step"><strong>Ingreso</strong><span>Alta de insumos con serie o barcode automático.</span></div>
          <div class="flow-step"><strong>Préstamo</strong><span>Registro de docente/equipo, fecha y estado de salida.</span></div>
          <div class="flow-step"><strong>Devolución</strong><span>Registro de fecha de retorno y condición del equipo.</span></div>
          <div class="flow-step"><strong>Auditoría</strong><span>Bitácora de movimientos, ubicación y alertas.</span></div>
        </div>
        <div class="barcode-preview glass-soft"><span class="tag">Vista previa de barcode</span><div class="barcode-lines"></div><strong id="barcodePreviewText">ISM-BAR-000362</strong></div>
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
  const rows = state.user.role === 'teacher' ? state.loans.filter(l => l.requester === state.user.name) : state.loans;
  return `<section class="card glass"><div class="section-header"><div><h3>Centro de préstamos</h3><p class="muted">Solicitudes, franjas horarias, estados y devoluciones.</p></div><div class="toolbar"><button class="btn btn-secondary btn-sm" data-export="loanManagement">${icons.export} Exportar CSV</button>${state.user.role==='teacher'?'<button class="btn btn-primary btn-sm" id="loanRequestBtn2">Nueva solicitud</button>':'<button class="btn btn-secondary btn-sm" id="loanChartsBtn">'+icons.chart+' Ver gráficos</button>'}</div></div><div class="toolbar filters-row"><input type="search" placeholder="Buscar por solicitante, equipo o insumo"><select><option>Todos los estados</option><option>Pendiente</option><option>Aprobado</option><option>Rechazado</option><option>Devuelto</option></select><button class="btn btn-secondary btn-sm" id="loanFilterBtn">${icons.filter} Filtros</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Solicitante</th><th>Curso / equipo</th><th>Fecha</th><th>Horario</th><th>Insumos</th><th>Observaciones</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${rows.map(l=>`<tr><td>${l.requester}</td><td>${l.team}</td><td>${l.date}</td><td>${l.from} a ${l.to}</td><td>${l.items.join(', ')}</td><td>${l.notes}</td><td>${statusPill(l.status)}</td><td><div class="actions">${state.user.role==='administrator'?`<button class="action-btn" data-approve-loan="${l.id}" title="Aprobar">${icons.approve}</button><button class="action-btn" data-reject-loan="${l.id}" title="Rechazar">${icons.reject}</button><button class="action-btn" data-return-loan="${l.id}" title="Marcar devolución">${icons.returnIcon}</button>`:actionButtons()}</div></td></tr>`).join('')}</tbody></table></div></section>`;
}

function renderAccessControl() {
  const inside = state.accessLogs.filter(i=>i.inside).length;
  return `<section class="layout-two"><article class="card glass"><div class="section-header"><div><h3>Control de acceso RFID</h3><p class="muted">Historial de ingresos al laboratorio y permanencia estimada.</p></div><div class="toolbar"><button class="btn btn-secondary btn-sm" data-export="accessControl">${icons.export} Exportar CSV</button><button class="btn btn-primary btn-sm" data-preview-form="access">Nuevo registro</button><button class="btn btn-secondary btn-sm" id="accessChartsBtn">${icons.chart} Ver gráficos</button></div></div><div class="toolbar filters-row"><input type="search" placeholder="Buscar por usuario, tarjeta o sala"><select><option>Todas las categorías</option><option>Alumno</option><option>Docente</option><option>Administrador</option></select><button class="btn btn-secondary btn-sm" id="manageCategoriesBtn">${icons.filter} Categorías</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Usuario</th><th>Rol</th><th>Tarjeta RFID</th><th>Sala</th><th>Ingreso</th><th>Salida</th><th>Permanencia</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${state.accessLogs.map(r=>`<tr><td>${r.user}</td><td>${r.role}</td><td>${r.card}</td><td>${r.room}</td><td>${r.entry}</td><td>${r.exit}</td><td>${r.exit==='-'?'En curso':'2h 04m'}</td><td>${statusPill(r.inside?'Dentro':'Fuera')}</td><td>${actionButtons()}</td></tr>`).join('')}</tbody></table></div></article><aside class="card glass"><h3>Resumen de sala</h3><div class="list-simple"><div class="list-item"><strong>Personas dentro</strong><span>${inside}</span></div><div class="list-item"><strong>Lab. Robótica</strong><span>${state.accessLogs.filter(i=>i.inside && i.room.includes('Robótica')).length} personas</span></div><div class="list-item"><strong>Sala Informática</strong><span>${state.accessLogs.filter(i=>i.inside && i.room.includes('Informática')).length} personas</span></div><div class="list-item"><strong>Integración ESP32</strong><span>Lista para insertar registros RFID en la base.</span></div></div></aside></section>`;
}

function renderProfile() {
  const teacherData = state.user.role === 'teacher' ? '<p><strong>Materia:</strong> Robótica y Electrónica</p><p><strong>Título:</strong> Prof. en Tecnología</p>' : '';
  const studentData = state.user.role === 'student' ? '<p><strong>Curso:</strong> 6° C</p><p><strong>División:</strong> C</p>' : '';
  return `<section class="profile-layout"><article class="card glass"><div class="section-header"><div><h3>Mi perfil</h3><p class="muted">La foto se cambia desde la imagen del header.</p></div><button class="btn btn-primary btn-sm" id="editProfileBtn">Editar datos</button></div><div class="profile-box"><img src="${state.user.avatar_url || './assets/avatar-default.svg'}" alt="Avatar" class="profile-large" /><div><h3>${state.user.name}</h3><p><strong>Rol:</strong> ${state.user.role}</p><p><strong>Email:</strong> ${state.user.email}</p><p><strong>WhatsApp:</strong> +54 9 11 5555 1111</p><p><strong>DNI:</strong> 30111222</p><p><strong>Fecha nacimiento:</strong> 1988-07-15</p>${teacherData}${studentData}</div></div></article><aside class="card glass"><h3>Accesos rápidos</h3><div class="list-simple"><button class="btn btn-secondary btn-sm" data-view-btn="notifications">Notificaciones</button><button class="btn btn-secondary btn-sm" data-view-btn="inventory">Inventario</button><button class="btn btn-secondary btn-sm" data-view-btn="courses">${state.user.role === 'student' ? 'Campus alumno' : 'Campus'}</button></div></aside></section>`;
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

function selectNotification(id) {
  const target = state.notifications.find(n => n.id === Number(id));
  if (!target) return;
  target.unread = false;
  state.notificationsOpen = false;
  openView('notifications');
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

function openImport(module) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';
  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      Swal.fire({ icon: 'success', title: 'CSV importado', text: `${file.name} cargado para el módulo ${module}. Queda listo para mapear a Supabase.` });
    };
    reader.readAsText(file);
  };
  input.click();
}

function generateBarcode() {
  const code = `ISM-BAR-${String(state.inventory.length + 1).padStart(6, '0')}`;
  const target = document.getElementById('barcodePreviewText');
  if (target) target.textContent = code;
  Swal.fire({ icon: 'success', title: 'Código generado', text: `Se generó el código ${code} para un insumo sin número de serie.` });
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
  state.loans.unshift({ id: Date.now(), requester: state.user.name, team: result.value.course, date: result.value.date, from: result.value.from, to: result.value.to, items: result.value.selected, notes: result.value.notes || '-', status: 'Pendiente' });
  state.notifications.unshift({ id: Date.now()+1, title: 'Nueva solicitud de préstamo', message: `${state.user.name} solicitó ${result.value.selected.join(', ')} para ${result.value.course}.`, unread: true, section: 'loanManagement' });
  renderView();
  Swal.fire({ icon: 'success', title: 'Solicitud registrada', text: `${result.value.selected.length} insumo(s) solicitados para ${result.value.course}.` });
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

function updateLoanStatus(id, status) {
  const loan = state.loans.find(l => l.id === Number(id));
  if (!loan) return;
  loan.status = status;
  renderView();
  showToast('Préstamo actualizado', status);
}

function attachViewEvents() {
  appContent.querySelectorAll('[data-view-btn]').forEach(btn => btn.addEventListener('click', () => openView(btn.dataset.viewBtn)));
  appContent.querySelectorAll('.notification-select').forEach(btn => btn.addEventListener('click', () => selectNotification(btn.dataset.id)));
  appContent.querySelectorAll('[data-import]').forEach(btn => btn.addEventListener('click', () => openImport(btn.dataset.import)));
  appContent.querySelectorAll('[data-export]').forEach(btn => btn.addEventListener('click', () => triggerDownload(`${btn.dataset.export}.csv`, csvFromRows(dataByModule(btn.dataset.export)))));
  appContent.querySelectorAll('[data-create]').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.create === 'user') return openUserProfileForm();
    if (btn.dataset.create === 'inventory') return openInventoryAssetForm();
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
  document.getElementById('inventorySearch')?.addEventListener('input', e => { state.filters.inventorySearch = e.target.value; renderView(); });
  document.getElementById('inventoryStateFilter')?.addEventListener('change', e => { state.filters.inventoryState = e.target.value; renderView(); });
  document.getElementById('inventoryTypeFilter')?.addEventListener('change', e => { state.filters.inventoryType = e.target.value; renderView(); });
  document.getElementById('generateBarcodeBtn')?.addEventListener('click', generateBarcode);
  document.getElementById('newInventoryItemBtn')?.addEventListener('click', openInventoryAssetForm);
  document.getElementById('loanRequestBtn')?.addEventListener('click', openLoanRequest);
  document.getElementById('loanRequestBtn2')?.addEventListener('click', openLoanRequest);
  document.getElementById('massNotifyBtn')?.addEventListener('click', openNotificationComposer);
  document.getElementById('joinCourseBtn')?.addEventListener('click', openJoinCourse);
  document.getElementById('editProfileBtn')?.addEventListener('click', () => Swal.fire({ icon: 'success', title: 'Perfil', text: 'En la versión conectada podrás editar y guardar todos los datos del perfil.' }));
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
    reader.onload = () => {
      state.user.avatar_url = reader.result;
      localStorage.setItem('ism_demo_user', JSON.stringify(state.user));
      updateHeader();
      if (state.currentView === 'profile') renderView();
      showToast('Foto actualizada');
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
    const [profile, users, inventory] = await Promise.all([
      window.sb.fetchProfile().catch(() => null),
      window.sb.listProfiles().catch(() => null),
      window.sb.listInventory().catch(() => null)
    ]);
    if (profile) {
      state.user = profile;
      localStorage.setItem('ism_demo_user', JSON.stringify(profile));
      updateHeader();
    }
    if (Array.isArray(users) && users.length) state.users = users;
    if (Array.isArray(inventory)) state.inventory = inventory;
  } catch (error) {
    console.error(error);
    showToast('Supabase', error.message || 'No se pudieron cargar los datos conectados');
  }
}

async function openInventoryAssetForm() {
  const result = await Swal.fire({
    title: 'Nuevo insumo / equipo',
    html: `<div class="swal-form-grid">
      <label><span>Nombre</span><input id="assetItem" class="swal2-input" placeholder="Ej. Arduino UNO"></label>
      <label><span>Categoría</span><input id="assetCategory" class="swal2-input" placeholder="Robótica / Sensores"></label>
      <label><span>Tipo</span><select id="assetType" class="swal2-select"><option>Equipo</option><option>Insumo</option></select></label>
      <label><span>Código interno</span><input id="assetCode" class="swal2-input" placeholder="Opcional"></label>
      <label><span>N° serie</span><input id="assetSerial" class="swal2-input" placeholder="Opcional"></label>
      <label><span>Barcode</span><input id="assetBarcode" class="swal2-input" placeholder="Opcional, se genera solo"></label>
      <label><span>Ubicación</span><select id="assetLocation" class="swal2-select"><option value="LAB-ROB">Lab. Robótica</option><option value="DEP-GRAL">Depósito General</option><option value="ARM-A1">Armario A1</option></select></label>
      <label class="full-span"><span>Condición / Observación</span><textarea id="assetCondition" class="swal2-textarea" placeholder="Nuevo, usado, completo, faltantes..."></textarea></label>
    </div>`,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const item = document.getElementById('assetItem').value.trim();
      if (!item) return Swal.showValidationMessage('Ingresá el nombre del insumo/equipo');
      return {
        item,
        category: document.getElementById('assetCategory').value.trim() || 'General',
        type: document.getElementById('assetType').value,
        code: document.getElementById('assetCode').value.trim(),
        serial: document.getElementById('assetSerial').value.trim(),
        barcode: document.getElementById('assetBarcode').value.trim(),
        location_code: document.getElementById('assetLocation').value,
        condition: document.getElementById('assetCondition').value.trim()
      };
    }
  });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) {
      await window.sb.createInventoryAsset(result.value);
      await refreshSupabaseData();
    } else {
      state.inventory.unshift({ id: Date.now(), code: result.value.code || `TMP-${Date.now()}`, item: result.value.item, type: result.value.type, serial: result.value.serial, barcode: result.value.barcode || `ISM-${Date.now()}`, status: 'Disponible', condition: result.value.condition || 'Sin observaciones', assignedTo: 'Depósito', requestedAt: '-', returnedAt: '-', teacher: '-', location: 'Lab. Robótica' });
    }
    renderView();
    showToast('Inventario', 'El insumo fue guardado correctamente');
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'No se pudo guardar', text: error.message });
  }
}

async function openUserProfileForm() {
  const result = await Swal.fire({
    title: 'Nuevo usuario',
    html: `<div class="swal-form-grid">
      <label><span>Nombre completo</span><input id="userFullName" class="swal2-input"></label>
      <label><span>Email</span><input id="userEmail" type="email" class="swal2-input"></label>
      <label><span>Contraseña inicial</span><input id="userPassword" type="text" class="swal2-input" placeholder="Opcional"></label>
      <label><span>Rol</span><select id="userRole" class="swal2-select"><option>Alumno</option><option>Docente</option><option>Administrador</option></select></label>
      <label><span>DNI</span><input id="userDni" class="swal2-input"></label>
      <label><span>WhatsApp</span><input id="userWhatsapp" class="swal2-input"></label>
    </div>`,
    showCancelButton: true,
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = document.getElementById('userFullName').value.trim();
      const email = document.getElementById('userEmail').value.trim().toLowerCase();
      if (!name || !email) return Swal.showValidationMessage('Nombre y email son obligatorios');
      return { name, full_name: name, email, password: document.getElementById('userPassword').value.trim(), role: document.getElementById('userRole').value, dni: document.getElementById('userDni').value.trim(), whatsapp: document.getElementById('userWhatsapp').value.trim() };
    }
  });
  if (!result.isConfirmed) return;
  try {
    if (window.sb?.enabled) {
      const created = await window.sb.signUpUser(result.value);
      await refreshSupabaseData();
      Swal.fire({ icon: 'success', title: 'Usuario creado', text: `Contraseña inicial: ${created.password}. Guardala y pedile que inicie sesión.` });
    } else {
      state.users.unshift({ id: Date.now(), name: result.value.name, role: result.value.role, email: result.value.email, whatsapp: result.value.whatsapp || '-', dni: result.value.dni || '-', status: 'Activo' });
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

