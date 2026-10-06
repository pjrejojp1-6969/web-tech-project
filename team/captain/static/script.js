const M={
"South Indian":"Masala dosa:90|Ghee roast dosa:110|Idli (3 pcs):60|Medu vada (2):55|Ghee pongal:80|Rava upma:60|Onion uttapam:85|Curd rice:70|Full meals:150|Filter coffee:40",
"Biryani":"Chicken dum biryani:260|Mutton biryani:340|Veg biryani:200|Egg biryani:220|Prawn biryani:320|Chicken 65:210|Mutton chukka:290|Raita:40|Mirchi ka salan:60|Double ka meetha:80",
"North Indian":"Paneer butter masala:240|Butter chicken:290|Dal makhani:190|Palak paneer:230|Butter naan (2):70|Garlic naan:60|Tandoori roti (2):40|Chicken tikka:270|Jeera rice:120|Gulab jamun (2):70",
"Chinese":"Veg hakka noodles:160|Chicken noodles:190|Chicken fried rice:190|Veg fried rice:150|Gobi manchurian:150|Chilli chicken:220|Veg spring rolls:130|Hot & sour soup:110|Schezwan paneer:210|Momos (8 pcs):140",
"Pizza":"Margherita:249|Farmhouse:329|Pepperoni:379|Paneer tikka pizza:349|Garlic bread:129|Cheesy dip:40|Pasta alfredo:229|Penne arrabbiata:219|Choco lava cake:99|Cold drink:60",
"Desserts":"Hot fudge brownie:140|Kulfi falooda:120|Ice cream sundae:160|Rasmalai:110|Gulab jamun:90|Gajar halwa:120|Cheesecake slice:180|Waffle with ice cream:170|Jalebi rabdi:100|Coconut pudding:130",
"Seafood":"Fish fry:280|Prawn masala:360|Fish curry meals:240|Calamari rings:300|Crab roast:420|Pomfret tawa fry:450|Prawn fried rice:290|Fish fingers:260|Squid masala:330|Fish biryani:310",
"Cafe":"Cold coffee:120|Cappuccino:110|Club sandwich:170|Veg puff:50|Blueberry muffin:90|Cheese omelette toast:110|Masala chai:40|Loaded nachos:160|French fries:99|Iced tea:100",
"Burgers":"Classic veg burger:119|Chicken zinger:179|Double cheese burger:199|Peri peri fries:109|Crispy chicken wrap:169|Paneer wrap:149|Onion rings:99|Chicken nuggets (6):149|Chocolate shake:149|Cola float:99",
"Street Food":"Pani puri:50|Pav bhaji:120|Vada pav (2):50|Bhel puri:60|Samosa chaat:70|Masala puri:60|Aloo tikki:70|Dahi puri:70|Kathi roll:110|Sugarcane juice:40",
"Healthy":"Quinoa salad bowl:240|Greek salad:210|Grilled chicken bowl:290|Avocado toast:220|Fruit bowl:150|Sprouts chaat:110|Oats porridge:130|Green smoothie:160|Hummus and pita:190|Cold-pressed juice:140",
"Mughlai":"Mutton seekh kebab:320|Chicken reshmi kebab:280|Mutton korma:350|Nihari:340|Chicken changezi:300|Rumali roti (2):60|Sheermal:70|Shahi tukda:110|Haleem:260|Firni:90"};
const MENUS=Object.fromEntries(Object.entries(M).map(([k,v])=>[k,v.split("|").map(x=>{const[n,p]=x.split(":");return[n,+p]})]));
const EM={"South Indian":"🥞","Biryani":"🍛","North Indian":"🍲","Chinese":"🍜","Pizza":"🍕","Desserts":"🍨","Seafood":"🦐","Cafe":"☕","Burgers":"🍔","Street Food":"🥟","Healthy":"🥗","Mughlai":"🍢"};
const COL=["#ffd9c9","#ffe9a8","#d4efd0","#d2e6ff","#f3d5ff","#ffd1dc"];
// [name, cuisine, rating, minutes, cost for two]
const DATA={
"Chennai":[["Murugan Mess","South Indian",4.4,28,300],["Buhari Biryani House","Biryani",4.3,35,500],["Marina Catch","Seafood",4.5,40,700],["Adyar Ananda Bhavan","South Indian",4.2,25,350],["Pizza Pier T. Nagar","Pizza",4.0,30,450],["Mylapore Filter Kaapi","Cafe",4.6,20,250]],
"Chengalpattu":[["Amma Unavagam","South Indian",4.3,25,200],["GST Road Biryani Point","Biryani",4.1,35,400],["Paalar Fish Corner","Seafood",4.4,40,500],["Hotel Saravana Grand","North Indian",4.0,30,450],["Lake View Cafe","Cafe",4.2,22,250],["Sweet Spot","Desserts",4.5,20,200]],
"Bengaluru":[["Koramangala Dosa Camp","South Indian",4.5,25,300],["Meghana Dum House","Biryani",4.6,35,600],["Indiranagar Brew Lab","Cafe",4.4,22,450],["Wok This Way","Chinese",4.1,32,500],["Napoli Slice","Pizza",4.3,30,550],["The Dessert Room","Desserts",4.5,24,350]],
"Mumbai":[["Juhu Chaat & Pav","North Indian",4.2,25,300],["Bandra Seafood Co.","Seafood",4.5,40,900],["Colaba Irani Cafe","Cafe",4.3,22,300],["Dragon Lane","Chinese",4.0,34,600],["Andheri Pizza Works","Pizza",4.2,30,500],["Kulfi Cart Dadar","Desserts",4.6,18,150]],
"Delhi":[["Karol Bagh Tandoor","North Indian",4.5,32,600],["Old Delhi Biryani Wala","Biryani",4.3,38,450],["Connaught Pizzeria","Pizza",4.2,30,700],["Lodhi Garden Cafe","Cafe",4.4,24,500],["Momo Mile","Chinese",4.1,28,300],["Chandni Chowk Mithai","Desserts",4.6,20,200]],
"Hyderabad":[["Paradise Dum Biryani","Biryani",4.5,35,600],["Charminar Irani Chai","Cafe",4.4,20,150],["Jubilee Hills Tandoor","North Indian",4.3,33,700],["Banjara Dosa House","South Indian",4.2,25,250],["Hitech Wok","Chinese",4.0,30,500],["Double Ka Meetha Co.","Desserts",4.5,22,200]],
"Kolkata":[["Park Street Kathi Rolls","North Indian",4.4,25,250],["Bhojohori Fish Thali","Seafood",4.6,38,500],["Arsalan Biryani Hub","Biryani",4.5,36,500],["College St. Coffee House","Cafe",4.5,22,200],["Tangra Chinese Kitchen","Chinese",4.3,34,550],["Mishti Ghar","Desserts",4.7,18,200]]};
const LOCS={Chennai:["T. Nagar","Adyar","Anna Nagar","Velachery","Nungambakkam","Mylapore","Porur","OMR"],Chengalpattu:["GST Road","Maraimalai Nagar","Paalar","Singaperumal Koil","Mahindra City","Kattankulathur","Guduvanchery","Potheri"],Bengaluru:["Koramangala","Indiranagar","HSR Layout","Jayanagar","Whitefield","Malleshwaram","BTM","Church Street"],Mumbai:["Bandra","Juhu","Andheri","Colaba","Powai","Dadar","Worli","Malad"],Delhi:["Connaught Place","Karol Bagh","Saket","Hauz Khas","Lajpat Nagar","Rajouri Garden","Dwarka","Chandni Chowk"],Hyderabad:["Banjara Hills","Jubilee Hills","Charminar","Gachibowli","Madhapur","Secunderabad","Kukatpally","Begumpet"],Kolkata:["Park Street","Salt Lake","Ballygunge","Howrah","New Town","Gariahat","Dum Dum","Esplanade"]};
const SUF={"South Indian":["Tiffin Centre","Dosa Corner","Meals Kitchen"],"Biryani":["Biryani House","Dum Biryani Co.","Handi Biryani"],"North Indian":["Tandoor Nights","Punjabi Dhaba","Curry Kitchen"],"Chinese":["Wok Express","Dragon Bowl","Noodle Bar"],"Pizza":["Pizza Works","Slice Station","Oven & Crust"],"Desserts":["Sweet Tooth","Ice Cream Lab","Mithai Ghar"],"Seafood":["Catch of the Day","Fish Market Kitchen","Coastal Tales"],"Cafe":["Coffee Roasters","Chai & Co.","Brew House"],"Burgers":["Burger Barn","Patty Point","Grill & Bun"],"Street Food":["Chaat Gali","Street Bites","Thela Express"],"Healthy":["Green Bowl","Fresh Fuel","Salad Story"],"Mughlai":["Kebab House","Mughlai Darbar","Nawabi Kitchen"]};
Object.keys(DATA).forEach((city,ci)=>Object.keys(SUF).forEach((c,ki)=>{
 const avg=MENUS[c].reduce((a,m)=>a+m[1],0)/MENUS[c].length;
 for(let n=0;n<3;n++){const s=ci*131+ki*17+n*7;
  DATA[city].push([LOCS[city][(ki*3+n+ci)%8]+" "+SUF[c][(n+ci)%3],c,+(3.8+((s*37)%12)/10).toFixed(1),20+(s*11)%26,Math.round((avg*2+((s*13)%5)*40)/50)*50])}}));
