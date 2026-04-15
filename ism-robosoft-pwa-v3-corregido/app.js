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
  barcode: `<svg viewBox="0 0 24 24" class="icon"><path d="M4 5h1v14H4V5Zm3 0h2v14H7V5Zm4 0h1v14h-1V5Zm3 0h3v14h-3V5Zm5 0h1v14h-1V5Z"></path></svg>`
};

const demoUser = JSON.parse(localStorage.getItem('ism_demo_user') || 'null') || {
  name: 'Administrador General', role: 'administrator', email: 'admin@ism.edu.ar', avatar_url: './assets/avatar-default.svg'
};

const state = {
  user: demoUser,
  currentView: 'dashboard',
  charts: [],
  filters: { period: 'month', inventoryState: 'all', inventoryType: 'all' },
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
    { id: 1, title: 'Electrónica aplicada', teacher: 'María López', status: 'Publicado', lessons: 8, tasks: 4, evaluations: 2 },
    { id: 2, title: 'Programación de robots', teacher: 'Lucas Méndez', status: 'Borrador', lessons: 5, tasks: 3, evaluations: 1 }
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
  ]
};

const roleViews = {
  administrator: ['dashboard', 'users', 'roles', 'team', 'inventory', 'courses', 'library', 'notifications', 'profile', 'settings'],
  teacher: ['dashboard', 'team', 'inventory', 'courses', 'library', 'notifications', 'profile'],
  student: ['dashboard', 'courses', 'library', 'notifications', 'profile']
};

const labels = {
  dashboard: ['Dashboard', 'Vista general con métricas, filtros y gráficos'],
  users: ['Usuarios', 'ABM con roles, permisos y perfil extendido'],
  roles: ['Roles y permisos', 'Perfiles, permisos por módulo y alcance'],
  team: ['Equipos', 'Equipos mixtos con múltiples docentes y cursos/divisiones'],
  inventory: ['Inventario', 'Trazabilidad por serie o código de barras, préstamos y devoluciones'],
  courses: ['Campus docente', 'Módulos, lecciones, tareas y evaluativos'],
  library: ['Biblioteca digital', 'Recursos del laboratorio disponibles para consulta'],
  notifications: ['Notificaciones', 'Avisos masivos, individuales y por equipo'],
  profile: ['Mi perfil', 'Ver y editar datos personales y foto'],
  settings: ['Configuraciones', 'Parámetros globales del sistema y branding institucional']
};

const nav = [
  { key: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
  { key: 'users', icon: 'users', label: 'Usuarios' },
  { key: 'roles', icon: 'roles', label: 'Roles y permisos' },
  { key: 'team', icon: 'team', label: 'Equipos' },
  { key: 'inventory', icon: 'inventory', label: 'Inventario' },
  { key: 'courses', icon: 'courses', label: 'Campus docente' },
  { key: 'library', icon: 'library', label: 'Biblioteca digital' },
  { key: 'notifications', icon: 'notifications', label: 'Notificaciones' },
  { key: 'profile', icon: 'profile', label: 'Mi perfil' },
  { key: 'settings', icon: 'settings', label: 'Configuraciones' }
];

const appContent = document.getElementById('appContent');
const navMenu = document.getElementById('navMenu');
const pageTitle = document.getElementById('pageTitle');
const pageSubtitle = document.getElementById('pageSubtitle');
const appShell = document.getElementById('appShell');
const notificationsPreview = document.getElementById('notificationsPreview');
const notificationsBtn = document.getElementById('notificationsBtn');
const notificationCount = null;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
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
  navMenu.innerHTML = nav.filter(item => allowed.includes(item.key)).map(item => `
    <button class="nav-item ${state.currentView === item.key ? 'active' : ''}" data-view="${item.key}">
      ${icons[item.icon]}<span>${item.label}</span>
    </button>
  `).join('') + `
    <button class="nav-item" id="sidebarLogoutBtn">${icons.logout}<span>Cerrar sesión</span></button>
  `;
}

