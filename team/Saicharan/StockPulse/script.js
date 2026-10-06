'use strict';
/* StockPulse — frontend-only paper trading demo. All prices are static demo values. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PAGE = document.body.dataset.page, ROOT = document.body.dataset.root === '1';
const link = p => ROOT ? (p === 'dashboard' ? 'index.html' : `pages/${p}.html`) : (p === 'dashboard' ? '../index.html' : `${p}.html`);
const inr = n => (n < 0 ? '-' : '') + '₹' + Math.abs(n).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const sgn = n => (n >= 0 ? '+' : '') + n.toFixed(2);
const cls = n => n >= 0 ? 'up' : 'down';
const fdate = d => new Date(d).toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'});

/* ---------- Static demo data (real companies, demo values) ---------- */
const RAW = [ // sym, name, sector, price, prevClose, open, high, low, volume(M), mcap(₹ lakh cr), P/E, 52wH, 52wL
['RELIANCE','Reliance Industries','Energy',2945.5,2921.3,2928,2958.7,2915.2,6.4,19.93,28.4,3217.9,2220.3],
['TCS','Tata Consultancy Services','IT',3980.2,4012.6,4005,4018.4,3962.1,2.1,14.4,31.2,4592.25,3311.8],
['INFY','Infosys','IT',1865.4,1849.1,1852,1872.6,1846.3,7.9,7.74,26.8,1991,1358.35],
['HDFCBANK','HDFC Bank','Banking',1712.6,1698.8,1701,1719.4,1695.5,11.2,13.02,19.6,1794,1363.55],
['ICICIBANK','ICICI Bank','Banking',1245.8,1252.4,1251,1256.9,1238.6,9.3,8.76,18.9,1362.35,970],
['SBIN','State Bank of India','Banking',812.35,805.2,807,816.4,803.9,14.8,7.25,10.4,912,600.65],
['ITC','ITC','FMCG',468.9,472.3,471.5,473.1,466.4,12.6,5.85,27.1,528.5,399.35],
['WIPRO','Wipro','IT',298.45,295.1,296,300.2,294.8,6.1,3.12,23.4,324.6,208.5],
['HCLTECH','HCL Technologies','IT',1642.75,1658.3,1656,1661.9,1630.4,2.8,4.46,25.3,1861.5,1235],
['BHARTIARTL','Bharti Airtel','Telecom',1698.3,1684.5,1688,1705.8,1682.1,3.9,10.17,74.6,1779,1085],
['LT','Larsen & Toubro','Infrastructure',3615,3589.4,3594,3631.2,3585.7,1.7,4.97,33.8,3963.5,2965.3],
['MARUTI','Maruti Suzuki','Automobile',12890,12965.5,12950,12975,12842.3,0.6,4.05,27.9,13680,10725],
['SUNPHARMA','Sun Pharmaceutical','Pharma',1785.2,1762.4,1766,1792.5,1760.8,2.2,4.28,38.7,1960.35,1308],
['TITAN','Titan Company','Consumer',3420.6,3446.8,3441,3452.3,3405.2,1.3,3.04,88.2,3886.95,3055],
['TATASTEEL','Tata Steel','Metals',158.75,156.9,157.2,159.6,156.45,38.4,1.98,62.5,184.6,120.2],
['AXISBANK','Axis Bank','Banking',1182.4,1171.2,1174,1188.3,1169.8,6.7,3.66,13.8,1339.65,995.65],
['KOTAKBANK','Kotak Mahindra Bank','Banking',1765.9,1779.4,1777,1782.6,1758.3,3.4,3.51,19.2,1942,1543.85],
['BAJFINANCE','Bajaj Finance','Financial Services',6980.5,6925.1,6934,7004.8,6921.5,1.1,4.32,32.6,8192,6187.8],
['ASIANPAINT','Asian Paints','Consumer',2395.1,2412.6,2409,2416.8,2386.4,1.5,2.3,55.3,3394.9,2124.75],
['HINDUNILVR','Hindustan Unilever','FMCG',2540.8,2528.1,2531,2549.3,2524.6,1.9,5.97,54.8,2859.3,2172.05]];
const STOCKS = RAW.map(a => { const s = {sym: a[0], name: a[1], sector: a[2], price: a[3], prev: a[4], open: a[5], high: a[6], low: a[7], vol: a[8], mcap: a[9], pe: a[10], h52: a[11], l52: a[12], exch: 'NSE'};
  s.chg = s.price - s.prev; s.pct = s.chg / s.prev * 100; return s; });
const stock = sym => STOCKS.find(s => s.sym === sym);
const INDEXES = [['NIFTY 50', 24850.35, 24762.1], ['SENSEX', 81260.9, 80987.45], ['NIFTY BANK', 52140.7, 52225.9], ['NIFTY IT', 38420.15, 38105.6]];

/* ---------- Deterministic history series (static, seeded) ---------- */
const rnd = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const hash = s => [...s].reduce((a, c) => Math.imul(a, 31) + c.charCodeAt(0) | 0, 7);
const PER = {'1D': [48, .0016], '1W': [35, .004], '1M': [30, .008], '6M': [60, .014], '1Y': [78, .02], '5Y': [100, .045]};
const cache = {};
function series(key, per, last) {
  const k = key + per; if (cache[k]) return cache[k];
  const [n, vol] = PER[per], r = rnd(hash(k)), p = new Array(n); p[n - 1] = last;
  for (let i = n - 2; i >= 0; i--) p[i] = p[i + 1] * (1 + (r() - .5) * 2 * vol - vol * .05);
  return cache[k] = p;
}
const sSeries = (sym, per) => series(sym, per, stock(sym).price);

