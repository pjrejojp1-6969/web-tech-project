const LOC={"Andaman & Nicobar":"Port Blair,Havelock,Diglipur","Andhra Pradesh":"Visakhapatnam,Vijayawada,Guntur,Tirupati,Nellore,Kurnool","Arunachal Pradesh":"Itanagar,Naharlagun,Tawang,Pasighat,Ziro","Assam":"Guwahati,Dibrugarh,Silchar,Jorhat,Tezpur","Bihar":"Patna,Gaya,Bhagalpur,Muzaffarpur,Darbhanga","Chandigarh":"Sector 17,Sector 22,Sector 35,Manimajra","Chhattisgarh":"Raipur,Bhilai,Bilaspur,Korba,Durg","Dadra & Nagar Haveli and Daman & Diu":"Silvassa,Daman,Diu","Delhi":"Connaught Place,Dwarka,Rohini,Saket,Lajpat Nagar,Karol Bagh","Goa":"Panaji,Margao,Vasco da Gama,Mapusa,Ponda","Gujarat":"Ahmedabad,Surat,Vadodara,Rajkot,Gandhinagar,Bhavnagar","Haryana":"Gurugram,Faridabad,Panipat,Ambala,Hisar","Himachal Pradesh":"Shimla,Manali,Dharamshala,Solan,Mandi","Jammu & Kashmir":"Srinagar,Jammu,Anantnag,Baramulla","Jharkhand":"Ranchi,Jamshedpur,Dhanbad,Bokaro,Hazaribagh","Karnataka":"Bengaluru,Koramangala,Whitefield,Mysuru,Mangaluru,Hubballi,Belagavi","Kerala":"Thiruvananthapuram,Kochi,Kozhikode,Thrissur,Kannur,Kollam","Ladakh":"Leh,Kargil","Lakshadweep":"Kavaratti,Agatti,Minicoy","Madhya Pradesh":"Bhopal,Indore,Gwalior,Jabalpur,Ujjain","Maharashtra":"Mumbai,Pune,Nagpur,Nashik,Thane,Navi Mumbai,Aurangabad","Manipur":"Imphal,Thoubal,Bishnupur,Churachandpur","Meghalaya":"Shillong,Tura,Jowai,Nongpoh","Mizoram":"Aizawl,Lunglei,Champhai,Serchhip","Nagaland":"Kohima,Dimapur,Mokokchung,Tuensang","Odisha":"Bhubaneswar,Cuttack,Rourkela,Puri,Sambalpur","Puducherry":"Puducherry,Karaikal,Mahe,Yanam","Punjab":"Ludhiana,Amritsar,Jalandhar,Patiala,Mohali","Rajasthan":"Jaipur,Jodhpur,Udaipur,Kota,Ajmer,Bikaner","Sikkim":"Gangtok,Namchi,Gyalshing,Mangan","Tamil Nadu":"Chengalpattu,Tambaram,Chromepet,Guindy,Adyar,Velachery,T Nagar,Anna Nagar,Porur,Maraimalai Nagar,Madurai,Coimbatore,Tiruchirappalli,Salem,Tiruppur,Vellore,Erode,Tirunelveli","Telangana":"Hyderabad,Secunderabad,Gachibowli,Warangal,Nizamabad,Karimnagar","Tripura":"Agartala,Udaipur,Dharmanagar,Kailashahar","Uttar Pradesh":"Lucknow,Noida,Ghaziabad,Kanpur,Varanasi,Agra,Prayagraj","Uttarakhand":"Dehradun,Haridwar,Rishikesh,Haldwani,Nainital","West Bengal":"Kolkata,Salt Lake,Howrah,Siliguri,Durgapur,Asansol"};
const D=[
["Fresh Vegetables","🥬","#e3effd","Tomato|500 g|24|32|🍅;Onion|1 kg|39|52|🧅;Potato|1 kg|35|45|🥔;Carrot Ooty|500 g|38|50|🥕;Green Chilli|100 g|12|15|🌶️;Cucumber|500 g|28|35|🥒;Brinjal|500 g|30|38|🍆;Capsicum|250 g|32|40|🫑;Broccoli|1 pc|59|75|🥦;Sweet Corn|2 pcs|36|45|🌽;Garlic|100 g|29|38|🧄;Spinach|1 bunch|18|22|🥬"],
["Fresh Fruits","🍎","#fde8ea","Banana Robusta|6 pcs|42|55|🍌;Apple Shimla|4 pcs|129|160|🍎;Orange|1 kg|99|125|🍊;Grapes Black|500 g|89|110|🍇;Mango Alphonso|1 kg|189|240|🥭;Watermelon|1 pc|79|99|🍉;Pineapple|1 pc|59|75|🍍;Strawberry|200 g|89|120|🍓;Kiwi|3 pcs|99|129|🥝;Lemon|6 pcs|24|30|🍋;Muskmelon|1 pc|55|70|🍈"],
["Dairy, Bread & Eggs","🥛","#e8f1ff","Toned Milk|500 ml|29|29|🥛;Farm Eggs|6 pcs|54|66|🥚;Brown Bread|400 g|48|55|🍞;Butter|100 g|62|62|🧈;Fresh Paneer|200 g|89|110|🧀;Curd|400 g|35|40|🥣;Cheese Slices|200 g|125|145|🧀;Greek Yogurt|400 g|79|95|🍦;Cow Ghee|500 ml|325|370|🫙"],
["Snacks & Munchies","🍿","#fff3d6","Potato Chips|52 g|20|20|🍟;Salted Popcorn|90 g|45|60|🍿;Choco Cookies|120 g|35|45|🍪;Dark Chocolate|80 g|150|190|🍫;Instant Noodles|4 pack|56|68|🍜;Roasted Peanuts|200 g|48|60|🥜;Namkeen Mixture|200 g|55|65|🥨;Marie Biscuits|250 g|30|35|🍘;Nachos|150 g|85|99|🌮;Gummy Candy|100 g|40|50|🍬;Ice Cream Tub|500 ml|189|230|🍨"],
["Cold Drinks & Juices","🥤","#dff6f3","Cola|750 ml|40|45|🥤;Orange Juice|1 L|110|130|🧃;Tender Coconut|1 pc|49|60|🥥;Sparkling Water|500 ml|35|40|💧;Peach Iced Tea|250 ml|30|35|🧋;Energy Drink|250 ml|125|125|⚡;Lemon Soda|600 ml|38|42|🍋;Mango Drink|600 ml|42|48|🥭;Cold Coffee|200 ml|55|65|☕;Buttermilk|200 ml|15|18|🍶"],
["Atta, Rice & Staples","🌾","#f4ecd9","Wheat Atta|5 kg|245|290|🌾;Sona Masoori Rice|5 kg|399|460|🍚;Toor Dal|1 kg|168|195|🫘;Moong Dal|1 kg|142|165|🫘;Sunflower Oil|1 L|139|165|🌻;Salt|1 kg|28|32|🧂;Sugar|1 kg|49|56|🍬;Tea Powder|250 g|120|140|🍵;Coffee Powder|100 g|210|245|☕;Turmeric Powder|100 g|38|45|🟡;Red Chilli Powder|100 g|55|65|🌶️;Poha|500 g|42|50|🍚"],
["Toys & Games","🧸","#ece6fb","Building Blocks|100 pcs|349|499|🧱;Teddy Bear|30 cm|299|450|🧸;Remote Control Car|1 pc|599|899|🏎️;Jigsaw Puzzle|100 pcs|199|280|🧩;Bubble Gun|1 pc|149|220|🫧;Football Size 5|1 pc|449|600|⚽;Fashion Doll|1 pc|399|550|🪆;Ludo Board Game|1 pc|179|250|🎲;Kids Cricket Bat|1 pc|299|399|🏏;Kite Pack|5 pcs|99|140|🪁;Toy Train Set|1 set|549|799|🚂;Art Colour Kit|1 kit|249|330|🎨"]
];
const P=[];D.forEach((c,ci)=>c[3].split(";").forEach((s,pi)=>{const a=s.split("|");P.push({id:ci+"-"+pi,cat:c[0],bg:c[2],name:a[0],qty:a[1],price:+a[2],mrp:+a[3],emoji:a[4]})}));
const RIDERS=[["Ravi Kumar","TN 07 BK 4821","+91 98765 43210"],["Arun S","TN 11 CD 7312","+91 98765 43211"],["Mohammed Imran","TN 22 EF 1905","+91 98765 43212"],["Suresh P","TN 09 GH 6648","+91 98765 43213"]];
const st={cat:"All",q:"",cart:{},state:"Tamil Nadu",area:"Chengalpattu",wallet:0,useW:true,cust:{name:"",phone:"",house:"",addr:""}};
const $=s=>document.getElementById(s);
const byId=id=>P.find(p=>p.id===id);
const where=()=>st.area+", "+st.state;