const BANKS=["State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank","Indian Bank"];
const PAYS=[["phonepe","📱 PhonePe"],["paytm","💙 Paytm"],["netbanking","🏦 Net banking"],["credit","💳 Credit card"],["debit","💳 Debit card"],["cod","💵 Cash on delivery"]];
let city="Chennai",cuisine="All",cart={},rest=null;
try{city=localStorage.getItem("ff_city")||city}catch(e){}
if(!DATA[city])city="Chennai";
const $=id=>document.getElementById(id);
const money=n=>"₹"+n;
const citySel=$("city");
citySel.innerHTML=Object.keys(DATA).map(c=>`<option>${c}</option>`).join("");citySel.value=city;
citySel.onchange=()=>{
 if(Object.keys(cart).length&&!confirm("Changing location will clear your cart. Continue?")){citySel.value=city;return}
 city=citySel.value;cart={};cuisine="All";try{localStorage.setItem("ff_city",city)}catch(e){}render()};
$("q").oninput=render;
function qtyTotal(){return Object.values(cart).reduce((a,i)=>a+i.q,0)}
function render(){
 $("sub").textContent=`${DATA[city].length} restaurants delivering in ${city}`;
 const cs=["All",...new Set(DATA[city].map(r=>r[1]))];
 $("chips").innerHTML=cs.map(c=>`<button class="chip ${c===cuisine?"on":""}" data-c="${c}">${c}</button>`).join("");
 $("chips").querySelectorAll(".chip").forEach(b=>b.onclick=()=>{cuisine=b.dataset.c;render()});
 const q=$("q").value.toLowerCase();
 const list=DATA[city].map((r,i)=>({r,i})).filter(({r})=>(cuisine==="All"||r[1]===cuisine)&&(!q||r[0].toLowerCase().includes(q)||r[1].toLowerCase().includes(q)||MENUS[r[1]].some(m=>m[0].toLowerCase().includes(q))));
 $("grid").innerHTML=list.length?list.map(({r,i})=>`<button class="r" data-i="${i}"><div class="pic" style="background:${COL[i%6]}">${EM[r[1]]}</div><div class="b"><h3>${r[0]}</h3><div class="meta"><span>${r[1]}</span><span class="rate">★ ${r[2]}</span></div><div class="meta"><span>${r[3]} mins</span><span>${money(r[4])} for two</span></div></div></button>`).join(""):`<div class="empty">No matches in ${city}. Try another cuisine or clear the search.</div>`;
 $("grid").querySelectorAll(".r").forEach(b=>b.onclick=()=>openMenu(+b.dataset.i));
 $("cc").textContent=qtyTotal();
}
function show(html){$("panel").innerHTML=html;$("ov").classList.add("show")}
function close(){$("ov").classList.remove("show")}
$("ov").onclick=e=>{if(e.target.id==="ov")close()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
$("cartOpen").onclick=openCart;
function openMenu(i){
 rest=DATA[city][i];const r=rest;
 show(`<button class="x" id="cl">Close</button><h2>${r[0]}</h2><div class="meta"><span>${r[1]} · ${city}</span><span class="rate">★ ${r[2]}</span></div>`+
 MENUS[r[1]].map((m,k)=>{const key=r[0]+"|"+m[0];const q=cart[key]?.q||0;
 return `<div class="item"><div>${m[0]}<br><small>${money(m[1]+(i%3)*10)}</small></div>${q?`<div class="qty"><button data-k="${k}" data-d="-1" aria-label="Remove one">−</button>${q}<button data-k="${k}" data-d="1" aria-label="Add one">+</button></div>`:`<button class="add" data-k="${k}" data-d="1">Add</button>`}</div>`}).join("")+
 `<button class="go" id="vc">View cart (${qtyTotal()})</button>`);
 $("cl").onclick=close;$("vc").onclick=openCart;
 $("panel").querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{
  const m=MENUS[r[1]][+b.dataset.k],key=r[0]+"|"+m[0],price=m[1]+(i%3)*10;
  const other=Object.values(cart).find(c=>c.rest!==r[0]);
  if(other&&!confirm("Your cart has items from another restaurant. Start a new cart?"))return;
  if(other)cart={};
  const it=cart[key]||(cart[key]={name:m[0],price,q:0,rest:r[0]});
  it.q+=+b.dataset.d;if(it.q<=0)delete cart[key];
  openMenu(i);render()});
}
function totals(){const sub=Object.values(cart).reduce((a,i)=>a+i.price*i.q,0);const fee=sub?35:0,tax=Math.round(sub*.05);return{sub,fee,tax,total:sub+fee+tax}}
function openCart(){
 const items=Object.entries(cart);
 if(!items.length){show(`<button class="x" id="cl">Close</button><h2>Your cart</h2><p class="empty">Nothing here yet. Pick a restaurant and add a dish.</p>`);$("cl").onclick=close;return}
 const t=totals();
 show(`<button class="x" id="cl">Close</button><h2>Your cart</h2><div class="meta"><span>${items[0][1].rest}</span><span>${city}</span></div>`+
 items.map(([k,i])=>`<div class="item"><div>${i.name}<br><small>${money(i.price)}</small></div><div class="qty"><button data-k="${k}" data-d="-1" aria-label="Remove one">−</button>${i.q}<button data-k="${k}" data-d="1" aria-label="Add one">+</button></div></div>`).join("")+
 `<div class="row"><span>Subtotal</span><span>${money(t.sub)}</span></div><div class="row"><span>Delivery fee</span><span>${money(t.fee)}</span></div><div class="row"><span>Taxes (5%)</span><span>${money(t.tax)}</span></div><div class="row tot"><span>Total</span><span>${money(t.total)}</span></div>
 <h3>Delivery details</h3><div class="fld"><input id="nm" placeholder="Full name" autocomplete="name"><input id="ph" placeholder="Phone number" inputmode="numeric" maxlength="10" autocomplete="tel"><textarea id="ad" rows="2" placeholder="Delivery address in ${city}"></textarea></div>
 <h3>Payment method</h3>`+PAYS.map(([v,l],n)=>`<label class="pay"><input type="radio" name="pm" value="${v}" ${n===5?"checked":""}> ${l}</label>`).join("")+
 `<div class="fld" id="pf"></div><div class="err" id="er" role="alert"></div><button class="go" id="po">Place order · ${money(t.total)}</button>`);
 $("cl").onclick=close;
 $("panel").querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{const it=cart[b.dataset.k];it.q+=+b.dataset.d;if(it.q<=0)delete cart[b.dataset.k];openCart();render()});
 const pf=()=>{const v=document.querySelector('input[name=pm]:checked').value;
  $("pf").innerHTML=v==="phonepe"||v==="paytm"?`<input id="upi" placeholder="UPI ID (e.g. name@ybl)">`:
  v==="netbanking"?`<select id="bk">${BANKS.map(b=>`<option>${b}</option>`).join("")}</select>`:
  v==="credit"||v==="debit"?`<input id="cn" placeholder="Card number" inputmode="numeric" maxlength="19"><input id="cx" placeholder="Expiry MM/YY" maxlength="5"><input id="cv" placeholder="CVV" inputmode="numeric" maxlength="3" type="password">`:
  `<small>Pay ${money(t.total)} in cash when your order arrives.</small>`};
 document.querySelectorAll('input[name=pm]').forEach(r=>r.onchange=pf);pf();
 $("po").onclick=()=>{
  const v=document.querySelector('input[name=pm]:checked').value,er=m=>{$("er").textContent=m};
  if(!$("nm").value.trim())return er("Enter your name.");
  if(!/^\d{10}$/.test($("ph").value))return er("Enter a 10-digit phone number.");
  if($("ad").value.trim().length<8)return er("Enter a full delivery address.");
  if((v==="phonepe"||v==="paytm")&&!/^[\w.-]+@[\w]+$/.test($("upi").value))return er("Enter a valid UPI ID.");
  if((v==="credit"||v==="debit")&&(!/^\d{12,19}$/.test($("cn").value.replace(/\s/g,""))||!/^\d{2}\/\d{2}$/.test($("cx").value)||!/^\d{3}$/.test($("cv").value)))return er("Check your card number, expiry and CVV.");
  const label=PAYS.find(p=>p[0]===v)[1].replace(/^\S+\s/,"");
  const id="FF"+Math.floor(100000+Math.random()*900000);
  const from=items[0][1].rest,rr=DATA[city].find(x=>x[0]===from);
  order={id,from,city,total:t.total,label,mins:rr?rr[3]:30,start:Date.now(),p:genPartner(),addr:$("ad").value.trim(),done:false};
  cart={};render();openTrack();tick()};
}

