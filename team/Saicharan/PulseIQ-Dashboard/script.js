'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => '$' + Math.round(n).toLocaleString('en-US');

/* ---------- Data ---------- */
const RANGES = {
  7:  {rev: 48200,  orders: 312,  cust: 241,  conv: 3.4, g: [8.2, 5.1, 4.3, 0.6], pts: [5.2,6.1,5.8,7.4,6.9,8.3,8.5]},
  30: {rev: 214800, orders: 1386, cust: 1042, conv: 3.8, g: [12.4, 9.7, 7.2, 0.4], pts: [38,44,41,52,49,58,61,57,66,72]},
  90: {rev: 631500, orders: 4120, cust: 2975, conv: 3.6, g: [18.9, 14.2, 11.5, -0.2], pts: [30,41,38,55,52,63,70,66,81,88]}
};
const names = ['Maya Chen','Liam Ortiz','Aisha Khan','Noah Patel','Sofia Rossi','Ethan Brooks','Zara Ahmed','Lucas Meyer','Priya Nair','Oliver Grant','Emma Dubois','Arjun Rao'];
const stat = ['Completed','Completed','Processing','Completed','Cancelled'];
const SALES = Array.from({length: 24}, (_, i) => ({
  id: '#PIQ-' + (4821 - i), customer: names[(i * 5) % 12],
  date: new Date(2026, 9, 6 - Math.floor(i * 1.3)).toISOString().slice(0, 10),
  amount: 40 + ((i * 137) % 460) + (i % 3) * 0.99, status: stat[(i * 3) % 5]
}));
const PRODUCTS = [
  {name:'Pulse Pro Plan', cat:'Subscription', units:1840, revenue:88320, perf:94},
  {name:'Insight Add-on', cat:'Add-on', units:1210, revenue:36300, perf:78},
  {name:'API Access Pack', cat:'Developer', units:690, revenue:41400, perf:71},
  {name:'Team Seats (10)', cat:'Subscription', units:520, revenue:31200, perf:64},
  {name:'Data Export Suite', cat:'Add-on', units:340, revenue:10200, perf:42},
  {name:'Onboarding Workshop', cat:'Service', units:95, revenue:19000, perf:35}
];
const SEGMENTS = {
  Premium: {n: 312, health: 92, note: 'High spend, low churn risk. Offer early access to new features.'},
  Regular: {n: 1184, health: 78, note: 'Steady monthly buyers. Upsell add-ons.'},
  New: {n: 428, health: 66, note: 'Joined in the last 30 days. Focus on onboarding.'},
  'At Risk': {n: 171, health: 34, note: 'No activity for 45+ days. Send a win-back offer.'}
};
const REPORTS = [
  {key:'Sales Performance Report', desc:'Revenue, orders and refunds for the selected range.'},
  {key:'Customer Report', desc:'Segments, retention and customer health.'},
  {key:'Product Report', desc:'Product ranking, units and performance.'}
];
const EVENTS = ['New order placed','Customer upgraded to Pro','Refund processed','New customer signed up','Report downloaded','Order shipped'];

/* ---------- State / settings ---------- */
const DEFAULTS = {glow: true, anim: true, compact: false, notify: true};
let settings = {...DEFAULTS};
try { settings = {...DEFAULTS, ...JSON.parse(localStorage.getItem('pulseiq-settings') || '{}')}; } catch (e) {}
const state = {range: 30, status: 'All', query: '', sort: 'revenue'};
let reports = [];

/* ---------- Toast ---------- */
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  $('#toasts').append(t);
  setTimeout(() => t.remove(), 3200);
}

/* ---------- Navigation ---------- */
function showTab(name) {
  $$('.tab').forEach(t => t.classList.toggle('active', t.id === 'tab-' + name));
  $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  if (name === 'products') renderProducts();
  scrollTo({top: 0});
}
$('#nav').addEventListener('click', e => { const b = e.target.closest('.nav-item'); if (b) showTab(b.dataset.tab); });

