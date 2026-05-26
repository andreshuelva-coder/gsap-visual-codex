/**
 * code-copy.js — Sistema genérico de copia al portapapeles.
 *
 * Cualquier botón con [data-copy-source="selector"] copiará al hacer click
 * el textContent del elemento que coincida con ese selector. El feedback
 * lo damos cambiando temporalmente el texto del botón Y disparando un toast.
 */

let toastEl = null;

function ensureToast() {
  if (toastEl) return toastEl;
  toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastEl);
  return toastEl;
}

export function showToast(message = 'Copiado ✓', duration = 1800) {
  const el = ensureToast();
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('is-visible'), duration);
}

async function writeToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback antiguo
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); return true; }
    catch { return false; }
    finally { ta.remove(); }
  }
}

export async function copyText(text, btn, opts = {}) {
  const ok = await writeToClipboard(text);
  if (!ok) { showToast('No se pudo copiar', 1800); return false; }

  showToast(opts.toastMessage || 'Copiado ✓');

  if (btn) {
    const original = btn.innerHTML;
    btn.innerHTML = opts.successLabel || '✓ Copiado';
    btn.disabled = true;
    btn.classList.add('is-success');
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.classList.remove('is-success');
    }, 1600);
  }
  return true;
}

/** Engancha automáticamente cualquier botón [data-copy-source] del DOM */
export function wireCopyButtons(root = document) {
  root.querySelectorAll('[data-copy-source]:not([data-copy-wired])').forEach(btn => {
    btn.dataset.copyWired = 'true';
    btn.addEventListener('click', () => {
      const selector = btn.getAttribute('data-copy-source');
      const target = document.querySelector(selector);
      if (!target) { showToast('Nada que copiar'); return; }
      copyText(target.textContent.trim(), btn, {
        toastMessage: btn.dataset.copyMessage || 'Copiado al portapapeles ✓',
        successLabel: btn.dataset.copySuccess || '✓ Copiado'
      });
    });
  });
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => wireCopyButtons());
} else {
  wireCopyButtons();
}
