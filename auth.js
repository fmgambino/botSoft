const demoAccounts = {
  admin: {
    user: 'admin', password: 'admin123', name: 'Administrador General', email: 'admin@ism.edu.ar', role: 'administrator',
    avatar_url: './assets/avatar-default.svg'
  },
  docente: {
    user: 'docente', password: 'docente123', name: 'María López', email: 'mlopez@ism.edu.ar', role: 'teacher',
    avatar_url: './assets/avatar-default.svg'
  },
  alumno: {
    user: 'alumno', password: 'alumno123', name: 'Thiago Benjamín Luna', email: 'thiago.luna@ism.edu.ar', role: 'student',
    avatar_url: './assets/avatar-default.svg'
  }
};

const authMessage = document.getElementById('authMessage');

function saveDemoSession(account) {
  localStorage.setItem('ism_demo_user', JSON.stringify(account));
  window.location.href = './app.html';
}

document.getElementById('demoAdminBtn')?.addEventListener('click', () => saveDemoSession(demoAccounts.admin));
document.getElementById('demoTeacherBtn')?.addEventListener('click', () => saveDemoSession(demoAccounts.docente));
document.getElementById('demoStudentBtn')?.addEventListener('click', () => saveDemoSession(demoAccounts.alumno));

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  authMessage.textContent = 'Validando acceso...';

  const identifier = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  const localMatch = Object.values(demoAccounts).find((account) =>
    (identifier === account.user || identifier === account.email.toLowerCase()) && password === account.password
  );

  if (localMatch) {
    saveDemoSession(localMatch);
    return;
  }

  try {
    if (!window.sb.enabled) {
      throw new Error('Usuario demo no reconocido. Usá admin/admin123, docente/docente123 o alumno/alumno123.');
    }

    const email = identifier.includes('@') ? identifier : `${identifier}@institutosanmiguel.edu.ar`;
    const { error } = await window.sb.signIn(email, password);
    if (error) throw error;
    window.location.href = './app.html';
  } catch (error) {
    const msg = error.message || 'No se pudo iniciar sesión.';
    authMessage.textContent = msg.includes('Invalid login credentials')
      ? 'Credenciales inválidas. Verificá que el usuario exista en Supabase Auth, tenga contraseña y el email esté confirmado si tu proyecto lo requiere.'
      : msg;
    console.error('Login Supabase:', error);
  }
});