/* ---------- Overview ---------- */
function renderKpis() {
  const d = RANGES[state.range];
  const items = [
    ['Revenue', fmt(d.rev), d.g[0], 'Net of refunds'],
    ['Orders', d.orders.toLocaleString(), d.g[1], 'Avg ' + (d.orders / state.range).toFixed(1) + ' per day'],
    ['Customers', d.cust.toLocaleString(), d.g[2], 'Active in this period'],
    ['Conversion rate', d.conv + '%', d.g[3], 'Visitors → buyers']
  ];
  $('#kpiGrid').innerHTML = items.map(([l, v, g, back]) => `
    <div class="kpi" tabindex="0" role="button" aria-label="${l}: flip card"><div class="kpi-inner">
      <div class="face glass"><span class="kpi-label">${l}</span><span class="kpi-value">${v}</span>
        <span class="delta ${g < 0 ? 'neg' : ''}">${g < 0 ? '▼' : '▲'} ${Math.abs(g)}% vs previous</span></div>
      <div class="face back glass"><span class="kpi-label">${l}</span><span>${back}</span><span class="muted">Click to flip back</span></div>
    </div></div>`).join('');
}
function renderChart() {
  const p = RANGES[state.range].pts, W = 600, H = 220, max = Math.max(...p) * 1.15;
  const xy = p.map((v, i) => [30 + i * (W - 50) / (p.length - 1), H - 25 - v / max * (H - 50)]);
  const line = xy.map(([x, y]) => x + ',' + y).join(' ');
  $('#revChart').innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Revenue chart">
    ${[0, 1, 2, 3].map(i => `<line x1="30" x2="${W - 20}" y1="${25 + i * (H - 50) / 3}" y2="${25 + i * (H - 50) / 3}" stroke="rgba(255,255,255,.07)"/>`).join('')}
    <polygon points="30,${H - 25} ${line} ${W - 20},${H - 25}" fill="rgba(183,227,107,.09)"/>
    <polyline points="${line}" fill="none" stroke="#b7e36b" stroke-width="2.5" stroke-linejoin="round"/>
    ${xy.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4" fill="#b7e36b"><title>${fmt(p[i] * 1000)}</title></circle>`).join('')}</svg>`;
}
function renderStatus() {
  const c = {Completed: 0, Processing: 0, Cancelled: 0};
  SALES.forEach(s => c[s.status]++);
  const col = {Completed: '#b7e36b', Processing: '#e5c76b', Cancelled: '#e58a8a'}, tot = SALES.length;
  let off = 0;
  const arcs = Object.entries(c).map(([k, v]) => {
    const len = v / tot * 100, a = `<circle r="15.9" cx="21" cy="21" fill="none" stroke="${col[k]}" stroke-width="5" stroke-dasharray="${len} ${100 - len}" stroke-dashoffset="${-off}" transform="rotate(-90 21 21)"/>`;
    off += len; return a;
  }).join('');
  $('#statusChart').innerHTML = `<svg viewBox="0 0 42 42">${arcs}<text x="21" y="23" text-anchor="middle" fill="#ececec" font-size="7">${tot}</text></svg>
    <ul class="legend">${Object.entries(c).map(([k, v]) => `<li><span class="dot" style="background:${col[k]}"></span>${k} · ${v}</li>`).join('')}</ul>`;
}
function renderTop() {
  const p = PRODUCTS[0];
  $('#topProduct').innerHTML = `<p class="kpi-value">${p.name}</p><p class="muted">${p.cat} · ${p.units.toLocaleString()} units</p>
    <p style="margin:12px 0">${fmt(p.revenue)} revenue</p><div class="bar"><i style="width:${p.perf}%"></i></div>
    <p class="muted" style="margin-top:8px">${p.perf}% of target</p>`;
}
function addActivity(text, fresh) {
  const li = document.createElement('li');
  li.className = fresh ? 'fresh' : '';
  li.innerHTML = `<span>${text}</span><span class="muted">${fresh ? 'just now' : Math.ceil(Math.random() * 50) + ' min ago'}</span>`;
  const ul = $('#activityList'); ul.prepend(li);
  while (ul.children.length > 6) ul.lastChild.remove();
}

/* ---------- Sales ---------- */
function filteredSales() {
  const q = state.query.toLowerCase();
  return SALES.filter(s => (state.status === 'All' || s.status === state.status) &&
    (s.id + s.customer + s.date + s.status).toLowerCase().includes(q));
}
function renderSales() {
  const rows = filteredSales();
  $('#salesBody').innerHTML = rows.length ? rows.map(s => `<tr><td>${s.id}</td><td>${s.customer}</td><td>${s.date}</td>
    <td>${fmt(s.amount)}</td><td><span class="badge ${s.status}">${s.status}</span></td></tr>`).join('')
    : '<tr><td colspan="5" class="muted">No orders match. Clear the search or pick another status.</td></tr>';
  $('#salesCount').textContent = `${rows.length} of ${SALES.length} orders`;
  const done = SALES.filter(s => s.status === 'Completed'), refunds = SALES.filter(s => s.status === 'Cancelled');
  const gross = done.reduce((a, s) => a + s.amount, 0);
  $('#salesStats').innerHTML = [['Gross sales', fmt(gross)], ['Average order value', fmt(gross / done.length)],
    ['Refunds', fmt(refunds.reduce((a, s) => a + s.amount, 0))]].map(([l, v]) =>
    `<div class="panel glass"><span class="kpi-label">${l}</span><div class="kpi-value">${v}</div></div>`).join('');
}
function exportCsv() {
  const rows = filteredSales();
  if (!rows.length) return toast('Nothing to export. Adjust your filters first.');
  const csv = ['Order ID,Customer,Date,Amount,Status', ...rows.map(s => [s.id, s.customer, s.date, s.amount.toFixed(2), s.status].join(','))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], {type: 'text/csv'}));
  a.download = 'pulseiq-sales.csv'; a.click(); URL.revokeObjectURL(a.href);
  toast(`Exported ${rows.length} orders to CSV`);
}

