
export const controls = [{ type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }];
export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, { width: '70px', height: '70px', borderRadius: '12px', background: '#3b82f6', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)', border: '2px solid #60a5fa', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700', fontSize: '0.55rem', willChange: 'transform' });
  box.textContent = 'QUART';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'quart.out', repeat: -1, yoyo: true });
}
export function getCode(params) {
  return { html: `<div class="caja"></div>`, css: `.caja { width: 70px; height: 70px; background: #3b82f6; border-radius: 12px; }`, js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "quart.out" });` };
}
export const docs = { intro: "<p><code>quart</code> es un alias para <code>power4</code> (cuártico). Parte de la familia histórica GSAP.</p>", method: "<p>Úsalo intercambiablemente con power4.</p>", varsTable: [{ prop: "quart", valueInDemo: "power4", what: "Alias", validValues: "quart.in, quart.out, quart.inOut" }], internals: {}, advanced: [], variations: [], pitfalls: [], references: [{ label: "quart", url: "https://gsap.com/docs/v3/Eases#quart" }] };