function drawCats(){
  const all=[["All","🛒"],...D.map(c=>[c[0],c[1]])];
  $("cats").innerHTML=all.map(([n,e])=>`<button class="cat ${st.cat===n?"on":""}" data-c="${n}"><i>${e}</i>${n.replace(" & "," &amp; ")}</button>`).join("");
  $("cats").querySelectorAll("button").forEach(b=>b.onclick=()=>{st.cat=b.dataset.c;drawCats();drawProducts()});
}
function ctl(p){const n=st.cart[p.id]||0;return n?`<div class="qty"><button data-a="-" data-i="${p.id}" aria-label="Remove one">−</button><span>${n}</span><button data-a="+" data-i="${p.id}" aria-label="Add one">+</button></div>`:`<button class="add" data-a="+" data-i="${p.id}">ADD</button>`}
function card(p){const off=Math.round((1-p.price/p.mrp)*100);
  return`<div class="p"><div class="pic" style="background:${p.bg}">${p.emoji}${off?`<span class="off">${off}% OFF</span>`:""}</div><span class="eta">⚡ 10 MINS</span><div class="pn">${p.name}</div><div class="pq">${p.qty}</div><div class="pf"><div class="pr"><b>₹${p.price}</b>${off?`<s>₹${p.mrp}</s>`:""}</div>${ctl(p)}</div></div>`}