/* ---------- State (LocalStorage) ---------- */
const KEY = 'stockpulse-v1', CASH0 = 1000000;
function seed() {
  const day = 864e5, now = Date.now(), H = [['RELIANCE', 40, 2810, 60], ['TCS', 25, 3720, 52], ['HDFCBANK', 60, 1655, 45], ['INFY', 50, 1790, 38], ['ITC', 150, 425, 30], ['SBIN', 80, 745, 21], ['SUNPHARMA', 20, 1620, 12]];
  const st = {cash: CASH0, holdings: {}, tx: [], watch: ['TCS', 'RELIANCE', 'BAJFINANCE', 'MARUTI', 'KOTAKBANK'], alerts: [], notes: [], set: {anim: true, notify: true}};
  H.forEach(([sym, qty, avg, ago], i) => { st.holdings[sym] = {qty, avg}; st.cash -= qty * avg;
    st.tx.unshift({id: i + 1, sym, type: 'BUY', qty, price: avg, total: qty * avg, date: new Date(now - ago * day).toISOString(), status: 'Completed'}); });
  return st;
}
let state; try { state = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch (e) { state = seed(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };
document.body.classList.toggle('no-anim', !state.set.anim);
const U = {m: {f: 'all', q: '', sec: 'All', key: 'sym', dir: 1}, w: {q: '', key: 'sym'}, t: {q: '', type: 'All'}, n: 'All', per: '1M', ap: '1M'};

/* ---------- Portfolio maths ---------- */
function pf() {
  const rows = Object.entries(state.holdings).map(([sym, h]) => { const s = stock(sym), inv = h.qty * h.avg, cur = h.qty * s.price;
    return {sym, s, qty: h.qty, avg: h.avg, inv, cur, pl: cur - inv, plp: (cur - inv) / inv * 100, day: h.qty * s.chg}; });
  const sum = k => rows.reduce((a, r) => a + r[k], 0), inv = sum('inv'), cur = sum('cur');
  return {rows, inv, cur, pl: cur - inv, ret: inv ? (cur - inv) / inv * 100 : 0, day: sum('day'), cash: state.cash};
}
function trade(sym, side, qty) {
  qty = Math.floor(+qty); const s = stock(sym), total = Math.round(qty * s.price * 100) / 100, h = state.holdings[sym];
  if (!(qty > 0)) return err('Enter a quantity of at least 1.');
  if (side === 'BUY') {
    if (total > state.cash) return err(`Not enough virtual cash. You need ${inr(total)} but have ${inr(state.cash)}.`);
    state.holdings[sym] = h ? {qty: h.qty + qty, avg: (h.qty * h.avg + total) / (h.qty + qty)} : {qty, avg: s.price}; state.cash -= total;
  } else {
    if (!h || qty > h.qty) return err(`You hold only ${h ? h.qty : 0} shares of ${sym}.`);
    h.qty -= qty; state.cash += total; if (!h.qty) delete state.holdings[sym];
  }
  state.tx.unshift({id: Date.now(), sym, type: side, qty, price: s.price, total, date: new Date().toISOString(), status: 'Completed'});
  save(); notify(`${side === 'BUY' ? 'Bought' : 'Sold'} ${qty} ${sym} @ ${inr(s.price)} (simulated)`); return true;
}

/* ---------- UI helpers ---------- */
function toast(msg, bad) { let t = $('#toasts'); if (!t) return; const d = document.createElement('div'); d.className = 'toast' + (bad ? ' err' : ''); d.textContent = msg; t.append(d); setTimeout(() => d.remove(), 3500); }
function notify(msg) { if (!state.set.notify) return; state.notes.unshift({msg, t: Date.now()}); state.notes = state.notes.slice(0, 20); save(); toast(msg); }
function err(msg) { toast(msg, true); return false; }
function modal(html) { closeModal(); const m = document.createElement('div'); m.className = 'modal'; m.id = 'modal'; m.innerHTML = `<div class="box">${html}</div>`; document.body.append(m); }
function closeModal() { const m = $('#modal'); if (m) m.remove(); }
function csv(name, rows) { const t = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([t], {type: 'text/csv'})); a.download = name; a.click(); URL.revokeObjectURL(a.href); }
const stockLink = sym => `${link('stock')}?s=${sym}`;
const COLORS = ['#7c5cff', '#2d8cff', '#34d3a1', '#c084fc', '#38bdf8', '#f472b6', '#a5b4fc', '#facc15'];
let gid = 0;
function lineChart(p, w = 640, h = 240) {
  const mn = Math.min(...p), mx = Math.max(...p), pad = (mx - mn) * .1 || 1, id = 'g' + gid++, c = p[p.length - 1] >= p[0] ? '#34d3a1' : '#ff6b8b';
  const X = i => 10 + i * (w - 20) / (p.length - 1), Y = v => h - 16 - (v - mn + pad) / (mx - mn + 2 * pad) * (h - 32), pts = p.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="Price chart"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient></defs>
  ${[0, 1, 2, 3].map(i => `<line x1="10" x2="${w - 10}" y1="${16 + i * (h - 32) / 3}" y2="${16 + i * (h - 32) / 3}" stroke="rgba(255,255,255,.07)"/>`).join('')}
  <polygon points="10,${h - 16} ${pts} ${w - 10},${h - 16}" fill="url(#${id})"/><polyline points="${pts}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="${X(p.length - 1)}" cy="${Y(p[p.length - 1])}" r="5" fill="${c}"/><text x="12" y="12" fill="#9a9a9f" font-size="11">High ${mx.toLocaleString('en-IN', {maximumFractionDigits: 2})}</text><text x="12" y="${h - 2}" fill="#9a9a9f" font-size="11">Low ${mn.toLocaleString('en-IN', {maximumFractionDigits: 2})}</text></svg>`;
}
function spark(p) { const mn = Math.min(...p), mx = Math.max(...p), pts = p.map((v, i) => `${(i * 100 / (p.length - 1)).toFixed(1)},${(26 - (v - mn) / (mx - mn || 1) * 24).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 100 28" width="100%" height="34" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="${p[p.length - 1] >= p[0] ? '#34d3a1' : '#ff6b8b'}" stroke-width="1.8"/></svg>`; }
function donut(data) {
  const tot = data.reduce((a, d) => a + d.value, 0) || 1; let off = 0;
  const arcs = data.map((d, i) => { const len = d.value / tot * 100, a = `<circle r="15.9" cx="21" cy="21" fill="none" stroke="${COLORS[i % 8]}" stroke-width="6" stroke-dasharray="${len} ${100 - len}" stroke-dashoffset="${-off}" transform="rotate(-90 21 21)"><title>${d.label}: ${len.toFixed(1)}%</title></circle>`; off += len; return a; }).join('');
  return `<div class="donut"><svg viewBox="0 0 42 42">${arcs}</svg><ul class="legend">${data.map((d, i) => `<li><span class="dot" style="background:${COLORS[i % 8]}"></span>${d.label} · ${(d.value / tot * 100).toFixed(1)}%</li>`).join('')}</ul></div>`;
}
function hbars(data, unit = '%') { const mx = Math.max(...data.map(d => Math.abs(d.value)), 1); return data.map(d => `<div class="hbar"><span>${d.label}</span><div><i style="width:${Math.abs(d.value) / mx * 100}%;${d.value < 0 ? 'background:#ff6b8b' : ''}"></i></div><b class="${cls(d.value)}">${d.value.toFixed(1)}${unit}</b></div>`).join(''); }
const kpi = (l, v, sub, c = '') => `<div class="card kpi"><span class="lab">${l}</span><b class="${c}">${v}</b><small class="${c || 'mut'}">${sub}</small></div>`;
function table(head, body, id = '') { return `<div class="card tw"><table><thead><tr>${head}</tr></thead><tbody ${id ? `id="${id}"` : ''}>${body}</tbody></table></div>`; }
const watchBtn = sym => `<button class="star ${state.watch.includes(sym) ? 'on' : ''}" data-act="watch" data-sym="${sym}" aria-label="Toggle watchlist ${sym}">★</button>`;
const txRow = t => `<tr><td><b>${t.sym}</b></td><td><span class="badge ${t.type === 'BUY' ? 'g' : 'r'}">${t.type}</span></td><td>${t.qty}</td><td>${inr(t.price)}</td><td>${inr(t.total)}</td><td>${fdate(t.date)}</td><td><span class="badge">${t.status}</span></td></tr>`;

/* ---------- Trade modal ---------- */
function openTrade(sym, side = 'BUY') {
  sym = sym || STOCKS[0].sym; let sd = side;
  modal(`<h2>Paper trade</h2><span class="tag">PAPER TRADING / SIMULATION — no real money</span>
  <select id="tSym" class="in" aria-label="Stock">${STOCKS.map(s => `<option value="${s.sym}" ${s.sym === sym ? 'selected' : ''}>${s.sym} — ${s.name}</option>`).join('')}</select>
  <div class="seg"><button data-side="BUY">Buy</button><button data-side="SELL">Sell</button></div>
  <input id="tQty" class="in" type="number" min="1" step="1" value="1" aria-label="Quantity"><div class="sum" id="tSum"></div>
  <div class="row-b"><button class="btn" data-act="close">Cancel</button><button class="btn pri" id="tGo">Confirm order</button></div>`);
  const upd = () => { const s = stock($('#tSym').value), q = Math.max(0, Math.floor(+$('#tQty').value) || 0), h = state.holdings[s.sym];
    $$('.seg button').forEach(b => b.classList.toggle('on', b.dataset.side === sd));
    $('#tSum').innerHTML = `<span>Price: <b>${inr(s.price)}</b> (demo)</span><span>Total: <b>${inr(q * s.price)}</b></span><span class="mut">Cash: ${inr(state.cash)} · You hold: ${h ? h.qty : 0} shares</span>`; };
  $$('.seg button').forEach(b => b.onclick = () => { sd = b.dataset.side; upd(); });
  $('#tSym').onchange = upd; $('#tQty').oninput = upd; upd();
  $('#tGo').onclick = () => { if (trade($('#tSym').value, sd, $('#tQty').value)) { closeModal(); route(); } };
}
function toggleWatch(sym) { const i = state.watch.indexOf(sym); i < 0 ? state.watch.push(sym) : state.watch.splice(i, 1); save(); notify(`${sym} ${i < 0 ? 'added to' : 'removed from'} watchlist`); }

/* ---------- Pages ---------- */
function moodCard(title, icon, list) {
  const g = list.filter(s => s.pct > 0).sort((a, b) => b.pct - a.pct).slice(0, 3), l = list.filter(s => s.pct < 0).sort((a, b) => a.pct - b.pct).slice(0, 3);
  const adv = Math.round(list.filter(s => s.pct > 0).length / list.length * 100), av = list.reduce((a, s) => a + Math.abs(s.pct), 0) / list.length, vl = av < .6 ? 'Low' : av < 1 ? 'Medium' : 'High';
  const rows = a => a.map(s => `<a class="row" href="${stockLink(s.sym)}"><span>${s.sym}</span><b class="${cls(s.pct)}">${sgn(s.pct)}%</b></a>`).join('') || '<span class="mut">None today</span>';
  return `<section class="card"><div class="card-h"><span class="ico-c">${icon}</span><div><h3>${title}</h3><small>${list.length} stocks · Vol ${list.reduce((a, s) => a + s.vol, 0).toFixed(1)}M</small></div><span class="vpill">● ${vl} volatility</span></div>
  <div class="two"><div><span class="lab">Top gainers</span>${rows(g)}</div><div><span class="lab">Top losers</span>${rows(l)}</div></div>
  <div class="mood"><span class="lab">Market mood</span><div class="mbar"><i style="width:${adv}%"></i></div><small>${adv}%</small></div></section>`;
}
function pageDashboard(v) {
  const p = pf(), by = secs => STOCKS.filter(s => secs.includes(s.sector));
  v.innerHTML = `<div class="grid5">${kpi('Portfolio value', inr(p.cur), 'Current holdings')}${kpi('Invested amount', inr(p.inv), `${p.rows.length} holdings`)}${kpi('Available cash', inr(p.cash), 'Virtual balance')}
  ${kpi("Today's P/L", inr(p.day), `${sgn(p.cur - p.day ? p.day / (p.cur - p.day) * 100 : 0)}% today`, cls(p.day))}${kpi('Portfolio return', sgn(p.ret) + '%', inr(p.pl) + ' overall', cls(p.pl))}</div>
  <h2 class="sec">Market indexes <span class="mut">(demo values)</span></h2><div class="grid4">${INDEXES.map(([n, val, pv]) => { const c = val - pv, pc = c / pv * 100; return `<div class="card"><span class="lab">${n}</span><b style="font-size:1.3rem">${val.toLocaleString('en-IN', {minimumFractionDigits: 2})}</b><br><small class="${cls(c)}">${sgn(c)} (${sgn(pc)}%)</small>${spark(series(n, '1M', val))}</div>`; }).join('')}</div>
  <h2 class="sec">Market overview</h2><div class="grid2">${moodCard('All markets', '📊', STOCKS)}${moodCard('Banking & finance', '🏦', by(['Banking', 'Financial Services']))}${moodCard('Information technology', '💻', by(['IT']))}${moodCard('Consumer & auto', '🛍️', by(['FMCG', 'Consumer', 'Automobile']))}</div>
  <div class="grid2"><section class="card"><div class="card-h"><h3>Recent transactions</h3><a class="vpill" href="${link('transactions')}">View all</a></div>${state.tx.slice(0, 5).map(t => `<div class="row"><span>${t.type} ${t.qty} ${t.sym}</span><span class="mut">${inr(t.total)}</span></div>`).join('') || '<p class="mut">No transactions yet.</p>'}</section>
  <section class="card"><div class="card-h"><h3>Watchlist</h3><a class="vpill" href="${link('watchlist')}">Manage</a></div>${state.watch.slice(0, 5).map(stock).map(s => `<a class="row" href="${stockLink(s.sym)}"><span>${s.sym}</span><span>${inr(s.price)} <b class="${cls(s.pct)}" style="font-size:.95rem">${sgn(s.pct)}%</b></span></a>`).join('') || '<p class="mut">Watchlist is empty.</p>'}</section></div>`;
}
function pageMarkets(v) {
  const m = U.m, f = new URLSearchParams(location.search).get('f'); if (f) m.f = f;
  const secs = ['All', ...new Set(STOCKS.map(s => s.sector))], cols = [['sym', 'Symbol'], ['name', 'Company'], ['sector', 'Sector'], ['price', 'Price'], ['chg', 'Change'], ['pct', '% Change'], ['vol', 'Volume'], ['mcap', 'Mkt cap'], ['pe', 'P/E']];
  v.innerHTML = `<div class="toolbar"><input class="in grow" id="mq" type="search" placeholder="Search company or ticker" value="${m.q}" aria-label="Search stocks"><select class="in" id="ms" aria-label="Sector">${secs.map(s => `<option ${s === m.sec ? 'selected' : ''}>${s}</option>`).join('')}</select>
  <div class="chips">${['all', 'gainers', 'losers'].map(x => `<button class="chip" data-f="${x}">${x[0].toUpperCase() + x.slice(1)}</button>`).join('')}</div></div>
  ${table(cols.map(c => `<th data-k="${c[0]}">${c[1]}</th>`).join('') + '<th></th>', '', 'mb')}<p class="mut">Demo/Static Market Data. Volume in millions; market cap in ₹ lakh crore.</p>`;
  const draw = () => {
    let l = STOCKS.filter(s => (m.sec === 'All' || s.sector === m.sec) && (m.f === 'all' || (m.f === 'gainers' ? s.pct > 0 : s.pct < 0)) && (s.sym + s.name).toLowerCase().includes(m.q));
    l.sort((a, b) => (typeof a[m.key] === 'string' ? a[m.key].localeCompare(b[m.key]) : a[m.key] - b[m.key]) * m.dir);
    $('#mb').innerHTML = l.map(s => `<tr data-sym="${s.sym}"><td><b>${s.sym}</b></td><td>${s.name}</td><td>${s.sector}</td><td>${inr(s.price)}</td><td class="${cls(s.chg)}">${sgn(s.chg)}</td><td class="${cls(s.pct)}">${sgn(s.pct)}%</td><td>${s.vol}M</td><td>₹${s.mcap}L Cr</td><td>${s.pe}</td><td>${watchBtn(s.sym)} <button class="btn sm pri" data-act="trade" data-sym="${s.sym}">Trade</button></td></tr>`).join('') || '<tr><td colspan="10">No stocks match your filters.</td></tr>';
    $$('.chip[data-f]').forEach(c => c.classList.toggle('on', c.dataset.f === m.f));
  };
  $('#mq').oninput = e => { m.q = e.target.value.toLowerCase(); draw(); }; $('#ms').onchange = e => { m.sec = e.target.value; draw(); };
  $$('.chip[data-f]').forEach(c => c.onclick = () => { m.f = c.dataset.f; draw(); });
  $$('th[data-k]').forEach(h => h.onclick = () => { m.dir = m.key === h.dataset.k ? -m.dir : 1; m.key = h.dataset.k; draw(); }); draw();
}
function pageWatchlist(v) {
  const w = U.w;
  v.innerHTML = `<div class="toolbar"><input class="in grow" id="wAdd" list="wl" placeholder="Add a stock (name or ticker)" aria-label="Add stock"><datalist id="wl">${STOCKS.map(s => `<option value="${s.sym}">${s.name}</option>`).join('')}</datalist><button class="btn pri" id="wBtn">Add to watchlist</button></div>
  <div class="toolbar"><input class="in grow" id="wq" type="search" placeholder="Search watchlist" value="${w.q}"><select class="in" id="wk" aria-label="Sort"><option value="sym">Sort: Symbol</option><option value="price">Price</option><option value="pct">% Change</option></select></div><div id="wt"></div>`;
  $('#wk').value = w.key;
  const draw = () => { let l = state.watch.map(stock).filter(s => (s.sym + s.name).toLowerCase().includes(w.q)); l.sort((a, b) => w.key === 'sym' ? a.sym.localeCompare(b.sym) : b[w.key] - a[w.key]);
    $('#wt').innerHTML = l.length ? table('<th>Symbol</th><th>Company</th><th>Price</th><th>Change</th><th>% Change</th><th></th>', l.map(s => `<tr data-sym="${s.sym}"><td><b>${s.sym}</b></td><td>${s.name}</td><td>${inr(s.price)}</td><td class="${cls(s.chg)}">${sgn(s.chg)}</td><td class="${cls(s.pct)}">${sgn(s.pct)}%</td><td><button class="btn sm pri" data-act="trade" data-sym="${s.sym}">Trade</button> <button class="btn sm red" data-act="watch" data-sym="${s.sym}">Remove</button></td></tr>`).join('')) : '<div class="card mut">Nothing here. Add a stock above or star one on the Markets page.</div>'; };
  $('#wq').oninput = e => { w.q = e.target.value.toLowerCase(); draw(); }; $('#wk').onchange = e => { w.key = e.target.value; draw(); };
  const add = () => { const t = $('#wAdd').value.trim().toLowerCase(), s = STOCKS.find(x => x.sym.toLowerCase() === t || x.name.toLowerCase() === t); if (!s) return err('No matching stock. Pick one from the suggestions.'); if (state.watch.includes(s.sym)) return err(`${s.sym} is already in your watchlist.`); toggleWatch(s.sym); $('#wAdd').value = ''; draw(); };
  $('#wBtn').onclick = add; $('#wAdd').onkeydown = e => { if (e.key === 'Enter') add(); }; draw();
}
function pageStock(v) {
  const sym = new URLSearchParams(location.search).get('s'), s = sym && stock(sym.toUpperCase());
  v.innerHTML = `<div class="toolbar"><input class="in grow" id="eq" type="search" placeholder="Explore: search by company name or ticker" aria-label="Stock explorer"></div><div id="er"></div><div id="sd"></div>`;
  const res = () => { const q = $('#eq').value.toLowerCase().trim(); $('#er').innerHTML = q ? `<div class="res">${STOCKS.filter(x => (x.sym + x.name).toLowerCase().includes(q)).map(x => `<a class="card" href="${stockLink(x.sym)}"><b>${x.sym}</b><br><small class="mut">${x.name}</small><br>${inr(x.price)} <span class="${cls(x.pct)}">${sgn(x.pct)}%</span></a>`).join('') || '<span class="mut">No matches.</span>'}</div>` : ''; };
  $('#eq').oninput = res;
  if (!s) { $('#sd').innerHTML = `<div class="card mut">Search above or pick a popular stock:</div><div class="res">${STOCKS.slice(0, 6).map(x => `<a class="card" href="${stockLink(x.sym)}"><b>${x.sym}</b><br><small class="mut">${x.name}</small></a>`).join('')}</div>`; return; }
  const h = state.holdings[s.sym];
  $('#sd').innerHTML = `<div class="card"><div class="card-h"><div><h2>${s.name} <small class="mut">${s.sym} · ${s.exch} · ${s.sector}</small></h2></div><span class="vpill">Demo price</span></div>
  <div style="font-size:2rem;font-weight:600">${inr(s.price)} <span class="${cls(s.chg)}" style="font-size:1.1rem">${sgn(s.chg)} (${sgn(s.pct)}%)</span></div>
  <div class="toolbar" style="margin:14px 0"><button class="btn pri" data-act="trade" data-sym="${s.sym}" data-side="BUY">Buy</button><button class="btn red" data-act="trade" data-sym="${s.sym}" data-side="SELL">Sell</button>${watchBtn(s.sym)}<a class="btn" href="${link('alerts')}?s=${s.sym}">Set alert</a></div>
  <div class="chips" id="pb" style="margin-bottom:10px">${Object.keys(PER).map(k => `<button class="chip" data-p="${k}">${k}</button>`).join('')}</div><div id="sc"></div></div>
  <div class="card"><div class="stats">${[['Previous close', inr(s.prev)], ['Open', inr(s.open)], ['Day high', inr(s.high)], ['Day low', inr(s.low)], ['Volume', s.vol + 'M'], ['Market cap', '₹' + s.mcap + ' lakh Cr'], ['P/E ratio', s.pe], ['52-week high', inr(s.h52)], ['52-week low', inr(s.l52)], ['Sector', s.sector], ['Exchange', s.exch], ['Your holding', h ? `${h.qty} @ ${inr(h.avg)}` : 'None']].map(([a, b]) => `<div><span class="lab">${a}</span><b>${b}</b></div>`).join('')}</div></div>`;
  const per = k => { U.per = k; $$('#pb .chip').forEach(c => c.classList.toggle('on', c.dataset.p === k)); $('#sc').innerHTML = lineChart(sSeries(s.sym, k)); };
  $$('#pb .chip').forEach(c => c.onclick = () => per(c.dataset.p)); per(U.per);
}
function pagePortfolio(v) {
  const p = pf();
  const perf = p.rows.length ? Array.from({length: PER['1M'][0]}, (_, i) => p.rows.reduce((a, r) => a + r.qty * sSeries(r.sym, '1M')[i], 0)) : null;
  v.innerHTML = `<span class="tag">PAPER TRADING / SIMULATION — virtual money only</span><div class="grid5">${kpi('Current value', inr(p.cur), '')}${kpi('Invested', inr(p.inv), '')}${kpi('Total P/L', inr(p.pl), sgn(p.ret) + '%', cls(p.pl))}${kpi("Today's P/L", inr(p.day), '', cls(p.day))}${kpi('Cash', inr(p.cash), '')}</div>
  ${p.rows.length ? table('<th>Stock</th><th>Qty</th><th>Avg price</th><th>Current</th><th>Invested</th><th>Value</th><th>P/L</th><th>P/L %</th><th></th>', p.rows.map(r => `<tr data-sym="${r.sym}"><td><b>${r.sym}</b></td><td>${r.qty}</td><td>${inr(r.avg)}</td><td>${inr(r.s.price)}</td><td>${inr(r.inv)}</td><td>${inr(r.cur)}</td><td class="${cls(r.pl)}">${inr(r.pl)}</td><td class="${cls(r.plp)}">${sgn(r.plp)}%</td><td><button class="btn sm pri" data-act="trade" data-sym="${r.sym}" data-side="BUY">Buy</button> <button class="btn sm red" data-act="trade" data-sym="${r.sym}" data-side="SELL">Sell</button></td></tr>`).join('')) : '<div class="card mut">No holdings yet. Open Markets and place a simulated buy.</div>'}
  ${p.rows.length ? `<div class="grid2"><section class="card"><h3>Allocation</h3><br>${donut(p.rows.map(r => ({label: r.sym, value: r.cur})))}</section><section class="card"><h3>Performance (1M, demo)</h3>${lineChart(perf)}</section></div>` : ''}`;
}
function pageTransactions(v) {
  const t = U.t; v.innerHTML = `<span class="tag">Simulated orders only</span><div class="toolbar"><input class="in grow" id="tq" type="search" placeholder="Search by stock" value="${t.q}"><select class="in" id="tt" aria-label="Type">${['All', 'BUY', 'SELL'].map(x => `<option ${x === t.type ? 'selected' : ''}>${x}</option>`).join('')}</select><button class="btn pri" id="tc">Export CSV</button></div><div id="tl"></div>`;
  const list = () => state.tx.filter(x => (t.type === 'All' || x.type === t.type) && x.sym.toLowerCase().includes(t.q));
  const draw = () => { const l = list(); $('#tl').innerHTML = l.length ? table('<th>Stock</th><th>Type</th><th>Qty</th><th>Price</th><th>Total</th><th>Date</th><th>Status</th>', l.map(txRow).join('')) : '<div class="card mut">No transactions match.</div>'; };
  $('#tq').oninput = e => { t.q = e.target.value.toLowerCase(); draw(); }; $('#tt').onchange = e => { t.type = e.target.value; draw(); };
  $('#tc').onclick = () => { const l = list(); if (!l.length) return err('Nothing to export.'); csv('stockpulse-transactions.csv', [['Stock', 'Type', 'Quantity', 'Price', 'Total', 'Date', 'Status'], ...l.map(x => [x.sym, x.type, x.qty, x.price.toFixed(2), x.total.toFixed(2), fdate(x.date), x.status])]); notify(`Exported ${l.length} transactions`); }; draw();
}
function pageAnalytics(v) {
  const p = pf(); if (!p.rows.length) { v.innerHTML = '<div class="card mut">Analytics needs holdings. Buy a stock in the simulator first.</div>'; return; }
  const draw = () => {
    const per = U.ap, n = PER[per][0], pv = Array.from({length: n}, (_, i) => p.rows.reduce((a, r) => a + r.qty * sSeries(r.sym, per)[i], 0));
    const sec = {}; p.rows.forEach(r => sec[r.s.sector] = (sec[r.s.sector] || 0) + r.cur);
    const best = [...p.rows].sort((a, b) => b.plp - a.plp)[0], worst = [...p.rows].sort((a, b) => a.plp - b.plp)[0], size = n / 6, months = [];
    const d = new Date(); for (let i = 5; i >= 0; i--) { const m = new Date(d.getFullYear(), d.getMonth() - i, 1); months.push(m.toLocaleDateString('en-IN', {month: 'short'})); }
    const six = Array.from({length: 60}, (_, i) => p.rows.reduce((a, r) => a + r.qty * sSeries(r.sym, '6M')[i], 0)), mp = months.map((m, i) => { const a = six[Math.max(0, i * 10 - 1)], b = six[i * 10 + 9]; return {label: m, value: (b / a - 1) * 100}; });
    $('#av').innerHTML = `<div class="grid5">${kpi('Total P/L', inr(p.pl), sgn(p.ret) + '%', cls(p.pl))}${kpi('Best performer', best.sym, sgn(best.plp) + '%', 'up')}${kpi('Worst performer', worst.sym, sgn(worst.plp) + '%', cls(worst.plp))}${kpi("Today's P/L", inr(p.day), '', cls(p.day))}${kpi('Net worth', inr(p.cur + p.cash), 'Holdings + cash')}</div>
    <section class="card"><div class="card-h"><h3>Portfolio performance</h3><div class="chips">${['1M', '6M', '1Y'].map(k => `<button class="chip ${k === per ? 'on' : ''}" data-ap="${k}">${k}</button>`).join('')}</div></div>${lineChart(pv, 900, 260)}</section>
    <div class="grid2"><section class="card"><h3>Sector allocation</h3><br>${donut(Object.entries(sec).map(([label, value]) => ({label, value})))}</section><section class="card"><h3>Monthly performance (demo)</h3><br>${hbars(mp)}</section></div>
    <section class="card"><h3>Investment distribution</h3><br>${hbars(p.rows.map(r => ({label: r.sym, value: r.inv / p.inv * 100})))}</section>`;
    $$('[data-ap]').forEach(b => b.onclick = () => { U.ap = b.dataset.ap; draw(); });
  };
  v.innerHTML = '<div id="av" style="display:grid;gap:18px"></div>'; draw();
}
const NEWS = [['Market', 'Benchmarks end higher in demo session as banks lead', 'Sample story: NIFTY 50 and SENSEX close with gains in this demo dataset, helped by HDFC Bank and ICICI Bank.', '2h ago'],
['Market', 'Metal and energy names in focus', 'Sample story: Tata Steel and Reliance Industries see active trading in the demo market data.', '3h ago'],
['Banking', 'State Bank of India and Axis Bank draw buying interest', 'Sample story: Banking shares are among the session gainers in this demo.', '4h ago'],
['Banking', 'Kotak Mahindra Bank slips in sample session', 'Sample story: A mild decline for Kotak Mahindra Bank while peers trade mixed.', '5h ago'],
['Technology', 'IT stocks diverge: Infosys up, TCS and HCL Technologies lower', 'Sample story: Mixed moves across large IT names in the demo data.', '6h ago'],
['Technology', 'Wipro edges higher on steady volumes', 'Sample story: Wipro gains modestly on sample trading volumes.', '8h ago'],
['Companies', 'Sun Pharma and Bharti Airtel among top gainers', 'Sample story: Pharma and telecom names lead the gainers list in this demo.', '9h ago'],
['Companies', 'Maruti Suzuki and Titan trade lower', 'Sample story: Auto and consumer names drift down in the demo session.', '10h ago'],
['Economy', 'Sample outlook: investors watch inflation and rate commentary', 'Sample story: Generic placeholder text about economic indicators for demonstration only.', '1d ago'],
['Economy', 'Sample outlook: festive-season demand in focus', 'Sample story: Placeholder commentary on consumer demand for Asian Paints and ITC.', '1d ago']];
function pageNews(v) {
  const cats = ['All', 'Market', 'Banking', 'Technology', 'Companies', 'Economy'];
  v.innerHTML = `<span class="tag">Sample/demo content — not live news</span><div class="chips">${cats.map(c => `<button class="chip ${c === U.n ? 'on' : ''}" data-c="${c}">${c}</button>`).join('')}</div><div class="news" id="nl"></div>`;
  const draw = () => { $('#nl').innerHTML = NEWS.filter(n => U.n === 'All' || n[0] === U.n).map(n => `<article class="card"><span class="badge o">${n[0]}</span> <span class="mut">${n[3]} · Sample</span><h3 style="margin-top:8px">${n[1]}</h3><p>${n[2]}</p></article>`).join(''); $$('.chip[data-c]').forEach(c => c.classList.toggle('on', c.dataset.c === U.n)); };
  $$('.chip[data-c]').forEach(c => c.onclick = () => { U.n = c.dataset.c; draw(); }); draw();
}
function checkAlerts() {
  state.alerts.forEach(a => { if (a.on && !a.hit) { const p = stock(a.sym).price; if (a.cond === 'above' ? p >= a.target : p <= a.target) { a.hit = true; notify(`Alert: ${a.sym} is ${a.cond} ${inr(a.target)} (now ${inr(p)})`); } } }); save();
}
function pageAlerts(v) {
  const pre = new URLSearchParams(location.search).get('s') || STOCKS[0].sym;
  v.innerHTML = `<section class="card"><h3>Create price alert</h3><br><div class="toolbar"><select class="in" id="aS">${STOCKS.map(s => `<option value="${s.sym}" ${s.sym === pre ? 'selected' : ''}>${s.sym} — ${inr(s.price)}</option>`).join('')}</select><select class="in" id="aC"><option value="above">Price goes above</option><option value="below">Price goes below</option></select><input class="in" id="aT" type="number" min="0" step="0.05" placeholder="Target price (₹)"><button class="btn pri" id="aB">Create alert</button></div></section><div id="al"></div>`;
  const draw = () => { $('#al').innerHTML = state.alerts.length ? table('<th>Stock</th><th>Condition</th><th>Target</th><th>Current</th><th>Status</th><th></th>', state.alerts.map(a => `<tr><td><b>${a.sym}</b></td><td>${a.cond}</td><td>${inr(a.target)}</td><td>${inr(stock(a.sym).price)}</td><td><span class="badge ${a.hit ? 'g' : a.on ? 'o' : ''}">${a.hit ? 'Triggered' : a.on ? 'Active' : 'Paused'}</span></td><td><button class="btn sm" data-act="atog" data-id="${a.id}">${a.on ? 'Disable' : 'Enable'}</button> <button class="btn sm red" data-act="adel" data-id="${a.id}">Delete</button></td></tr>`).join('')) : '<div class="card mut">No alerts yet. Create one above.</div>'; };
  $('#aB').onclick = () => { const t = +$('#aT').value; if (!(t > 0)) return err('Enter a target price greater than 0.'); state.alerts.unshift({id: Date.now(), sym: $('#aS').value, cond: $('#aC').value, target: t, on: true, hit: false}); save(); toast('Alert created'); checkAlerts(); $('#aT').value = ''; draw(); };
  PAGES.redraw = draw; draw();
}
function pageSettings(v) {
  const sw = (k, l, d) => `<div class="setting"><div>${l}<div class="mut">${d}</div></div><button class="sw ${state.set[k] ? 'on' : ''}" data-act="set" data-k="${k}" role="switch" aria-checked="${state.set[k]}" aria-label="${l}"></button></div>`;
  v.innerHTML = `<section class="card"><h3>Interface preferences</h3>${sw('anim', 'Animations', 'Card rises, bar fills and hover motion')}${sw('notify', 'Notifications', 'Toast messages and the bell history')}</section>
  <section class="card"><h3>Data</h3><br><div class="chips"><button class="btn" data-act="clr" data-w="watch">Clear watchlist</button><button class="btn" data-act="clr" data-w="pf">Clear portfolio</button><button class="btn" data-act="clr" data-w="tx">Clear transaction history</button><button class="btn red" data-act="clr" data-w="all">Reset demo data</button></div><p class="mut" style="margin-top:12px">Clearing the portfolio removes all holdings and restores virtual cash to ₹10,00,000.</p></section>`;
}
const PAGES = {dashboard: pageDashboard, markets: pageMarkets, watchlist: pageWatchlist, stock: pageStock, portfolio: pagePortfolio, transactions: pageTransactions, analytics: pageAnalytics, news: pageNews, alerts: pageAlerts, settings: pageSettings};

/* ---------- Shell, router, events ---------- */
const NAV = [['dashboard', 'Dashboard', '⌂', 'Your paper-trading snapshot and the market today.'], ['markets', 'Markets', '⚡', 'Browse real NSE companies with demo prices. Click a row for details.'], ['watchlist', 'Watchlist', '★', 'Stocks you are tracking.'], ['portfolio', 'Portfolio', '◔', 'Holdings, allocation and performance.'], ['transactions', 'Transactions', '⇄', 'Simulated buy and sell history.'], ['analytics', 'Analytics', '▤', 'Performance, sectors and distribution.'], ['news', 'News', '✎', 'Sample financial headlines.'], ['alerts', 'Alerts', '⏰', 'Get notified when a demo price crosses your target.'], ['settings', 'Settings', '⚙', 'Preferences and demo data controls.']];
function shell() {
  const cur = NAV.find(n => n[0] === PAGE) || (PAGE === 'stock' ? ['stock', 'Stock Explorer', '', 'Search companies and open detailed demo data.'] : NAV[0]);
  const items = [...NAV.map(n => [n[0], n[1], n[2]]), ['stock', 'Explorer', '🔎']];
  document.body.innerHTML = `<div class="app"><aside class="side"><a class="brand" href="${link('dashboard')}"><span class="logo-mark">◈</span>StockPulse</a>
  <nav class="menu" aria-label="Main">${items.map(n => `<a class="${n[0] === PAGE ? 'on' : ''}" href="${link(n[0])}"><i>${n[2]}</i><span>${n[1]}</span></a>`).join('')}</nav>
  <div class="side-foot"><span class="demo">Demo / Static Market Data</span><small>Paper trading only</small></div></aside>
  <div class="content"><header class="top"><div><h1>${cur[1]}</h1><p>${cur[3]}</p></div><div class="hero-r"><button class="ico" data-act="bell" aria-label="Notifications">🔔${state.notes.length ? '<i></i>' : ''}</button><span class="avatar">SP</span></div></header>
  <main id="view"></main><p class="foot">StockPulse is a college UI project. Real company names and tickers, but all prices are static demo values, not live. Paper trading only — no real money.</p></div></div>
  <div class="cmd"><div class="chips">${[['Top gainers today', 'gainers'], ['Open RELIANCE', 'open reliance'], ['My portfolio', 'portfolio'], ['Set an alert', 'alert']].map(c => `<button class="chip" data-q="${c[1]}">${c[0]}</button>`).join('')}</div>
  <form id="cmdForm"><span class="sp">✦</span><input id="cmdIn" placeholder="Search a company or type a command…" aria-label="Command bar"><button type="submit" aria-label="Go">↵</button></form></div><div class="toasts" id="toasts" aria-live="polite"></div>`;
}
function route() { const v = $('#view'); v.innerHTML = ''; PAGES[PAGE](v); }
function runCmd(t) {
  t = t.toLowerCase().trim(); if (!t) return;
  const go = (p, q = '') => location.href = link(p) + q, m = t.match(/^(buy|sell)\s+(\w+)/);
  if (m && stock(m[2].toUpperCase())) return openTrade(m[2].toUpperCase(), m[1].toUpperCase());
  const keys = [['gainer', () => go('markets', '?f=gainers')], ['loser', () => go('markets', '?f=losers')], ['portfolio', () => go('portfolio')], ['alert', () => go('alerts')], ['news', () => go('news')], ['watch', () => go('watchlist')], ['analytic', () => go('analytics')], ['transaction', () => go('transactions')], ['setting', () => go('settings')], ['market', () => go('markets')]];
  const s = STOCKS.find(x => t.includes(x.sym.toLowerCase()) || t.includes(x.name.toLowerCase()) || x.name.toLowerCase().includes(t)); if (s) return go('stock', '?s=' + s.sym);
  const k = keys.find(k => t.includes(k[0])); k ? k[1]() : err('No match. Try a company, ticker, "portfolio" or "top gainers".');
}
document.addEventListener('click', e => {
  const q = e.target.closest('[data-q]'); if (q) return runCmd(q.dataset.q);
  const a = e.target.closest('[data-act]'), d = a ? a.dataset : {};
  if (!a) { const r = e.target.closest('tr[data-sym]'); if (r) location.href = stockLink(r.dataset.sym); if (e.target.id === 'modal') closeModal(); return; }
  e.stopPropagation();
  const A = {
    close: closeModal, trade: () => openTrade(d.sym, d.side || 'BUY'),
    watch: () => { toggleWatch(d.sym); a.classList.toggle('on', state.watch.includes(d.sym)); if (PAGE === 'watchlist') route(); },
    bell: () => modal(`<h2>Notifications</h2>${state.notes.map(n => `<div class="row"><span>${n.msg}</span></div>`).join('') || '<p class="mut">No notifications yet.</p>'}<div class="row-b"><button class="btn" data-act="close">Close</button></div>`),
    atog: () => { const x = state.alerts.find(z => z.id == d.id); x.on = !x.on; x.hit = false; save(); checkAlerts(); PAGES.redraw(); },
    adel: () => { state.alerts = state.alerts.filter(z => z.id != d.id); save(); toast('Alert deleted'); PAGES.redraw(); },
    set: () => { state.set[d.k] = !state.set[d.k]; save(); document.body.classList.toggle('no-anim', !state.set.anim); a.classList.toggle('on', state.set[d.k]); toast(`${d.k === 'anim' ? 'Animations' : 'Notifications'} ${state.set[d.k] ? 'on' : 'off'}`); },
    clr: () => { const msg = {watch: 'Clear the watchlist?', pf: 'Clear all holdings and reset cash?', tx: 'Clear transaction history?', all: 'Reset all demo data?'}[d.w]; if (!confirm(msg)) return;
      if (d.w === 'watch') state.watch = []; if (d.w === 'pf') { state.holdings = {}; state.cash = CASH0; } if (d.w === 'tx') state.tx = []; if (d.w === 'all') { const s = state.set; state = seed(); state.set = s; }
      save(); toast('Done'); }
  };
  (A[d.act] || (() => {}))();
});
document.addEventListener('submit', e => { if (e.target.id === 'cmdForm') { e.preventDefault(); runCmd($('#cmdIn').value); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
shell(); checkAlerts(); route();
