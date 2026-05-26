/**
 * nav.js
 * ────────────────────────────────────────────────────────────────────
 * Construye el header global, megamenú jerárquico de 3 niveles y el
 * drawer móvil, todo desde /data/animations.json. También monta los
 * breadcrumbs en páginas de animación.
 * ──────────────────────────────────────────────────────────────────── */

const ICONS = {
  Sparkles:    '✨',
  Curves:      '〰️',
  Timeline:    '🔁',
  Layers:      '☰',
  Scroll:      '↧',
  Pen:         '✒️',
  Type:        '✍️',
  Hand:        '✋',
  Flip:        '🔄',
  Eye:         '👁',
  Atom:        '⚛︎',
  Cube:        '◻︎',
  Sparkle:     '✦',
  Tools:       '🛠',
  Smartphone:  '📱',
  React:       '⚛︎',
  Bug:         '🐞',
  Wand:        '🪄',
  Default:     '◆'
};

let catalog = null;

async function getCatalog() {
  if (catalog) return catalog;
  const res = await fetch(new URL('../data/animations.json', import.meta.url));
  catalog = await res.json();
  return catalog;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/* ── HEADER + MEGAMENÚ ─────────────────────────────────────────── */

export async function mountHeader() {
  const data = await getCatalog();
  const header = document.getElementById('site-header');
  if (!header) return;

  const totalAnims = data.categories.reduce((acc, c) =>
    acc + c.subcategories.reduce((a, s) => a + s.animations.length, 0), 0);

  header.className = 'site-header';
  header.innerHTML = `
    <div class="container">
      <a href="/index.html" class="brand" aria-label="${data.meta.siteName} — Inicio">
        <span class="brand-mark">G</span>
        <span>${data.meta.siteName}</span>
        <span class="brand-tag">v${data.meta.version}</span>
      </a>

      <nav class="main-nav" aria-label="Menú principal">
        <div class="nav-item">
          <button type="button" class="nav-trigger" id="nav-trigger-explorar" aria-haspopup="true" aria-expanded="false" aria-controls="megamenu-explorar">
            Explorar
          </button>
          <div class="megamenu" id="megamenu-explorar" role="menu" aria-labelledby="nav-trigger-explorar">
            <div class="mm-categories" role="tablist" aria-label="Categorías"></div>
            <div class="mm-subcategories" role="tablist" aria-label="Subcategorías"></div>
            <div class="mm-animations"></div>
          </div>
        </div>
        <a class="nav-trigger" href="/combos.html">Combos</a>
        <a class="nav-trigger" href="/glosario.html">Glosario</a>
        <a class="nav-trigger" href="/como-usar.html">Cómo usar</a>
      </nav>

      <div class="header-actions">
        <button type="button" class="search-trigger" id="search-trigger" aria-label="Abrir buscador">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" width="16" height="16"><circle cx="9" cy="9" r="6"/><path d="m18 18-4-4"/></svg>
          <span>Buscar animaciones…</span>
          <span class="search-shortcut"><kbd>⌘</kbd><kbd>K</kbd></span>
        </button>

        <div class="lang-toggle" role="group" aria-label="Idioma de los nombres">
          <button type="button" data-lang="es" aria-pressed="true">ES</button>
          <button type="button" data-lang="en" aria-pressed="false">EN</button>
        </div>

        <button type="button" class="theme-toggle" aria-label="Cambiar tema">
          <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>

        <button type="button" class="menu-toggle" aria-label="Abrir menú" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
  `;

  buildMegamenu(data, header);
  buildMobileDrawer(data);
  wireLangToggle();
  document.dispatchEvent(new CustomEvent('header-mounted'));
}

function buildMegamenu(data, header) {
  const trigger = header.querySelector('#nav-trigger-explorar');
  const menu = header.querySelector('#megamenu-explorar');
  const catsCol = menu.querySelector('.mm-categories');
  const subsCol = menu.querySelector('.mm-subcategories');
  const animsCol = menu.querySelector('.mm-animations');

  // Estado del path actual
  const path = currentPath();

  // Categorías
  data.categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mm-category';
    btn.dataset.catId = cat.id;
    btn.setAttribute('role', 'tab');
    if (i === 0 || cat.id === path.category) btn.setAttribute('aria-current', 'true');
    btn.innerHTML = `
      <span class="mm-icon">${ICONS[cat.icon] || ICONS.Default}</span>
      <span>${escapeHtml(cat.nameEs)}</span>
      <span class="mm-count">${cat.subcategories.reduce((a, s) => a + s.animations.length, 0)}</span>
    `;
    btn.addEventListener('mouseenter', () => activateCategory(cat.id));
    btn.addEventListener('focus', () => activateCategory(cat.id));
    btn.addEventListener('click', () => activateCategory(cat.id));
    catsCol.appendChild(btn);
  });

  function activateCategory(catId) {
    catsCol.querySelectorAll('.mm-category').forEach(b =>
      b.setAttribute('aria-current', b.dataset.catId === catId ? 'true' : 'false'));
    const cat = data.categories.find(c => c.id === catId);
    if (!cat) return;
    subsCol.innerHTML = '';
    animsCol.innerHTML = '';
    cat.subcategories.forEach((sub, i) => {
      const sb = document.createElement('button');
      sb.type = 'button';
      sb.className = 'mm-subcategory';
      sb.dataset.subId = sub.id;
      sb.setAttribute('role', 'tab');
      if (i === 0 || sub.id === path.subcategory) sb.setAttribute('aria-current', 'true');
      sb.innerHTML = `<span>${escapeHtml(sub.nameEs)}</span><span class="mm-count">${sub.animations.length}</span>`;
      sb.addEventListener('mouseenter', () => activateSub(cat, sub.id));
      sb.addEventListener('focus', () => activateSub(cat, sub.id));
      sb.addEventListener('click', () => activateSub(cat, sub.id));
      subsCol.appendChild(sb);
    });
    const first = cat.subcategories[0];
    if (first) activateSub(cat, first.id);
  }

  function activateSub(cat, subId) {
    subsCol.querySelectorAll('.mm-subcategory').forEach(b =>
      b.setAttribute('aria-current', b.dataset.subId === subId ? 'true' : 'false'));
    const sub = cat.subcategories.find(s => s.id === subId);
    if (!sub) return;
    animsCol.innerHTML = '';
    if (!sub.animations.length) {
      animsCol.innerHTML = '<p class="mm-empty">Próximamente</p>';
      return;
    }
    sub.animations.forEach(anim => {
      const a = document.createElement('a');
      a.className = 'mm-animation';
      a.href = `/animations/${cat.slug}/${anim.slug}.html`;
      a.innerHTML = `
        <span class="mm-anim-name" data-name-es="${escapeHtml(anim.nameEs)}" data-name-en="${escapeHtml(anim.nameEn)}">
          ${escapeHtml(anim.nameEs)}
        </span>
        <span class="mm-anim-meta">${anim.difficulty || ''}</span>
      `;
      animsCol.appendChild(a);
    });
    applyLangToNames();
  }

  // Apertura del megamenú
  let openTimeout, closeTimeout;
  const open = () => {
    clearTimeout(closeTimeout);
    menu.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    closeTimeout = setTimeout(() => {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }, 120);
  };
  trigger.addEventListener('mouseenter', open);
  trigger.addEventListener('focus', open);
  trigger.addEventListener('click', () => menu.classList.contains('is-open') ? close() : open());
  menu.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
  menu.addEventListener('mouseleave', close);
  trigger.addEventListener('mouseleave', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Click fuera
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !trigger.contains(e.target)) {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Activar la categoría según ruta
  const initialCat = path.category || data.categories[0].id;
  activateCategory(initialCat);
}