function showToast(title, text = '', icon = 'success') {
  Swal.fire({ toast: true, position: 'top-end', timer: 2200, showConfirmButton: false, icon, title, text, background: getComputedStyle(document.documentElement).getPropertyValue('--panel') });
}

function statusPill(status) {
  const map = {
    'Activo': 'status-approved', 'Pendiente': 'status-pending', 'Disponible': 'status-approved',
    'Prestado': 'status-pending', 'En mantenimiento': 'status-rejected', 'Publicado': 'status-approved', 'Borrador': 'status-pending'
  };
  return `<span class="status-pill ${map[status] || 'status-pending'}">${status}</span>`;
}

function actionButtons() {
  return `<div class="actions"><button class="action-btn" title="Ver">${icons.eye}</button><button class="action-btn" title="Editar">${icons.edit}</button><button class="action-btn" title="Eliminar">${icons.trash}</button></div>`;
}

function renderDashboard() {
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
          <button class="btn btn-secondary" data-export="dashboard">${icons.export} Exportar resumen</button>
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
          <div class="list-item"><strong>Panel docente</strong><span>Carga de módulos, lecciones, tareas y evaluativos estilo LearnPress.</span></div>
          <div class="list-item"><strong>Inventario inteligente</strong><span>Trazabilidad por serie o código de barras, préstamos y devoluciones.</span></div>
        </div>
      </article>
      <article class="card glass">
        <div class="section-header"><h3>Alertas del día</h3><button class="btn btn-secondary" data-view-btn="notifications">Ver todas</button></div>
        <div class="list-simple">
          ${state.notifications.slice(0,3).map(n => `<button class="notification-row list-item notification-select" data-id="${n.id}"><div><strong>${escapeHtml(n.title)}</strong><span>${escapeHtml(n.message)}</span></div>${n.unread ? '<span class="status-pill status-pending">Sin leer</span>' : '<span class="status-pill status-approved">Leída</span>'}</button>`).join('')}
        </div>
      </article>
    </section>

    <section class="card glass">
      <div class="section-header"><div><h3>Inventario destacado</h3><p class="muted">Basado en la planilla de control adjunta.</p></div><button class="btn btn-primary" data-view-btn="inventory">Abrir módulo</button></div>
      <div class="inventory-highlight">
        ${state.inventory.slice(0,3).map(item => `<article class="mini-card glass-soft"><strong>${item.code}</strong><h4>${item.item}</h4><p>${item.type} · ${item.location}</p><div class="metric-inline"><span>${item.serial || item.barcode}</span>${statusPill(item.status)}</div></article>`).join('')}
      </div>
    </section>
  `;
}

function renderUsers() {
  return `
    <section class="card glass">
      <div class="section-header">
        <div><h3>Usuarios registrados</h3><p class="muted">Campos sugeridos: WhatsApp, fecha de nacimiento, curso/división o materia/título.</p></div>
        <div class="toolbar">
          <button class="btn btn-secondary" data-import="users">${icons.import} Importar CSV</button>
          <button class="btn btn-secondary" data-export="users">${icons.export} Exportar CSV</button>
          <button class="btn btn-primary" data-create="user">Nuevo usuario</button>
        </div>
      </div>
      <div class="toolbar filters-row">
        <input type="search" id="userSearch" placeholder="Buscar por nombre, email o DNI" />
        <select id="userRoleFilter"><option value="all">Todos los roles</option><option>Administrador</option><option>Docente</option><option>Alumno</option></select>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Nombre</th><th>Rol</th><th>Email</th><th>WhatsApp</th><th>DNI</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            ${state.users.map(user => `<tr><td><strong>${user.name}</strong></td><td>${user.role}</td><td>${user.email}</td><td>${user.whatsapp}</td><td>${user.dni}</td><td>${statusPill(user.status)}</td><td>${actionButtons()}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

function renderRoles() {
  const roles = [
    ['Administrador', 'Acceso total al sistema, ABM global, configuración y auditoría.'],
    ['Docente', 'Campus, equipos asignados, préstamos, seguimiento de alumnos y materiales.'],
    ['Alumno', 'Visualización de equipo, tareas, biblioteca y estado de materiales asignados.']
  ];
  return `<section class="card glass"><div class="section-header"><div><h3>Perfiles y permisos</h3><p class="muted">El administrador puede gestionar todos los perfiles y permisos por módulo.</p></div><div class="toolbar"><button class="btn btn-secondary" data-export="roles">${icons.export} Exportar CSV</button></div></div><div class="grid-cards">${roles.map(([name, desc]) => `<article class="card glass-soft"><h3>${name}</h3><p>${desc}</p><div class="permissions-list"><span class="tag">Usuarios</span><span class="tag">Inventario</span><span class="tag">Notificaciones</span><span class="tag">Reportes</span></div></article>`).join('')}</div></section>`;
}

function renderTeams() {
  return `
    <section class="card glass">
      <div class="section-header">
        <div><h3>Equipos mixtos</h3><p class="muted">Se admiten múltiples docentes a cargo y alumnos de distintos cursos/divisiones.</p></div>
        <div class="toolbar"><button class="btn btn-secondary" data-import="teams">${icons.import} Importar CSV</button><button class="btn btn-secondary" data-export="teams">${icons.export} Exportar CSV</button><button class="btn btn-primary" data-create="team">Nuevo equipo</button></div>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Equipo</th><th>Docentes</th><th>Alumnos</th><th>Cursos</th><th>Divisiones</th><th>Proyecto</th><th>Acciones</th></tr></thead>
          <tbody>
            ${state.teams.map(team => `<tr><td><strong>${team.name}</strong></td><td>${team.teachers.join(', ')}</td><td>${team.students}</td><td>${team.courses.join(', ')}</td><td>${team.divisions.join(', ')}</td><td>${team.project}</td><td>${actionButtons()}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

function inventoryRows() {
  const filtered = state.inventory.filter(item => {
    const stateOk = state.filters.inventoryState === 'all' || item.status === state.filters.inventoryState;
    const typeOk = state.filters.inventoryType === 'all' || item.type === state.filters.inventoryType;
    return stateOk && typeOk;
  });
  return filtered.map(item => `<tr>
    <td><strong>${item.code}</strong><div class="muted small">${item.item}</div></td>
    <td>${item.type}</td>
    <td>${item.serial || '<span class="muted">Sin serie</span>'}</td>
    <td><div class="barcode-cell"><span>${item.barcode}</span><span class="mini-icon">${icons.barcode}</span></div></td>
    <td>${statusPill(item.status)}</td>
    <td>${item.condition}</td>
    <td>${item.assignedTo}</td>
    <td>${item.teacher}</td>
    <td>${item.requestedAt}</td>
    <td>${item.returnedAt}</td>
    <td>${item.location}</td>
    <td>${actionButtons()}</td>
  </tr>`).join('');
}

function renderInventory() {
  return `
    <section class="inventory-layout">
      <article class="card glass">
        <div class="section-header"><div><h3>Control y trazabilidad</h3><p class="muted">Cada insumo permite saber quién lo tiene, cuándo lo pidió, estado de entrega y devolución.</p></div><div class="toolbar"><button class="btn btn-secondary" data-import="inventory">${icons.import} Importar CSV</button><button class="btn btn-secondary" data-export="inventory">${icons.export} Exportar CSV</button><button class="btn btn-primary" id="newInventoryItemBtn">Nuevo insumo</button></div></div>
        <div class="toolbar filters-row">
          <select id="inventoryStateFilter"><option value="all">Todos los estados</option><option>Disponible</option><option>Prestado</option><option>En mantenimiento</option></select>
          <select id="inventoryTypeFilter"><option value="all">Todos los tipos</option><option>Equipo</option><option>Insumo</option></select>
          <button class="btn btn-secondary" id="generateBarcodeBtn">${icons.barcode} Generar código</button>
        </div>
        <div class="table-wrap">
          <table class="table inventory-table">
            <thead><tr><th>Código</th><th>Tipo</th><th>N° serie</th><th>Barcode</th><th>Estado</th><th>Condición</th><th>Asignado a</th><th>Docente</th><th>Pedido</th><th>Devolución</th><th>Ubicación</th><th>Acciones</th></tr></thead>
            <tbody>${inventoryRows()}</tbody>
          </table>
        </div>
      </article>
      <aside class="card glass">
        <h3>Módulo completo de inventario</h3>
        <div class="flow-steps">
          <div class="flow-step"><strong>Ingreso</strong><span>Alta de insumos con serie o barcode automático.</span></div>
          <div class="flow-step"><strong>Préstamo</strong><span>Registro de docente/equipo, fecha y estado de salida.</span></div>
          <div class="flow-step"><strong>Devolución</strong><span>Registro de fecha de retorno y condición del equipo.</span></div>
          <div class="flow-step"><strong>Auditoría</strong><span>Bitácora de movimientos, ubicación y alertas.</span></div>
        </div>
        <div class="barcode-preview glass-soft">
          <span class="tag">Vista previa de barcode</span>
          <div class="barcode-lines"></div>
          <strong id="barcodePreviewText">ISM-BAR-000362</strong>
        </div>
      </aside>
    </section>`;
}

function renderCourses() {
  return `<section class="card glass"><div class="section-header"><div><h3>Panel docente</h3><p class="muted">Demo del panel docente: módulos, lecciones, tareas y evaluativos.</p></div><div class="toolbar"><button class="btn btn-secondary" data-import="courses">${icons.import} Importar CSV</button><button class="btn btn-secondary" data-export="courses">${icons.export} Exportar CSV</button><button class="btn btn-primary" data-create="module">Nuevo módulo</button></div></div><div class="grid-cards">${state.modules.map(mod => `<article class="card glass-soft"><div class="metric-inline"><h3>${mod.title}</h3>${statusPill(mod.status)}</div><p>Docente: ${mod.teacher}</p><div class="course-metrics"><span>${mod.lessons} lecciones</span><span>${mod.tasks} tareas</span><span>${mod.evaluations} evaluativos</span></div></article>`).join('')}</div></section>`;
}

function renderLibrary() {
  return `<section class="card glass"><div class="section-header"><div><h3>Biblioteca digital</h3><p class="muted">Repositorio de documentos, videos y material del laboratorio.</p></div><div class="toolbar"><button class="btn btn-secondary" data-import="library">${icons.import} Importar CSV</button><button class="btn btn-secondary" data-export="library">${icons.export} Exportar CSV</button></div></div><div class="file-grid">${state.library.map(file => `<article class="file-item glass-soft"><strong>${file.title}</strong><p>${file.area}</p><span class="tag">${file.type}</span></article>`).join('')}</div></section>`;
}

function renderNotifications() {
  return `<section class="card glass"><div class="section-header"><div><h3>Centro de notificaciones</h3><p class="muted">Las notificaciones se pueden enviar de forma masiva, individual, por equipos o selección múltiple.</p></div><div class="toolbar"><button class="btn btn-primary" id="massNotifyBtn">Enviar notificación</button></div></div><div class="list-simple">${state.notifications.map(n => `<button class="notification-row list-item notification-select" data-id="${n.id}"><div><strong>${n.title}</strong><span>${n.message}</span></div>${n.unread ? '<span class="status-pill status-pending">Sin leer</span>' : '<span class="status-pill status-approved">Leída</span>'}</button>`).join('')}</div></section>`;
}

function renderProfile() {
  const teacherData = state.user.role === 'teacher' ? '<p><strong>Materia:</strong> Robótica y Electrónica</p><p><strong>Título:</strong> Prof. en Tecnología</p>' : '';
  const studentData = state.user.role === 'student' ? '<p><strong>Curso:</strong> 6° C</p><p><strong>División:</strong> C</p>' : '';
  return `<section class="profile-layout"><article class="card glass"><div class="section-header"><div><h3>Mi perfil</h3><p class="muted">La foto se cambia desde la imagen del header.</p></div><button class="btn btn-primary" id="editProfileBtn">Editar datos</button></div><div class="profile-box"><img src="${state.user.avatar_url || './assets/avatar-default.svg'}" alt="Avatar" class="profile-large" /><div><h3>${state.user.name}</h3><p><strong>Rol:</strong> ${state.user.role}</p><p><strong>Email:</strong> ${state.user.email}</p><p><strong>WhatsApp:</strong> +54 9 11 5555 1111</p><p><strong>DNI:</strong> 30111222</p><p><strong>Fecha nacimiento:</strong> 1988-07-15</p>${teacherData}${studentData}</div></div></article><aside class="card glass"><h3>Accesos rápidos</h3><div class="list-simple"><button class="btn btn-secondary" data-view-btn="notifications">Notificaciones</button><button class="btn btn-secondary" data-view-btn="inventory">Inventario</button><button class="btn btn-secondary" data-view-btn="courses">Campus</button></div></aside></section>`;
}

function renderSettings() {
  return `<section class="settings-layout"><article class="card glass"><div class="section-header"><div><h3>Configuraciones generales</h3><p class="muted">Carga del logo institucional, apariencia y parámetros del sistema.</p></div><button class="btn btn-primary" id="saveSettingsBtn">Guardar</button></div><form class="form-grid"><label><span>Nombre de la institución</span><input value="Instituto San Miguel" /></label><label><span>Email institucional</span><input value="robotica@ism.edu.ar" /></label><label class="full-span"><span>Logo de la institución</span><input type="file" /></label></form></article><aside class="card glass"><h3>Apariencia</h3><div class="list-simple"><div class="list-item"><strong>Tema actual</strong><span>${document.body.classList.contains('light') ? 'Claro' : 'Oscuro'}</span></div><div class="list-item"><strong>Alertas</strong><span>SweetAlert2 habilitado</span></div><div class="list-item"><strong>Exportación</strong><span>CSV disponible en todos los módulos</span></div></div></aside></section>`;
}

function renderView() {
  updateHeader();
  renderNav();
  const views = {
    dashboard: renderDashboard,
    users: renderUsers,
    roles: renderRoles,
    team: renderTeams,
    inventory: renderInventory,
    courses: renderCourses,
    library: renderLibrary,
    notifications: renderNotifications,
    profile: renderProfile,
    settings: renderSettings
  };
  appContent.innerHTML = (views[state.currentView] || renderDashboard)();
  attachViewEvents();
  renderNotificationDropdown();
  renderCharts();
}

function destroyCharts() {
  state.charts.forEach(chart => chart.destroy());
  state.charts = [];
}

function renderCharts() {
  destroyCharts();
  if (state.currentView !== 'dashboard') return;
  const line = document.getElementById('loansLineChart');
  const pie = document.getElementById('rolesPieChart');
  const bar = document.getElementById('inventoryBarChart');
  if (!line || !pie || !bar) return;

  state.charts.push(new Chart(line, {
    type: 'line',
    data: { labels: state.audit.map(i => i.date), datasets: [{ label: 'Préstamos', data: state.audit.map(i => i.loans), tension: .35 }, { label: 'Devoluciones', data: state.audit.map(i => i.returns), tension: .35 }] },
    options: { responsive: true, maintainAspectRatio: false }
  }));
  const roleCounts = ['Administrador', 'Docente', 'Alumno'].map(role => state.users.filter(u => u.role === role).length);
  state.charts.push(new Chart(pie, {
    type: 'pie',
    data: { labels: ['Administradores', 'Docentes', 'Alumnos'], datasets: [{ data: roleCounts }] },
    options: { responsive: true, maintainAspectRatio: false }
  }));
  const statusNames = ['Disponible', 'Prestado', 'En mantenimiento'];
  state.charts.push(new Chart(bar, {
    type: 'bar',
    data: { labels: statusNames, datasets: [{ label: 'Activos', data: statusNames.map(s => state.inventory.filter(i => i.status === s).length) }] },
    options: { responsive: true, maintainAspectRatio: false }
  }));
}

function openView(view) {
  state.currentView = view;
  renderView();
}

function renderNotificationDropdown() {
  notificationsPreview.innerHTML = state.notifications.length ? state.notifications.slice(0,4).map(n => `
    <button class="notification-row notification-select ${n.unread ? 'unread' : ''}" data-id="${n.id}">
      <div><strong>${escapeHtml(n.title)}</strong><span>${escapeHtml(n.message)}</span></div>
      <small>${n.unread ? 'Sin leer' : 'Leída'}</small>
    </button>
  `).join('') + `<button class="btn btn-secondary full-width" data-view-btn="notifications">Ir al área de notificaciones</button>` : '<p class="muted">No hay notificaciones.</p>';
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
    courses: state.modules,
    library: state.library,
    roles: [
      { role: 'Administrador', alcance: 'Total' },
      { role: 'Docente', alcance: 'Equipos y campus' },
      { role: 'Alumno', alcance: 'Consulta y seguimiento' }
    ],
    dashboard: [
      { metrica: 'Usuarios', valor: state.users.length },
      { metrica: 'Equipos', valor: state.teams.length },
      { metrica: 'Inventario', valor: state.inventory.length }
    ]
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

function attachViewEvents() {
  appContent.querySelectorAll('[data-view-btn]').forEach(btn => btn.addEventListener('click', () => openView(btn.dataset.viewBtn)));
  appContent.querySelectorAll('.notification-select').forEach(btn => btn.addEventListener('click', () => selectNotification(btn.dataset.id)));
  appContent.querySelectorAll('[data-import]').forEach(btn => btn.addEventListener('click', () => openImport(btn.dataset.import)));
  appContent.querySelectorAll('[data-export]').forEach(btn => btn.addEventListener('click', () => triggerDownload(`${btn.dataset.export}.csv`, csvFromRows(dataByModule(btn.dataset.export)))));
  appContent.querySelectorAll('[data-create]').forEach(btn => btn.addEventListener('click', () => Swal.fire({ icon: 'info', title: 'Alta rápida', text: `Se abrirá el formulario de ${btn.dataset.create} en la siguiente fase conectada a Supabase.` })));
  document.getElementById('periodFilter')?.addEventListener('change', e => { state.filters.period = e.target.value; renderCharts(); showToast('Filtro aplicado', 'Se actualizaron los gráficos'); });
  document.getElementById('inventoryStateFilter')?.addEventListener('change', e => { state.filters.inventoryState = e.target.value; renderView(); });
  document.getElementById('inventoryTypeFilter')?.addEventListener('change', e => { state.filters.inventoryType = e.target.value; renderView(); });
  document.getElementById('generateBarcodeBtn')?.addEventListener('click', generateBarcode);
  document.getElementById('newInventoryItemBtn')?.addEventListener('click', () => Swal.fire({ icon: 'info', title: 'Nuevo insumo', text: 'El formulario completo de alta permitirá serie, barcode, ubicación, estado, stock y trazabilidad.' }));
  document.getElementById('massNotifyBtn')?.addEventListener('click', () => Swal.fire({ icon: 'success', title: 'Notificación enviada', text: 'La notificación demo fue distribuida a los perfiles seleccionados.' }));
  document.getElementById('editProfileBtn')?.addEventListener('click', () => Swal.fire({ icon: 'success', title: 'Perfil', text: 'En la versión conectada podrás editar y guardar todos los datos del perfil.' }));
  document.getElementById('saveSettingsBtn')?.addEventListener('click', () => Swal.fire({ icon: 'success', title: 'Configuración guardada', text: 'Los cambios de branding y sistema fueron guardados en la demo.' }));
}

function bindEvents() {
  document.getElementById('themeToggle').addEventListener('click', () => setTheme(document.body.classList.contains('light') ? 'dark' : 'light'));
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

applySavedTheme();
bindEvents();
renderView();