function bind(root){root.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>change(b.dataset.i,b.dataset.a==="+"?1:-1))}
function drawProducts(){
  const q=st.q.trim().toLowerCase();
  const out=D.map(c=>{
    if(st.cat!=="All"&&st.cat!==c[0])return"";
    const items=P.filter(p=>p.cat===c[0]&&(!q||(p.name+" "+p.cat).toLowerCase().includes(q)));
    return items.length?`<h2>${c[0].replace(" & "," &amp; ")}</h2><div class="grid">${items.map(card).join("")}</div>`:""}).join("");
  $("sections").innerHTML=out||'<div class="empty">Nothing found for that search. Try another word or pick a different category.</div>';
  bind($("sections"));
}
function totals(){let c=0,t=0,m=0;for(const id in st.cart){const p=byId(id);c+=st.cart[id];t+=p.price*st.cart[id];m+=p.mrp*st.cart[id]}return{c,t,m}}
function change(id,d){
  const n=(st.cart[id]||0)+d;
  if(n<=0)delete st.cart[id];else st.cart[id]=n;
  if(d>0&&n===1)toast("Added to cart");
  summary();drawProducts();drawCart();
}
function summary(){const{c,t}=totals();$("cc").textContent=c;$("ct").textContent=t}
function drawCart(){
  const ids=Object.keys(st.cart),{t,m}=totals();
  $("cartFoot").hidden=!ids.length;
  if(!ids.length){$("cartBody").innerHTML='<div class="empty" style="padding:70px 20px">Your cart is empty. Add items and get them in 10 minutes.</div>';return}
  const left=Math.max(0,199-t),fee=left?25:0,hand=5,pay=t+fee+hand,uw=st.useW?Math.min(st.wallet,pay):0;
  $("cartBody").innerHTML=`<div class="del">⚡ Delivery in 10 minutes to ${where()} <a href="#" id="chg" style="color:var(--bl)">Change</a><div class="bar"><div style="width:${Math.min(100,t/199*100)}%"></div></div><small>${left?`Add ₹${left} more for free delivery`:"You unlocked free delivery!"}</small></div>`+
  ids.map(id=>{const p=byId(id);return`<div class="ci"><div class="pic" style="background:${p.bg}">${p.emoji}</div><div><b>${p.name}</b><div class="pq">${p.qty} · ₹${p.price*st.cart[id]}</div></div>${ctl(p)}</div>`}).join("");
  bind($("cartBody"));$("chg").onclick=e=>{e.preventDefault();openLoc()};
  $("cartFoot").innerHTML=(m>t?`<div class="bill" style="color:var(--ok);font-weight:600"><span>You save</span><span>₹${m-t}</span></div>`:"")+
  `<div class="bill"><span>Item total</span><span>₹${t}</span></div><div class="bill"><span>Delivery fee</span><span>${fee?"₹"+fee:"FREE"}</span></div><div class="bill"><span>Handling fee</span><span>₹${hand}</span></div>${st.wallet>0?`<label class="bill" style="cursor:pointer"><span><input type="checkbox" id="uw" ${st.useW?"checked":""}> Use Crypto Cash (₹${st.wallet})</span><span>−₹${uw}</span></label>`:""}<div class="bill t"><span>To pay</span><span>₹${pay-uw}</span></div><button class="go" id="place">Continue to delivery details</button>`;
  if($("uw"))$("uw").onchange=e=>{st.useW=e.target.checked;drawCart()};
  $("place").onclick=()=>openDetails(pay,uw);
}
function openCart(){drawCart();$("drawer").classList.add("show")}
function closeCart(){$("drawer").classList.remove("show")}
let tt;function toast(t){const e=$("toast");e.textContent=t;e.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>e.classList.remove("show"),2200)}

