const $=s=>document.querySelector(s);
const LANGS=["English","Hindi","Tamil","Spanish","Korean"];
const GENRES=["Action","Drama","Comedy","Thriller","Sci-Fi","Romance","Horror","Adventure"];
const A=["Midnight","Silent","Crimson","Broken","Golden","Hidden","Last","Electric","Wild","Frozen"];
const N=["Horizon","Empire","Echo","Garden","Signal","Harbor","Dynasty","Mirage","Voyage","Legacy"];
const BLURB=["A reluctant hero is pulled into a conflict far bigger than anyone expected.","Two strangers uncover a secret that rewrites their family's history.","One night, one city and a chain of choices that cannot be undone.","A small-town dream collides with a world that refuses to wait.","Old rivals must team up when a forgotten promise comes due."];
const MOVIES=Array.from({length:100},(_,k)=>({
  id:k,title:A[(k*7)%10]+" "+N[Math.floor(k/10)],lang:LANGS[Math.floor(k/20)],
  genre:GENRES[k%8],year:2005+(k*3)%20,rating:(5.5+((k*37)%40)/10).toFixed(1),
  mins:88+(k*11)%60,blurb:BLURB[k%5],hue:(k*47)%360}));
function poster(m){return `images/poster-${m.id}.svg`}
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let list=store.get("sb_list",[]),user=store.get("sb_user",null),plan=store.get("sb_plan","Standard"),lang="All",ptimer;

function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2200)}
const card=m=>`<div class="mc" tabindex="0" onclick="openM(${m.id})" onkeydown="if(event.key==='Enter')openM(${m.id})"><img loading="lazy" src="${poster(m)}" alt="${m.title} poster"><span>★ ${m.rating}</span></div>`;
function row(t,arr){return `<div class="row"><h3>${t}</h3><div class="rw"><button class="arr l" onclick="scr(this,-1)">‹</button><div class="strip">${arr.map(card).join("")}</div><button class="arr r" onclick="scr(this,1)">›</button></div></div>`}
function scr(b,d){const s=b.parentNode.querySelector(".strip");s.scrollBy({left:d*s.clientWidth*.8})}

/* Modal */
function openM(id){
  const m=MOVIES[id],inL=list.includes(id);
  $("#mb").innerHTML=`<button class="x" onclick="closeM()" aria-label="Close">×</button><img src="${poster(m)}" alt="${m.title} poster"><div class="mi"><h2>${m.title}</h2><div class="rate">★ ${m.rating} / 10</div><span class="pill">${m.year}</span><span class="pill">${m.mins} min</span><span class="pill">${m.genre}</span><span class="pill">${m.lang}</span><p>${m.blurb}</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn w" onclick="play(${id})">▶ Play</button><button class="btn g" onclick="tgl(${id},this)">${inL?"✓ In My List":"+ My List"}</button><button class="btn g" onclick="toast('Thanks! You liked ${m.title}')">👍 Like</button><button class="btn g" onclick="shr(${id})">Share</button></div></div>`;
  $("#modal").classList.add("show");
}
function closeM(){$("#modal").classList.remove("show")}
$("#modal").onclick=e=>{if(e.target.id==="modal")closeM()};
function tgl(id,b){const i=list.indexOf(id);if(i<0){list.push(id);toast("Added to My List")}else{list.splice(i,1);toast("Removed from My List")}store.set("sb_list",list);b.textContent=list.includes(id)?"✓ In My List":"+ My List";if(location.hash==="#/mylist")route()}
function shr(id){const u=location.href;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast("Link copied"),()=>toast("Copy this page's address to share"))}
function play(id){
  closeM();const m=MOVIES[id];$("#pt").textContent=m.title;$("#player").classList.add("show");
  let p=0,paused=false;$("#pp").textContent="Pause";$("#pst").textContent="Playing…";
  clearInterval(ptimer);ptimer=setInterval(()=>{if(!paused){p=Math.min(100,p+1);$("#pbar").style.width=p+"%";if(p>=100){clearInterval(ptimer);$("#pst").textContent="Finished"}}},300);
  $("#pp").onclick=()=>{paused=!paused;$("#pp").textContent=paused?"Resume":"Pause";$("#pst").textContent=paused?"Paused":"Playing…"};
}
$("#px").onclick=()=>{clearInterval(ptimer);$("#player").classList.remove("show")};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeM();$("#px").click()}});

