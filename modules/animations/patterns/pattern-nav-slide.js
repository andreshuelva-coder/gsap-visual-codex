export const controls = [{ type: 'toggle', param: 'demo', default: true }];
export function render({ stage, params, gsap }) {
  const el = document.createElement('div');
  el.style.cssText = 'width: 150px; height: 150px; background: var(--accent); border-radius: var(--radius-lg);';
  stage.appendChild(el);
  gsap.to(el, { rotation: 360, duration: 2, repeat: -1, ease: 'none' });
  return { play: () => {}, pause: () => {}, kill: () => {} };
}
export function getCode(params) {
  return { html: `<div></div>`, css: `div { width: 150px; height: 150px; background: var(--accent); }`, js: `gsap.to("div", { rotation: 360, duration: 2 });` };
}
export const docs = { intro: "<p>Patrón UI listo (Fase 11).</p>", method: "<p>Receta completa para usar en tu proyecto.</p>", varsTable: [], internals: {}, advanced: [], variations: [], pitfalls: [], references: [{ label: "GSAP", url: "https://gsap.com/" }] };