/* ---------- modals ---------- */
function show(html){$("modal").innerHTML=`<button class="x" id="mx" aria-label="Close">✕</button>`+html;$("ov").classList.add("show");$("mx").onclick=()=>$("ov").classList.remove("show")}
function openLoc(){
  show(`<div class="mh"><h3>Choose your delivery location</h3></div><div class="mb"><p>Pick your state and area so your rider can find you fast.</p><label for="sSt">State / Union Territory</label><select id="sSt"></select><label for="sAr">Area</label><select id="sAr"></select><label for="sCu">Area not listed? Type your area or PIN code</label><input id="sCu" placeholder="e.g. 603001 or Potheri"><button class="go" id="okLoc">Confirm location</button></div>`);
  const S=$("sSt"),A=$("sAr");
  Object.keys(LOC).forEach(s=>S.add(new Option(s,s,false,s===st.state)));
  const fill=()=>{A.innerHTML="";LOC[S.value].split(",").forEach(a=>A.add(new Option(a,a,false,a===st.area)))};
  S.onchange=fill;fill();
  $("okLoc").onclick=()=>{st.state=S.value;st.area=$("sCu").value.trim()||A.value;setLoc();$("ov").classList.remove("show");drawCart();toast("Delivering to "+where()+" in 10 minutes")};
}
function setLoc(){$("locTxt").textContent=where()+" ▾"}
function openHelp(){
  show(`<div class="mh"><h3>Help &amp; policies</h3></div><div class="mb"><p>Need help with an order? Call us any time, 6 AM to 1 AM.</p><a class="go" style="display:block;text-align:center;text-decoration:none" href="tel:18001234567">📞 Call 1800-123-4567 (toll free)</a><p>Sample number for this demo. Replace it with your real support line.</p>
  <h4>Cancellation policy</h4><ul><li>Free cancellation within <b>2 minutes</b> of placing the order, and only until the rider picks it up.</li><li>Once the order is out for delivery it cannot be cancelled.</li><li>If we cancel because an item is unavailable, you get a full refund.</li></ul>
  <h4>Refund policy</h4><ul><li>Cancelled orders: choose <b>Crypto Cash</b> (instant) or your original payment method (<b>3–5 business days</b>).</li><li>Missing, damaged or wrong item: report within <b>24 hours</b> of delivery.</li><li>Fruits, vegetables, dairy and eggs: report within <b>2 hours</b> of delivery.</li><li>Toys: return unused items in original packaging within <b>7 days</b>.</li><li>Approved refunds are processed within 48 hours.</li></ul><h4>Crypto Cash</h4><ul><li>In-app credit you can spend on any order here.</li><li>It cannot be withdrawn or sent outside the app.</li><li>It is store credit, not a real cryptocurrency.</li></ul></div>`);
}