/* Pages */
const NAV=[["/","Home"],["/browse","Browse"],["/new","New & Popular"],["/mylist","My List"],["/pricing","Pricing"]];
const FOOT=[["/help","Help Center"],["/about","About Us"],["/contact","Contact Us"],["/terms","Terms of Use"],["/privacy","Privacy"],["/account","Account"],["/devices","Supported Devices"],["/pricing","Plans"]];
const FAQ=[["What is StreamBox?","A demo streaming service with 100 original titles in five languages. Watch on any screen, cancel any time."],["How much does it cost?","Plans start at ₹149 a month. See the Pricing page for the full comparison."],["Where can I watch?","On phones, tablets, laptops and TVs. See Supported Devices."],["How do I cancel?","Open Account and choose Cancel membership. There are no fees."],["Is there a free trial?","Yes. New members get 30 days free on the Standard plan."]];
const faqHTML=FAQ.map(f=>`<div class="faq"><button onclick="this.parentNode.classList.toggle('open')">${f[0]}<span>＋</span></button><div>${f[1]}</div></div>`).join("");
const pages={
home(){
  const f=MOVIES[(lang==="All"?3:LANGS.indexOf(lang)*20+4)];
  const pool=lang==="All"?MOVIES:MOVIES.filter(m=>m.lang===lang);
  let h=`<div class="hero" style="background-image:url('${poster(f)}')"><div><h2>${f.title}</h2><div class="rate">★ ${f.rating} · ${f.year} · ${f.genre}</div><p>${f.blurb}</p><button class="btn w" onclick="play(${f.id})">▶ Play</button><button class="btn g" onclick="openM(${f.id})">ⓘ More Info</button></div></div>`;
  h+=`<div class="tabs">`+["All",...LANGS].map(l=>`<button class="tab ${l===lang?"on":""}" onclick="setLang('${l}')">${l}</button>`).join("")+`</div>`;
  if(lang==="All"){LANGS.forEach(l=>h+=row(l+" Movies",MOVIES.filter(m=>m.lang===l)))}
  else{h+=row("All "+lang+" Movies",pool);GENRES.forEach(g=>{const a=pool.filter(m=>m.genre===g);if(a.length)h+=row(g,a)})}
  h+=row("Top Rated",[...MOVIES].sort((a,b)=>b.rating-a.rating).slice(0,15));
  return h},
browse(){
  return `<div class="tools"><select id="fl"><option>All</option>${LANGS.map(l=>`<option>${l}</option>`).join("")}</select><select id="fg"><option>All</option>${GENRES.map(l=>`<option>${l}</option>`).join("")}</select><select id="fs"><option value="id">Sort: Default</option><option value="r">Rating ↓</option><option value="y">Newest</option><option value="t">A–Z</option></select><span id="cnt" style="align-self:center;color:var(--mu)"></span></div><div class="grid" id="bg"></div>`},
new(){const n=[...MOVIES].sort((a,b)=>b.year-a.year).slice(0,20),p=[...MOVIES].sort((a,b)=>b.rating-a.rating).slice(0,20);return `<div style="padding-top:80px"></div>`+row("New Releases",n)+row("Most Popular",p)+row("Trending in Your Language",MOVIES.filter(m=>m.lang===(user?.lang||"English")).slice(0,15))},
mylist(){return list.length?`<div class="tools"><h1 style="font-size:30px">My List</h1></div><div class="grid">${list.map(i=>card(MOVIES[i])).join("")}</div>`:`<div class="empty" style="padding-top:140px"><h2>Your list is empty</h2><p style="margin:12px 0 20px">Open any title and choose + My List.</p><a class="btn" href="#/browse">Browse titles</a></div>`},
pricing(){const P=[["Mobile","₹149","480p · 1 phone or tablet","Downloads on 1 device","Ads-free"],["Basic","₹199","720p · 1 screen","Downloads on 1 device","All 100 titles"],["Standard","₹499","1080p · 2 screens","Downloads on 2 devices","All 100 titles"],["Premium","₹649","4K + HDR · 4 screens","Downloads on 6 devices","Spatial audio"]];
  return `<div class="pg"><h1>Choose your plan</h1><p>Watch everything, cancel any time. Current plan: <b id="cp">${plan}</b></p><div class="plans">${P.map(p=>`<div class="plan ${p[0]===plan?"sel":""}"><h3>${p[0]}</h3><div class="pr">${p[1]}<small style="font-size:14px;color:var(--mu)">/mo</small></div><ul><li>✓ ${p[2]}</li><li>✓ ${p[3]}</li><li>✓ ${p[4]}</li></ul><button class="btn" onclick="pickPlan('${p[0]}')">${p[0]===plan?"Current plan":"Select "+p[0]}</button></div>`).join("")}</div><h1 style="font-size:26px">Questions</h1>${faqHTML}</div>`},
signin(){return `<div class="pg"><form class="form" onsubmit="return doIn(event)"><h1 style="font-size:30px">Sign In</h1><input id="e" type="email" placeholder="Email" required><input id="p" type="password" placeholder="Password (6+ characters)" minlength="6" required><button class="btn">Sign In</button><p style="margin-top:16px">New here? <a href="#/signup" style="color:#fff;text-decoration:underline">Sign up now</a></p></form></div>`},
signup(){return `<div class="pg"><form class="form" onsubmit="return doUp(event)"><h1 style="font-size:30px">Create account</h1><input id="n" placeholder="Name" required><input id="e" type="email" placeholder="Email" required><input id="p" type="password" placeholder="Password (6+ characters)" minlength="6" required><select id="l">${LANGS.map(l=>`<option>${l}</option>`).join("")}</select><button class="btn">Start free trial</button><p style="margin-top:16px">Have an account? <a href="#/signin" style="color:#fff;text-decoration:underline">Sign in</a></p></form></div>`},
account(){if(!user)return `<div class="empty" style="padding-top:140px"><h2>Sign in to see your account</h2><p style="margin:12px 0 20px">Manage your plan and preferences.</p><a class="btn" href="#/signin">Sign In</a></div>`;
  return `<div class="pg"><h1>Account</h1><div class="two"><div class="box"><h3>Membership</h3><p>${user.name}<br>${user.email}</p><button class="btn g" onclick="toast('Password reset link sent')">Reset password</button></div><div class="box"><h3>Plan</h3><p>${plan}</p><a class="btn g" href="#/pricing">Change plan</a></div><div class="box"><h3>Preferred language</h3><select id="al" class="f" onchange="user.lang=this.value;store.set('sb_user',user);toast('Language saved')">${LANGS.map(l=>`<option ${l===user.lang?"selected":""}>${l}</option>`).join("")}</select></div><div class="box"><h3>Danger zone</h3><p>${list.length} titles in My List</p><button class="btn g" onclick="list=[];store.set('sb_list',list);toast('List cleared')">Clear My List</button> <button class="btn" onclick="if(confirm('Cancel membership?')){plan='None';store.set('sb_plan',plan);toast('Membership cancelled');route()}">Cancel</button></div></div></div>`},
help(){return `<div class="pg"><h1>Help Center</h1><p>Find quick answers below, or <a href="#/contact" style="color:#fff;text-decoration:underline">contact us</a>.</p>${faqHTML}</div>`},
about(){return `<div class="pg"><h1>About StreamBox</h1><p>StreamBox is a demo streaming site built with plain HTML, CSS and JavaScript. It lists 100 original titles across English, Hindi, Tamil, Spanish and Korean.</p><div class="two"><div class="box"><h3>100</h3><p>Titles</p></div><div class="box"><h3>5</h3><p>Languages</p></div><div class="box"><h3>8</h3><p>Genres</p></div></div></div>`},
contact(){return `<div class="pg"><form class="form" onsubmit="event.preventDefault();toast('Message sent. We reply within 24 hours.');this.reset()"><h1 style="font-size:30px">Contact us</h1><input placeholder="Your name" required><input type="email" placeholder="Email" required><select><option>Billing</option><option>Playback issue</option><option>Feedback</option></select><textarea rows="4" placeholder="How can we help?" required></textarea><button class="btn">Send message</button></form></div>`},
terms(){return `<div class="pg"><h1>Terms of Use</h1><p>StreamBox is a demonstration project. Titles, ratings and images are generated and do not refer to real films.</p><p>Memberships are simulated. No payment is taken and no video is streamed.</p><p>You may reset all saved data by clearing your browser storage for this page.</p></div>`},
privacy(){return `<div class="pg"><h1>Privacy</h1><p>Your list, plan and sign-in details are kept only in your own browser. Nothing is sent to a server.</p><button class="btn g" onclick="localStorage.clear();list=[];user=null;plan='Standard';toast('Saved data erased');route()">Erase my saved data</button></div>`},
devices(){return `<div class="pg"><h1>Supported Devices</h1><table><tr><th>Device</th><th>Max quality</th><th>Downloads</th></tr><tr><td>Smart TV</td><td>4K HDR</td><td>No</td></tr><tr><td>Laptop browser</td><td>1080p</td><td>No</td></tr><tr><td>Android / iOS phone</td><td>1080p</td><td>Yes</td></tr><tr><td>Tablet</td><td>1080p</td><td>Yes</td></tr></table><button class="btn" onclick="toast('Device check passed')">Test my device</button></div>`}
};
const TITLES={signin:"Sign In",signup:"Sign Up"};

