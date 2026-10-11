/**
 * VERYAXZ — page behaviour.
 * Small and dependency free: header state, mobile menu, act indicator,
 * one-axis reveals, mobile action bar, outbound-click events and the
 * axis-locked index preview.
 */

declare global {
  interface Window {
    __vx?: number;
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

window.__vx = 1;
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
  const links = document.querySelectorAll<HTMLAnchorElement>('.hd__nav a[data-section]');
  if (!acts.length || !no || !name) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        no.textContent = el.dataset.act ?? '';
        name.textContent = el.dataset.actName ?? '';
        links.forEach((a) => {
          if (el.id && a.dataset.section === el.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  acts.forEach((el) => io.observe(el));
}

/* Mobile action bar: after the first screen, hidden where contact is on screen */
function initActionBar() {
  const bar = document.querySelector<HTMLElement>('[data-abar]');
  if (!bar) return;
  const quiet = document.querySelectorAll<HTMLElement>('[data-abar-hide], footer');
  const visible = new Set<Element>();
  let pastFold = false;
  const sync = () => bar.toggleAttribute('data-show', pastFold && visible.size === 0);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      sync();
    });
    quiet.forEach((el) => io.observe(el));
  }
  const onScroll = () => {
    const next = window.scrollY > window.innerHeight * 0.6;
    if (next !== pastFold) {
      pastFold = next;
      sync();
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Events: cookieless analytics, only when the script is configured --------- */
function initEvents() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-event]');
    if (!el || typeof window.plausible !== 'function') return;
    const props: Record<string, string> = { yer: el.dataset.eventPlace ?? location.pathname };
    window.plausible(el.dataset.event!, { props });
  });
}

/* Copy buttons (phone number, brief text) */
function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.hidden = !navigator.clipboard;
    btn.addEventListener('click', async () => {
      const label = btn.querySelector<HTMLElement>('[data-copy-label]') ?? btn;
      const idle = label.textContent;
      try {
        await navigator.clipboard.writeText(btn.dataset.copy ?? '');
        label.textContent = 'Kopyalandı';
      } catch {
        label.textContent = 'Kopyalanamadı';
      }
      window.setTimeout(() => (label.textContent = idle), 2000);
    });
  });
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
initActionBar();
initEvents();
initCopy();
initIndexPreview();

export {};
