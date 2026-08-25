const body=document.body, modal=document.getElementById('portfolioModal'), loader=document.getElementById('portfolioLoading');
const bar=loader?.querySelector('.loading-progress i'), percent=loader?.querySelector('.loading-percent');
let timer;
function openPortfolio(){
  clearInterval(timer); if(!loader||!modal)return;
  loader.classList.add('show'); loader.setAttribute('aria-hidden','false'); let n=0;
  bar.style.width='0%'; percent.textContent='00%';
  timer=setInterval(()=>{n+=Math.floor(Math.random()*15)+9;if(n>=100){n=100;clearInterval(timer);setTimeout(()=>{loader.classList.remove('show');modal.classList.add('open');modal.setAttribute('aria-hidden','false');body.classList.add('modal-open');bindTilt()},260)}bar.style.width=n+'%';percent.textContent=String(n).padStart(2,'0')+'%'},55)
}
function closePortfolio(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');body.classList.remove('modal-open')}
document.querySelectorAll('.portfolio-trigger').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();if(btn.closest('.portfolio-footer')){closePortfolio();setTimeout(()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}),60)}else openPortfolio()}));
document.querySelector('.close-portfolio')?.addEventListener('click',closePortfolio);document.querySelector('.portfolio-backdrop')?.addEventListener('click',closePortfolio);document.addEventListener('keydown',e=>{if(e.key==='Escape')closePortfolio()});

const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring'),label=document.querySelector('.cursor-label');let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,lastTrail=0;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(dot){dot.style.transform=`translate(${mx}px,${my}px)`;dot.style.opacity=1}if(label)label.style.transform=`translate(${mx}px,${my}px)`;if(matchMedia('(pointer:fine)').matches&&performance.now()-lastTrail>30){lastTrail=performance.now();const t=document.createElement('span');t.className='cursor-trail';t.style.left=mx+'px';t.style.top=my+'px';body.appendChild(t);setTimeout(()=>t.remove(),500)}});
(function loop(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;if(ring){ring.style.transform=`translate(${rx}px,${ry}px)`;ring.style.opacity=1}requestAnimationFrame(loop)})();
document.addEventListener('mouseover',e=>{if(e.target.closest('a,button,summary,.portfolio-card,.service-card'))body.classList.add('cursor-hover');if(e.target.closest('.portfolio-trigger'))body.classList.add('cursor-view')});document.addEventListener('mouseout',e=>{if(e.target.closest('a,button,summary,.portfolio-card,.service-card'))body.classList.remove('cursor-hover');if(e.target.closest('.portfolio-trigger'))body.classList.remove('cursor-view')});