/* ---------- wallet ---------- */
function wal(){$("wb").textContent=st.wallet}
function openWallet(){show(`<div class="mh"><h3>Crypto Cash</h3></div><div class="mb"><div class="eta-big"><div><small>Balance</small><br><b>₹${st.wallet}</b></div><div style="font-size:34px">💰</div></div><p>Crypto Cash is in-app credit. Choose it as the refund for a cancelled order and spend it at checkout.</p><ul><li>Refunds arrive instantly</li><li>Works only inside this app</li><li>Cannot be withdrawn or transferred</li><li>It is store credit, not a real cryptocurrency</li></ul></div>`)}
/* ---------- live tracker ---------- */
const RT=[[60,290],[260,290],[260,180],[440,180],[440,80],[540,80]],SEG=[];let TOT=0;
for(let i=1;i<RT.length;i++){const a=RT[i-1],b=RT[i],l=Math.hypot(b[0]-a[0],b[1]-a[1]);SEG.push([a,b,l,TOT]);TOT+=l}
const SG=[[130,"h"],[360,"h"],[560,"v"]];
function pos(d){for(const[a,b,l,s]of SEG)if(d<=s+l){const f=(d-s)/l;return{x:a[0]+(b[0]-a[0])*f,y:a[1]+(b[1]-a[1])*f,dx:b[0]-a[0]}}const e=RT[RT.length-1];return{x:e[0],y:e[1],dx:0}}
function dseg(px,py,a,b){const vx=b[0]-a[0],vy=b[1]-a[1],t=Math.max(0,Math.min(1,((px-a[0])*vx+(py-a[1])*vy)/(vx*vx+vy*vy)));return Math.hypot(px-a[0]-t*vx,py-a[1]-t*vy)}
function house(x,y,c){return`<polygon points="${x-3},${y} ${x+28},${y-16} ${x+59},${y}" fill="#6b7da8"/><rect x="${x}" y="${y}" width="56" height="36" fill="${c}"/><rect x="${x+22}" y="${y+14}" width="12" height="22" fill="#fff"/><rect x="${x+6}" y="${y+8}" width="10" height="10" fill="#fff" opacity=".8"/><rect x="${x+40}" y="${y+8}" width="10" height="10" fill="#fff" opacity=".8"/>`}
function pol(x,y){return`<rect x="${x-4}" y="${y-8}" width="64" height="44" fill="#1b3a8a"/><rect x="${x-4}" y="${y-8}" width="64" height="9" fill="#0a2a6b"/><text x="${x+8}" y="${y-1}" font-size="7" fill="#fff" font-weight="700">POLICE</text><rect x="${x+23}" y="${y+14}" width="12" height="22" fill="#fff"/><rect x="${x+2}" y="${y+6}" width="12" height="10" fill="#bcd2ff"/><rect x="${x+42}" y="${y+6}" width="12" height="10" fill="#bcd2ff"/><circle cx="${x+4}" cy="${y-10}" r="3" fill="#e11d48"/><circle cx="${x+52}" cy="${y-10}" r="3" fill="#2f6bff"/>`}
function hos(x,y){return`<rect x="${x-4}" y="${y-8}" width="64" height="44" fill="#fff" stroke="#c9d6ee"/><rect x="${x+27}" y="${y-5}" width="4" height="13" fill="#e11d48"/><rect x="${x+22.5}" y="${y-.5}" width="13" height="4" fill="#e11d48"/><rect x="${x+23}" y="${y+14}" width="12" height="22" fill="#8fb4f5"/><rect x="${x+2}" y="${y+12}" width="12" height="10" fill="#bcd2ff"/><rect x="${x+42}" y="${y+12}" width="12" height="10" fill="#bcd2ff"/>`}
function shop(x,y,s){let a="";for(let i=0;i<7;i++)a+=`<rect x="${x+i*8}" y="${y-2}" width="8" height="10" fill="${i%2?"#fff":s[3]}"/>`;
  return`<rect x="${x}" y="${y-6}" width="56" height="42" fill="${s[2]}"/>${a}<rect x="${x+4}" y="${y+14}" width="26" height="14" fill="#cfe3ff"/><rect x="${x+38}" y="${y+12}" width="12" height="24" fill="#6b7da8"/><text x="${x+10}" y="${y+26}" font-size="12">${s[0]}</text>`}
