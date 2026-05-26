/**
 * code-sync.js
 * ────────────────────────────────────────────────────────────────────
 * Pinta y mantiene actualizado el bloque de código (JS/HTML/CSS) que
 * se muestra al usuario, usando highlight.js. La función `getCode()`
 * la provee cada módulo de animación; este JS se encarga de:
 *
 *   - Renderizar el código con sintaxis
 *   - Cambiar de pestaña (HTML / CSS / JS)
 *   - Re-renderizar cuando los params del panel cambian
 *   - Ocultar pestañas que no aplican (si la animación no tiene CSS)
 * ──────────────────────────────────────────────────────────────────── */

const LANG_MAP = { html: 'language-xml', css: 'language-css', js: 'language-javascript' };

export function initCodeBlock({ codeEl, tabsEl, getCode }) {
  let activeLang = 'js';

  function render(params) {
    const sources = getCode(params); // { js, html?, css? }
    // Ocultar pestañas no provistas
    tabsEl.querySelectorAll('button').forEach(btn => {
      const lang = btn.dataset.tab;
      const hasCode = sources[lang] !== undefined && sources[lang] !== null;
      btn.hidden = !hasCode;
      if (!hasCode && btn.getAttribute('aria-selected') === 'true') {
        activeLang = 'js';
      }
    });
    // Actualizar pestaña activa visualmente
    tabsEl.querySelectorAll('button').forEach(btn => {
      btn.setAttribute('aria-selected', btn.dataset.tab === activeLang ? 'true' : 'false');
    });

    const code = sources[activeLang] || sources.js || '';
    codeEl.className = LANG_MAP[activeLang] + ' hljs';
    codeEl.textContent = code;
    if (window.hljs) window.hljs.highlightElement(codeEl);
  }

  // Cambio de pestaña
  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn || btn.hidden) return;
    activeLang = btn.dataset.tab;
    render(window.__lastParams || {});
  });

  return {
    update(params) {
      window.__lastParams = params;
      render(params);
    },
    getCurrentLanguage() { return activeLang; },
    getCurrentCode() {
      const sources = getCode(window.__lastParams || {});
      return sources[activeLang] || sources.js || '';
    }
  };
}
