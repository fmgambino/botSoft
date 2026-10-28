import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ORIGINS = new Set([
  'https://fmgambino.github.io',
  'https://ffmgambino.github.io',
  'http://127.0.0.1:5501',
  'http://127.0.0.1:5500',
  'http://localhost:5501',
  'http://localhost:5500',
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
serve(async (req) => {
  const origin = req.headers.get('origin') || '';
  const cors = {
    'Access-Control-Allow-Origin': ORIGINS.has(origin) ? origin : 'https://fmgambino.github.io',
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  };
  const reply = (payload: unknown, status = 200) => new Response(JSON.stringify(payload), { status, headers: cors });
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return reply({ error: 'Método no permitido' }, 405);
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const anon = Deno.env.get('SUPABASE_ANON_KEY');
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !anon || !service) return reply({ error: 'Faltan secretos de Supabase' }, 503);
    const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
    if (!token) return reply({ error: 'Sesión requerida' }, 401);
    const authClient = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: { user }, error: authError } = await authClient.auth.getUser(token);
    if (authError || !user) return reply({ error: 'Sesión inválida' }, 401);
    const admin = createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: profile, error: profileError } = await admin.from('profiles')
      .select('is_active, roles:role_id(code)').eq('id', user.id).single();
    const role = String((profile?.roles as any)?.code || '').toLowerCase();
    if (profileError || !profile?.is_active || !['administrator', 'admin', 'superadmin', 'super_admin'].includes(role)) {
      return reply({ error: 'Acceso exclusivo para administradores activos' }, 403);
    }
    const body = await req.json().catch(() => ({}));
    if (body.action === 'list') {
      const users: Array<{ id: string; email: string }> = [];
      for (let page = 1; page <= 100; page++) {
        const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
        if (error) return reply({ error: 'No se pudo obtener el listado de Auth' }, 502);
        users.push(...data.users.map(u => ({ id: u.id, email: u.email || '' })));
        if (data.users.length < 1000) break;
      }
      return reply({ users });
    }
    if (body.action === 'update') {
      const userId = String(body.user_id || '');
      const email = String(body.email || '').trim().toLowerCase();
      if (!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(userId) || !emailPattern.test(email) || email.length > 254) {
        return reply({ error: 'Identificador o email inválido' }, 400);
      }
      const { data: before, error: getError } = await admin.auth.admin.getUserById(userId);
      if (getError || !before.user) return reply({ error: 'Usuario no encontrado en Auth' }, 404);
      if ((before.user.email || '').toLowerCase() === email) return reply({ email, unchanged: true });
      // La operación requiere permisos de administrador. Se actualiza la identidad de acceso en Auth.
      const { error } = await admin.auth.admin.updateUserById(userId, { email, email_confirm: true });
      if (error) return reply({ error: error.message }, 409);
      // Auditoría de la modificación; no bloquear si la tabla de auditoría tiene políticas adicionales.
      const { error: auditError } = await admin.from('user_audit_log').insert({
        profile_id: userId, action: 'admin_change_auth_email',
        previous_data: { email: before.user.email || '' }, new_data: { email }, changed_by: user.id,
      });
      if (auditError) console.error('Error de auditoría:', auditError.message);
      return reply({ email, updated: true });
    }
    return reply({ error: 'Acción desconocida' }, 400);
  } catch (error) {
    console.error('ism-admin-user-email:', error);
    return reply({ error: 'Error interno del servidor' }, 500);
  }
});
