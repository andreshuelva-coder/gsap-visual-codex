export const controls = [{ type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }];
export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, { width: '70px', height: '70px', borderRadius: '12px', background: 'linear-gradient(135deg, #06b6d4, #0891b2)', boxShadow: '0 8px 24px rgba(6, 182, 212, 0.4)', border: '2px solid #22d3ee', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700', fontSize: '0.6rem', willChange: 'transform' });
  box.textContent = 'CIRCIN';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'circ.in', repeat: -1, yoyo: true });
}
export function getCode(params) {
  return { html: `<div class="caja"></div>`, css: `.caja { width: 70px; height: 70px; background: #06b6d4; border-radius: 12px; }`, js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "circ.in" });` };
}
export const docs = { intro: "<p><code>circ.in</code> — aceleración circular al inicio. Empieza muy lentísimo.</p>", method: "<p>Para salidas. El opuesto de circ.out.</p>", varsTable: [{ prop: "circ.in", valueInDemo: "defecto", what: "Aceleración al inicio", validValues: "fijo" }], internals: {}, advanced: [], variations: [], pitfalls: [], references: [{ label: "circ", url: "https://gsap.com/docs/v3/Eases#circ" }] };
