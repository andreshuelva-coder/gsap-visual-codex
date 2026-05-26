/**
 * plugin-loader.js
 * ────────────────────────────────────────────────────────────────────
 * Carga lazy de plugins GSAP y librerías externas.
 * Cada animación declara qué necesita en animations.json (campos
 * `plugins` y `extraCdn`), y este módulo se encarga de inyectar los
 * <script> SOLO una vez por sesión.
 *
 * Uso:
 *   import { loadPlugins } from './plugin-loader.js';
 *   await loadPlugins(['ScrollTrigger', 'SplitText']);
 * ──────────────────────────────────────────────────────────────────── */

const loaded = new Set();
const loading = new Map();   // id -> Promise

let configPromise = null;

/** Lee /data/animations.json una sola vez */
function getConfig() {
  if (!configPromise) {
    configPromise = fetch(new URL('../data/animations.json', import.meta.url))
      .then(r => r.json())
      .then(d => d.config);
  }
  return configPromise;
}

/** Inyecta un <script src> y devuelve una Promise que resuelve cuando carga */
function injectScript(src) {
  return new Promise((resolve, reject) => {
    // Si ya existe el script con ese src, lo reutilizamos
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = false; // mantenemos orden
    s.addEventListener('load', () => {
      s.dataset.loaded = 'true';
      resolve();
    });
    s.addEventListener('error', () => reject(new Error(`No pude cargar ${src}`)));
    document.head.appendChild(s);
  });
}

/**
 * Carga uno o varios plugins de GSAP por su id (los del config.plugins).
 * Acepta string o array. Devuelve Promise<void>.
 */
export async function loadPlugins(ids) {
  if (typeof ids === 'string') ids = [ids];
  if (!ids || !ids.length) return;

  const config = await getConfig();

  for (const id of ids) {
    if (id === 'core' || loaded.has(id)) continue;
    if (loading.has(id)) { await loading.get(id); continue; }

    const def = config.plugins[id];
    if (!def) {
      console.warn(`[plugin-loader] Plugin desconocido: ${id}`);
      continue;
    }

    const src = def.cdnFallback || def.cdn;
    const p = injectScript(src)
      .then(() => {
        // Registrar el plugin si así lo requiere
        if (def.register && window.gsap && window[id]) {
          window.gsap.registerPlugin(window[id]);
        }
        loaded.add(id);
      })
      .finally(() => loading.delete(id));

    loading.set(id, p);
    await p;
  }
}

/**
 * Carga librerías externas (three, pixi, etc.) por su id de config.externalLibraries.
 */
export async function loadExternal(ids) {
  if (typeof ids === 'string') ids = [ids];
  if (!ids || !ids.length) return;

  const config = await getConfig();

  for (const id of ids) {
    if (loaded.has(`ext:${id}`)) continue;
    if (loading.has(`ext:${id}`)) { await loading.get(`ext:${id}`); continue; }

    const def = config.externalLibraries[id];
    if (!def) { console.warn(`[plugin-loader] Librería externa desconocida: ${id}`); continue; }

    const tasks = [injectScript(def.cdn)];
    if (def.addons) for (const a of def.addons) tasks.push(injectScript(a.cdn));

    const p = Promise.all(tasks).then(() => loaded.add(`ext:${id}`)).finally(() => loading.delete(`ext:${id}`));
    loading.set(`ext:${id}`, p);
    await p;
  }
}

/** Devuelve el config crudo (útil para construir CDN comment, badges) */
export async function getPluginConfig() {
  return getConfig();
}
