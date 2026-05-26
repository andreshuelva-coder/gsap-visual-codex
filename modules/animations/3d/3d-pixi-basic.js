export const controls = [{ type: 'toggle', param: 'demo', default: true }];
export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.style.cssText = 'width: 100px; height: 100px; background: var(--accent); border-radius: var(--radius);';
  stage.appendChild(box);
  return { play: () => {}, pause: () => {}, kill: () => {} };
}
export function getCode(params) {
  return { html: `<div></div>`, css: `div { width: 100px; height: 100px; background: var(--accent); }`, js: `gsap.to("div", { rotation: 360, duration: 2 });` };
}
export const docs = { intro: "<p>Módulo avanzado de Fase 9-10.</p>", method: "<p>Ver documentación oficial.</p>", varsTable: [], internals: {}, advanced: [], variations: [], pitfalls: [], references: [{ label: "GSAP", url: "https://gsap.com/" }] };
