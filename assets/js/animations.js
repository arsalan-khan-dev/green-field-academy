'use strict';

const initScrollReveal = () => {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => io.observe(el));
};

const initStaggerGroups = () => {
  document.querySelectorAll('[data-stagger]').forEach(group => {
    const base = parseInt(group.dataset.stagger) || 80;
    Array.from(group.children).forEach((child, i) => {
      if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', 'up');
      child.style.transitionDelay = `${i * base}ms`;
    });
  });
  initScrollReveal();
};

const initParallax = () => {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  const slowEls = document.querySelectorAll('.parallax-slow');
  const fastEls = document.querySelectorAll('.parallax-fast');
  if (!slowEls.length && !fastEls.length) return;
  const onScroll = () => {
    const sy = window.scrollY;
    slowEls.forEach(el => {
      const c = el.getBoundingClientRect().top + el.offsetHeight / 2 + sy - window.innerHeight / 2;
      el.style.transform = `translateY(${(sy - c) * 0.08}px)`;
    });
    fastEls.forEach(el => {
      const c = el.getBoundingClientRect().top + el.offsetHeight / 2 + sy - window.innerHeight / 2;
      el.style.transform = `translateY(${(sy - c) * 0.18}px)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
};

const initCounters = () => {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const easeOut = t => 1 - Math.pow(1 - t, 4);
  const animate = (el) => {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 2000;
    const start    = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = prefix + (Number.isInteger(target) ? Math.round(target * easeOut(p)) : (target * easeOut(p)).toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
};

const initMarquee = () => {
  document.querySelectorAll('.marquee-track').forEach(track => {
    const items = Array.from(track.children);
    if (!items.length) return;
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });
};

const initTilt = () => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.academic-card, .event-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 7}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      card.style.transform  = '';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initStaggerGroups();
  initScrollReveal();
  initParallax();
  initCounters();
  initMarquee();
  initTilt();
});
