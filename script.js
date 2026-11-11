(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none)').matches;
  const { competitions, zonals, workshops } = window.TF;
  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* =========================================================
     HERO: floating ruin islands (2D SVG, generated)
     ========================================================= */
  function island(cx, top, w, seed, o) {
    const r = rng(seed), half = w / 2, depth = w * (o.depth || .55);
    // top surface
    let d = `M${cx - half} ${top}`;
    for (let i = 1; i <= 10; i++) d += ` L${cx - half + (w * i) / 10} ${top + (r() - .5) * w * .025}`;
    // jagged underside, from right back to left
    for (let i = 24; i >= 0; i--) {
      const x = cx - half + (w * i) / 24, k = 1 - Math.pow(Math.abs(x - cx) / half, 1.6);
      d += ` L${x.toFixed(1)} ${(top + depth * k * (.55 + r() * .45) + w * .03).toFixed(1)}`;
    }
    d += 'Z';
    let g = `<path d="${d}" fill="${o.color}"/>`;
    // hanging roots
    for (let i = 0; i < 6; i++) {
      const x = cx - half * .6 + r() * w * .6, y = top + depth * (1 - Math.pow(Math.abs(x - cx) / half, 1.6)) * .55;
      g += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${(r() - .5) * 14} ${depth * .3} ${(r() - .5) * 6} ${depth * (.35 + r() * .4)}" stroke="${o.color}" stroke-width="${(1 + r() * 1.6).toFixed(1)}" fill="none" opacity=".9"/>`;
    }
    // ruins: columns, arches and a tower
    if (o.ruins) {
      const base = top + 1, u = w / 26;
      const tx = cx + (r() - .5) * w * .3, th = u * (5 + r() * 4);
      g += `<rect x="${tx - u}" y="${base - th}" width="${u * 2}" height="${th}" fill="${o.color}"/>`;
      g += `<path d="M${tx - u * 1.4} ${base - th} L${tx} ${base - th - u * 2.2} L${tx + u * 1.4} ${base - th}Z" fill="${o.color}"/>`;
      for (let k = 0; k < 3; k++) g += `<rect x="${tx - u * .3}" y="${base - th + u * (1 + k * 1.6)}" width="${u * .6}" height="${u * .8}" fill="${o.light}" class="win" style="animation-delay:${(-r() * 4).toFixed(2)}s"/>`;
      for (let k = 0; k < 4; k++) {
        const x = cx - half * .75 + k * u * 1.6 + (tx < cx ? half * .7 : 0), h = u * (2 + r() * 2.5);
        g += `<rect x="${x}" y="${base - h}" width="${u * .55}" height="${h}" fill="${o.color}"/>`;
      }
      const ax = tx < cx ? cx + half * .35 : cx - half * .45, aw = u * 3;
      g += `<path d="M${ax} ${base} v${-u * 2.6} a${aw / 2} ${aw / 2} 0 0 1 ${aw} 0 v${u * 2.6} h${-u * .6} v${-u * 2.4} a${aw / 2 - u * .6} ${aw / 2 - u * .6} 0 0 0 ${-(aw - u * 1.2)} 0 v${u * 2.4}Z" fill="${o.color}"/>`;
    }
    // trees
    for (let i = 0; i < (o.trees || 3); i++) {
      const x = cx - half * .85 + r() * w * .85, s = w * (.03 + r() * .035);
      g += `<circle cx="${x.toFixed(1)}" cy="${(top - s * .9).toFixed(1)}" r="${s.toFixed(1)}" fill="${o.color}"/><rect x="${(x - s * .12).toFixed(1)}" y="${(top - s * .3).toFixed(1)}" width="${(s * .24).toFixed(1)}" height="${(s * .4).toFixed(1)}" fill="${o.color}"/>`;
    }
    return `<g class="bob" style="--d:${(-r() * 8).toFixed(2)}s;--a:${(6 + r() * 8).toFixed(0)}px">${g}</g>`;
  }
  function buildIslands() {
    const far = $('#islandsFar'), near = $('#islandsNear');
    const W = far.clientWidth, H = far.clientHeight, s = Math.min(1, W / 1300) * .9 + .1, narrow = W < 700;
    [far, near].forEach(svg => svg.setAttribute('viewBox', `0 0 ${W} ${H}`));
    const farC = { color: '#6d4a74', light: '#ffd889', ruins: true, trees: 3 };
    far.innerHTML =
      island(W * .2, H * .3, 150 * s, 3, farC) + island(W * .82, H * .22, 190 * s, 8, farC) +
      island(W * .6, H * .48, 110 * s, 13, { ...farC, color: '#7d5378' }) + island(W * .35, H * .62, 90 * s, 21, { ...farC, color: '#8a5a75', ruins: false });
    const nearC = { color: '#1a1029', light: '#ffcf6a', ruins: true, trees: 4, depth: .6 };
    near.innerHTML = narrow
      ? island(W * .05, H * .78, 260 * s + 60, 5, nearC) + island(W * 1.0, H * .2, 200 * s + 40, 34, nearC)
      : island(W * .08, H * .66, 380 * s, 5, nearC) + island(W * .93, H * .52, 320 * s, 34, nearC) + island(W * .74, H * .9, 180 * s, 41, { ...nearC, ruins: false });
  }
  function buildEnd() {
    const svg = $('#islandsEnd'), W = svg.clientWidth, H = svg.clientHeight, s = Math.min(1, W / 1300) * .9 + .1;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const c = { color: '#1a1029', light: '#ffcf6a', ruins: true, trees: 4, depth: .6 };
    svg.innerHTML = island(W * .12, H * .62, 300 * s + 40, 52, c) + island(W * .9, H * .45, 260 * s + 30, 61, c) +
      island(W * .7, H * .2, 120 * s, 7, { ...c, color: '#6d4a74' }) + island(W * .3, H * .18, 90 * s, 17, { ...c, color: '#6d4a74', ruins: false });
  }
  const bobStyle = document.createElement('style');
  bobStyle.textContent = `.bob{animation:bob 7s ease-in-out infinite alternate;animation-delay:var(--d)}@keyframes bob{to{transform:translateY(var(--a))}}.win{animation:win 4s ease-in-out infinite alternate}@keyframes win{50%{opacity:.4}}`;
  document.head.appendChild(bobStyle);
  buildIslands(); buildEnd();
  let rb; addEventListener('resize', () => { clearTimeout(rb); rb = setTimeout(() => { buildIslands(); buildEnd(); }, 150); });

  /* ---------- Astrolabe ticks + glyphs ---------- */
  const ticks = $('#ticks');
  let tk = '';
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2, long = i % 10 === 0, r1 = 250, r2 = long ? 270 : 260;
    tk += `<line x1="${(Math.cos(a) * r1).toFixed(1)}" y1="${(Math.sin(a) * r1).toFixed(1)}" x2="${(Math.cos(a) * r2).toFixed(1)}" y2="${(Math.sin(a) * r2).toFixed(1)}" stroke-width="${long ? 2 : 1}"/>`;
  }
  ticks.innerHTML = tk;
  const glyphShapes = [
    'M-8 8 L0 -8 L8 8Z', 'M-8 0 A8 8 0 1 1 8 0 A8 8 0 1 1 -8 0 M0 -8 V8', 'M-8 -8 L8 8 M8 -8 L-8 8', 'M-7 -7 H7 V7 H-7Z M-7 0 H7',
    'M0 -9 L8 0 L0 9 L-8 0Z', 'M-8 6 Q0 -14 8 6', 'M-8 -6 H8 M0 -6 V9 M-5 9 H5', 'M-6 -8 L6 8 M-6 8 L6 -8 M-9 0 H9',
  ];
  let gl = '';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2, x = Math.cos(a) * 128, y = Math.sin(a) * 128;
    gl += `<path class="a-glyph" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(a * 180 / Math.PI + 90).toFixed(0)})" d="${glyphShapes[i % glyphShapes.length]}"/>`;
  }
  $('#glyphs').innerHTML = gl;

  /* ---------- Title split ---------- */
  $$('[data-split]').forEach(el => {
    el.innerHTML = [...el.textContent].map((c, i) => `<span class="ch" style="animation-delay:${(.15 + i * .07).toFixed(2)}s">${c}</span>`).join('');
  });

  /* =========================================================
     EMBERS (canvas 2D)
     ========================================================= */
  const cv = $('#embers'), ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = Math.min(devicePixelRatio || 1, 2);
  const sizeCanvas = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  sizeCanvas(); addEventListener('resize', sizeCanvas);
  const embers = Array.from({ length: touch ? 34 : 70 }, () => spawn(true));
  function spawn(anywhere) {
    return { x: Math.random() * W, y: anywhere ? Math.random() * H : H + 10, r: .6 + Math.random() * 1.8, vy: .25 + Math.random() * .7, sway: Math.random() * 6.28, hue: 30 + Math.random() * 20, life: .4 + Math.random() * .6 };
  }

  /* =========================================================
     MAIN LOOP: parallax, astrolabe, embers, cursor glow
     ========================================================= */
  const mouse = { x: .5, y: .5, sx: .5, sy: .5, px: -999, py: -999 };
  addEventListener('pointermove', e => { mouse.x = e.clientX / innerWidth; mouse.y = e.clientY / innerHeight; mouse.px = e.clientX; mouse.py = e.clientY; }, { passive: true });
  const parEls = $$('[data-par]').map(el => ({ el, k: +el.dataset.par }));
  const spins = [[$$('.a-spin--1'), .06, 4], [$$('.a-spin--2'), -.09, -6], [$$('.a-spin--3'), .12, 9]];
  const glow = $('#glow'), hero = $('#hero'), nav = $('#nav');
  let t0 = performance.now();
  function frame(now) {
    const t = (now - t0) / 1000, y = scrollY;
    mouse.sx += (mouse.x - mouse.sx) * .06; mouse.sy += (mouse.y - mouse.sy) * .06;
    const mx = mouse.sx - .5, my = mouse.sy - .5;
    if (y < innerHeight * 1.2 && !reduce) {
      parEls.forEach(({ el, k }) => { el.style.transform = `translate3d(${(-mx * k * 60).toFixed(1)}px, ${(y * k - my * k * 40).toFixed(1)}px, 0)`; });
      spins.forEach(([els, sk, tsp]) => els.forEach(g => g.setAttribute('transform', `rotate(${(y * sk + t * tsp + mx * 10).toFixed(2)})`)));
      $('.astro-wrap').style.transform = `translate(-50%, -50%) translateY(${(y * .3).toFixed(1)}px) scale(${(1 + y / innerHeight * .25).toFixed(3)})`;
      $('.astro-wrap').style.opacity = Math.max(0, 1 - y / (innerHeight * .9)).toFixed(3);
    }
    nav.classList.toggle('solid', y > 40);
    if (!touch) glow.style.transform = `translate(${mouse.px}px, ${mouse.py}px)`;

    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < embers.length; i++) {
      const p = embers[i];
      if (!reduce) { p.y -= p.vy; p.sway += .02; p.x += Math.sin(p.sway) * .3; }
      if (p.y < -10) embers[i] = spawn(false);
      const a = p.life * (0.35 + 0.65 * Math.sin(p.sway * 2) ** 2);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${a.toFixed(2)})`;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, 1)`; ctx.shadowBlur = 8;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* =========================================================
     COUNTDOWN: campus gates open 15 Dec 2026, 06:00 IST
     ========================================================= */
  const target = new Date('2026-12-15T06:00:00+05:30').getTime();
  const cEls = Object.fromEntries($$('[data-c]').map(b => [b.dataset.c, b]));
  const tick = () => {
    let s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s %= 86400; const h = Math.floor(s / 3600); s %= 3600; const m = Math.floor(s / 60);
    cEls.d.textContent = String(d).padStart(2, '0'); cEls.h.textContent = String(h).padStart(2, '0');
    cEls.m.textContent = String(m).padStart(2, '0'); cEls.s.textContent = String(s % 60).padStart(2, '0');
  };
  tick(); setInterval(tick, 1000);

  /* =========================================================
     REVEAL + COUNT-UP
     ========================================================= */
  const countUp = el => {
    const to = +el.dataset.count, st = performance.now();
    const f = n => { const k = Math.min(1, (n - st) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    $$('[data-count]', e.target).forEach(countUp);
  }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
  $('#openCount').textContent = competitions.filter(c => c.open).length;

  /* =========================================================
     ARENAS: competitions with filters
     ========================================================= */
  const CAT = { national: 'National', pushpak: 'Pushpak Grand Challenge', ideates: 'Ideates', zonals: 'Zonals' };
  const cards = $('#cards'), filters = $('#filters');
  const matches = (c, f) => f === 'all' || (f === 'open' ? c.open : c.cat === f);
  $$('button', filters).forEach(b => { $('span', b).textContent = competitions.filter(c => matches(c, b.dataset.f)).length; });
  function renderCards(f) {
    const list = competitions.filter(c => matches(c, f)).sort((a, b) => b.open - a.open);
    cards.innerHTML = list.map((c, i) => `
      <article class="card" style="animation-delay:${Math.min(i, 10) * 45}ms">
        <div class="card__top"><span class="card__cat">${CAT[c.cat]}</span><span class="tag ${c.open ? 'tag--open' : ''}">${c.open ? 'Open' : 'Closed'}</span></div>
        <h3>${esc(c.name)}</h3>
        <p>${esc(c.desc)}</p>
        <div class="card__prize"><div><span>Prize pool</span><b>${esc(c.prize.replace('INR ', '₹').replace('Up to ₹', 'Up to ₹'))}</b></div>
          <a class="card__go" href="https://techfest.org/competitions" aria-label="View ${esc(c.name)} on techfest.org">→</a></div>
      </article>`).join('');
  }
  renderCards('open');
  filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', filters).forEach(x => x.setAttribute('aria-selected', x === b));
    renderCards(b.dataset.f);
  });
  cards.addEventListener('pointermove', e => {
    const c = e.target.closest('.card'); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`);
  });

  /* =========================================================
     PUSHPAK: animated drone swarm
     ========================================================= */
  const swarm = $('#swarm');
  const drones = Array.from({ length: 8 }, (_, i) => ({ bx: 50 + (i % 4) * 95 + (i > 3 ? 45 : 0), by: i > 3 ? 150 : 70, ph: i * 1.7 }));
  swarm.innerHTML = `<g id="links"></g>` + drones.map((d, i) => `
    <g id="dr${i}"><circle class="ping" r="10" style="animation-delay:${(i * .33).toFixed(2)}s"/>
      <path class="drone" d="M-9 -9 L9 9 M9 -9 L-9 9"/><circle class="drone" cx="-9" cy="-9" r="4"/><circle class="drone" cx="9" cy="-9" r="4"/><circle class="drone" cx="-9" cy="9" r="4"/><circle class="drone" cx="9" cy="9" r="4"/>
      <circle class="drone-core" r="2.6"/></g>`).join('');
  const links = $('#links', swarm);
  (function fly(n) {
    const t = n / 1000;
    drones.forEach((d, i) => { d.x = d.bx + Math.sin(t * .7 + d.ph) * 16; d.y = d.by + Math.cos(t * .9 + d.ph) * 12; $(`#dr${i}`, swarm).setAttribute('transform', `translate(${d.x.toFixed(1)} ${d.y.toFixed(1)})`); });
    let l = '';
    for (let a = 0; a < drones.length; a++) for (let b = a + 1; b < drones.length; b++) {
      const A = drones[a], B = drones[b];
      if (Math.hypot(A.x - B.x, A.y - B.y) < 125) l += `<line class="link" x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}"/>`;
    }
    links.innerHTML = l;
    if (!reduce) requestAnimationFrame(fly);
  })(0);

  /* =========================================================
     ZONALS: route with live "next stop"
     ========================================================= */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const fmt = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const upcoming = zonals.filter(z => new Date(z.date + 'T00:00:00') >= today);
  const nextDate = upcoming.length ? upcoming[0].date : null;
  const ordered = [...upcoming, ...zonals.filter(z => !upcoming.includes(z)).reverse()];
  $('#routeList').innerHTML = ordered.map(z => {
    const d = new Date(z.date + 'T00:00:00'), done = d < today, soon = z.date === nextDate;
    return `<li class="stop ${done ? 'done' : ''} ${soon ? 'soon' : ''}"><b>${esc(z.city)}</b><span>${fmt(z.date)}${done ? ' · done' : soon ? ' · next stop' : ''}</span><small>${esc(z.college)}</small></li>`;
  }).join('');
  const nextStops = upcoming.filter(z => z.date === nextDate);
  $('#routeNext').innerHTML = nextStops.length
    ? `<p class="kicker">Next stop</p><h3>${nextStops.map(z => esc(z.city)).join(' &amp; ')}</h3><p class="when">${fmt(nextDate)} 2026</p><p>${nextStops.map(z => esc(z.college)).join('<br/>')}</p><p style="margin-top:14px">${upcoming.length} of ${zonals.length} zonals still to come.</p>`
    : `<p class="kicker">The road ends</p><h3>See you at IIT Bombay</h3><p>All ${zonals.length} zonal rounds are complete. The finalists head to the grand finale.</p>`;

  /* =========================================================
     GUILD: workshops by category
     ========================================================= */
  const scrolls = $('#scrolls'), tabs = $('#wsTabs');
  const inr = n => '₹' + n.toLocaleString('en-IN');
  function renderWs(c) {
    scrolls.innerHTML = workshops.filter(w => w.cat === c).map((w, i) => `
      <article class="scroll" style="animation-delay:${i * 50}ms">
        ${w.cat === 'combo' ? '<span class="combo">COMBO · 2 CERTIFICATES</span>' : ''}
        <h3>${esc(w.name)}</h3>
        <div class="price"><b>${inr(w.price)}</b><s>${inr(w.was)}</s><em>−${Math.round((1 - w.price / w.was) * 100)}%</em></div>
      </article>`).join('');
  }
  renderWs('combo');
  tabs.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', tabs).forEach(x => x.setAttribute('aria-selected', x === b));
    renderWs(b.dataset.c);
  });

  /* =========================================================
     NAV, MAGNETIC BUTTONS
     ========================================================= */
  const burger = $('#burger'), links2 = $('#navLinks');
  burger.addEventListener('click', () => { const o = links2.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  $$('a', links2).forEach(a => a.addEventListener('click', () => { links2.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }));
  const navMap = Object.fromEntries($$('a', links2).map(a => [a.getAttribute('href').slice(1), a]));
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { $$('a', links2).forEach(a => a.classList.remove('on')); navMap[e.target.id] && navMap[e.target.id].classList.add('on'); }
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['arenas', 'zonals', 'guild', 'ignite', 'stay'].forEach(id => so.observe(document.getElementById(id)));

  if (!touch && !reduce) $$('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
})();
