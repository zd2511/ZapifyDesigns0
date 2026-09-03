const WA='27743899657';
function openWhatsApp(form){
  const name=form.querySelector('[name=name]')?.value.trim()||'';
  const phone=form.querySelector('[name=phone]')?.value.trim()||'';
  const service=form.querySelector('[name=service]')?.value||'';
  const date=form.querySelector('[name=date]')?.value||'';
  const time=form.querySelector('[name=time]')?.value||'';
  const message=form.querySelector('[name=message]')?.value.trim()||'None';
  const text=`Hi Zapify Designs! I'd like to book an appointment for the Zapify Salon demo.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred date: ${date}\nPreferred time: ${time}\nMessage: ${message}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`,'_blank');
}
const f=document.getElementById('bookingForm');
if(f){f.addEventListener('submit',e=>{e.preventDefault();openWhatsApp(f)})}
