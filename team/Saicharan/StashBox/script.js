'use strict';
const $ = (s, r = document) => r.querySelector(s);
const MB = 1048576, QUOTA = 2048 * MB;
const TYPES = {folder: ['#ffd23f', '📁'], image: ['#ff7ab6', '🖼️'], doc: ['#6fa8ff', '📄'], video: ['#ff7a2f', '🎬'], audio: ['#3ddc97', '🎵']};
const NAVS = {all: ['🏠', 'All files'], recent: ['⏱', 'Recent'], starred: ['★', 'Starred'], image: ['🖼️', 'Images'], doc: ['📄', 'Documents'], video: ['🎬', 'Videos'], audio: ['🎵', 'Audio'], trash: ['🗑️', 'Trash']};
const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

function seed() {
  const t = Date.now(), d = 864e5, f = (id, name, type, size, parent, ago, star) => ({id, name, type, size: size * MB, parent, m: t - ago * d, star: star || 0});
  return [f(1, 'Projects', 'folder', 0, null, 2), f(2, 'Design', 'folder', 0, null, 5), f(3, 'Invoices', 'folder', 0, null, 9),
    f(4, 'brand-guidelines.pdf', 'doc', 6.4, 2, 1, 1), f(5, 'logo-final.png', 'image', 1.2, 2, 3), f(6, 'moodboard.jpg', 'image', 3.8, 2, 4),
    f(7, 'sprint-plan.docx', 'doc', 0.4, 1, 2), f(8, 'demo-reel.mp4', 'video', 184, 1, 6, 1), f(9, 'invoice-sept.pdf', 'doc', 0.2, 3, 12),
    f(10, 'podcast-intro.mp3', 'audio', 8.5, null, 7), f(11, 'team-photo.jpg', 'image', 4.1, null, 0), f(12, 'budget-2026.xlsx', 'doc', 0.9, null, 14)];
}
let items, nav = 'all', folder = null, q = '', sort = 'name', sel = new Set(), uid = 100;
let view = localStorage.getItem('sb-view') || 'grid';
try { items = JSON.parse(localStorage.getItem('sb-items')) || seed(); } catch (e) { items = seed(); }
if (localStorage.getItem('sb-dark') === '1') document.body.classList.add('dark');
uid = Math.max(uid, ...items.map(i => i.id)) + 1;

/* helpers */
const get = id => items.find(i => i.id === +id);
const desc = id => items.filter(x => x.parent === id).flatMap(c => [c, ...desc(c.id)]);
const fsize = i => i.type === 'folder' ? desc(i.id).reduce((a, x) => a + x.size, 0) : i.size;
const used = () => items.reduce((a, i) => a + i.size, 0);
const fmtSize = b => b < 1024 ? b + ' B' : b < MB ? (b / 1024).toFixed(0) + ' KB' : b < 1024 * MB ? (b / MB).toFixed(1) + ' MB' : (b / MB / 1024).toFixed(2) + ' GB';
const ago = t => { const m = (Date.now() - t) / 6e4; return m < 1 ? 'just now' : m < 60 ? Math.floor(m) + 'm ago' : m < 1440 ? Math.floor(m / 60) + 'h ago' : Math.floor(m / 1440) + 'd ago'; };
const ext = n => (n.split('.').pop() || '').slice(0, 4).toUpperCase();
const save = () => { try { localStorage.setItem('sb-items', JSON.stringify(items.map(({url, up, ...r}) => r))); } catch (e) {} };
function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; $('#toasts').append(t); setTimeout(() => t.remove(), 2800); }
function commit(msg, anim) { save(); render(anim); if (msg) toast(msg); }

