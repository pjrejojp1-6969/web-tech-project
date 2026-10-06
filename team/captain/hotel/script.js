const T={
"Budget":{base:1400,stars:[2,3],em:"🛏️",suf:["Inn","Stay","Lodge"],am:["Free Wi-Fi","AC rooms","24h front desk","Parking"]},
"Business":{base:3600,stars:[3,4],em:"🏢",suf:["Business Suites","Residency","Towers"],am:["Free Wi-Fi","Breakfast","Gym","Meeting rooms","Restaurant"]},
"Luxury":{base:9500,stars:[5,5],em:"👑",suf:["Palace","Grande","Royal Court"],am:["Pool","Spa","Fine dining","Airport pickup","Gym","Bar"]},
"Resort":{base:7000,stars:[4,5],em:"🌴",suf:["Resort & Spa","Retreat","Garden Resort"],am:["Pool","Spa","Breakfast","Kids club","Restaurant","Parking"]},
"Boutique":{base:4600,stars:[4,4],em:"🏨",suf:["Boutique Hotel","Courtyard","House"],am:["Free Wi-Fi","Breakfast","Cafe","Rooftop","Parking"]},
"Homestay":{base:2200,stars:[3,3],em:"🏡",suf:["Homestay","Villa","Guest House"],am:["Free Wi-Fi","Home-cooked meals","Kitchen access","Parking"]}};
const ROOMS=[["Standard Room","1 queen bed · 220 sq ft",1,2],["Deluxe Room","1 king bed · 290 sq ft",1.3,3],["Executive Room","King bed + work desk · 340 sq ft",1.6,3],["Family Suite","2 beds + lounge · 480 sq ft",2.2,4]];
const LOCS={Chennai:["T. Nagar","Adyar","Anna Nagar","Velachery","Nungambakkam","Mylapore","ECR","OMR"],Chengalpattu:["GST Road","Maraimalai Nagar","Paalar","Singaperumal Koil","Mahindra City","Kattankulathur","Guduvanchery","Potheri"],Bengaluru:["Koramangala","Indiranagar","HSR Layout","Jayanagar","Whitefield","Malleshwaram","MG Road","Church Street"],Mumbai:["Bandra","Juhu","Andheri","Colaba","Powai","Dadar","Worli","Marine Drive"],Delhi:["Connaught Place","Karol Bagh","Saket","Hauz Khas","Aerocity","Paharganj","Dwarka","Chanakyapuri"],Hyderabad:["Banjara Hills","Jubilee Hills","Charminar","Gachibowli","Madhapur","Secunderabad","Hitec City","Begumpet"],Kolkata:["Park Street","Salt Lake","Ballygunge","Howrah","New Town","Gariahat","Esplanade","Alipore"]};
const COL=["#cfeae6","#f6e6b8","#d6e4ff","#f1d9ec","#dcefc8","#ffd9c9"];
const PAYS=[["phonepe","📱 PhonePe"],["paytm","💙 Paytm"],["netbanking","🏦 Net banking"],["credit","💳 Credit card"],["debit","💳 Debit card"],["hotel","🏨 Pay at hotel"]];
const BANKS=["State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank","Indian Bank"];
const DATA={};
Object.keys(LOCS).forEach((city,ci)=>{DATA[city]=[];Object.keys(T).forEach((t,ki)=>{for(let n=0;n<4;n++){const s=ci*131+ki*17+n*7,d=T[t],loc=LOCS[city][(ki*4+n+ci)%8];
 DATA[city].push({n:loc+" "+d.suf[(n+ci)%3],t,loc,r:+(3.8+((s*37)%12)/10).toFixed(1),rv:120+(s*53)%2800,p:Math.round(d.base*(0.8+((s*13)%9)/10)/100)*100,s:d.stars[n%2],am:d.am})}})});
const POL={Budget:[12,6,50],Business:[24,12,50],Luxury:[48,24,50],Resort:[48,24,50],Boutique:[24,12,50],Homestay:[12,6,50]};
const ETA={phonepe:"2-3 business days",paytm:"2-3 business days",netbanking:"3-5 business days",credit:"5-7 business days",debit:"5-7 business days"};
const fmtDT=d=>d.toLocaleString("en-IN",{day:"numeric",month:"short",hour:"numeric",minute:"2-digit"});
const tier=(b,now=new Date())=>{const [f,p,pc]=POL[b.t],h=(new Date(b.ci+"T14:00")-now)/36e5;return h>=f?{pct:100,i:0}:h>=p?{pct:pc,i:1}:{pct:0,i:2}};
function polLines(t,ci,hl){const [f,p,pc]=POL[t],c=new Date(ci+"T14:00"),d=x=>fmtDT(new Date(c-x*36e5));
 return [[`Free cancellation until ${d(f)}`,"100% refund"],[`${d(f)} to ${d(p)}`,`${pc}% refund`],[`After ${d(p)} or no-show`,"No refund"]].map((l,i)=>`<div class="row pol ${hl===i?"hl":""}"><span>${l[0]}</span><b>${l[1]}</b></div>`).join("")}
