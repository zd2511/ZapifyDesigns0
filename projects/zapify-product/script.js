const WA='27743899657';
const msg="Hi Zapify Designs! I'm interested in the Zapify Product website demo.";
const wa=`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
document.querySelectorAll('[data-wa]').forEach(el=>{el.href=wa;el.target='_blank';el.rel='noopener';el.addEventListener('click',()=>{el.href=wa})});
document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav nav')?.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav nav')?.classList.remove('open')));
document.getElementById('year')?.replaceChildren(new Date().getFullYear());
