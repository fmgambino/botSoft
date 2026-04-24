window.sb = (() => {
  const cfg = window.APP_CONFIG || {};
  const enabled = Boolean(
    cfg.SUPABASE_URL &&
    cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_ANON_KEY.includes('PEGAR_AQUI') &&
    !cfg.SUPABASE_URL.includes('TU-PROYECTO') &&
    window.supabase
  );
  const client = enabled ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  }) : null;

  const roleLabel = { administrator: 'Administrador', teacher: 'Docente', student: 'Alumno' };
  const roleCodeFromLabel = { Administrador: 'administrator', Docente: 'teacher', Alumno: 'student' };

  function assertClient() {
    if (!client) throw new Error('Supabase no está configurado. Pegá tu ANON KEY en config.js.');
    return client;
  }
  function normalizeProfile(row) {
    const code = row?.roles?.code || row?.role_code || (row?.role_name === 'Administrador' ? 'administrator' : row?.role_name === 'Docente' ? 'teacher' : row?.role_name === 'Alumno' ? 'student' : 'student');
    return {
      id: row.id,
      name: row.full_name || row.name || 'Usuario',
      full_name: row.full_name || row.name || 'Usuario',
      role: roleLabel[code] || row?.roles?.name || 'Alumno',
      role_code: code,
      email: row.email || '',
      whatsapp: row.whatsapp || '-',
      dni: row.dni || '-',
      status: row.is_active === false ? 'Inactivo' : 'Activo',
      avatar_url: row.avatar_url || './assets/avatar-default.svg',
      birth_date: row.birth_date || '',
      title: row.title || ''
    };
  }
  function normalizeInventory(row) {
    return {
      id: row.id,
      code: row.code || row.asset_code || '-',
      item: row.item || row.name || '-',
      type: row.type || 'Equipo',
      serial: row.serial || row.serial_number || '',
      barcode: row.barcode || '-',
      status: row.status || 'Disponible',
      condition: row.condition || row.condition_note || 'Sin observaciones',
      assignedTo: row.assigned_to || row.assignedTo || '-',
      requestedAt: row.requested_at || '-',
      returnedAt: row.returned_at || '-',
      teacher: row.teacher || '-',
      location: row.location || '-'
    };
  }

  return {
    enabled,
    client,
    isReady: () => enabled,
    async signIn(email, password) {
      const { data, error } = await assertClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },
    async signOut() {
      if (!client) return;
      return client.auth.signOut();
    },
    async getSession() {
      if (!client) return { data: { session: null } };
      return client.auth.getSession();
    },
    async fetchProfile() {
      if (!client) return null;
      const { data: { user }, error: userError } = await client.auth.getUser();
      if (userError) throw userError;
      if (!user) return null;
      const { data, error } = await client
        .from('profiles')
        .select('*, roles:role_id(name, code), courses:student_course_id(name), divisions:student_division_id(name), subjects:teacher_subject_id(name)')
        .eq('id', user.id)
        .maybeSingle();
      if (error) throw error;
      return normalizeProfile({ ...data, email: user.email });
    },
    async listProfiles() {
      const { data, error } = await assertClient()
        .from('users_abm_view')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(normalizeProfile);
    },
    async updateProfile(id, payload) {
      const body = {
        full_name: payload.full_name || payload.name,
        dni: payload.dni || null,
        whatsapp: payload.whatsapp || null,
        title: payload.title || null,
        is_active: payload.status !== 'Inactivo'
      };
      Object.keys(body).forEach(k => body[k] === undefined && delete body[k]);
      const { error } = await assertClient().from('profiles').update(body).eq('id', id);
      if (error) throw error;
    },
    async signUpUser(payload) {
      const email = payload.email;
      const password = payload.password || crypto.randomUUID().slice(0, 12) + 'Aa1!';
      const roleCode = roleCodeFromLabel[payload.role] || payload.role || 'student';
      const { data, error } = await assertClient().auth.signUp({
        email, password,
        options: { data: { full_name: payload.full_name || payload.name, role_code: roleCode } }
      });
      if (error) throw error;
      return { user: data.user, password };
    },
    async listInventory() {
      const { data, error } = await assertClient()
        .from('inventory_frontend_view')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(normalizeInventory);
    },
    async createInventoryAsset(payload) {
      const { data, error } = await assertClient().rpc('admin_create_inventory_asset', {
        p_name: payload.item,
        p_category: payload.category || payload.type || 'General',
        p_asset_code: payload.code || null,
        p_serial_number: payload.serial || null,
        p_barcode: payload.barcode || null,
        p_location_code: payload.location_code || 'LAB-ROB',
        p_condition_note: payload.condition || null
      });
      if (error) throw error;
      return data;
    },
    async softDeleteInventoryAsset(id) {
      const { error } = await assertClient().from('inventory_assets').update({ is_active: false }).eq('id', id);
      if (error) throw error;
    }
  };
})();