let order=null,trackOpen=false;
const NAMES=["Ravi Kumar","Suresh M","Arjun Singh","Mohammed Imran","Karthik R","Deepak Yadav","Vignesh S","Sanjay Patil","Ajay Das","Imran Sheikh","Priya Nair","Anita Devi","Rahul Verma","Manoj Pillai"];
const VEH=["Honda Activa","TVS Jupiter","Hero Splendor","Bajaj Pulsar","Suzuki Access","TVS Apache"];
const PLATE={Chennai:"TN 09",Chengalpattu:"TN 19",Bengaluru:"KA 01",Mumbai:"MH 02",Delhi:"DL 3S",Hyderabad:"TS 09",Kolkata:"WB 02"};
const STG=[["Order confirmed",0],["Preparing your food",.05],["Partner picked up your order",.4],["On the way to you",.45],["Delivered",1]];
const TT=["Order confirmed","Preparing your order","Partner picked up your order","Your order is on the way","Order delivered"];
const rnd=n=>Math.floor(Math.random()*n);
const clk=d=>d.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});
function genPartner(){const L="ABCDEFGHJKLMNPRSTUVWXYZ";
 return{name:NAMES[rnd(NAMES.length)],phone:"9"+String(rnd(1e9)).padStart(9,"0"),veh:VEH[rnd(VEH.length)],plate:`${PLATE[city]} ${L[rnd(23)]}${L[rnd(23)]} ${1000+rnd(9000)}`,rating:(4.3+rnd(7)/10).toFixed(1),trips:800+rnd(4200),otp:1000+rnd(9000),face:["🧑","👨","👩","🧔"][rnd(4)]}}