/* view logic */
function visible() {
  let l = items.filter(i => !!i.trash === (nav === 'trash'));
  if (q) l = l.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));
  else if (nav === 'all') l = l.filter(i => i.parent === folder);
  else if (nav === 'starred') l = l.filter(i => i.star);
  else if (nav === 'recent') l = l.filter(i => i.type !== 'folder');
  else if (nav !== 'trash') l = l.filter(i => i.type === nav);
  const cmp = {name: (a, b) => a.name.localeCompare(b.name), date: (a, b) => b.m - a.m, size: (a, b) => fsize(b) - fsize(a), type: (a, b) => a.type.localeCompare(b.type)};
  l.sort((a, b) => (nav === 'recent' ? b.m - a.m : (b.type === 'folder') - (a.type === 'folder') || cmp[sort](a, b)));
  return nav === 'recent' && !q ? l.slice(0, 8) : l;
}
function card(i, n) {
  const [c, icon] = TYPES[i.type];
  const info = i.type === 'folder' ? desc(i.id).filter(x => x.type !== 'folder').length + ' files · ' + fmtSize(fsize(i)) : fmtSize(i.size) + ' · ' + ago(i.m);
  const thumb = i.url ? `<img src="${i.url}" alt="">` : icon;
  return `<article class="item ${sel.has(i.id) ? 'sel' : ''} ${i.up ? 'up' : ''}" data-id="${i.id}" draggable="true" style="--c:${c};animation-delay:${n * 40}ms">
    <label class="chk" data-sel><input type="checkbox" ${sel.has(i.id) ? 'checked' : ''} aria-label="Select ${esc(i.name)}"></label>
    <button class="star ${i.star ? 'on' : ''}" data-act="star" aria-label="Star">★</button>
    <div class="thumb">${thumb}${i.type === 'folder' ? '' : `<small>${ext(i.name)}</small>`}</div>
    <div class="meta"><b title="${esc(i.name)}">${esc(i.name)}${i.shared ? ' 🔗' : ''}</b><span>${info}</span></div></article>`;
}
function render(anim) {
  const l = visible(), g = $('#items');
  g.className = 'items ' + view + (anim ? '' : ' still');
  g.innerHTML = l.length ? l.map(card).join('') : `<div class="empty"><big>${nav === 'trash' ? '🗑️' : '📭'}</big>${q ? 'No files match “' + esc(q) + '”.' : nav === 'trash' ? 'Trash is empty.' : 'Nothing here yet. Drop files anywhere or press Upload.'}</div>`;
  $('#title').textContent = q ? `Results for “${q}”` : nav === 'all' && folder ? get(folder).name : NAVS[nav][1];
  $('#titleAction').innerHTML = nav === 'trash' && l.length ? '<button class="btn danger" data-act="empty">Empty trash</button>' : '';
  const path = []; for (let f = folder; f;) { const o = get(f); path.unshift(o); f = o.parent; }
  $('#crumbs').innerHTML = nav === 'all' && !q ? `<button data-folder="root">Home</button>` + path.map(o => ` / <button data-folder="${o.id}">${esc(o.name)}</button>`).join('') : '';
  $('#nav').innerHTML = Object.entries(NAVS).map(([k, [ic, lb]]) => {
    const n = k === 'starred' ? items.filter(i => i.star && !i.trash).length : k === 'trash' ? items.filter(i => i.trash).length : 0;
    return `<button data-nav="${k}" class="${nav === k && !q ? 'on' : ''}"><span>${ic} ${lb}</span>${n ? `<em>${n}</em>` : ''}</button>`;
  }).join('');
  const u = used(); $('#usedTxt').textContent = `${fmtSize(u)} of ${fmtSize(QUOTA)} used`;
  $('#usedBar').style.width = Math.min(100, u / QUOTA * 100) + '%'; $('#usedBar').classList.toggle('hot', u / QUOTA > .8);
  $('#freeTxt').textContent = fmtSize(QUOTA - u) + ' free';
  $('#viewBtn').textContent = view === 'grid' ? '☰ List' : '▦ Grid';
  const b = $('#bulk'); b.hidden = !sel.size;
  b.innerHTML = `<b>${sel.size} selected</b>` + (nav === 'trash'
    ? '<button class="btn" data-act="brestore">Restore</button><button class="btn danger" data-act="bpurge">Delete forever</button>'
    : '<button class="btn" data-act="bstar">Star</button><button class="btn danger" data-act="btrash">Move to trash</button>') +
    '<button class="btn" data-act="ball">Select all</button><button class="btn" data-act="bclear">Clear</button>';
}

