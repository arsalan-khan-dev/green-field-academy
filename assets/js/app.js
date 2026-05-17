'use strict';

const initLoader = () => {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;
  const minTime = 2000;
  const startTime = Date.now();
  window.addEventListener('load', () => {
    const remaining = Math.max(0, minTime - (Date.now() - startTime));
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => { loader.remove(); document.body.classList.add('loaded'); }, 650);
    }, remaining);
  });
};

const initNavbar = () => {
  const navbar     = document.getElementById('navbar');
  const toggle     = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const links      = document.querySelectorAll('.nav-link');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      navbar.classList.toggle('menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('.nav-mobile-link, .nav-mobile-admit').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        navbar.classList.remove('menu-open');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' });
  sections.forEach(s => sectionObserver.observe(s));
};

const initCursor = () => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100, rafId = null;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  const lerp = (a, b, t) => a + (b - a) * t;
  const tick = () => {
    ringX = lerp(ringX, mouseX, 0.14);
    ringY = lerp(ringY, mouseY, 0.14);
    dot.style.transform  = `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;
    rafId = requestAnimationFrame(tick);
  };
  tick();

  const hoverSel = 'a, button, [data-cursor="hover"], .academic-card, .event-card, .faculty-card, .gallery-item, .campus-item';
  document.addEventListener('mouseover', e => { if (e.target.closest(hoverSel)) ring.classList.add('hovering'); });
  document.addEventListener('mouseout',  e => { if (e.target.closest(hoverSel)) ring.classList.remove('hovering'); });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && rafId) { cancelAnimationFrame(rafId); rafId = null; }
    else if (!document.hidden && !rafId) tick();
  });
};

const initProgressBar = () => {
  const bar = document.getElementById('page-progress');
  if (!bar) return;
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  bar.setAttribute('aria-valuenow', '0');
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? Math.min(Math.round((window.scrollY / h) * 100), 100) : 0;
    bar.style.width = `${p}%`;
    bar.setAttribute('aria-valuenow', String(p));
  };
  window.addEventListener('scroll', update, { passive: true });
};

const initBackTop = () => {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 600), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

const initSmoothScroll = () => {
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  });
};

const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const svgHTML = btn.querySelector('svg') ? btn.querySelector('svg').outerHTML : '';
    btn.innerHTML = 'Sending&hellip;';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '&#10003; Message Sent! ' + svgHTML;
      btn.style.background = 'var(--clr-emerald-mid)';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = 'Send Message ' + svgHTML;
        btn.disabled = false;
        btn.style.background = '';
      }, 3500);
    }, 1500);
  });
};

const initLazyImages = () => {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) return;
    img.classList.add('loading');
    img.addEventListener('load',  () => { img.classList.remove('loading'); img.classList.add('loaded'); }, { once: true });
    img.addEventListener('error', () => img.classList.remove('loading'), { once: true });
  });
};

const initNewsletter = () => {
  document.querySelectorAll('.footer-newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('button');
      if (!input || !input.value.trim()) { if (input) input.focus(); return; }
      const orig = btn.textContent;
      btn.textContent = '&#10003; Subscribed';
      btn.disabled = true;
      input.value  = '';
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-loaded');
  initLoader();
  initNavbar();
  initCursor();
  initProgressBar();
  initBackTop();
  initSmoothScroll();
  initContactForm();
  initLazyImages();
  initNewsletter();
});
