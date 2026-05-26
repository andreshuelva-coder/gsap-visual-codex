/**
 * page-loader.js
 * ────────────────────────────────────────────────────────────────────
 * Inyecta header, footer, breadcrumbs y buscador en cualquier página
 * que tenga los huecos <header id="site-header">, <footer id="site-footer">
 * y opcionalmente <ol id="breadcrumbs">.
 * ──────────────────────────────────────────────────────────────────── */

import { mountHeader, mountFooter, mountBreadcrumbs } from '../js/nav.js';
import { initSearch } from '../js/search.js';
import '../js/theme.js';
import '../js/code-copy.js';

async function run() {
  await Promise.all([mountHeader(), mountFooter()]);
  await initSearch();

  // Breadcrumbs sólo en páginas de animación (tienen data-category y data-animation-id)
  const body = document.body;
  if (body.dataset.category && body.dataset.animationId) {
    mountBreadcrumbs(body.dataset.category, body.dataset.animationId);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}
