/**
 * VERYAXZ — page behaviour.
 * Small and dependency free: header state, mobile menu, act indicator,
 * one-axis reveals, Türkiye clock and the axis-locked index preview.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

/* Header: solid after the first screen, hides on the way down ------------- */
function initHeader() {
  const hd = document.querySelector<HTMLElement>('[data-hd]');
  if (!hd) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    hd.toggleAttribute('data-scrolled', y > 24);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 320 && !hd.contains(document.activeElement)) hd.setAttribute('data-hidden', '');
    else if (goingUp || y < 120) hd.removeAttribute('data-hidden');
    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  hd.addEventListener('focusin', () => hd.removeAttribute('data-hidden'));
  update();
}

/* Mobile menu: native <dialog> gives focus trapping and Esc ------------------ */
function initMenu() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  if (!dialog || !openBtn) return;

  const close = () => dialog.close();
  openBtn.addEventListener('click', () => {
    dialog.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  });
  dialog.addEventListener('close', () => {
    openBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    openBtn.focus({ preventScroll: true });
  });
  dialog.querySelector('[data-menu-close]')?.addEventListener('click', close);
  dialog.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', close));
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && dialog.open) close();
  });
}

/* Reveals: elements move along exactly one axis, once ----------------------- */
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!items.length) return;
  if (reduced.matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  items.forEach((el) => io.observe(el));
}

/* Act indicator in the header + current nav item ---------------------------- */
function initActs() {
  const acts = document.querySelectorAll<HTMLElement>('[data-act]');
  const no = document.querySelector<HTMLElement>('[data-act-no]');
  const name = document.querySelector<HTMLElement>('[data-act-name]');
  const links = document.querySelectorAll<HTMLAnchorElement>('.hd__nav a');
  if (!acts.length || !no || !name) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        no.textContent = el.dataset.act ?? '';
        name.textContent = el.dataset.actName ?? '';
        links.forEach((a) => {
          const match = el.id && a.hash === `#${el.id}`;
          if (match) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  acts.forEach((el) => io.observe(el));
}

/* Türkiye clock -------------------------------------------------------------- */
function initClock() {
  const els = document.querySelectorAll<HTMLTimeElement>('[data-clock]');
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const tick = () => {
    const now = new Date();
    const text = fmt.format(now);
    els.forEach((el) => {
      el.textContent = text;
      el.dateTime = now.toISOString();
    });
  };
  tick();
  window.setInterval(tick, 20_000);
}

/* Index preview: follows the pointer on the Y axis only ---------------------- */
function initIndexPreview() {
  const list = document.querySelector<HTMLElement>('[data-index]');
  const preview = document.querySelector<HTMLElement>('[data-index-preview]');
  if (!list || !preview || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const imgs = preview.querySelectorAll<HTMLElement>('[data-preview]');
  const rows = list.querySelectorAll<HTMLElement>('[data-row]');
  let raf = 0;
  let targetY = 0;
  let y = 0;

  const loop = () => {
    y += (targetY - y) * (reduced.matches ? 1 : 0.18);
    preview.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    if (Math.abs(targetY - y) > 0.5) raf = requestAnimationFrame(loop);
    else raf = 0;
  };

  list.addEventListener('pointermove', (e) => {
    const box = list.getBoundingClientRect();
    targetY = Math.max(0, Math.min(box.height - preview.offsetHeight, e.clientY - box.top - preview.offsetHeight / 2));
    if (!raf) raf = requestAnimationFrame(loop);
  });
  rows.forEach((row) => {
    row.addEventListener('pointerenter', () => {
      list.setAttribute('data-hovering', '');
      imgs.forEach((img) => img.toggleAttribute('data-active', img.dataset.preview === row.dataset.row));
    });
  });
  list.addEventListener('pointerleave', () => list.removeAttribute('data-hovering'));
}

initHeader();
initMenu();
initReveal();
initActs();
initClock();
initIndexPreview();
