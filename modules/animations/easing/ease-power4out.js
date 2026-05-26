export const controls = [{ type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }];
export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, { width: '70px', height: '70px', borderRadius: '12px', background: '#3b82f6', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)', border: '2px solid #60a5fa', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700', fontSize: '0.6rem', willChange: 'transform' });
  box.textContent = 'P4OUT';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'power4.out', repeat: -1, yoyo: true });
}
export function getCode(params) {
  return { html: `<div class="caja"></div>`, css: `.caja { width: 70px; height: 70px; background: #3b82f6; border-radius: 12px; }`, js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "power4.out" });` };
}
export const docs = { intro: "<p><code>power4.out</code> — desaceleración brutalmente fuerte. Casi choque al inicio.</p>", method: "<p>Úsalo raramente. Impacto máximo.</p>", varsTable: [{ prop: "power4.out", valueInDemo: "defecto", what: "Violenta desaceleración", validValues: "fijo" }], internals: {}, advanced: [], variations: [], pitfalls: ["Demasiado agresivo para la mayoría de casos."], references: [{ label: "power4", url: "https://gsap.com/docs/v3/Eases" }] };