/* ---------- Customers ---------- */
function renderCustomers() {
  const total = Object.values(SEGMENTS).reduce((a, s) => a + s.n, 0);
  $('#custStats').innerHTML = [['Total customers', total.toLocaleString()], ['New customers', SEGMENTS.New.n], ['Returning customers', total - SEGMENTS.New.n]]
    .map(([l, v]) => `<div class="panel glass"><span class="kpi-label">${l}</span><div class="kpi-value">${v}</div></div>`).join('');
  $('#segmentBtns').innerHTML = Object.keys(SEGMENTS).map((k, i) => `<button class="chip ${i ? '' : 'active'}" data-seg="${k}">${k}</button>`).join('');
  showSegment('Premium');
}
function showSegment(k) {
  const s = SEGMENTS[k];
  $$('#segmentBtns .chip').forEach(b => b.classList.toggle('active', b.dataset.seg === k));
  $('#segmentDetail').innerHTML = `<div><strong>${k}</strong> · ${s.n.toLocaleString()} customers</div>
    <div class="bar"><i style="width:${s.health}%"></i></div><span class="muted">Health score ${s.health}/100</span><p>${s.note}</p>`;
}

/* ---------- Products ---------- */
function renderProducts() {
  const list = [...PRODUCTS].sort((a, b) => b[state.sort] - a[state.sort]);
  $('#productBody').innerHTML = list.map((p, i) => `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.cat}</td>
    <td>${p.units.toLocaleString()}</td><td>${fmt(p.revenue)}</td>
    <td><div class="bar"><i style="width:0" data-w="${p.perf}"></i></div><span class="muted">${p.perf}%</span></td></tr>`).join('');
  requestAnimationFrame(() => $$('#productBody i').forEach(i => i.style.width = i.dataset.w + '%'));
}

