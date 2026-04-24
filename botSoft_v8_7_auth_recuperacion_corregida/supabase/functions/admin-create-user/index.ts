import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_ROLE_KEY = Deno.env.get('SERVICE_ROLE_KEY')!
    const anonAuth = req.headers.get('Authorization') || ''
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } })
    const userClient = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY') || SERVICE_ROLE_KEY, { global: { headers: { Authorization: anonAuth } } })

    const { data: requester } = await userClient.auth.getUser()
    if (!requester?.user) throw new Error('No autorizado')
    const { data: me } = await admin.from('profiles').select('roles:role_id(code), is_active').eq('id', requester.user.id).maybeSingle()
    if (!me?.is_active || me?.roles?.code !== 'administrator') throw new Error('Solo administradores activos pueden crear usuarios')

    const body = await req.json()
    const email = String(body.email || '').trim().toLowerCase()
    const fullName = String(body.full_name || body.name || '').trim()
    const roleCode = String(body.role_code || body.role || 'student').toLowerCase()
    const redirectTo = body.redirect_to || 'https://fmgambino.github.io/reset-password.html'
    if (!email || !fullName) throw new Error('Email y nombre son obligatorios')

    let userId: string | undefined
    const { data: existing } = await admin.auth.admin.listUsers()
    const found = existing.users.find((u) => u.email?.toLowerCase() === email)
    if (found) {
      userId = found.id
      await admin.auth.admin.updateUserById(userId, { email_confirm: true, user_metadata: { full_name: fullName, role_code: roleCode } })
    } else {
      const { data, error } = await admin.auth.admin.createUser({ email, email_confirm: true, user_metadata: { full_name: fullName, role_code: roleCode } })
      if (error) throw error
      userId = data.user?.id
    }
    if (!userId) throw new Error('No se pudo crear el usuario Auth')

    const { error: rpcError } = await admin.rpc('admin_upsert_profile_by_email', {
      p_email: email,
      p_full_name: fullName,
      p_role_code: roleCode,
      p_dni: body.dni || null,
      p_whatsapp: body.whatsapp || null,
      p_birth_date: body.birth_date || null,
      p_title: roleCode === 'student' ? null : (body.title || null),
      p_avatar_url: body.avatar_url || './assets/avatar-default.svg',
      p_is_active: false,
    })
    if (rpcError) throw rpcError

    await admin.auth.admin.inviteUserByEmail(email, { redirectTo })

    return new Response(JSON.stringify({ ok: true, user_id: userId }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || String(error) }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
