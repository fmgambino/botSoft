import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const url=Deno.env.get('SUPABASE_URL')!;
const anon=Deno.env.get('SUPABASE_ANON_KEY')!;
const service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const allowedOrigins=new Set(['https://fmgambino.github.io','https://ffmgambino.github.io','http://127.0.0.1:5501','http://localhost:5501']);
const configuredOrigin=Deno.env.get('SITE_ORIGIN');if(configuredOrigin)allowedOrigins.add(configuredOrigin);
const corsFor=(req:Request)=>({'Access-Control-Allow-Origin':allowedOrigins.has(req.headers.get('Origin')||'')?(req.headers.get('Origin')||''):'https://fmgambino.github.io','Vary':'Origin','Access-Control-Allow-Headers':'authorization,apikey,content-type','Access-Control-Allow-Methods':'POST,OPTIONS','Content-Type':'application/json'});
serve(async(req)=>{
 const cors=corsFor(req);
 const result=(body:object,status=200)=>new Response(JSON.stringify(body),{status,headers:cors});
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
 if(req.method!=='POST')return result({ok:false,error:'Método inválido'},405);
 const bearer=req.headers.get('Authorization')||'';
 if(!bearer.startsWith('Bearer '))return result({ok:false,error:'Sesión requerida'},401);
 try{
  const caller=createClient(url,anon,{global:{headers:{Authorization:bearer}}});
  const {data:{user},error:authError}=await caller.auth.getUser();
  if(authError||!user)return result({ok:false,error:'Sesión inválida'},401);
  const admin=createClient(url,service,{auth:{autoRefreshToken:false,persistSession:false}});
  const {data:p}=await admin.from('profiles').select('is_active,roles:role_id(code)').eq('id',user.id).maybeSingle();
  if(!p?.is_active||!['administrator','admin','superadmin','super_admin'].includes(String((p.roles as any)?.code||'').toLowerCase()))return result({ok:false,error:'Permiso denegado'},403);
  const {user_id,kind}=await req.json();
  if(!/^[0-9a-f-]{36}$/i.test(String(user_id||''))||!['welcome','registration','recovery','loan_reminder'].includes(kind))return result({ok:false,error:'Datos inválidos'},400);
  const {data:target,error:targetError}=await admin.auth.admin.getUserById(user_id);
  if(targetError||!target?.user?.email)return result({ok:false,error:'Usuario sin correo de autenticación'},404);
  const email=target.user.email;
  const {data:profile}=await admin.from('profiles').select('full_name').eq('id',user_id).maybeSingle();
  const {data:last}=await admin.from('ism_user_mail_log').select('sent_at').eq('user_id',user_id).eq('kind',kind).order('sent_at',{ascending:false}).limit(1);
  if(last?.[0]&&Date.now()-new Date(last[0].sent_at).getTime()<60000)return result({ok:false,error:'Esperá 60 segundos antes de reenviar'},429);
  let action_url='https://fmgambino.github.io/botSoft/';
  if(kind==='recovery'||kind==='registration'){
    const type=kind==='recovery'?'recovery':'magiclink';
    const {data:link,error:linkError}=await admin.auth.admin.generateLink({type,email,options:{redirectTo:'https://fmgambino.github.io/botSoft/'}});
    if(linkError||!link?.properties?.action_link)return result({ok:false,error:'No se pudo generar el enlace seguro'},502);
    action_url=link.properties.action_link;
  }
  let details='';
  if(kind==='loan_reminder'){
    const {data:loans,error:loanError}=await admin.from('inventory_loans').select('loan_code,use_date,from_time,to_time,status').or(`teacher_profile_id.eq.${user_id},requester_profile_id.eq.${user_id}`).in('status',['aprobado','retirado']).gte('use_date',new Date().toISOString().slice(0,10)).order('use_date',{ascending:true}).limit(5);
    if(loanError)return result({ok:false,error:'No se pudieron consultar los préstamos'},502);
    if(!loans?.length)return result({ok:false,error:'El usuario no tiene préstamos próximos aprobados'},400);
    details=loans.map(l=>`${l.loan_code} · ${l.use_date} · ${l.from_time||''} a ${l.to_time||''} · ${l.status}`).join('\\n');
  }
  const titles:Record<string,string>={welcome:'Bienvenido a ISM ROBOSOFT',registration:'Acceso a ISM ROBOSOFT',recovery:'Recuperación de contraseña',loan_reminder:'Recordatorio de préstamo'};
  const messages:Record<string,string>={welcome:'Tu cuenta institucional está registrada. Podés acceder desde el botón.',registration:'Accedé a tu cuenta mediante el enlace seguro.',recovery:'Solicitaste recuperar el acceso. Utilizá el siguiente enlace para restablecer tu contraseña.',loan_reminder:'Estos son tus préstamos aprobados próximos.'};
  const service_id=Deno.env.get('EMAILJS_SERVICE_ID'),template_id=Deno.env.get('EMAILJS_TEMPLATE_ID'),user_id_key=Deno.env.get('EMAILJS_PUBLIC_KEY'),accessToken=Deno.env.get('EMAILJS_PRIVATE_KEY');
  if(!service_id||!template_id||!user_id_key||!accessToken)return result({ok:false,error:'EmailJS no configurado'},503);
  const payload={service_id,template_id,user_id:user_id_key,accessToken,template_params:{to_email:email,to_name:profile?.full_name||'Usuario',subject:titles[kind],title:titles[kind],message:messages[kind],details,event_date:new Date().toLocaleString('es-AR',{timeZone:'America/Argentina/Tucuman'}),action_url,action_text:kind==='recovery'?'RECUPERAR CONTRASEÑA':'INGRESAR A ROBOSOFT'}};
  const sent=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  await admin.from('ism_user_mail_log').insert({user_id,kind,sent_by:user.id,provider_status:sent.ok?'accepted':'failed',error_message:sent.ok?null:`EmailJS HTTP ${sent.status}`});
  if(!sent.ok)return result({ok:false,error:`EmailJS rechazó el envío (HTTP ${sent.status})`},502);
  return result({ok:true});
 }catch(e){console.error(e);return result({ok:false,error:'Error interno'},500)}
});
