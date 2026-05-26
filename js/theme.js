/**
 * theme.js — Toggle de tema claro/oscuro con persistencia ligera en localStorage.
 * La preferencia inicial respeta `prefers-color-scheme`.
 */

const KEY = 'gvc-theme';

function getInitial() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) { /* localStorage bloqueado, no pasa nada */ }
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(KEY, theme); } catch (e) {}
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function initTheme() {
  apply(getInitial());

  // Engancha el botón cuando el header se haya inyectado
  const wire = () => {
    const btn = document.querySelector('.theme-toggle');
    if (!btn || btn.dataset.wired) return;
    btn.dataset.wired = 'true';
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      apply(current === 'dark' ? 'light' : 'dark');
    });
  };
  wire();
  document.addEventListener('header-mounted', wire);
}

initTheme();