/* actions */
function toggleStar(ids) { const l = ids.map(get), on = l.some(i => !i.star); l.forEach(i => i.star = on ? 1 : 0); }
function setTrash(ids, on) {
  ids.forEach(id => [get(id), ...desc(+id)].forEach(x => x.trash = on ? 1 : 0));
  if (!on) ids.forEach(id => { const i = get(id); if (i.parent && get(i.parent).trash) i.parent = null; });
}
function purge(ids) { const gone = new Set(ids.flatMap(id => [+id, ...desc(+id).map(x => x.id)])); items = items.filter(i => !gone.has(i.id)); }
function move(ids, target) {
  let n = 0;
  ids.forEach(id => { id = +id; if (id !== target && !desc(id).some(x => x.id === target)) { get(id).parent = target; n++; } });
  sel.clear(); commit(n ? `Moved ${n} item${n > 1 ? 's' : ''}` : 'Cannot move a folder into itself');
}
function go(n) { nav = n; folder = null; q = ''; $('#search').value = ''; sel.clear(); render(true); }
function openItem(i) {
  if (i.trash) return toast('Restore it from Trash to open it');
  if (i.type === 'folder') { nav = 'all'; folder = i.id; q = ''; $('#search').value = ''; sel.clear(); return render(true); }
  const [c, icon] = TYPES[i.type];
  $('#modalBody').innerHTML = `<div class="thumb" style="--c:${c}">${i.url ? `<img src="${i.url}" alt="">` : icon}</div>
    <div><b>${esc(i.name)}</b><br><span>${fmtSize(i.size)} · modified ${ago(i.m)}${i.shared ? ' · shared' : ''}</span></div>
    <div class="row">${['star:★ Star', 'share:🔗 Share', 'rename:✎ Rename', 'download:⬇ Download'].map(s => `<button class="btn" data-act="pv-${s.split(':')[0]}" data-id="${i.id}">${s.split(':')[1]}</button>`).join('')}
    <button class="btn danger" data-act="pv-trash" data-id="${i.id}">🗑 Trash</button><button class="btn" data-act="close">Close</button></div>`;
  $('#modal').classList.add('open');
}
const closeModal = () => $('#modal').classList.remove('open');
function ask(title, val, cb) {
  $('#modalBody').innerHTML = `<h2>${title}</h2><input class="field" id="askIn" value="${esc(val)}" aria-label="${title}"><div class="row"><button class="btn" data-act="close">Cancel</button><button class="btn pri" id="askOk">Save</button></div>`;
  $('#modal').classList.add('open');
  const inp = $('#askIn'), ok = () => { const v = inp.value.trim(); if (!v) return toast('Enter a name first'); closeModal(); cb(v); };
  inp.focus(); inp.select(); $('#askOk').onclick = ok; inp.onkeydown = e => { if (e.key === 'Enter') ok(); };
}
function newFolder() {
  ask('New folder', 'Untitled folder', v => { items.push({id: uid++, name: v, type: 'folder', size: 0, parent: nav === 'all' ? folder : null, m: Date.now(), star: 0}); commit(`Folder “${v}” created`, true); });
}
function upload(files) {
  let n = 0;
  [...files].forEach(f => {
    if (used() + f.size > QUOTA) return toast(`${f.name} skipped: storage is full`);
    const e = f.name.split('.').pop().toLowerCase(), m = f.type;
    const type = m.startsWith('image') ? 'image' : m.startsWith('video') ? 'video' : m.startsWith('audio') ? 'audio' : 'doc';
    const it = {id: uid++, name: f.name, type, size: f.size, parent: nav === 'all' ? folder : null, m: Date.now(), star: 0, up: 1, url: type === 'image' ? URL.createObjectURL(f) : null};
    items.push(it); n++; setTimeout(() => { delete it.up; render(); }, 950);
  });
  if (n) { nav === 'all' || go('all'); commit(`Uploaded ${n} file${n > 1 ? 's' : ''}`, true); }
}
function download(i) {
  const a = document.createElement('a');
  a.href = i.url || URL.createObjectURL(new Blob([`StashBox demo file: ${i.name}`], {type: 'text/plain'}));
  a.download = i.name; a.click(); toast(`Downloading ${i.name}`);
}
function act(k, el) {
  const card = el.closest('.item'), id = card ? +card.dataset.id : +el.dataset.id, ids = [...sel];
  const handlers = {
    star: () => { toggleStar([id]); commit(); },
    'pv-star': () => { toggleStar([id]); closeModal(); commit(get(id).star ? 'Starred' : 'Unstarred'); },
    'pv-share': () => { const i = get(id); i.shared = 1; const link = 'https://stashbox.app/s/' + i.id.toString(36) + Math.random().toString(36).slice(2, 6);
      (navigator.clipboard ? navigator.clipboard.writeText(link) : Promise.reject()).then(() => toast('Link copied: ' + link), () => toast('Share link: ' + link)); save(); render(); },
    'pv-rename': () => { const i = get(id); ask('Rename', i.name, v => { i.name = v; commit('Renamed'); }); },
    'pv-download': () => download(get(id)),
    'pv-trash': () => { setTrash([id], true); closeModal(); commit('Moved to trash'); },
    close: closeModal,
    empty: () => { const n = items.filter(i => i.trash).length; purge(items.filter(i => i.trash).map(i => i.id)); commit(`Trash emptied (${n} items)`); },
    bstar: () => { toggleStar(ids); sel.clear(); commit('Star updated'); },
    btrash: () => { setTrash(ids, true); sel.clear(); commit(`${ids.length} moved to trash`); },
    brestore: () => { setTrash(ids, false); sel.clear(); commit(`${ids.length} restored`); },
    bpurge: () => { purge(ids); sel.clear(); commit('Deleted forever'); },
    ball: () => { visible().forEach(i => sel.add(i.id)); render(); },
    bclear: () => { sel.clear(); render(); }
  };
  (handlers[k] || (() => {}))();
}

