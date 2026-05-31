// === TYPEWRITER EFFECT ===
(function typewriter() {
  const lines = document.querySelectorAll('.hero-card .code-content .line');
  if (!lines.length) return;

  lines.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.transform = 'translateY(8px)';
  });

  let idx = 0;
  function showNext() {
    if (idx >= lines.length) return;
    const el = lines[idx];
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    el.style.background = 'rgba(255,107,53,0.06)';
    el.style.borderRadius = '3px';
    setTimeout(() => { el.style.background = 'transparent'; }, 400);
    idx++;
    const delay = el.textContent.length > 30 ? 60 : el.textContent.length > 15 ? 40 : 25;
    setTimeout(showNext, delay * 1.5 + 20);
  }
  setTimeout(showNext, 500);
})();

// === HERO SPOTLIGHT ===
(function heroSpotlight() {
  const spot = document.getElementById('heroSpotlight');
  if (!spot || !window.matchMedia('(hover: hover)').matches) return;
  const hero = document.querySelector('.hero');
  let ax = 0, ay = 0, px = 0, py = 0;
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    px = e.clientX - rect.left;
    py = e.clientY - rect.top;
  });
  function follow() {
    ax += (px - ax) * 0.08;
    ay += (py - ay) * 0.08;
    spot.style.left = ax + 'px';
    spot.style.top = ay + 'px';
    requestAnimationFrame(follow);
  }
  follow();
})();

// === CUSTOM CURSOR ===
(function cursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;width:24px;height:24px;border:2px solid rgba(255,107,53,0.4);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-12px,-12px);transition:width 0.2s,height 0.2s,border-color 0.2s,transform 0.2s;top:0;left:0';
  document.body.appendChild(el);

  const dot = document.createElement('div');
  dot.style.cssText = 'position:fixed;width:6px;height:6px;background:#ff6b35;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-3px,-3px);transition:transform 0.1s;top:0;left:0';
  document.body.appendChild(dot);

  let px = 0, py = 0;
  document.addEventListener('mousemove', (e) => {
    px = e.clientX;
    py = e.clientY;
    el.style.left = px + 'px';
    el.style.top = py + 'px';
    dot.style.left = px + 'px';
    dot.style.top = py + 'px';
  });

  const enlarge = () => { el.style.width = '36px'; el.style.height = '36px'; el.style.borderColor = 'rgba(255,107,53,0.7)'; el.style.transform = 'translate(-18px,-18px)'; dot.style.transform = 'translate(-3px,-3px) scale(0.6)'; };
  const shrink = () => { el.style.width = '24px'; el.style.height = '24px'; el.style.borderColor = 'rgba(255,107,53,0.4)'; el.style.transform = 'translate(-12px,-12px)'; dot.style.transform = 'translate(-3px,-3px) scale(1)'; };

  document.querySelectorAll('a, button, .service-card, .project-card, .reason-card, .skill-tag, .photo-frame, .testimonial-card, .calc-group select, .calc-group input, .calc-checkboxes label').forEach(el => {
    el.addEventListener('mouseenter', enlarge);
    el.addEventListener('mouseleave', shrink);
  });

  document.addEventListener('mousedown', () => { dot.style.transform = 'translate(-3px,-3px) scale(0.4)'; el.style.transform = 'translate(-12px,-12px) scale(0.8)'; });
  document.addEventListener('mouseup', () => { dot.style.transform = 'translate(-3px,-3px) scale(1)'; el.style.transform = 'translate(-12px,-12px) scale(1)'; });
})();

// === PARALLAX HERO ===
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.hero-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  });

  document.querySelector('.hero')?.addEventListener('mouseleave', () => {
    const card = document.querySelector('.hero-card');
    if (card) card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  });
}

// === CURSOR TRAIL ===
(function cursorTrail() {
  if (window.matchMedia('(hover: none)').matches) return;
  const trail = [];
  const count = 8;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;width:${6 - i * 0.5}px;height:${6 - i * 0.5}px;border-radius:50%;pointer-events:none;z-index:9998;background:rgba(255,107,53,${0.15 - i * 0.015});transform:translate(-50%,-50%);transition:opacity 0.1s`;
    document.body.appendChild(el);
    trail.push({ el, x: 0, y: 0 });
  }
  document.addEventListener('mousemove', e => {
    trail[0].x = e.clientX;
    trail[0].y = e.clientY;
  });
  function animateTrail() {
    for (let i = trail.length - 1; i > 0; i--) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.25;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.25;
    }
    trail.forEach(t => { t.el.style.left = t.x + 'px'; t.el.style.top = t.y + 'px'; });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
})();

// === TEXT SCRAMBLE EFFECT ===
(function textScramble() {
  const el = document.querySelector('.scramble-text');
  if (!el) return;
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const original = el.textContent;
  let frame, interval;

  function update() {
    let output = '';
    const progress = frame / 60;
    for (let i = 0; i < original.length; i++) {
      if (original[i] === ' ') { output += ' '; continue; }
      if (progress * original.length > i) {
        output += original[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = output;
    frame++;
    if (frame <= 60) { interval = requestAnimationFrame(update); }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        frame = 0;
        cancelAnimationFrame(interval);
        interval = requestAnimationFrame(update);
        observer.unobserve(entry);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(el);
})();

// === MAGNETIC BUTTONS ===
(function magneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.btn, .btn-nav, .theme-toggle').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// === 3D TILT ON CARDS ===
(function tiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.service-card, .project-card, .reason-card, .testimonial-card').forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
    });
  });
})();