/* ---------- Reports ---------- */
function renderReports() {
  $('#reportCards').innerHTML = REPORTS.map((r, i) => `<div class="report-card glass"><h3>${r.key}</h3><p class="muted">${r.desc}</p>
    <button class="btn primary" data-report="${i}">Generate</button></div>`).join('');
  reports = [{name: 'Sales Performance Report', time: 'Oct 5, 2026, 09:12'}, {name: 'Customer Report', time: 'Oct 1, 2026, 17:40'}];
  renderHistory();
}
function renderHistory() {
  $('#reportHistory').innerHTML = reports.map(r => `<li><span>${r.name}</span><span class="muted">${r.time}</span></li>`).join('');
}
function generateReport(name) {
  const time = new Date().toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'medium'});
  reports.unshift({name: `${name} (${state.range}d)`, time}); renderHistory();
  toast(`${name} generated at ${time}`);
}

/* ---------- Settings ---------- */
const SETTING_DEFS = [['glow', 'Cursor glow', 'A soft light that follows your pointer'], ['anim', 'Animations', 'Card flips, transitions and motion'],
  ['compact', 'Compact layout', 'Tighter spacing for more data on screen'], ['notify', 'Notifications', 'Toast alerts for live activity']];
function applySettings() {
  document.body.classList.toggle('no-glow', !settings.glow);
  document.body.classList.toggle('no-anim', !settings.anim);
  document.body.classList.toggle('compact', settings.compact);
  try { localStorage.setItem('pulseiq-settings', JSON.stringify(settings)); } catch (e) {}
}
function renderSettings() {
  $('#settingsList').innerHTML = SETTING_DEFS.map(([k, l, d]) => `<div class="setting"><div>${l}<div class="muted">${d}</div></div>
    <button class="switch ${settings[k] ? 'on' : ''}" role="switch" aria-checked="${settings[k]}" aria-label="${l}" data-set="${k}"></button></div>`).join('');
}

/* ---------- Events ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  const kpi = t.closest('.kpi'); if (kpi) kpi.classList.toggle('flipped');
  const st = t.closest('[data-status]'); if (st) { state.status = st.dataset.status; $$('#statusFilters .chip').forEach(c => c.classList.toggle('active', c === st)); renderSales(); }
  const sg = t.closest('[data-seg]'); if (sg) showSegment(sg.dataset.seg);
  const so = t.closest('[data-sort]'); if (so) { state.sort = so.dataset.sort; $$('#productSort .chip').forEach(c => c.classList.toggle('active', c === so)); renderProducts(); }
  const rp = t.closest('[data-report]'); if (rp) generateReport(REPORTS[rp.dataset.report].key);
  const sw = t.closest('[data-set]'); if (sw) {
    const k = sw.dataset.set; settings[k] = !settings[k]; applySettings(); renderSettings();
    toast(`${SETTING_DEFS.find(d => d[0] === k)[1]} ${settings[k] ? 'on' : 'off'}`);
  }
});
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('kpi')) { e.preventDefault(); e.target.classList.toggle('flipped'); } });
$('#exportCsv').addEventListener('click', exportCsv);
$('#salesSearch').addEventListener('input', e => { state.query = e.target.value; $('#globalSearch').value = e.target.value; renderSales(); });
$('#globalSearch').addEventListener('input', e => {
  state.query = e.target.value; $('#salesSearch').value = e.target.value; renderSales();
  if (e.target.value) showTab('sales');
});
$('#rangeSelect').addEventListener('change', e => {
  state.range = +e.target.value; renderKpis(); renderChart(); toast(`Showing last ${state.range} days`);
});
$('#genOverview').addEventListener('click', () => { generateReport('Sales Performance Report'); showTab('reports'); });
document.addEventListener('mousemove', e => {
  const g = $('#cursorGlow'); g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px';
});

/* ---------- Init ---------- */
applySettings(); renderSettings(); renderKpis(); renderChart(); renderStatus(); renderTop();
renderSales(); renderCustomers(); renderProducts(); renderReports();
['Order #PIQ-4821 completed', 'Maya Chen upgraded to Pro', 'Refund issued for #PIQ-4815', 'New customer: Liam Ortiz'].forEach(t => addActivity(t, false));
setInterval(() => {
  const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  addActivity(ev, true);
  if (settings.notify) toast('Live: ' + ev);
}, 8000);