function openTrack(){
 if(!order)return;const o=order,p=o.p,D="M30 125 C90 125 70 45 150 65 S235 125 270 40";trackOpen=true;
 show(`<button class="x" id="cl">Close</button><h2 id="tt"></h2><div class="meta"><span id="ts"></span><span>Order ${o.id}</span></div>
 <svg class="map" viewBox="0 0 300 160" role="img" aria-label="Live delivery route"><path id="rt" d="${D}" fill="none" stroke="var(--line)" stroke-width="6" stroke-linecap="round"/><path id="rp" d="${D}" fill="none" stroke="var(--ac)" stroke-width="6" stroke-linecap="round" stroke-dasharray="0 999"/><text x="30" y="125" font-size="22" text-anchor="middle" dominant-baseline="central">🍴</text><text x="270" y="40" font-size="22" text-anchor="middle" dominant-baseline="central">🏠</text><text id="rd" font-size="24" text-anchor="middle" dominant-baseline="central" x="30" y="105">🛵</text></svg>
 <ul class="stg" id="sg"></ul>
 <h3>Your delivery partner</h3>
 <div class="pcard"><div class="av">${p.face}</div><div><b>${p.name}</b><br><small>★ ${p.rating} · ${p.trips.toLocaleString()} deliveries<br>${p.veh} · ${p.plate}</small></div><a class="add" href="tel:+91${p.phone}" aria-label="Call ${p.name}">📞 Call</a></div>
 <small>+91 ${p.phone.slice(0,5)} ${p.phone.slice(5)}</small>
 <div class="otp" id="otp">Share OTP <b>${p.otp}</b> with your partner when they arrive.</div>
 <div class="row"><span>${o.from}</span><span>${money(o.total)} · ${o.label}</span></div><small>Delivering to: ${o.addr}</small>
 <p><small>Demo speed: 1 second = 1 minute of delivery time.</small></p>
 <button class="go" id="dn" hidden>Done</button>`);
 $("cl").onclick=()=>{trackOpen=false;close()};
 $("dn").onclick=()=>{order=null;trackOpen=false;close();tick()};
 paintTrack();
}
function paintTrack(){
 if(!trackOpen||!order||!$("tt"))return;const o=order,el=Math.min((Date.now()-o.start)/1000,o.mins),f=el/o.mins;
 let si=0;STG.forEach((s,i)=>{if(f>=s[1])si=i});if(o.done)si=4;
 const left=Math.max(0,Math.ceil(o.mins-el));
 $("tt").textContent=TT[si];
 $("ts").textContent=o.done?`Delivered at ${clk(o.doneAt)}`:`Arriving in ${left} min · by ${clk(new Date(o.start+o.mins*60000))}`;
 $("sg").innerHTML=STG.map((s,i)=>`<li class="${o.done||i<si?"d":i===si?"c":""}">${s[0]}</li>`).join("");
 const rt=$("rt"),len=rt.getTotalLength(),pr=o.done?1:Math.max(0,Math.min(1,(f-.4)/.6)),pt=rt.getPointAtLength(pr*len);
 $("rp").setAttribute("stroke-dasharray",`${pr*len} ${len+5}`);
 $("rd").setAttribute("x",pt.x);$("rd").setAttribute("y",pt.y-14);
 $("otp").hidden=o.done;$("dn").hidden=!o.done;
 if(o.done)$("ts").textContent+=" · Enjoy your meal! 🎉";
}
function tick(){
 if(order&&!order.done&&Date.now()-order.start>=order.mins*1000){order.done=true;order.doneAt=new Date(order.start+order.mins*60000)}
 $("trk").hidden=!order;
 if(order)$("trk").textContent=order.done?"✅ Order delivered":"📍 Track order";
 paintTrack();
}
$("trk").onclick=openTrack;setInterval(tick,500);
render();
