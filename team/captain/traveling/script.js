const D=[
 {k:'maldives',n:'Maldives',e:'🏝️',t:'Clear water, quiet reefs',c:'beach',p:45000,pk:'Maldives Escape',d:'5 Days / 4 Nights',pp:79999,g:['#2bb3c0','#0b6e8a']},
 {k:'paris',n:'Paris',e:'🗼',t:'Cafés, art and city lights',c:'city',p:90000,pk:'Paris Romance Tour',d:'6 Days / 5 Nights',pp:129999,g:['#7b5ea7','#d76d77']},
 {k:'switzerland',n:'Switzerland',e:'🏔️',t:'Alpine lakes and train rides',c:'mountain',p:120000,pk:'Swiss Alpine Adventure',d:'7 Days / 6 Nights',pp:169999,g:['#5b8def','#9fd3c7']},
 {k:'dubai',n:'Dubai',e:'🏙️',t:'Skyline, desert and shopping',c:'city',p:70000,pk:'Dubai Luxury Getaway',d:'5 Days / 4 Nights',pp:69999,g:['#f2a541','#c8553d']},
 {k:'tokyo',n:'Tokyo',e:'🌸',t:'Old shrines, new neon',c:'city',p:110000,pk:'Tokyo Discovery',d:'6 Days / 5 Nights',pp:149999,g:['#f28ab2','#6a4c93']},
 {k:'goa',n:'Goa',e:'🏖️',t:'Sun, sand and sea',c:'beach',p:25000,pk:'Goa Beach Vacation',d:'4 Days / 3 Nights',pp:24999,g:['#ffb84d','#2a9d8f']},
 {k:'kashmir',n:'Kashmir',e:'❄️',t:'Valleys, lakes and snow',c:'mountain',p:35000,pk:'Kashmir Paradise Tour',d:'6 Days / 5 Nights',pp:39999,g:['#a8dadc','#457b9d']},
 {k:'kerala',n:'Kerala',e:'🌿',t:'Backwaters and tea hills',c:'beach',p:30000,pk:'Kerala Backwater Retreat',d:'5 Days / 4 Nights',pp:34999,g:['#6abf69','#1b5e4b']},
 {k:'bali',n:'Bali',e:'🌺',t:'Rice terraces and temples',c:'beach',p:65000,pk:'Bali Island Escape',d:'6 Days / 5 Nights',pp:84999,g:['#f4a261','#2a9d8f']},
 {k:'thailand',n:'Thailand',e:'🌴',t:'Beaches, temples, street food',c:'beach',p:55000,pk:'Thailand Adventure',d:'5 Days / 4 Nights',pp:49999,g:['#e9c46a','#e76f51']},
 {k:'7 wonders',n:'7 Wonders',e:'🌍',t:'Great Wall, Petra, Taj Mahal and more',c:'wonder',p:180000,pk:'Seven Wonders Voyage',d:'15 Days / 14 Nights',pp:349999,g:['#264653','#e9c46a']}
];
const G=['Packing|Comfortable clothes, a power bank, sunscreen, a basic first-aid kit and a reusable bottle.','Documents|Passport and visa ready, plus printed and digital copies of tickets and bookings.','Money|Carry some local currency, use secure payments and avoid large amounts of cash.','Safety|Respect local laws, guard your belongings and share your itinerary with family.','Weather|Check the forecast before packing and carry rain gear when in doubt.','Food and health|Drink safe water, eat at trusted places and keep your medicines with you.','Customs|Learn a few local phrases and dress for the places you visit.','Before you leave|Confirm bookings, charge devices and reach the airport early.'];
const Q=['How do I book a trip?|Use the Book page: pick a destination, dates and travelers to get an instant estimate.','Are flights included?|Some packages include flights and some do not. Each package lists what is covered.','Can I cancel or change a booking?|Yes, subject to our cancellation policy. Contact us as early as you can.','Which payment methods work?|UPI, debit and credit cards, and net banking.','Can you customize a trip?|Yes. Tell us your budget, destination and style and we will build it.','Is travel insurance included?|It is optional and bundled with selected premium packages.','What documents do I need abroad?|A valid passport and, for many destinations, a visa.','Do you offer group discounts?|Yes, for families, student groups and corporate bookings.'];
const pages=[['home','Home'],['about','About'],['places','Places'],['packages','Packages'],['book','Book'],['gallery','Gallery'],['guide','Guide'],['faq','FAQ'],['contact','Contact']];
const $=id=>document.getElementById(id), inr=n=>'₹'+n.toLocaleString('en-IN');
$('nav').innerHTML=pages.map(p=>`<a href="#${p[0]}" data-p="${p[0]}">${p[1]}</a>`).join('');
const pic=d=>`<div class="pic" style="background:linear-gradient(135deg,${d.g[0]},${d.g[1]})" aria-hidden="true">${d.e}</div>`;
$('placeGrid').innerHTML=D.map(d=>`<article class="card">${pic(d)}<div class="pad"><h3>${d.n}</h3><p>${d.t}</p><div class="price">from ${inr(d.p)}</div><br><a class="btn" href="#book" data-dest="${d.k}">Book</a></div></article>`).join('');
$('pkgGrid').innerHTML=D.map(d=>`<article class="card">${pic(d)}<div class="pad"><h3>${d.pk}</h3><p>${d.d}</p><div class="price">${inr(d.pp)}</div><br><a class="btn" href="#book" data-dest="${d.k}">Book</a></div></article>`).join('');
$('destination').innerHTML+=D.map(d=>`<option value="${d.k}">${d.n}</option>`).join('');
$('guideGrid').innerHTML=G.map(g=>{const[a,b]=g.split('|');return `<div class="card"><div class="pad"><h3>${a}</h3><p>${b}</p></div></div>`}).join('');
$('faqList').innerHTML=Q.map(q=>{const[a,b]=q.split('|');return `<details><summary>${a}</summary><p>${b}</p></details>`}).join('');
const cats=[['all','All'],['beach','Beaches'],['mountain','Mountains'],['city','Cities'],['wonder','Wonders']];
$('filters').innerHTML=cats.map((c,i)=>`<button data-c="${c[0]}" class="${i?'':'on'}">${c[1]}</button>`).join('');
$('galGrid').innerHTML=D.map((d,i)=>`<div class="card tile" tabindex="0" data-i="${i}" data-c="${d.c}">${pic(d)}<div class="pad"><h3>${d.n}</h3></div></div>`).join('');
$('filters').onclick=e=>{const c=e.target.dataset.c;if(!c)return;[...$('filters').children].forEach(b=>b.classList.toggle('on',b===e.target));document.querySelectorAll('.tile').forEach(t=>t.style.display=(c==='all'||t.dataset.c===c)?'':'none')};
function show(html){$('box').innerHTML=html+'<br><button class="btn" id="x">Close</button>';$('modal').classList.add('on');$('x').focus();$('x').onclick=()=>$('modal').classList.remove('on')}
$('modal').onclick=e=>{if(e.target.id==='modal')$('modal').classList.remove('on')};
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('modal').classList.remove('on')});
function openTile(t){const d=D[t.dataset.i];show(`<h2 id="mt">${d.n}</h2>${pic(d)}<p>${d.t}.</p><p>Package: ${d.pk}, ${d.d}, ${inr(d.pp)}</p>`)}
$('galGrid').onclick=e=>{const t=e.target.closest('.tile');if(t)openTile(t)};
$('galGrid').onkeydown=e=>{if(e.key==='Enter'){const t=e.target.closest('.tile');if(t)openTile(t)}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-dest]');if(b)$('destination').value=b.dataset.dest});
function route(){const h=(location.hash||'#home').slice(1);const id=pages.some(p=>p[0]===h)?h:'home';document.querySelectorAll('.page').forEach(s=>s.classList.toggle('on',s.id===id));document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.p===id));scrollTo(0,0)}
addEventListener('hashchange',route);route();
const dep=$('departure'),ret=$('ret');dep.min=new Date().toISOString().split('T')[0];
dep.onchange=()=>{ret.min=dep.value;if(ret.value&&ret.value<dep.value)ret.value=''};
$('bookingForm').onsubmit=e=>{
 e.preventDefault();
 const v=id=>$(id).value.trim(),err=m=>{$('err').textContent=m};
 const name=v('fullname'),phone=v('phone'),email=v('email'),dest=$('destination').value,tr=$('travelers').value;
 if(!name||!phone||!email||!dest||!dep.value)return err('Please fill all required fields.');
 if(!/^\d{10}$/.test(phone))return err('Enter a valid 10-digit phone number.');
 if(!/^\S+@\S+\.\S+$/.test(email))return err('Enter a valid email address.');
 if(ret.value&&ret.value<dep.value)return err('Return date cannot be before departure date.');
 if(!$('agree').checked)return err('Please accept the Terms & Conditions.');
 err('');
 const d=D.find(x=>x.k===dest),n=tr==='10+'?10:tr==='6-10'?6:+tr;
 const days=ret.value?Math.ceil((new Date(ret.value)-new Date(dep.value))/864e5)+' days':'Not selected';
 const id='TW'+Math.floor(Math.random()*90000+10000);
 const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 show(`<h2 id="mt">Booking received</h2><p><b>Booking ID:</b> ${id}</p><hr><p><b>Name:</b> ${esc(name)}</p><p><b>Phone:</b> ${esc(phone)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Destination:</b> ${d.n}</p><p><b>Travelers:</b> ${tr}</p><p><b>Departure:</b> ${dep.value}</p><p><b>Return:</b> ${ret.value||'Not selected'}</p><p><b>Duration:</b> ${days}</p><p><b>Estimated cost:</b> ${inr(d.p*n)}</p><p><b>Requests:</b> ${esc(v('request'))||'None'}</p><p class="ok"><b>Thank you for choosing Tidewander.</b> Our team will contact you shortly.</p>`);
 e.target.reset();ret.min='';
};
$('theme').onclick=()=>{const r=document.documentElement,dark=getComputedStyle(r).getPropertyValue('--bg').trim()==='#08242c';r.dataset.theme=dark?'light':'dark';$('theme').textContent=dark?'Dark mode':'Light mode'};
