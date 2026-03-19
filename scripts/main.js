// ── GRAFFITI SVG ──
function makeGraffiti(id, dark = true) {
  const el = document.getElementById(id);
  if (!el) return;
  const words = ['CREATIVE','ART','PHOTO','URBAN','STYLE','VISION','SHOOT','MODA',
                 'BOGOTÁ','LIGHT','DARK','FILM','LENS','FRAME','STORY','LIFE',
                 'MOTION','COLOR','RAW','TRUTH','LOVE','WORK','GRIND','HUSTLE',
                 'RETRATO','MODA','EDICIÓN','VIDEO','REDES','CONTENT'];
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox','0 0 1000 800');
  for (let i = 0; i < 60; i++) {
    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', Math.random() * 1000);
    t.setAttribute('y', Math.random() * 800);
    t.setAttribute('font-size', 12 + Math.random() * 40);
    t.setAttribute('font-weight', 'bold');
    t.setAttribute('fill', dark ? '#fff' : '#000');
    t.setAttribute('transform', `rotate(${(Math.random()-0.5)*60},${Math.random()*1000},${Math.random()*800})`);
    t.setAttribute('opacity', 0.3 + Math.random() * 0.7);
    t.textContent = words[Math.floor(Math.random() * words.length)];
    svg.appendChild(t);
  }
  el.appendChild(svg);
}

// ── SCROLL REVEAL ──
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  els.forEach(r => obs.observe(r));
}

// ── CURSOR TRAIL ──
function initCursor() {
  const trail = [];
  for (let i = 0; i < 8; i++) {
    const d = document.createElement('div');
    d.style.cssText = `position:fixed;width:${4+i}px;height:${4+i}px;border-radius:50%;
      background:rgba(255,255,255,${0.12 - i*0.012});pointer-events:none;z-index:9999;
      mix-blend-mode:difference;`;
    document.body.appendChild(d);
    trail.push({ el: d, x: 0, y: 0 });
  }
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function anim() {
    trail.forEach((t, i) => {
      const prev = i === 0 ? { x: mx, y: my } : trail[i-1];
      t.x += (prev.x - t.x) * 0.35;
      t.y += (prev.y - t.y) * 0.35;
      t.el.style.left = t.x - t.el.offsetWidth/2 + 'px';
      t.el.style.top  = t.y - t.el.offsetHeight/2 + 'px';
    });
    requestAnimationFrame(anim);
  })();
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCursor();
});