function setLang(l){lang=l;route()}
function pickPlan(p){plan=p;store.set("sb_plan",p);toast(p+" plan selected");route()}
function doIn(e){e.preventDefault();const em=$("#e").value;user={name:em.split("@")[0],email:em,lang:"English"};store.set("sb_user",user);toast("Welcome back!");location.hash="#/";return false}
function doUp(e){e.preventDefault();user={name:$("#n").value,email:$("#e").value,lang:$("#l").value};store.set("sb_user",user);lang=user.lang;toast("Account created. Enjoy your free trial!");location.hash="#/";return false}
function bind(){
  const fl=$("#fl");if(!fl)return;
  const go=()=>{let a=MOVIES.filter(m=>(fl.value==="All"||m.lang===fl.value)&&($("#fg").value==="All"||m.genre===$("#fg").value));
    const s=$("#fs").value;if(s==="r")a.sort((x,y)=>y.rating-x.rating);if(s==="y")a.sort((x,y)=>y.year-x.year);if(s==="t")a.sort((x,y)=>x.title.localeCompare(y.title));
    $("#bg").innerHTML=a.map(card).join("")||'<div class="empty">No matches</div>';$("#cnt").textContent=a.length+" titles"};
  ["#fl","#fg","#fs"].forEach(s=>$(s).onchange=go);go()}
