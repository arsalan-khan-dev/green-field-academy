'use strict';

const initAdmissionModal = () => {
  const triggers = document.querySelectorAll('[data-modal="admission"]');
  if (!triggers.length) return;

  const modal = document.createElement('div');
  modal.id = 'admission-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-title');
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-panel">
      <button class="modal-close" aria-label="Close dialog">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <div class="modal-header">
        <span class="eyebrow">Admissions 2025–26</span>
        <h2 class="heading-section" id="modal-title">Begin Your Journey</h2>
        <p class="modal-sub">Fill in your details and our admissions team will reach out within 24 hours.</p>
      </div>
      <form class="modal-form" id="admission-form" novalidate>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="m-fname">First Name *</label>
            <input class="form-control" id="m-fname" type="text" placeholder="Jane" required autocomplete="given-name">
          </div>
          <div class="form-group">
            <label class="form-label" for="m-lname">Last Name *</label>
            <input class="form-control" id="m-lname" type="text" placeholder="Doe" required autocomplete="family-name">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="m-email">Email Address *</label>
          <input class="form-control" id="m-email" type="email" placeholder="jane@example.com" required autocomplete="email">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="m-grade">Applying for Grade</label>
            <select class="form-control" id="m-grade">
              <option value="">Select Grade</option>
              <option value="k-2">Grade K–2</option>
              <option value="3-5">Grade 3–5</option>
              <option value="6-8">Grade 6–8</option>
              <option value="9-10">Grade 9–10</option>
              <option value="11-12">Grade 11–12</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="m-phone">Phone Number</label>
            <input class="form-control" id="m-phone" type="tel" placeholder="+1 555 000 0000" autocomplete="tel">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="m-msg">Message (optional)</label>
          <textarea class="form-control" id="m-msg" rows="3" placeholder="Any questions or special requirements…"></textarea>
        </div>
        <button type="submit" class="btn btn--primary modal-submit-btn">
          Submit Application
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </form>
    </div>`;
  document.body.appendChild(modal);

  const style = document.createElement('style');
  style.textContent = `
    #admission-modal{position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;padding:1.5rem;opacity:0;pointer-events:none;transition:opacity .35s ease}
    #admission-modal.open{opacity:1;pointer-events:all}
    .modal-backdrop{position:absolute;inset:0;background:rgba(42,37,32,.75);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
    .modal-panel{position:relative;z-index:1;background:var(--clr-ivory);border-radius:var(--radius-xl);padding:clamp(1.75rem,5vw,3rem);max-width:560px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-xl);transform:translateY(20px);transition:transform .4s var(--ease-out)}
    #admission-modal.open .modal-panel{transform:translateY(0)}
    .modal-close{position:absolute;top:1.25rem;right:1.25rem;width:36px;height:36px;border-radius:50%;background:var(--clr-stone-100);display:flex;align-items:center;justify-content:center;transition:background var(--dur-fast);cursor:pointer}
    .modal-close:hover{background:var(--clr-stone-200)}
    .modal-header{margin-bottom:1.5rem}
    .modal-sub{font-size:var(--text-sm);color:var(--clr-stone-500);line-height:1.65;margin-top:.5rem}
    .modal-form .form-group{margin-bottom:1rem}
    .modal-submit-btn{width:100%;justify-content:center;margin-top:.75rem}
    @media(max-width:480px){.modal-panel{padding:1.5rem}.modal-form .form-row{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = modal.querySelector('.modal-close');
  const form     = modal.querySelector('#admission-form');
  let lastFocus;

  const openModal = () => {
    lastFocus = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('#m-fname')?.focus(), 50);
  };
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    lastFocus?.focus();
  };

  triggers.forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); openModal(); }));
  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  // Focus trap
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(modal.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const svgHTML = btn.querySelector('svg').outerHTML;
    btn.innerHTML = '&#10003; Application Submitted! ' + svgHTML;
    btn.disabled = true;
    setTimeout(() => closeModal(), 2200);
    setTimeout(() => { btn.innerHTML = 'Submit Application ' + svgHTML; btn.disabled = false; form.reset(); }, 3000);
  });
};

const initSkipLink = () => {
  if (document.querySelector('.skip-link')) return;
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.textContent = 'Skip to main content';
  skip.className = 'skip-link';
  document.body.prepend(skip);
  const s = document.createElement('style');
  s.textContent = `.skip-link{position:fixed;top:-100%;left:1rem;z-index:99999;background:var(--clr-emerald);color:white;padding:.5rem 1rem;border-radius:var(--radius-md);font-size:.9rem;font-weight:600;transition:top .2s;text-decoration:none}.skip-link:focus{top:1rem}`;
  document.head.appendChild(s);
};

const initFocusVisible = () => {
  document.addEventListener('mousedown', () => document.body.classList.add('using-mouse'));
  document.addEventListener('keydown',   () => document.body.classList.remove('using-mouse'));
  const s = document.createElement('style');
  s.textContent = `.using-mouse *:focus{outline:none!important}*:focus-visible{outline:2px solid var(--clr-emerald);outline-offset:3px;border-radius:var(--radius-sm)}`;
  document.head.appendChild(s);
};

document.addEventListener('DOMContentLoaded', () => {
  initAdmissionModal();
  initSkipLink();
  initFocusVisible();
});