const canvas=document.getElementById('ambientCanvas');if(canvas){const ctx=canvas.getContext('2d');let ps=[];function size(){canvas.width=innerWidth;canvas.height=innerHeight}function seed(){ps=Array.from({length:45},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+.4,v:(Math.random()-.5)*.18,a:Math.random()*.35+.08}))}function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);ps.forEach(p=>{p.y+=p.v;if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;ctx.beginPath();ctx.fillStyle=`rgba(240,90,156,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}size();seed();draw();addEventListener('resize',()=>{size();seed()})}
const prog=document.getElementById('scrollProgress');addEventListener('scroll',()=>{if(prog){const max=document.documentElement.scrollHeight-innerHeight;prog.style.width=(max?scrollY/max*100:0)+'%'}},{passive:true});
const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-btn');menu?.addEventListener('click',()=>header.classList.toggle('mobile-open'));document.querySelectorAll('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('mobile-open')));
const obs=new IntersectionObserver((entries,o)=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');o.unobserve(x.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
if(matchMedia('(pointer:fine)').matches)document.querySelectorAll('.magnetic').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
function bindTilt(){document.querySelectorAll('.tilt-card').forEach(c=>{if(c.dataset.bound)return;c.dataset.bound=1;c.addEventListener('mousemove',e=>{if(!matchMedia('(pointer:fine)').matches)return;const r=c.getBoundingClientRect(),x=e.clientX/r.width-r.left/r.width-.5,y=e.clientY/r.height-r.top/r.height-.5;c.style.transform=`perspective(900px) rotateX(${y*-4}deg) rotateY(${x*5}deg) translateY(-6px)`});c.addEventListener('mouseleave',()=>c.style.transform='')})}
document.addEventListener('click',e=>{if(!matchMedia('(pointer:fine)').matches)return;const s=document.createElement('span');s.className='click-ripple';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';body.appendChild(s);setTimeout(()=>s.remove(),650)});
const form=document.getElementById('contactForm');form?.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('name').value.trim(),email=document.getElementById('email').value.trim(),type=document.getElementById('type').value,msg=document.getElementById('msg').value.trim();window.location.href=`mailto:zapifydesigns@gmail.com?subject=${encodeURIComponent('Zapify Designs enquiry — '+type)}&body=${encodeURIComponent(`Hi Zapify Designs,\n\nName: ${name}\nEmail: ${email}\nProject type: ${type}\n\nProject details:\n${msg||'(No details added yet.)'}`)}`;const st=document.getElementById('formStatus');if(st)st.textContent='Opening your email app…'});
document.querySelectorAll('[data-whatsapp]').forEach(b=>b.addEventListener('click',()=>window.open('https://wa.me/27743899657?text='+encodeURIComponent("Hi Zapify Designs! I'd like to chat about a website project."),'_blank','noopener')));document.getElementById('year').textContent=new Date().getFullYear();


/* Cookie preference banner */
(()=>{
 const banner=document.getElementById('cookieBanner'), accept=document.getElementById('cookieAccept'), decline=document.getElementById('cookieDecline');
 if(!banner)return;
 const saved=localStorage.getItem('zapifyCookieChoice');
 if(!saved)setTimeout(()=>banner.classList.add('show'),700);
 const save=value=>{localStorage.setItem('zapifyCookieChoice',value);banner.classList.remove('show')};
 accept?.addEventListener('click',()=>save('accepted'));
 decline?.addEventListener('click',()=>save('essential-only'));
})();

/* Zapify AI — fast assistant with a local fallback when the server is unavailable. */
(()=>{
 const fab=document.getElementById('aiFab'),chat=document.getElementById('aiChat'),close=document.getElementById('aiClose'),form=document.getElementById('aiForm'),input=document.getElementById('aiInput'),bodyEl=document.getElementById('aiBody');
 if(!fab||!chat||!form)return;
 let history=[];
 const add=(text,who='bot')=>{const d=document.createElement('div');d.className='ai-msg '+who;d.textContent=text;bodyEl.appendChild(d);bodyEl.scrollTop=bodyEl.scrollHeight;return d};
 const typing=()=>{const d=document.createElement('div');d.className='ai-msg bot ai-typing';d.innerHTML='<span></span><span></span><span></span>';bodyEl.appendChild(d);bodyEl.scrollTop=bodyEl.scrollHeight;return d};
 const detectAction=q=>{
   const x=q.toLowerCase();
   if(/portfolio|projects|show.*website|show.*sites/.test(x))return 'portfolio';
   if(/clothes|clothing|fashion|yaga|closet/.test(x))return 'closet';
   if(/plumb|leak|geyser|drain/.test(x))return 'flow';
   if(/restaurant|food|cooking|menu|cafe/.test(x))return 'cooking';
   if(/lab|playground|cursor|effect|hover|animation|background|interaction/.test(x))return 'playground';
   if(/\bit\b|cyber|technology|tech|managed.*service/.test(x))return 'grid';
   if(/quantum|futuristic|advanced.*system/.test(x))return 'quantum';
   if(/arcade|gaming|game/.test(x))return 'arcade';
   if(/event|nightlife|party|concert/.test(x))return 'pulse';
   if(/auto|car|workshop|mechanic/.test(x))return 'auto';
   if(/clean|cleaning|housekeeping/.test(x))return 'clean';
   if(/electric|electrical|wiring|power/.test(x))return 'electric';
   if(/build|builder|construction|renovation/.test(x))return 'build';
   if(/contact|email|whatsapp|quote|talk to|hire/.test(x))return 'contact';
   return null;
 };
 const doAction=a=>{if(!a)return;setTimeout(()=>{
   if(a==='portfolio')document.querySelector('.portfolio-trigger')?.click();
   else if(a==='contact')document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
   else if(['playground','cooking','closet','flow','grid','quantum','arcade','pulse','auto'].includes(a))location.href='projects/zapify-'+a+'/index.html';
   else if(a==='clean')location.href='projects/zapify-clean/index.html';
   else if(a==='electric')location.href='projects/zapify-electric/index.html';
   else if(a==='build')location.href='projects/zapify-build/index.html';
 },450)};
 const fallback=q=>{
   const a=detectAction(q);
   const messages={
    portfolio:'I can open the full Zapify Designs portfolio for you.',
    closet:'Zapify Closet is our pre-loved fashion marketplace concept with shopping, filters, favourites and a bag.',
    flow:'Zapify Flow is our plumbing/service-business concept with services, quote estimation and booking.',
    cooking:'Zapify Cooking is our modern restaurant concept with a proper menu, food ordering demo and reservations.',
    playground:'Zapify Labs is our interactive testing space: experiment with backgrounds, cursors, particles, gradients, glass, 3D tilt, text effects, buttons, loading screens, scroll effects and more.',
    grid:'Zapify Grid is our advanced Business/IT concept with cyber operations, infrastructure and dashboard-style interactions.',
    quantum:'Zapify Quantum is our extreme futuristic systems concept with live-style telemetry, simulation, network controls and terminal interactions.',
    arcade:'Zapify Arcade is our neon gaming and entertainment concept.',
    pulse:'Zapify Pulse is our bold events/nightlife concept.',
    auto:'Zapify Auto Repairs is our workshop concept with services, parts and a cart.',
    clean:'Zapify Clean is a professional cleaning-service website demo with service requests, emergency jobs and quote flows.',
    electric:'Zapify Electrical is an electrical-service website demo with installations, repairs, compliance and emergency call-outs.',
    build:'Zapify Build is a construction and renovation website demo with project showcases, services and quote requests.',
    contact:'You can contact Zapify Designs at zapifydesigns@gmail.com or +27 74 389 9657.'
   };
   return {text:messages[a]||'I can help with Zapify Designs, our portfolio, website types, effects, e-commerce, IT, restaurants, fashion, plumbing and custom websites. What would you like to build?',action:a};
 };
 const ask=async q=>{
   if(!q)return;
   add(q,'user'); input.value='';
   const t=typing();
   const action=detectAction(q);
   try{
     const controller=new AbortController();
     const timeout=setTimeout(()=>controller.abort(),3500);
     const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,history:history.slice(-10)}),signal:controller.signal});
     clearTimeout(timeout);
     if(!res.ok)throw new Error('API request failed');
     const data=await res.json();
     t.remove();
     add(data.reply||fallback(q).text);
     history.push({role:'user',content:q},{role:'assistant',content:data.reply||''});
     doAction(action);
   }catch(err){
     t.remove();
     const f=fallback(q); add(f.text); doAction(f.action);
     console.warn('Zapify AI API unavailable:',err);
   }
 };
 const open=()=>{chat.classList.add('open');chat.setAttribute('aria-hidden','false');setTimeout(()=>input.focus(),120)};
 fab.onclick=()=>chat.classList.contains('open')?chat.classList.remove('open'):open();
 close.onclick=()=>chat.classList.remove('open');
 document.querySelectorAll('.ai-suggestions button').forEach(b=>b.onclick=()=>ask(b.dataset.q));
 form.onsubmit=e=>{e.preventDefault();ask(input.value.trim())};
})();
