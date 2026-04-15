window.sb = (() => {
  const cfg = window.APP_CONFIG || {};
  const enabled = Boolean(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && !cfg.SUPABASE_URL.includes('TU-PROYECTO'));
  const client = enabled ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
  return {
    enabled,
    client,
    async signIn(email, password) {
      if (!client) throw new Error('Supabase no configurado');
      return client.auth.signInWithPassword({ email, password });
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
      const { data: { user } } = await client.auth.getUser();
      if (!user) return null;
      const { data, error } = await client
        .from('profiles')
        .select('*, roles:role_id(name, code), divisions(name), courses(name), subjects(name)')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return { ...data, email: user.email };
    },
    async list(table) {
      if (!client) return [];
      const { data, error } = await client.from(table).select('*').limit(100).order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  };
})();
