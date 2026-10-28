// Supabase Edge Function: EmailJS REST (secretos exclusivamente del servidor).
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const allowed = new Set(['new_user','inventory','profile_changed','loan','support','library','access']);
const esc = (x: unknown) => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
serve(async req => {
  const origin = req.headers.get('origin') || '';
  const site = Deno.env.get('SITE_ORIGIN') || '';
  const cors = { 'Access-Control-Allow-Origin': origin === site ? origin : site, 'Access-Control-Allow-Headers':'authorization,apikey,content-type', 'Access-Control-Allow-Methods':'POST,OPTIONS' };
  if(req.method === 'OPTIONS') return new Response(null,{status:204,headers:cors});
  const reply = (msg:string,status=200) => new Response(JSON.stringify({message:msg}),{status,headers:{...cors,'Content-Type':'application/json'}});
  if(req.method !== 'POST') return reply('Método no permitido',405);
  try {
    const url=Deno.env.get('SUPABASE_URL')!, anon=Deno.env.get('SUPABASE_ANON_KEY')!;
    const sb=createClient(url,anon,{global:{headers:{Authorization:req.headers.get('Authorization')||''}}});
    const {data:{user},error}=await sb.auth.getUser();
    if(error||!user) return reply('No autorizado',401);
    const {data:profile}=await sb.from('profiles').select('is_active,roles:role_id(code)').eq('id',user.id).single();
    const role=String((profile?.roles as any)?.code||'').toLowerCase();
    if(!profile?.is_active||!['superadmin','super_admin','administrator','admin'].includes(role)) return reply('Se requiere administrador activo',403);
    const {kind,recipient,name,title,details}=await req.json();
    if(!allowed.has(kind)||typeof recipient!=='string'||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) return reply('Datos inválidos',400);
    const safeDetails=Object.entries(details&&typeof details==='object'&&!Array.isArray(details)?details:{}).slice(0,25).map(([k,v])=>`<tr><td style="padding:10px;color:#94a3b8">${esc(k)}</td><td style="padding:10px;color:#e2e8f0">${esc(v)}</td></tr>`).join('');
    const html=`<div style="background:#0b1220;padding:36px 12px;font-family:Arial,sans-serif;color:#e2e8f0"><div style="max-width:600px;margin:auto;background:#111c30;border:1px solid #27364f;border-radius:16px;overflow:hidden"><header style="padding:26px;text-align:center;background:#17253d"><img src="${esc(Deno.env.get('EMAIL_LOGO_URL')||'')}" alt="ISM ROBOSOFT" width="88" style="max-width:88px"><h1 style="font-size:23px;color:#fff">${esc(title||kind)}</h1></header><main style="padding:28px"><p>Hola, <b>${esc(name||'usuario')}</b>:</p><p>Te informamos sobre la siguiente novedad de ISM ROBOSOFT:</p><table style="width:100%;border-collapse:collapse">${safeDetails}</table></main><footer style="padding:24px;text-align:center;background:#0c1525;color:#a9b8cd;font-size:12px"><strong>ISM ROBOSOFT© 2026</strong><br>Tucumán · Argentina · by <a style="color:#93c5fd" href="https://electronicagambino.com/">Ing. Fernando Gambino</a><br>Todos los Derechos Registrados ·</footer></div></div>`;
    const service_id=Deno.env.get('EMAILJS_SERVICE_ID'),template_id=Deno.env.get('EMAILJS_TEMPLATE_ID'),user_id=Deno.env.get('EMAILJS_PUBLIC_KEY'),accessToken=Deno.env.get('EMAILJS_PRIVATE_KEY');
    if(!service_id||!template_id||!user_id||!accessToken) return reply('EmailJS no configurado',503);
    const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service_id,template_id,user_id,accessToken,template_params:{to_email:recipient,to_name:name||'Usuario',subject:title||'Notificación ISM ROBOSOFT',message_html:html,kind}})});
    if(!response.ok) return reply('No se pudo enviar el correo',502);
    return reply('Correo enviado');
  } catch(e){console.error(e);return reply('Error interno',500);}
});
