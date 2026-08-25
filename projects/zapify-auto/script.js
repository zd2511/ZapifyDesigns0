const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

const filters=document.querySelectorAll('.filter');
const parts=document.querySelectorAll('.part');
filters.forEach(filter=>{
 filter.addEventListener('click',()=>{
  filters.forEach(f=>f.classList.remove('active'));
  filter.classList.add('active');
  const cat=filter.dataset.filter;
  parts.forEach(part=>part.style.display=(cat==='all'||part.dataset.cat===cat)?'block':'none');
 });
});

document.querySelector('#partForm').addEventListener('submit',e=>{
 e.preventDefault();
 const car=document.querySelector('#car').value;
 const needed=document.querySelector('#needed').value;
 document.querySelector('#partStatus').textContent=`Demo enquiry received: ${needed} for ${car}. We'll check the correct part number and compatibility.`;
 e.target.reset();
});

document.querySelector('#serviceForm').addEventListener('submit',e=>{
 e.preventDefault();
 const name=document.querySelector('#name').value.trim();
 document.querySelector('#status').textContent=`Thanks ${name}! Your workshop enquiry has been received in this demo.`;
 e.target.reset();
});

document.querySelector('#year').textContent=new Date().getFullYear();

/* Parts cart */
const cartDrawer=document.querySelector('#cartDrawer'),cartItems=document.querySelector('#cartItems'),cartCount=document.querySelector('#cartCount'),cartTotal=document.querySelector('#cartTotal');
const cart=[];
const money=n=>'R'+n.toLocaleString('en-ZA',{maximumFractionDigits:0});
const prices={"Engine Air Filter":280,"Oil Filter":190,"Spark Plugs":420,"Brake Pads":850,"Brake Discs / Rotors":1250,"Shock Absorbers":1450,"Control Arms":980,"12V Car Battery":1850,"Alternator":2300,"Starter Motor":2100,"Thermostat":390,"Serpentine Belt":520,"Cabin Air Filter":260,"Fuel Filter":340,"Wheel Bearings":760};
document.querySelectorAll('.part').forEach(part=>{const name=part.querySelector('h3').textContent.trim();const btn=document.createElement('button');btn.className='add-part';btn.textContent=`Add to cart • ${money(prices[name]||0)}`;btn.onclick=()=>{const found=cart.find(x=>x.name===name);if(found)found.qty++;else cart.push({name,price:prices[name]||0,qty:1});renderCart();openCart();};part.appendChild(btn)});
function renderCart(){if(!cart.length){cartItems.innerHTML='<p class="empty-cart">Your cart is empty. Add parts from the workshop inventory.</p>'}else{cartItems.innerHTML=cart.map((x,i)=>`<div class="cart-row"><div><strong>${x.name}</strong><small>${money(x.price)} each</small><div class="cart-actions"><button data-i="${i}" data-act="minus">−</button><span>${x.qty}</span><button data-i="${i}" data-act="plus">+</button><button class="remove" data-i="${i}" data-act="remove">Remove</button></div></div><strong>${money(x.price*x.qty)}</strong></div>`).join('')}const qty=cart.reduce((a,x)=>a+x.qty,0),total=cart.reduce((a,x)=>a+x.price*x.qty,0);cartCount.textContent=qty;cartTotal.textContent=money(total)}
cartItems.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;if(b.dataset.act==='plus')cart[i].qty++;if(b.dataset.act==='minus'){cart[i].qty--;if(cart[i].qty<=0)cart.splice(i,1)}if(b.dataset.act==='remove')cart.splice(i,1);renderCart()});
function openCart(){cartDrawer.classList.add('open');cartDrawer.setAttribute('aria-hidden','false')}function closeCart(){cartDrawer.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true')}document.querySelector('#cartOpen').onclick=openCart;document.querySelector('#cartClose').onclick=closeCart;document.querySelector('#cartBackdrop').onclick=closeCart;
document.querySelector('#cartQuote').onclick=()=>{if(!cart.length){alert('Add at least one part to your cart first.');return}const summary=cart.map(x=>`${x.name} x${x.qty} — ${money(x.price*x.qty)}`).join('\n');document.querySelector('#needed').value='Parts quote request: '+cart.map(x=>`${x.name} x${x.qty}`).join(', ');document.querySelector('#partStatus').textContent='Cart prepared: '+summary.replace(/\n/g,' • ');closeCart();document.querySelector('.lookup').scrollIntoView({behavior:'smooth'})};renderCart();
