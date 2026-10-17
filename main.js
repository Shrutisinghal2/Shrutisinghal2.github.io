// Builds the page from data.js. You normally don't need to edit this file.
(function () {
  const P = window.PORTFOLIO;
  const $ = id => document.getElementById(id);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const link = (text, href, cls) => { const a = el('a', cls, text); a.href = href; if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; } return a; };
  const hasQr = typeof window.qrcode === 'function';
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');


  /* ---------- project icons (picked by keywords in the project name) ---------- */
  const ICONS = {
    anime:    '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/><path d="M8 2l4 3 4-3"/>',
    test:     '<path d="M9 3h6"/><path d="M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 15h10"/>',
    bmi:      '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 9a5.5 5.5 0 0 1 8 0"/><path d="M12 12l2-3"/>',
    alarm:    '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2"/><path d="M5 3L2 6"/><path d="M19 3l3 3"/>',
    currency: '<path d="M4 8h13l-3-3"/><path d="M20 16H7l3 3"/><path d="M9 12h6"/>',
    weather:  '<path d="M12 3v1.5M5.6 5.6l1 1M3 12h1.5M18.4 5.6l-1 1"/><path d="M8.5 11a3.5 3.5 0 0 1 6.6-1.6"/><path d="M8 20h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6 1.6A2.8 2.8 0 0 0 8 20z"/>',
    note:     '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/>',
    survey:   '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 2h6v4H9z"/><path d="M8.5 12l1.5 1.5 3-3"/><path d="M8.5 17h7"/>',
    code:     '<path d="M8 7l-5 5 5 5"/><path d="M16 7l5 5-5 5"/>',
  };
  function iconFor(p) {
    const n = (p.icon || p.name).toLowerCase();
    const key = p.icon || ['anime','test','bmi','alarm','currency','weather','note','survey'].find(k => n.includes(k === 'anime' ? 'ani' : k)) || 'code';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[key] || ICONS.code) + '</svg>';
  }

  /* ---------- QR helpers ---------- */
  function makeQr(url) { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q; }
  function renderQr(box, url, label) {
    if (!hasQr) { box.appendChild(el('span', 'fallback', 'QR needs internet')); return false; }
    box.innerHTML = makeQr(url).createSvgTag({ cellSize: 4, margin: 0, scalable: true });
    const svg = box.querySelector('svg'); if (svg) { svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'QR code for ' + label); }
    return true;
  }
  function downloadQr(url, filename) {
    if (!hasQr) return;
    const q = makeQr(url), n = q.getModuleCount(), cell = 12, pad = 48;
    const c = document.createElement('canvas'); c.width = c.height = n * cell + pad * 2;
    const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.fillStyle = '#000';
    for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (q.isDark(r, k)) g.fillRect(pad + k * cell, pad + r * cell, cell, cell);
    const a = document.createElement('a'); a.href = c.toDataURL('image/png'); a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  }

  /* ---------- Banner ---------- */
  $('name').textContent = P.name;
  $('designation').textContent = P.company ? `${P.designation} at ${P.company}` : P.designation;
  $('location').textContent = P.location;
  $('initials').textContent = P.name.split(' ').map(w => w[0]).join('').slice(0, 2);
  const photo = $('photo');
  photo.alt = P.name;
  photo.addEventListener('error', () => photo.remove());       // no photo yet: show initials
  photo.addEventListener('load', () => $('initials').remove());
  photo.src = P.photo;
  [['LinkedIn', P.links.linkedin], ['GitHub', P.links.github], ['Trailhead', P.links.trailhead]]
    .forEach(([label, href]) => { if (href) $('socials').appendChild(link(label, href)); });

  /* ---------- Contact strip ---------- */
  $('email').textContent = P.email; $('email').href = 'mailto:' + P.email;
  if (P.phone) { $('phone').textContent = P.phone; $('phoneWrap').hidden = false; }
  $('address').textContent = P.location;
  $('resumeBtn').href = P.resume;
  const siteUrl = P.links.portfolio || location.href;
  if (!renderQr($('siteQr'), siteUrl, 'this portfolio')) $('siteQrDownload').hidden = true;
  $('siteQrDownload').addEventListener('click', () => downloadQr(siteUrl, 'portfolio-qr.png'));

  /* ---------- Section builders ---------- */
  
  const sections = [
    ['Summary', () => { const d = el('div', 'summary'); P.summary.forEach(p => d.appendChild(el('p', null, p))); return d; }],

    ['Personal Projects', () => {
      const grid = el('div', 'projects');
      P.projects.forEach((p, i) => {
        const card = el('article', 'card');
        const tile = el('div', 'tile tone-' + (i % 6)); tile.dataset.n = String(i + 1).padStart(2, '0');
        if (p.image) { const im = el('img'); im.src = p.image; im.alt = p.name + ' screenshot'; tile.appendChild(im); }
        else { tile.innerHTML = iconFor(p); }
        const body = el('div', 'card-body');
        const st = /live/i.test(p.status) ? 'live' : /progress/i.test(p.status) ? 'progress' : 'done';
        body.append(el('span', 'status ' + st, p.status), el('h3', null, p.name), el('p', 'tagline', p.tagline), el('p', 'desc', p.description));
        const tags = el('div', 'tags'); p.tech.forEach(t => tags.appendChild(el('span', null, t))); body.appendChild(tags);
        const foot = el('div', 'card-foot');
        const target = p.live || p.code;
        if (target) {
          const qr = el('div', 'qr'); if (renderQr(qr, target, p.name)) foot.appendChild(qr);
          const links = el('div', 'card-links');
          if (p.live) links.appendChild(link('Open app ↗', p.live));
          if (p.code) links.appendChild(link('Source code ↗', p.code));
          if (hasQr) { const b = el('button', 'link-btn', 'Download QR'); b.type = 'button'; b.onclick = () => downloadQr(target, slug(p.name) + '-qr.png'); links.appendChild(b); }
          foot.appendChild(links);
        } else foot.appendChild(el('span', 'note', p.note || 'Demo available on request.'));
        body.appendChild(foot);
        card.append(tile, body);
        grid.appendChild(card);
      });
      return grid;
    }],

    ['Work Experience', () => {
      const d = el('div');
      P.experience.forEach(j => {
        const job = el('div', 'job');
        const h = el('h3', null, j.role); if (j.current) h.appendChild(el('span', 'badge', 'Current'));
        job.append(h, el('p', 'meta', `${j.company} · ${j.location} · ${j.dates}`));
        const ul = el('ul'); j.points.forEach(t => ul.appendChild(el('li', null, t))); job.appendChild(ul);
        d.appendChild(job);
      });
      return d;
    }],

    ['Skills', () => {
      const d = el('div');
      P.skills.forEach(g => {
        const box = el('div', 'skill-group'); box.appendChild(el('h3', null, g.group));
        const chips = el('div', 'chips'); g.items.forEach(s => chips.appendChild(el('span', null, s))); box.appendChild(chips);
        d.appendChild(box);
      });
      return d;
    }],

    ['Education', () => {
      const wrap = el('div', 'table-wrap'); const t = el('table');
      const head = el('tr'); ['Education', 'Institution name', 'Passing year', 'Score'].forEach(h => head.appendChild(el('th', null, h)));
      const thead = el('thead'); thead.appendChild(head); t.appendChild(thead);
      const tb = el('tbody');
      P.education.forEach(e => { const r = el('tr'); r.append(el('td', null, e.title), el('td', null, e.institution), el('td', 'num', e.year), el('td', 'num', e.score)); tb.appendChild(r); });
      t.appendChild(tb); wrap.appendChild(t); return wrap;
    }],

    ['Certifications', () => {
      const ul = el('ul', 'list');
      P.certifications.forEach(c => { const li = el('li'); li.append(el('span', 'icon', '—'), el('span', null, c)); ul.appendChild(li); });
      return ul;
    }],

    ['Other Details', () => {
      const d = el('div');
      [['Achievements', P.other.achievements, '—'], ['Superbadges', P.other.superbadges, '—'], ['Languages', P.other.languages, '—']].forEach(([title, items, icon]) => {
        if (!items || !items.length) return;
        const g = el('div', 'other-group'); g.appendChild(el('h3', null, title));
        const ul = el('ul', 'list'); items.forEach(t => { const li = el('li'); li.append(el('span', 'icon', icon), el('span', null, t)); ul.appendChild(li); });
        g.appendChild(ul); d.appendChild(g);
      });
      return d;
    }],
  ];

  /* ---------- Tabs on desktop, accordion on mobile ---------- */
  const mobile = window.matchMedia('(max-width: 720px)');
  const panels = [], buttons = [];
  sections.forEach(([title, build], i) => {
    const id = slug(title);
    const btn = el('button', null, title);
    btn.type = 'button'; btn.id = 'tab-' + id; btn.setAttribute('role', 'tab'); btn.setAttribute('aria-controls', 'panel-' + id);
    btn.addEventListener('click', () => select(i));
    $('tabs').appendChild(btn); buttons.push(btn);

    const det = el('details', 'panel'); det.id = 'panel-' + id;
    det.appendChild(el('summary', null, title));
    const body = el('div', 'panel-body'); body.setAttribute('role', 'tabpanel'); body.setAttribute('aria-labelledby', 'tab-' + id);
    body.appendChild(build());
    det.appendChild(body);
    $('panels').appendChild(det); panels.push(det);
  });
  let current = 0;
  function select(i) {
    current = i;
    buttons.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
    if (!mobile.matches) panels.forEach((p, k) => { p.open = k === i; p.hidden = k !== i; });
  }
  function applyMode() {
    if (mobile.matches) panels.forEach((p, k) => { p.hidden = false; p.open = k === 0; });
    else select(current);
  }
  // keyboard arrows move between tabs
  $('tabs').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const n = (current + (e.key === 'ArrowRight' ? 1 : buttons.length - 1)) % buttons.length;
    select(n); buttons[n].focus();
  });
  mobile.addEventListener('change', applyMode);
  applyMode();
  if (location.hash === '#projects') select(1), applyMode();

  $('foot').textContent = `© ${new Date().getFullYear()} ${P.name}`;
})();
