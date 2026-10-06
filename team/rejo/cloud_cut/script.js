
const IMGS=["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=700&q=70","https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=700&q=70"];
const state={yearly:false,plan:'Pro',price:19};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function go(v){
  const t=document.getElementById(v); if(!t||!t.classList.contains('view'))return;
  $$('.view').forEach(s=>s.classList.remove('active'));
  t.classList.add('active'); document.body.dataset.view=v;
  $$('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.go===v));
  if(location.hash!=='#'+v)history.pushState(null,'','#'+v);
  window.scrollTo(0,0); if(v==='checkout')renderSummary();
}
document.addEventListener('click',e=>{
  const p=e.target.closest('[data-plan]');
  if(p){state.plan=p.dataset.plan;state.price=+(state.yearly?p.dataset.y:p.dataset.m);}
  const a=e.target.closest('[data-go]'); if(a){e.preventDefault();go(a.dataset.go);}
});
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-next]');if(f){e.preventDefault();go(f.dataset.next);}});
window.addEventListener('popstate',()=>go(location.hash.slice(1)||'landing'));
/* pricing toggle */
function renderPrices(){
  $('#billSw').classList.toggle('on',state.yearly);
  $$('[data-m]').forEach(el=>{const v=state.yearly?el.dataset.y:el.dataset.m;const n=el.querySelector('.n');if(n)n.textContent=v;el.dataset.price=v;});
  $$('.per').forEach(el=>el.textContent=state.yearly?'/mo, billed yearly':'/month');
}
$('#billSw').onclick=()=>{state.yearly=!state.yearly;renderPrices();};
function renderSummary(){
  const t=state.yearly?state.price*12:state.price;
  $('#sumPlan').textContent=state.plan+' plan ('+(state.yearly?'yearly':'monthly')+')';
  $('#sumAmt').textContent='$'+t; $('#sumTot').textContent='$'+t;
  $('#payBtnAmt').textContent='$'+t; $('#okPlan').textContent=state.plan;
}
/* card input formatting */
$('#cardNum').addEventListener('input',e=>{e.target.value=e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();});
$('#cardExp').addEventListener('input',e=>{let v=e.target.value.replace(/\D/g,'').slice(0,4);e.target.value=v.length>2?v.slice(0,2)+'/'+v.slice(2):v;});
/* settings + export */
$$('.sw[data-pref]').forEach(s=>s.onclick=()=>s.classList.toggle('on'));
$('#accentPick').oninput=e=>document.documentElement.style.setProperty('--accent',e.target.value);
$$('.opt').forEach(o=>o.onclick=()=>{$$('.opt').forEach(x=>x.classList.remove('on'));o.classList.add('on');});
$$('.chips[data-single] .chip').forEach(c=>c.onclick=()=>{c.parentElement.querySelectorAll('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');});
$('#startExport').onclick=function(){
  const b=$('#expBar i'),m=$('#expMsg');let p=0;this.disabled=true;m.textContent='Exporting…';
  const t=setInterval(()=>{p+=Math.random()*9+3;if(p>=100){p=100;clearInterval(t);m.innerHTML='<i class="fa-solid fa-circle-check"></i> Export ready. Your download has started.';this.disabled=false;}b.style.width=p+'%';},180);
};
renderPrices();
(()=>{const f={b:100,c:100,s:100},img=$('#pvimg'),txt=$('#pvtxt');
const ap=()=>img.style.filter='brightness('+f.b+'%) contrast('+f.c+'%) saturate('+f.s+'%)';
$$('[data-f]').forEach(r=>r.oninput=()=>{f[r.dataset.f]=r.value;ap();});
$('#scl').oninput=e=>txt.style.transform='scale('+e.target.value/100+')';
$$('.mi').forEach(m=>m.onclick=()=>img.src=IMGS[+m.dataset.i]);
$$('[data-an]').forEach(b=>b.onclick=()=>{txt.style.animation='none';void txt.offsetWidth;txt.style.animation=b.dataset.an+' .9s ease';});
let t=0,iv=null;const ph=$('#ph'),tc=$('#tc'),pb=$('#play');
const draw=()=>{ph.style.left=(t/30*100)+'%';const s=Math.floor(t);tc.textContent='00:'+String(s).padStart(2,'0')+' / 00:30';};
pb.onclick=()=>{if(iv){clearInterval(iv);iv=null;pb.innerHTML='<i class="fa-solid fa-play"></i>';return;}pb.innerHTML='<i class="fa-solid fa-pause"></i>';iv=setInterval(()=>{t+=.1;if(t>=30){t=0;}draw();},100);};
$('#rew').onclick=()=>{t=0;draw();};})();
go(location.hash.slice(1)||'landing');
