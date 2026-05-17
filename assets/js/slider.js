'use strict';

const initGalleryLightbox = () => {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image lightbox');
  lb.innerHTML = `
    <div class="lb-backdrop"></div>
    <div class="lb-content">
      <button class="lb-close" aria-label="Close lightbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      <button class="lb-prev" aria-label="Previous image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <button class="lb-next" aria-label="Next image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
      <div class="lb-visual"></div>
      <div class="lb-caption" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(lb);

  const s = document.createElement('style');
  s.textContent = `
    #lightbox{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:1.5rem;opacity:0;pointer-events:none;transition:opacity .3s ease}
    #lightbox.open{opacity:1;pointer-events:all}
    .lb-backdrop{position:absolute;inset:0;background:rgba(30,28,24,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
    .lb-content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:1rem;max-width:90vw}
    .lb-visual{width:clamp(300px,70vw,900px);height:clamp(200px,55vh,600px);border-radius:16px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.5);transition:opacity .25s}
    .lb-caption{font-family:var(--font-display);font-size:.85rem;color:rgba(255,255,255,.55);letter-spacing:.06em;text-transform:uppercase}
    .lb-close,.lb-prev,.lb-next{position:absolute;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;color:white;cursor:pointer;transition:background .2s}
    .lb-close:hover,.lb-prev:hover,.lb-next:hover{background:rgba(255,255,255,.25)}
    .lb-close{top:-52px;right:0}
    .lb-prev{left:-56px;top:50%;transform:translateY(-50%)}
    .lb-next{right:-56px;top:50%;transform:translateY(-50%)}
    @media(max-width:768px){.lb-prev{left:4px}.lb-next{right:4px}.lb-close{top:-48px;right:0}}
  `;
  document.head.appendChild(s);

  const gradients = [
    'linear-gradient(135deg,#1E5645,#3D8B6E)','linear-gradient(135deg,#C0624A,#C07A4A)',
    'linear-gradient(135deg,#4A5C3A,#8FA67A)','linear-gradient(135deg,#3D3730,#6B6259)',
    'linear-gradient(135deg,#2A6E58,#4A5C3A)','linear-gradient(135deg,#B05535,#C07A4A)',
    'linear-gradient(135deg,#1E5645,#2A6E58)','linear-gradient(135deg,#8FA67A,#4A5C3A)'
  ];
  const captions = ['Innovation Lab','Science Lab','Sports Ground','Art Studio','Library','Annual Day','Campus Grounds','Music Hall'];

  const visual  = lb.querySelector('.lb-visual');
  const caption = lb.querySelector('.lb-caption');
  let cur = 0, lastFocus;

  const open = i => {
    lastFocus = document.activeElement;
    cur = ((i % items.length) + items.length) % items.length;
    visual.style.background = gradients[cur] || gradients[0];
    caption.textContent = captions[cur] || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  };
  const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lastFocus?.focus();
  };

  items.forEach((item, i) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', captions[i] ? `View ${captions[i]}` : `View image ${i + 1}`);
    item.addEventListener('click', () => open(i));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });

  lb.querySelector('.lb-backdrop').addEventListener('click', close);
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', () => open(cur - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => open(cur + 1));

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  open(cur - 1);
    if (e.key === 'ArrowRight') open(cur + 1);
  });

  // Focus trap
  lb.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(lb.querySelectorAll('button'));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initGalleryLightbox();
});