/* ── DRAWER MÓVIL ──────────────────────────────────────────────── */

function buildMobileDrawer(data) {
  const existing = document.getElementById('mobile-drawer');
  if (existing) existing.remove();

  const drawer = document.createElement('aside');
  drawer.id = 'mobile-drawer';
  drawer.className = 'mobile-drawer';
  drawer.setAttribute('aria-label', 'Menú móvil');
  drawer.innerHTML = `
    <div class="mobile-drawer-header">
      <span class="brand"><span class="brand-mark">G</span><span>${data.meta.siteName}</span></span>
      <button class="btn btn-icon" id="mobile-drawer-close" aria-label="Cerrar menú">✕</button>
    </div>
    <div class="mobile-drawer-body"></div>
  `;
  const body = drawer.querySelector('.mobile-drawer-body');

  data.categories.forEach(cat => {
    const det = document.createElement('details');
    det.className = 'mobile-cat';
    det.innerHTML = `<summary>${ICONS[cat.icon] || ICONS.Default} ${escapeHtml(cat.nameEs)}</summary>`;
    cat.subcategories.forEach(sub => {
      const sdet = document.createElement('details');
      sdet.className = 'mobile-sub';
      sdet.innerHTML = `<summary>${escapeHtml(sub.nameEs)}</summary>`;
      const list = document.createElement('div');
      list.className = 'mobile-anim-list';
      sub.animations.forEach(anim => {
        const a = document.createElement('a');
        a.href = `/animations/${cat.slug}/${anim.slug}.html`;
        a.textContent = anim.nameEs;
        list.appendChild(a);
      });
      sdet.appendChild(list);
      det.appendChild(sdet);
    });
    body.appendChild(det);
  });

  document.body.appendChild(drawer);

  const toggle = document.querySelector('.menu-toggle');
  const close = drawer.querySelector('#mobile-drawer-close');
  toggle?.addEventListener('click', () => {
    const open = drawer.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  close.addEventListener('click', () => {
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}

/* ── FOOTER ────────────────────────────────────────────────────── */

export async function mountFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  const data = await getCatalog();
  const year = new Date().getFullYear();

  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>${data.meta.siteName}</h4>
          <p style="color: var(--text-2); font-size: var(--fs-sm); max-width: 28rem;">
            ${escapeHtml(data.meta.description)}
            Guía no oficial creada como recurso educativo para vibe coders.
          </p>
        </div>
        <div class="footer-col">
          <h4>Aprende</h4>
          <ul>
            <li><a href="/index.html">Inicio</a></li>
            <li><a href="/como-usar.html">Cómo usar</a></li>
            <li><a href="/combos.html">Recetas (combos)</a></li>
            <li><a href="/glosario.html">Glosario</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Oficial GSAP</h4>
          <ul>
            <li><a href="https://gsap.com/docs/v3/" target="_blank" rel="noopener">Documentación</a></li>
            <li><a href="https://gsap.com/" target="_blank" rel="noopener">Showcase</a></li>
            <li><a href="https://github.com/greensock/GSAP" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="https://gsap.com/cheatsheet/" target="_blank" rel="noopener">Cheatsheet</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Fuentes</h4>
          <ul>
            <li><a href="https://github.com/greensock/gsap-skills" target="_blank" rel="noopener">gsap-skills</a></li>
            <li><a href="https://github.com/greensock/react" target="_blank" rel="noopener">GSAP + React</a></li>
            <li><a href="https://www.webreactiva.com/blog/gsap-skills" target="_blank" rel="noopener">Web Reactiva</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${year} — GSAP Visual Codex</span>
        <span>GSAP v${data.meta.gsapVersion} · GreenSock © Webflow Inc.</span>
      </div>
    </div>
  `;
}

/* ── BREADCRUMBS ──────────────────────────────────────────────── */

export async function mountBreadcrumbs(categorySlug, animationSlug) {
  const ol = document.getElementById('breadcrumbs');
  if (!ol) return;
  const data = await getCatalog();
  const cat = data.categories.find(c => c.slug === categorySlug);
  let anim = null, sub = null;
  if (cat && animationSlug) {
    for (const s of cat.subcategories) {
      const found = s.animations.find(a => a.slug === animationSlug);
      if (found) { anim = found; sub = s; break; }
    }
  }
  ol.innerHTML = `
    <li><a href="/index.html">Inicio</a></li>
    ${cat ? `<li><a href="/index.html#${cat.slug}">${escapeHtml(cat.nameEs)}</a></li>` : ''}
    ${sub ? `<li>${escapeHtml(sub.nameEs)}</li>` : ''}
    ${anim ? `<li aria-current="page">${escapeHtml(anim.nameEs)}</li>` : ''}
  `;
}

/* ── HELPERS ──────────────────────────────────────────────────── */

function currentPath() {
  const m = location.pathname.match(/\/animations\/([^/]+)\/([^/]+)\.html$/);
  if (m) return { category: m[1], slug: m[2] };
  return { category: null, slug: null, subcategory: null };
}

/* ── Selector ES/EN ───────────────────────────────────────────── */

function wireLangToggle() {
  const grp = document.querySelector('.lang-toggle');
  if (!grp) return;
  grp.addEventListener('click', e => {
    const btn = e.target.closest('button[data-lang]');
    if (!btn) return;
    grp.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    document.documentElement.setAttribute('data-name-lang', btn.dataset.lang);
    applyLangToNames();
  });
}

function applyLangToNames() {
  const lang = document.documentElement.getAttribute('data-name-lang') || 'es';
  document.querySelectorAll('[data-name-es][data-name-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-name-${lang}`);
  });
}
