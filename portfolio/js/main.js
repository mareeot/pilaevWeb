// === NAV SCROLL ===
window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 50);
});

// === THEME TOGGLE ===
(function themeToggle() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  const sun = btn.querySelector('.sun');
  const moon = btn.querySelector('.moon');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    html.setAttribute('data-theme', 'light');
    sun.style.display = 'none';
    moon.style.display = '';
  } else {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    sun.style.display = '';
    moon.style.display = 'none';
  }

  btn.addEventListener('click', () => {
    const isDark = !html.hasAttribute('data-theme');
    if (isDark) {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      sun.style.display = 'none';
      moon.style.display = '';
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      sun.style.display = '';
      moon.style.display = 'none';
    }
  });
})();

// === MOBILE MENU ===
document.querySelector('.hamburger')?.addEventListener('click', () => {
  const menu = document.getElementById('mobileMenu');
  const btn = document.querySelector('.hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('active');
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target && window.lenis) {
      window.lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.getElementById('mobileMenu')?.classList.remove('open');
    document.querySelector('.hamburger')?.classList.remove('active');
  });
});

// === BACK TO TOP ===
(function backToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    if (window.lenis) { window.lenis.scrollTo(0, { duration: 1.5 }); }
    else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  });
})();

// === ACTIVE NAV LINK ===
(function activeNav() {
  const links = document.querySelectorAll('nav .nav-links a');
  if (!links.length) return;

  const sections = Array.from(links).map(a => {
    const id = a.getAttribute('href');
    return document.querySelector(id);
  }).filter(Boolean);

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    links.forEach(a => {
      a.classList.toggle('active', '#' + current === a.getAttribute('href'));
    });
  });
})();

// === CONTACT FORM ===
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  const btn = e.target.querySelector('button');
  const orig = btn.textContent;

  if (!e.target.action.includes('https://formspree.io/f/xnjrybor')) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    localStorage.setItem('portfolio_lead', JSON.stringify(data));

    btn.textContent = '✓ Заявка сохранена!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      e.target.reset();
    }, 3000);
    return;
  }
});

// === FAQ ACCORDION ===
(function faqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// === CALCULATOR ===
(function calculator() {
  const typeEl = document.getElementById('calcType');
  const designEl = document.getElementById('calcDesign');
  const designLabel = document.getElementById('calcDesignLabel');
  const totalEl = document.getElementById('calcTotal');
  const breakdownEl = document.getElementById('calcBreakdown');
  const checkboxes = {
    adaptive: document.getElementById('calcAdaptive'),
    seo: document.getElementById('calcSEO'),
    admin: document.getElementById('calcAdmin'),
    anim: document.getElementById('calcAnim'),
    payment: document.getElementById('calcPayment'),
    blog: document.getElementById('calcBlog'),
  };

  const prices = {
    adaptive: 5000,
    seo: 10000,
    admin: 25000,
    anim: 8000,
    payment: 15000,
    blog: 12000,
  };

  const designNames = ['По шаблону', 'Индивидуальный', 'Премиум'];

  function update() {
    const base = parseInt(typeEl.value);
    const design = parseInt(designEl.value);
    designLabel.textContent = designNames[design];

    const designCost = design * 15000;
    let extras = 0;
    const lines = [];

    lines.push({ label: 'Базовая стоимость', val: base });
    if (designCost > 0) lines.push({ label: 'Дизайн (' + designNames[design].toLowerCase() + ')', val: designCost });

    Object.keys(checkboxes).forEach(key => {
      if (checkboxes[key].checked) {
        extras += prices[key];
        const names = { adaptive: 'Адаптивность', seo: 'SEO', admin: 'Админ-панель', anim: 'Анимации', payment: 'Платёжная система', blog: 'Блог' };
        lines.push({ label: names[key], val: prices[key] });
      }
    });

    const total = base + designCost + extras;
    totalEl.textContent = total.toLocaleString('ru-RU');

    breakdownEl.innerHTML = lines.map(l =>
      `<div><span>${l.label}</span><span>${l.val.toLocaleString('ru-RU')} ₽</span></div>`
    ).join('');
  }

  typeEl.addEventListener('change', update);
  designEl.addEventListener('input', update);
  Object.values(checkboxes).forEach(cb => cb.addEventListener('change', update));
  update();
})();

// === MARQUEE TECH STRIP ===
(function marquee() {
  const strip = document.createElement('div');
  strip.style.cssText = 'overflow:hidden;background:var(--gray-light);padding:16px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);position:relative';
  const inner = document.createElement('div');
  inner.style.cssText = 'display:flex;gap:48px;white-space:nowrap;animation:marquee 30s linear infinite;font-size:14px;font-weight:500;color:var(--gray)';
  const techs = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Docker', 'GraphQL', 'Figma', 'Three.js', 'GSAP', 'WebGL', 'REST API'];
  const content = [...techs, ...techs].map(t => `<span style="display:flex;align-items:center;gap:8px"><span style="color:var(--orange)">●</span>${t}</span>`).join('');
  inner.innerHTML = content;
  strip.appendChild(inner);

  const hero = document.querySelector('.hero');
  hero?.parentNode?.insertBefore(strip, hero.nextSibling);

  const style = document.createElement('style');
  style.textContent = '@keyframes marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }';
  document.head.appendChild(style);
})();