/* events */
document.addEventListener('click', e => {
  const t = e.target, a = t.closest('[data-act]');
  if (a) return act(a.dataset.act, a);
  const nv = t.closest('[data-nav]'); if (nv) return go(nv.dataset.nav);
  const cr = t.closest('[data-folder]'); if (cr) { nav = 'all'; folder = cr.dataset.folder === 'root' ? null : +cr.dataset.folder; q = ''; $('#search').value = ''; sel.clear(); return render(true); }
  if (t.closest('[data-sel]')) return;
  if (t === $('#modal')) return closeModal();
  const it = t.closest('.item'); if (it) openItem(get(it.dataset.id));
});
document.addEventListener('change', e => {
  const c = e.target.closest('[data-sel]'); if (!c) return;
  const id = +c.closest('.item').dataset.id; sel.has(id) ? sel.delete(id) : sel.add(id); render();
});
$('#uploadBtn').onclick = () => $('#fileIn').click();
$('#fileIn').onchange = e => { upload(e.target.files); e.target.value = ''; };
$('#newFolder').onclick = newFolder;
$('#search').oninput = e => { q = e.target.value; render(true); };
$('#sort').onchange = e => { sort = e.target.value; render(true); };
$('#viewBtn').onclick = () => { view = view === 'grid' ? 'list' : 'grid'; localStorage.setItem('sb-view', view); render(); };
$('#themeBtn').onclick = () => { const d = document.body.classList.toggle('dark'); localStorage.setItem('sb-dark', d ? 1 : 0); $('#themeBtn').textContent = d ? '☀️' : '🌙'; };
$('#themeBtn').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';

/* drag and drop: upload from desktop, move between folders */
let dragId = null;
document.addEventListener('dragenter', e => { if (e.dataTransfer.types.includes('Files')) $('#dropZone').classList.add('on'); });
document.addEventListener('dragleave', e => { if (!e.relatedTarget) $('#dropZone').classList.remove('on'); });
document.addEventListener('dragover', e => {
  e.preventDefault();
  document.querySelectorAll('.over').forEach(x => x.classList.remove('over'));
  const t = e.target.closest('.item, [data-folder]'); if (dragId && t && (t.dataset.folder || get(t.dataset.id).type === 'folder')) t.classList.add('over');
});
document.addEventListener('dragstart', e => { const it = e.target.closest('.item'); if (it) { dragId = +it.dataset.id; it.classList.add('drag'); e.dataTransfer.setData('text/plain', 'item'); } });
document.addEventListener('dragend', () => { dragId = null; document.querySelectorAll('.drag,.over').forEach(x => x.classList.remove('drag', 'over')); });
document.addEventListener('drop', e => {
  e.preventDefault(); $('#dropZone').classList.remove('on');
  if (e.dataTransfer.files.length) return upload(e.dataTransfer.files);
  const t = e.target.closest('.item, [data-folder]'); if (!dragId || !t) return;
  const target = t.dataset.folder ? (t.dataset.folder === 'root' ? null : +t.dataset.folder) : (get(t.dataset.id).type === 'folder' ? +t.dataset.id : undefined);
  if (target !== undefined) move(sel.has(dragId) ? [...sel] : [dragId], target);
});
document.addEventListener('keydown', e => {
  const typing = /INPUT|SELECT/.test(document.activeElement.tagName);
  if (e.key === 'Escape') { closeModal(); sel.clear(); render(); }
  if (typing || $('#modal').classList.contains('open')) return;
  if (e.key === '/') { e.preventDefault(); $('#search').focus(); }
  if (e.key === 'n') { e.preventDefault(); newFolder(); }
  if (e.key === 'g') $('#viewBtn').click();
  if (e.key === 'Delete' && sel.size) act('btrash', document.body);
});
render(true);
