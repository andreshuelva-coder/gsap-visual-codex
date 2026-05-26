/**
 * search.js
 * ────────────────────────────────────────────────────────────────────
 * Buscador global con atajo Cmd+K / Ctrl+K. Filtrado fuzzy ligero
 * (sin librerías) sobre nameEs, nameEn, promptSuggested y tags.
 * Resultados agrupados por categoría y navegables por teclado.
 * ──────────────────────────────────────────────────────────────────── */

let allAnimations = [];
let activeIndex = 0;

async function loadIndex() {
  if (allAnimations.length) return allAnimations;
  const res = await fetch(new URL('../data/animations.json', import.meta.url));
  const data = await res.json();
  for (const cat of data.categories) {
    for (const sub of cat.subcategories) {
      for (const anim of sub.animations) {
        allAnimations.push({
          ...anim,
          categoryId:   cat.id,
          categorySlug: cat.slug,
          categoryName: cat.nameEs,
          subId:        sub.id,
          subName:      sub.nameEs,
          haystack:     [anim.nameEs, anim.nameEn, anim.promptSuggested, ...(anim.tags || [])]
                          .filter(Boolean).join(' ').toLowerCase()
        });
      }
    }
  }
  return allAnimations;
}

/** Fuzzy score muy simple: cuenta caracteres consecutivos del query en el haystack */
function score(query, hay) {
  if (!query) return 1;
  const q = query.toLowerCase();
  if (hay.includes(q)) return 100 - hay.indexOf(q); // substring bonus
  let qi = 0, s = 0, streak = 0;
  for (let i = 0; i < hay.length && qi < q.length; i++) {
    if (hay[i] === q[qi]) { qi++; streak++; s += 1 + streak; }
    else streak = 0;
  }
  return qi === q.length ? s : 0;
}

function renderResults(results, container) {
  container.innerHTML = '';
  if (!results.length) {
    container.innerHTML = '<div class="search-empty">Sin resultados. Prueba con otra palabra.</div>';
    return;
  }
  // Agrupar por categoría
  const byCat = {};
  results.forEach(r => { (byCat[r.categoryName] = byCat[r.categoryName] || []).push(r); });
  let idx = 0;
  Object.entries(byCat).forEach(([catName, items]) => {
    const title = document.createElement('div');
    title.className = 'search-group-title';
    title.textContent = catName;
    container.appendChild(title);
    items.forEach(item => {
      const el = document.createElement('a');
      el.className = 'search-result';
      el.href = `/animations/${item.categorySlug}/${item.slug}.html`;
      el.dataset.index = idx++;
      el.innerHTML = `
        <span class="search-result-name">${item.nameEs}</span>
        <span class="search-result-meta">${item.subName} · ${item.difficulty}</span>
      `;
      el.addEventListener('mouseenter', () => setActive(Number(el.dataset.index), container));
      container.appendChild(el);
    });
  });
  activeIndex = 0;
  setActive(0, container);
}

function setActive(i, container) {
  const items = container.querySelectorAll('.search-result');
  if (!items.length) return;
  activeIndex = (i + items.length) % items.length;
  items.forEach((el, n) => el.classList.toggle('is-active', n === activeIndex));
  items[activeIndex].scrollIntoView({ block: 'nearest' });
}

function navigateActive(container) {
  const items = container.querySelectorAll('.search-result');
  if (items[activeIndex]) items[activeIndex].click();
}

export async function initSearch() {
  await loadIndex();

  // Crea el modal si no existe
  let modal = document.getElementById('search-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Buscador de animaciones');
    modal.innerHTML = `
      <div class="search-modal-panel">
        <div class="search-input-wrap">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="9" r="6"/><path d="m18 18-4-4"/></svg>
          <input type="search" class="search-input" placeholder="Buscar entre 200+ animaciones…" autocomplete="off" spellcheck="false">
          <button class="btn btn-icon" id="search-close" aria-label="Cerrar buscador">✕</button>
        </div>
        <div class="search-results" id="search-results"></div>
        <div class="search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd>↵</kbd> ir</span>
          <span><kbd>esc</kbd> cerrar</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const input = modal.querySelector('.search-input');
  const results = modal.querySelector('#search-results');
  const closeBtn = modal.querySelector('#search-close');

  function open() {
    modal.classList.add('is-open');
    setTimeout(() => input.focus(), 50);
    runQuery('');
  }
  function close() {
    modal.classList.remove('is-open');
    input.value = '';
  }

  function runQuery(q) {
    const scored = allAnimations
      .map(a => ({ a, s: score(q, a.haystack) }))
      .filter(x => x.s > 0)
      .sort((x, y) => y.s - x.s)
      .slice(0, 30)
      .map(x => x.a);
    renderResults(q ? scored : allAnimations.slice(0, 20), results);
  }

  input.addEventListener('input', () => runQuery(input.value.trim()));

  modal.addEventListener('click', e => {
    if (e.target === modal) close();
  });
  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    // Cmd+K / Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('is-open') ? close() : open();
      return;
    }
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIndex + 1, results); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(activeIndex - 1, results); }
    else if (e.key === 'Enter')     { e.preventDefault(); navigateActive(results); }
  });

  // Trigger en el header
  const wire = () => {
    const trigger = document.getElementById('search-trigger');
    if (trigger && !trigger.dataset.wired) {
      trigger.dataset.wired = 'true';
      trigger.addEventListener('click', open);
    }
  };
  wire();
  document.addEventListener('header-mounted', wire);
}
