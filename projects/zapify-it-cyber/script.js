
const pad=n=>String(n).padStart(2,'0');
function tickClock(){
 const d=new Date(), t=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
 document.querySelectorAll('[data-clock]').forEach(e=>e.textContent=t);
 document.querySelectorAll('[data-date]').forEach(e=>e.textContent=d.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'}));
}
tickClock(); setInterval(tickClock,1000);
let frames=0,last=performance.now(),fps=0;
function fpsLoop(now){frames++; if(now-last>=500){fps=Math.round(frames*1000/(now-last));frames=0;last=now;document.querySelectorAll('[data-fps]').forEach(e=>e.textContent=fps);}requestAnimationFrame(fpsLoop)}
requestAnimationFrame(fpsLoop);
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
document.querySelectorAll('form[data-demo]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const s=form.querySelector('[data-form-status]');if(s)s.textContent='Message received in demo mode. Zapify IT/CYBER would connect this form to your preferred backend.';}));