function polHtml(t,ci){return `<div class="bk"><b>Cancellation and refund policy</b>${polLines(t,ci,tier({t,ci}).i)}<small>Check-in is 2:00 PM and check-out is 11:00 AM. Taxes are refunded in the same percentage. Refunds go to your original payment method. Pay at hotel bookings take no payment, so there is nothing to refund.</small></div>`}
const untilTxt=b=>{const [f,p,pc]=POL[b.t],c=new Date(b.ci+"T14:00"),i=tier(b).i;return i===0?`Free cancellation until ${fmtDT(new Date(c-f*36e5))}`:i===1?`${pc}% refund if cancelled before ${fmtDT(new Date(c-p*36e5))}`:"Non-refundable now"};
function rfBlock(b){const r=b.rf;return `<div class="rf">${b.paid?`<div class="row"><b>Refund ${money(r.amt)}</b><span>${r.amt?"Initiated":"No refund"}</span></div><small>${r.amt?`To ${b.label} · Ref ${r.rid} · Expected in ${ETA[b.v]}.${r.ded?` Cancellation charge ${money(r.ded)} (${100-r.pct}%).`:""}`:"No refund because the cancellation was inside the non-refundable window."}</small>`:`<small>No payment was taken, so there is nothing to refund.</small>`}<br><small>Cancelled on ${fmtDT(r.at)}</small></div>`}
let city="Chennai",type="All",bookings=[],cur=null;
try{city=localStorage.getItem("sw_city")||city}catch(e){}
if(!DATA[city])city="Chennai";
const $=id=>document.getElementById(id),money=n=>"₹"+n.toLocaleString("en-IN");
const iso=d=>d.toISOString().slice(0,10),addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const fmt=s=>new Date(s+"T00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
const today=iso(new Date());
$("ci").min=today;$("ci").value=iso(addDays(new Date(),1));$("co").value=iso(addDays(new Date(),2));$("co").min=$("ci").value;
$("gs").innerHTML=[1,2,3,4,5,6,7,8].map(n=>`<option value="${n}" ${n===2?"selected":""}>${n} guest${n>1?"s":""}</option>`).join("");
$("rm").innerHTML=[1,2,3,4].map(n=>`<option value="${n}">${n} room${n>1?"s":""}</option>`).join("");
const nights=()=>Math.max(1,Math.round((new Date($("co").value)-new Date($("ci").value))/864e5));
const rp=(h,k)=>Math.round(h.p*ROOMS[k][2]/50)*50;
$("ci").onchange=()=>{const m=iso(addDays(new Date($("ci").value),1));$("co").min=m;if($("co").value<m)$("co").value=m;render()};
["co","gs","rm","q","sort"].forEach(i=>$(i).oninput=render);
const cs=$("city");cs.innerHTML=Object.keys(DATA).map(c=>`<option>${c}</option>`).join("");cs.value=city;
cs.onchange=()=>{city=cs.value;type="All";try{localStorage.setItem("sw_city",city)}catch(e){}render()};
function render(){
 $("sub").textContent=`${DATA[city].length} stays in ${city} · ${nights()} night${nights()>1?"s":""}`;
 $("chips").innerHTML=["All",...Object.keys(T)].map(c=>`<button class="chip ${c===type?"on":""}" data-c="${c}">${c}</button>`).join("");
 $("chips").querySelectorAll(".chip").forEach(b=>b.onclick=()=>{type=b.dataset.c;render()});
 const q=$("q").value.toLowerCase(),so=$("sort").value;
 let l=DATA[city].map((h,i)=>({h,i})).filter(({h})=>(type==="All"||h.t===type)&&(!q||(h.n+h.loc+h.t).toLowerCase().includes(q)));
 if(so==="lo")l.sort((a,b)=>a.h.p-b.h.p);else if(so==="hi")l.sort((a,b)=>b.h.p-a.h.p);else if(so==="rt")l.sort((a,b)=>b.h.r-a.h.r);
 $("grid").innerHTML=l.length?l.map(({h,i})=>`<button class="h" data-i="${i}"><div class="pic" style="background:${COL[i%6]}">${T[h.t].em}</div><div class="b"><h3>${h.n}</h3><div class="meta"><span>${h.t} · ${h.loc}</span><span class="rate">★ ${h.r}</span></div><div class="meta"><span class="stars" aria-label="${h.s} star">${"★".repeat(h.s)}</span><span>${h.rv.toLocaleString()} reviews</span></div><div class="meta"><span>from</span><span class="price">${money(h.p)} / night</span></div></div></button>`).join(""):`<div class="empty">No stays match in ${city}. Try another type or clear the search.</div>`;
 $("grid").querySelectorAll(".h").forEach(b=>b.onclick=()=>openHotel(+b.dataset.i));
 $("bc").textContent=bookings.length;$("bkBtn").hidden=!bookings.length;
}
function show(h){$("panel").innerHTML=h;$("ov").classList.add("show")}
function close(){$("ov").classList.remove("show")}
$("ov").onclick=e=>{if(e.target.id==="ov")close()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
function openHotel(i){
 const h=DATA[city][i],g=+$("gs").value,r=+$("rm").value;
 show(`<button class="x" id="cl">Close</button><h2>${h.n}</h2><div class="meta"><span>${h.t} · ${h.loc}, ${city}</span><span class="rate">★ ${h.r}</span></div><div class="stars">${"★".repeat(h.s)}</div>
 <div class="am">${h.am.map(a=>`<span>${a}</span>`).join("")}</div>
 <p class="meta">${fmt($("ci").value)} to ${fmt($("co").value)} · ${nights()} night${nights()>1?"s":""} · ${g} guest${g>1?"s":""}, ${r} room${r>1?"s":""}</p>`+
 ROOMS.map((m,k)=>`<div class="room"><div>${m[0]}<br><small>${m[1]} · up to ${m[3]} guests</small><br><b>${money(rp(h,k))}</b> <small>/ night</small></div><button class="pick" data-k="${k}">Select</button></div>`).join("")+polHtml(h.t,$("ci").value));
 $("cl").onclick=close;
 $("panel").querySelectorAll(".pick").forEach(b=>b.onclick=()=>openBook(i,+b.dataset.k));
}
function openBook(i,k,msg){
 const h=DATA[city][i],m=ROOMS[k],g=+$("gs").value,r=+$("rm").value,n=nights(),sub=rp(h,k)*n*r,tax=Math.round(sub*.12),total=sub+tax;
 show(`<button class="x" id="cl">Back</button><h2>Confirm your stay</h2><div class="meta"><span>${h.n}</span><span>${h.loc}, ${city}</span></div>
 <div class="bk">${m[0]} × ${r}<br><small>${fmt($("ci").value)} to ${fmt($("co").value)} · ${n} night${n>1?"s":""} · ${g} guest${g>1?"s":""}</small></div>
 <div class="row"><span>${money(rp(h,k))} × ${n} night${n>1?"s":""} × ${r} room${r>1?"s":""}</span><span>${money(sub)}</span></div><div class="row"><span>Taxes (12%)</span><span>${money(tax)}</span></div><div class="row tot"><span>Total</span><span>${money(total)}</span></div>
 ${polHtml(h.t,$("ci").value)}<h3>Guest details</h3><div class="fld"><input id="nm" placeholder="Full name" autocomplete="name"><input id="ph" placeholder="Phone number" inputmode="numeric" maxlength="10" autocomplete="tel"><input id="em" type="email" placeholder="Email" autocomplete="email"><textarea id="rq" rows="2" placeholder="Special requests (optional)"></textarea></div>
 <h3>Payment method</h3>`+PAYS.map(([v,l],x)=>`<label class="pay"><input type="radio" name="pm" value="${v}" ${x===5?"checked":""}> ${l}</label>`).join("")+
 `<div class="fld" id="pf"></div><div class="err" id="er" role="alert">${msg||""}</div><button class="go" id="po">${"Book now · "+money(total)}</button><small>By booking you agree to the cancellation and refund policy above.</small>`);
 $("cl").onclick=()=>openHotel(i);
 const pf=()=>{const v=document.querySelector('input[name=pm]:checked').value;
  $("pf").innerHTML=v==="phonepe"||v==="paytm"?`<input id="upi" placeholder="UPI ID (e.g. name@ybl)">`:
  v==="netbanking"?`<select id="bk">${BANKS.map(b=>`<option>${b}</option>`).join("")}</select>`:
  v==="credit"||v==="debit"?`<input id="cn" placeholder="Card number" inputmode="numeric" maxlength="19"><input id="cx" placeholder="Expiry MM/YY" maxlength="5"><input id="cv" placeholder="CVV" inputmode="numeric" maxlength="3" type="password">`:
  `<small>Pay ${money(total)} at the hotel during check-in. Your room is held until 6 PM.</small>`};
 document.querySelectorAll('input[name=pm]').forEach(x=>x.onchange=pf);pf();
 $("po").onclick=()=>{
  const v=document.querySelector('input[name=pm]:checked').value,er=t=>{$("er").textContent=t};
  if(g>m[3]*r)return er(`${r} ${m[0]}${r>1?"s":""} fits up to ${m[3]*r} guests. Pick a bigger room or add rooms.`);
  if(!$("nm").value.trim())return er("Enter your name.");
  if(!/^\d{10}$/.test($("ph").value))return er("Enter a 10-digit phone number.");
  if(!/^\S+@\S+\.\S+$/.test($("em").value))return er("Enter a valid email address.");
  if((v==="phonepe"||v==="paytm")&&!/^[\w.-]+@\w+$/.test($("upi").value))return er("Enter a valid UPI ID.");
  if((v==="credit"||v==="debit")&&(!/^\d{12,19}$/.test($("cn").value.replace(/\s/g,""))||!/^\d{2}\/\d{2}$/.test($("cx").value)||!/^\d{3}$/.test($("cv").value)))return er("Check your card number, expiry and CVV.");
  const b={id:"SW"+Math.floor(100000+Math.random()*900000),hotel:h.n,loc:h.loc,city,room:m[0],rooms:r,guests:g,ci:$("ci").value,co:$("co").value,n,total,label:PAYS.find(p=>p[0]===v)[1].replace(/^\S+\s/,""),name:$("nm").value.trim(),status:"Confirmed",t:h.t,v,paid:v!=="hotel"};
  bookings.unshift(b);render();
  show(`<button class="x" id="cl">Close</button><div class="done"><div class="big">🎉</div><h2>Booking confirmed!</h2><p>Check your email for the voucher, ${b.name.split(" ")[0]}.</p></div>`+card(b)+`<button class="go" id="ok">Keep exploring</button>`);
  $("cl").onclick=$("ok").onclick=close};
}
function card(b){return `<div class="bk"><div class="row"><b>${b.hotel}</b><span class="st ${b.status==="Cancelled"?"c":""}">${b.status}</span></div><small>${b.loc}, ${b.city}</small><div class="row"><span>Booking ${b.id}</span><span>${money(b.total)}</span></div><div>${b.room} × ${b.rooms} · ${b.guests} guest${b.guests>1?"s":""}</div><div>Check-in ${fmt(b.ci)}, from 2:00 PM<br>Check-out ${fmt(b.co)}, by 11:00 AM</div><small>${b.n} night${b.n>1?"s":""} · Payment: ${b.label}</small>${b.status==="Cancelled"?rfBlock(b):`<div class="pl">${untilTxt(b)}</div>`}${b.status==="Confirmed"?`<button class="go alt" data-id="${b.id}">Cancel booking</button>`:""}</div>`}
function openBookings(){
 show(`<button class="x" id="cl">Close</button><h2>My bookings</h2>`+bookings.map(card).join(""));
 $("cl").onclick=close;

}
$("panel").addEventListener("click",e=>{const id=e.target.dataset&&e.target.dataset.id;if(id)openCancel(id)});
function openCancel(id){
 const b=bookings.find(x=>x.id===id),t=tier(b),amt=b.paid?Math.round(b.total*t.pct/100):0,ded=b.paid?b.total-amt:0;
 show(`<button class="x" id="cl">Back</button><h2>Cancel booking</h2><div class="bk"><b>${b.hotel}</b><br><small>${b.loc}, ${b.city} · ${b.id}<br>${b.room} × ${b.rooms} · ${fmt(b.ci)} to ${fmt(b.co)}</small></div>
 <b>Cancellation policy</b>${polLines(b.t,b.ci,t.i)}
 <div class="bk"><div class="row"><span>Amount paid</span><span>${b.paid?money(b.total):"Nothing paid"}</span></div><div class="row"><span>Cancellation charge</span><span>${money(ded)}</span></div><div class="row tot"><span>Refund</span><span>${money(amt)}</span></div>
 <small>${b.paid?(amt?`Refund goes to ${b.label} within ${ETA[b.v]}.`:"This cancellation is inside the non-refundable window."):"You chose pay at hotel, so no money is taken or refunded."}</small></div>
 <div class="fld"><select id="rs" aria-label="Reason for cancelling"><option>Change of plans</option><option>Found a better price</option><option>Dates changed</option><option>Booked by mistake</option><option>Other</option></select></div>
 <button class="go alt" id="cc">Confirm cancellation</button><button class="go" id="kp">Keep my booking</button>`);
 $("cl").onclick=$("kp").onclick=openBookings;
 $("cc").onclick=()=>{b.status="Cancelled";b.rf={amt,ded,pct:t.pct,rid:"RF"+Math.floor(100000+Math.random()*900000),at:new Date()};render();
  show(`<button class="x" id="cl">Close</button><div class="done"><div class="big">✅</div><h2>Booking cancelled</h2><p>${b.paid?(amt?`We have started a refund of ${money(amt)}.`:"No refund applies to this cancellation."):"Nothing was charged."}</p></div>`+card(b)+`<button class="go" id="bk2">Back to my bookings</button>`);
  $("cl").onclick=close;$("bk2").onclick=openBookings}}
$("bkBtn").onclick=openBookings;
render();
