// === GSAP + LENIS INIT ===
(function gsapInit() {
  // Init Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
  });
  window.lenis = lenis;

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // Scroll progress bar
  ScrollTrigger.create({
    onUpdate: (self) => {
      const bar = document.getElementById('scrollProgress');
      if (bar) bar.style.width = (self.progress * 100) + '%';
    },
  });

  // === REVEAL ANIMATIONS ===
  // Fade up for cards and grid items
  gsap.utils.toArray('.service-card, .project-card, .reason-card, .testimonial-card, .faq-item, .about-photo, .calc-form, .calc-result, .skill-bar-item, .timeline-item, .cta-form, .cta-contacts').forEach((el, i) => {
    const parent = el.closest('.services-grid, .projects-grid, .reasons-grid, .testimonials-grid, .faq-list, .skill-progress, .timeline, .about-layout');
    const siblings = parent ? Array.from(parent.children).filter(c => c !== el) : [];
    const idx = siblings.indexOf(el);
    const delay = Math.min((idx + 1) * 0.06, 0.6);
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: delay,
      ease: 'power3.out',
    });
  });

  // Section header reveals
  document.querySelectorAll('.section-header').forEach((header) => {
    const label = header.querySelector('.label');
    const h2 = header.querySelector('h2');
    const p = header.querySelector('p');
    const items = [label, h2, p].filter(Boolean);
    gsap.from(items, {
      scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' },
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    });
  });

  // Hero content entrance
  gsap.from('.hero-card, .hero-text', {
    scrollTrigger: { trigger: '.hero', start: 'top top', toggleActions: 'play none none none' },
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
  });

  // Timeline items stagger
  gsap.from('.timeline-item', {
    scrollTrigger: { trigger: '.timeline', start: 'top 85%' },
    x: -30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
  });

  // Project cards stagger
  gsap.from('.project-card', {
    scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
    y: 60,
    opacity: 0,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
  });

  // Skill bars animate width
  gsap.utils.toArray('.skill-bar-fill').forEach((bar) => {
    gsap.to(bar, {
      scrollTrigger: { trigger: bar, start: 'top 85%' },
      width: bar.dataset.width + '%',
      duration: 1.2,
      ease: 'power3.out',
    });
  });

  // Counter animation
  gsap.utils.toArray('.count-to').forEach((el) => {
    const target = parseInt(el.dataset.target);
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      textContent: 0,
      duration: 1.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: () => { el.textContent = Math.round(el.textContent); },
    });
  });

  // FAQ items stagger
  gsap.from('.faq-item', {
    scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power2.out',
  });

  // Footer reveal
  gsap.from('.footer-logo, .footer-links, .footer-copy', {
    scrollTrigger: { trigger: 'footer', start: 'top 90%' },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  });

  // Refresh ScrollTrigger on resize
  window.addEventListener('resize', () => ScrollTrigger.refresh());

  // Force refresh after Lenis takes over scroll
  setTimeout(() => ScrollTrigger.refresh(), 100);
})();
