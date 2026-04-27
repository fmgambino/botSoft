const demoAccounts = {
  admin: { user:'admin', password:'admin123', name:'Administrador General', email:'admin@ism.edu.ar', role:'administrator', avatar_url:'./assets/avatar-default.svg' },
  docente: { user:'docente', password:'docente123', name:'María López', email:'mlopez@ism.edu.ar', role:'teacher', avatar_url:'./assets/avatar-default.svg' },
  alumno: { user:'alumno', password:'alumno123', name:'Thiago Benjamín Luna', email:'thiago.luna@ism.edu.ar', role:'student', avatar_url:'./assets/avatar-default.svg' }
};
const authMessage = document.getElementById('authMessage');
const loginForm = document.getElementById('loginForm');
function setMsg(text, type='info') { if (authMessage) { authMessage.textContent = text || ''; authMessage.dataset.type = type; } }
function saveDemoSession(account) { localStorage.setItem('ism_demo_user', JSON.stringify(account)); window.location.href = './app.html'; }
document.getElementById('demoAdminBtn')?.addEventListener('click', () => saveDemoSession(demoAccounts.admin));
document.getElementById('demoTeacherBtn')?.addEventListener('click', () => saveDemoSession(demoAccounts.docente));
document.getElementById('demoStudentBtn')?.addEventListener('click', () => saveDemoSession(demoAccounts.alumno));
loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  setMsg('Validando acceso...');
  const identifier = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const localMatch = Object.values(demoAccounts).find(a => (identifier === a.user || identifier === a.email.toLowerCase()) && password === a.password);
  if (localMatch) return saveDemoSession(localMatch);
  try {
    if (!window.sb?.enabled) throw new Error('Supabase no está configurado. Usá demo o completá config.js.');
    const email = identifier.includes('@') ? identifier : `${identifier}@institutosanmiguel.edu.ar`;
    await window.sb.signIn(email, password);
    const profile = await window.sb.fetchProfile();
    if (!profile || profile.status !== 'Activo') {
      await window.sb.signOut();
      throw new Error('Tu usuario todavía está inactivo. Un administrador debe autorizarlo desde el módulo Usuarios.');
    }
    window.location.href = './app.html';
  } catch (error) {
    const raw = error.message || 'No se pudo iniciar sesión.';
    let msg = raw;
    if (raw.includes('Invalid login credentials')) msg = 'Credenciales inválidas. Verificá email y contraseña o usá Recuperar contraseña.';
    if (raw.includes('Email not confirmed')) msg = 'El email todavía no está confirmado. Revisá tu correo o pedí al administrador reenviar la invitación.';
    if (raw.includes('Database error')) msg = 'Error de Auth/DB en Supabase. Ejecutá el SQL incluido y probá recuperar contraseña para este usuario.';
    setMsg(msg, 'error');
    console.error('Login Supabase:', error);
  }
});
