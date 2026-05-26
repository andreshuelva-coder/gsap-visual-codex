export const controls = [{ type: 'slider', param: 'intensity', min: 0.5, max: 3, step: 0.1, default: 1.7 }, { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.5 }];
export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, { width: '70px', height: '70px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)', border: '2px solid #fbbf24', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700', fontSize: '0.55rem', willChange: 'transform' });
  box.textContent = 'BACKIN';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: `back.in(${params.intensity})`, repeat: -1, yoyo: true });
}
export function getCode(params) {
  return { html: `<div class="caja"></div>`, css: `.caja { width: 70px; height: 70px; background: #f59e0b; border-radius: 12px; }`, js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "back.in(${params.intensity})" });` };
}
export const docs = { intro: "<p><code>back.in</code> hace un retroceso al inicio — sale hacia atrás antes de ir hacia adelante.</p>", method: "<p>Para transiciones teatrales. Menos común que back.out.</p>", varsTable: [{ prop: "intensity", valueInDemo: "1.7", what: "Cuánto retrocede", validValues: "0.5-3" }], internals: {}, advanced: [], variations: [], pitfalls: [], references: [{ label: "back", url: "https://gsap.com/docs/v3/Eases#back" }] };