const SHP=[["🛒","Grocery","#e8f0ff","#1d5fd6"],["🥖","Bakery","#fff1d9","#d9822b"],["💊","Pharmacy","#e4f7ee","#14935a"],["☕","Cafe","#f3e6dc","#8a5a3b"],["✂️","Salon","#f5e1f3","#b0449e"],["📚","Books","#fff6cf","#c79a00"]];
function mapSVG(){
  const cols=["#f6d9c4","#d9e8c4","#f3e7b8","#d8d4f2","#c9e6ee"],H=[];
  for(let j=0;j<6;j++)for(let i=0;i<10;i++){const x=14+i*62,y=24+j*58,cx=x+28,cy=y+18;if(SEG.every(s=>dseg(cx,cy,s[0],s[1])>46))H.push({x,y,cx,cy,c:cols[(i+j)%5]})}
  const near=p=>H.slice().sort((a,b)=>Math.hypot(a.cx-p[0],a.cy-p[1])-Math.hypot(b.cx-p[0],b.cy-p[1]));
  const store=near(RT[0])[0],home=near(RT[RT.length-1])[0],nb=near([home.cx,home.cy]).filter(o=>o!==home&&o!==store).slice(0,2);
  const R=H.filter(o=>o!==store&&o!==home&&!nb.includes(o)),police=R[Math.floor(R.length*.3)],hosp=R[Math.floor(R.length*.75)];
  const SH=R.filter((o,i)=>o!==police&&o!==hosp&&i%4===1).slice(0,6);
  const lab=(o,t,c,dy)=>`<text x="${o.x}" y="${o.y-(dy||20)}" font-size="11" font-weight="700" fill="${c}">${t}</text>`;
  const h=H.map(o=>{
    if(o===police)return pol(o.x,o.y)+lab(o,"🚓 Police station","#0a2a6b",14);
    if(o===hosp)return hos(o.x,o.y)+lab(o,"🏥 Hospital","#e11d48",14);
    const si=SH.indexOf(o);
    if(si>=0)return shop(o.x,o.y,SHP[si])+`<text x="${o.x}" y="${o.y-10}" font-size="9" font-weight="700" fill="${SHP[si][3]}">${SHP[si][1]}</text>`;
    return house(o.x,o.y,o===home?"#1d5fd6":o===store?"#0a2a6b":o.c)+(o===store?lab(o,"🏬 Crypto store","#0a2a6b"):o===home?lab(o,"🏠 "+st.cust.house,"#1d5fd6"):nb.includes(o)?lab(o,"Neighbour","#5a6a8a"):"")}).join("");
  let tr="";
  for(let j=0;j<14;j++)for(let i=0;i<24;i++){const cx=10+i*27+(j%2)*13,cy=10+j*27;
    if((i*7+j*13+i*j)%5>3||cx>630||cy>356)continue;
    if(SEG.some(s=>dseg(cx,cy,s[0],s[1])<28)||H.some(o=>cx>o.x-10&&cx<o.x+66&&cy>o.y-26&&cy<o.y+44))continue;
    tr+=`<rect x="${cx-1.5}" y="${cy+3}" width="3" height="7" fill="#7a5230"/><circle cx="${cx}" cy="${cy}" r="8" fill="#2f8f4e"/><circle cx="${cx-3}" cy="${cy-2}" r="4" fill="#3aa05c"/>`}
  const pts=RT.map(p=>p.join(",")).join(" ");
  const sg=SG.map(([d,o],i)=>{const p=pos(d),hz=o==="h";
    const ln=hz?`<rect x="${p.x-1.5}" y="${p.y-17}" width="3" height="34" fill="#fff" opacity=".85"/>`:`<rect x="${p.x-17}" y="${p.y-1.5}" width="34" height="3" fill="#fff" opacity=".85"/>`;
    const hx=hz?p.x+6:p.x+24,hy=hz?p.y-44:p.y-14;
    return ln+`<rect x="${hx-5}" y="${hy-13}" width="11" height="26" rx="3" fill="#111"/><circle id="sr${i}" cx="${hx+.5}" cy="${hy-6}" r="3.5" fill="#f33"/><circle id="sg${i}" cx="${hx+.5}" cy="${hy+5}" r="3.5" fill="#3d3"/>`}).join("");
  return`<svg class="map" viewBox="0 0 640 366" role="img" aria-label="Live map of your rider heading to your home"><rect width="640" height="366" fill="#dcefd3"/><polyline points="${pts}" fill="none" stroke="#cfd6e4" stroke-width="44" stroke-linejoin="round" stroke-linecap="round"/><polyline points="${pts}" fill="none" stroke="#3a4a6b" stroke-width="34" stroke-linejoin="round" stroke-linecap="round"/><polyline points="${pts}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="12 9"/>${tr}${h}${sg}<text id="scoot" font-size="28">🛵</text></svg>`}
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function openDetails(pay,uw){
  closeCart();const c=st.cust;
  show(`<div class="mh"><h3>Delivery details</h3></div><div class="mb"><p>Your rider uses this to find your door. Delivering to <b>${where()}</b> in about 10 minutes.</p>
  <label for="fN">Full name</label><input id="fN" autocomplete="name" value="${c.name}">
  <label for="fP">Mobile number</label><input id="fP" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national" placeholder="10-digit number" value="${c.phone}">
  <label for="fH">House / flat number</label><input id="fH" placeholder="e.g. Flat 4B or Door 12" value="${c.house}">
  <label for="fA">Street address and landmark</label><textarea id="fA" placeholder="Street, apartment name, nearby landmark">${c.addr}</textarea>
  <div class="err" id="fE" role="alert"></div><button class="go" id="fOk">Confirm &amp; place order · ₹${pay-uw}</button></div>`);
  $("fOk").onclick=()=>{
    const n=$("fN").value.trim(),p=$("fP").value.trim(),h=$("fH").value.trim(),a=$("fA").value.trim();
    const e=!n?"Enter your full name.":!/^[6-9]\d{9}$/.test(p)?"Enter a valid 10-digit mobile number.":!h?"Enter your house or flat number.":a.length<8?"Enter your street address with a landmark.":"";
    $("fE").textContent=e;if(e)return;
    st.cust={name:esc(n),phone:p,house:esc(h),addr:esc(a)};
    $("ov").classList.remove("show");const cnt=totals().c;st.cart={};st.wallet-=uw;wal();summary();drawProducts();drawCart();startOrder(pay,cnt,uw);
  };
}
let ord=null,timer=null;
const isRed=(i,el)=>((el+i*4)%8)<4;
function startOrder(pay,count,w){
  clearInterval(timer);const now=Date.now(),r=RIDERS[Math.floor(Math.random()*RIDERS.length)];
  ord={pay,count,w,r,phase:0,d:0,fl:true,t0:now,packEnd:now+20000,wait:false,refund:""};
  $("tmodal").innerHTML=`<button class="x" id="tx" aria-label="Close tracker">✕</button><div class="mh"><h3>Track your order</h3></div><div class="mb">
  <div class="eta-big"><div><small>Arriving in</small><br><b id="eta">10 min</b></div><div id="stat" style="text-align:right;max-width:60%">Packing your items</div></div>
  ${mapSVG()}<ul class="steps" id="steps"><li>Order placed</li><li>Packing</li><li>On the way</li><li>Delivered</li></ul>
  <div class="rider"><div class="av">🧑‍🦱</div><div><b>${r[0]}</b> · ⭐ 4.8<br><span style="color:var(--mu)">Delivery partner · ${r[1]}</span></div><a class="call" href="tel:${r[2].replace(/\s/g,"")}">📞 Call</a></div>
  <div class="note">📦 ${count} item${count>1?"s":""} · ₹${pay} · Delivering to <b>${st.cust.name}</b>, ${st.cust.house}, ${st.cust.addr}, ${where()}<br>📞 ${st.cust.phone}<br><small>Demo speed: the rider moves faster than real life.</small></div>
  <div class="note" id="cmsg"></div><button class="go sec" id="cancel">Cancel order</button>
  <div id="ropts" hidden><div class="note"><b>Where should we refund ₹${pay}?</b></div><button class="go" id="rw">💰 Crypto Cash · instant, in-app only</button><button class="go sec" id="rb">Original payment method · 3–5 business days</button></div>
  <a class="go sec" style="display:block;text-align:center;text-decoration:none" href="tel:18001234567">📞 Help: 1800-123-4567</a></div>`;
  $("tx").onclick=()=>$("tov").classList.remove("show");
  $("cancel").onclick=()=>{$("ropts").hidden=false;$("cancel").hidden=true};
  $("rw").onclick=()=>cancelOrder("w");$("rb").onclick=()=>cancelOrder("b");
  $("trkBtn").hidden=false;$("tov").classList.add("show");
  timer=setInterval(tick,50);tick();
}
function cancelOrder(k){
  if(!ord||ord.phase!==0)return;ord.phase=3;ord.refund=k;clearInterval(timer);
  st.wallet+=k==="w"?ord.pay:ord.w;wal();tick();
  toast(k==="w"?"₹"+ord.pay+" added to Crypto Cash":"Refund started");
}
function tick(){
  const now=Date.now(),el=(now-ord.t0)/1000;
  SG.forEach((s,i)=>{const r=isRed(i,el);$("sr"+i).setAttribute("opacity",r?1:.2);$("sg"+i).setAttribute("opacity",r?.2:1)});
  if(ord.phase===0&&now>=ord.packEnd)ord.phase=1;
  if(ord.phase===1){
    ord.wait=false;let nd=ord.d+2;
    SG.forEach(([s],i)=>{const stop=s-8;if(ord.d<=stop&&nd>stop&&isRed(i,el)){nd=ord.d;ord.wait=true}});
    ord.d=nd;if(ord.d>=TOT){ord.d=TOT;ord.phase=2;clearInterval(timer);toast("Your order has arrived! 🎉")}
  }
  const p=pos(ord.d);if(p.dx)ord.fl=p.dx>0;
  const sc=$("scoot");sc.setAttribute("transform",`translate(${p.x+(ord.fl?14:-14)},${p.y+9}) scale(${ord.fl?-1:1},1)`);
  sc.style.display=ord.phase===3?"none":"";
  const mins=ord.phase===0?10:Math.ceil((TOT-ord.d)/TOT*10);
  const msgs=["Packing your items at the store","Rider is on the way","Delivered to your door 🎉","Order cancelled"];
  $("eta").textContent=ord.phase===2?"Delivered":ord.phase===3?"—":mins+" min";
  $("stat").textContent=ord.phase===1&&ord.wait?"Waiting at a red signal 🔴":msgs[ord.phase];
  const step=[1,2,3,4,0][ord.phase];
  document.querySelectorAll("#steps li").forEach((li,i)=>li.classList.toggle("done",ord.phase!==3&&i<step));
  const cb=$("cancel"),left=Math.max(0,Math.min(120,Math.ceil((ord.packEnd-now)/1000)));
  if(ord.phase===0){cb.disabled=false;cb.textContent="Cancel order (free for "+left+"s more)";$("cmsg").textContent="Free cancellation closes when the rider picks up your order, or after 2 minutes."}
  else{
    $("ropts").hidden=true;cb.hidden=false;cb.disabled=true;
    if(ord.phase===3){cb.textContent="Order cancelled";
      $("cmsg").innerHTML=ord.refund==="w"?`<b>₹${ord.pay} added to your Crypto Cash.</b> Spend it on your next order. It stays inside this app.`:`<b>Refund of ₹${ord.pay-ord.w} started.</b> It reaches your original payment method in 3–5 business days.`+(ord.w?` ₹${ord.w} Crypto Cash went back to your wallet.`:"")}
    else{cb.textContent=ord.phase===2?"Order delivered":"Cancellation window closed";$("cmsg").textContent="Problem with an item? Report it within 24 hours (2 hours for fresh food). See the refund policy."}
  }
}

$("q").oninput=e=>{st.q=e.target.value;drawProducts()};
$("cartBtn").onclick=openCart;$("closeCart").onclick=closeCart;
$("locBtn").onclick=openLoc;$("walBtn").onclick=openWallet;$("helpBtn").onclick=openHelp;$("polBtn").onclick=openHelp;
$("polLink").onclick=e=>{e.preventDefault();openHelp()};
$("trkBtn").onclick=()=>$("tov").classList.add("show");
$("ov").onclick=e=>{if(e.target.id==="ov")$("ov").classList.remove("show")};
$("tov").onclick=e=>{if(e.target.id==="tov")$("tov").classList.remove("show")};
document.onkeydown=e=>{if(e.key==="Escape"){$("ov").classList.remove("show");$("tov").classList.remove("show");closeCart()}};
wal();setLoc();drawCats();drawProducts();drawCart();openLoc();