function route(){
  const path=location.hash.slice(1)||"/";const key=path==="/"?"home":path.slice(1);
  const q=sessionStorage?.getItem?.("q");
  $("#app").innerHTML=(pages[key]||(()=>`<div class="empty" style="padding-top:140px"><h2>Page not found</h2><p style="margin:12px 0 20px">That page doesn't exist.</p><a class="btn" href="#/">Go home</a></div>`))();
  $("#links").innerHTML=NAV.map(n=>`<a href="#${n[0]}" class="${n[0]===path?"on":""}">${n[1]}</a>`).join("");
  $("#auth").textContent=user?"Sign out":"Sign in";
  $("#auth").onclick=()=>{if(user){user=null;store.set("sb_user",null);toast("Signed out");route()}else location.hash="#/signin";$("#pm").classList.remove("show")};
  $("#foot").innerHTML=`<div class="fl">${FOOT.map(f=>`<a href="#${f[0]}">${f[1]}</a>`).join("")}</div><div>© StreamBox demo · all titles are fictional</div>`;
  window.scrollTo(0,0);bind();
}
window.addEventListener("hashchange",()=>{closeM();route()});
window.addEventListener("scroll",()=>$("#nav").classList.toggle("solid",scrollY>30));
$("#sb").onclick=()=>{const q=$("#q");q.classList.toggle("open");if(q.classList.contains("open"))q.focus()};
$("#q").oninput=e=>{
  const v=e.target.value.trim().toLowerCase();
  if(!v){route();return}
  const a=MOVIES.filter(m=>(m.title+m.genre+m.lang).toLowerCase().includes(v));
  $("#app").innerHTML=`<div class="tools"><h1 style="font-size:26px">Results for "${e.target.value}"</h1></div><div class="grid">${a.map(card).join("")||'<div class="empty">No titles found</div>'}</div>`;
};
$("#bell").onclick=()=>toast("🔔 3 new titles added this week");
$("#pb").onclick=e=>{e.stopPropagation();$("#pm").classList.toggle("show")};
document.addEventListener("click",e=>{if(!e.target.closest(".dd"))$("#pm").classList.remove("show")});
route();
