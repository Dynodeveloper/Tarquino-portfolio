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
  const cam = document.createElementNS(ns, 'path');

  for (let i = 0; i < 60; i++) {
    if(Math.random() < 0.1){
      cam.setAttribute('d', 'M8.293 4.293A1 1 0 0 1 9 4h6a1 1 0 0 1 .707.293L17.414 6H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.586l1.707-1.707zM9.414 6L7.707 7.707A1 1 0 0 1 7 8H4v10h16V8h-3a1 1 0 0 1-.707-.293L14.586 6H9.414zM12 10.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0z');
      cam.setAttribute('fill', dark ? '#fff' : '#000');
      cam.setAttribute('opacity', 0.3 + Math.random() * 0.7);
      cam.setAttribute('transform', `translate(${Math.random() * 1000}, ${Math.random() * 800}) scale(2.5) rotate(${Math.random() * 360})`);
      svg.setAttribute('viewBox','0 0 1000 800');
      svg.appendChild(cam.cloneNode());} 
    else{
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