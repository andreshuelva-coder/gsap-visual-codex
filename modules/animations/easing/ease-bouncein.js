export const controls = [{ type: 'slider', param: 'duration', min: 0.8, max: 2, step: 0.1, default: 1.8 }];
export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, { width: '70px', height: '70px', borderRadius: '12px', background: 'linear-gradient(135deg, #ec4899, #be185d)', boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)', border: '2px solid #f472b6', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700', fontSize: '0.6rem', willChange: 'transform' });
  box.textContent = 'BOUNCEIN';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'bounce.in', repeat: -1, yoyo: true });
}
export function getCode(params) {
  return { html: `<div class="caja"></div>`, css: `.caja { width: 70px; height: 70px; background: #ec4899; border-radius: 12px; }`, js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "bounce.in" });` };
}
export const docs = { intro: "<p><code>bounce.in</code> — rebota al INICIO de la animación. Menos común.</p>", method: "<p>Úsalo para salidas dramáticas con bounce.</p>", varsTable: [{ prop: "bounce.in", valueInDemo: "defecto", what: "Rebote al inicio", validValues: "fijo" }], internals: {}, advanced: [], variations: [], pitfalls: [], references: [{ label: "bounce", url: "https://gsap.com/docs/v3/Eases#bounce" }] };
