export const controls = [{ type: 'slider', param: 'duration', min: 0.8, max: 2.5, step: 0.1, default: 2 }];
export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, { width: '70px', height: '70px', borderRadius: '12px', background: 'linear-gradient(135deg, #ec4899, #be185d)', boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)', border: '2px solid #f472b6', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700', fontSize: '0.55rem', willChange: 'transform' });
  box.textContent = 'BOUNCE2';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'bounce.inOut', repeat: -1, yoyo: true });
}
export function getCode(params) {
  return { html: `<div class="caja"></div>`, css: `.caja { width: 70px; height: 70px; background: #ec4899; border-radius: 12px; }`, js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "bounce.inOut" });` };
}
export const docs = { intro: "<p><code>bounce.inOut</code> — rebota en AMBOS extremos. Caótico y juguetón.</p>", method: "<p>Rarísimo. Pero muy memorable cuando aplica.</p>", varsTable: [{ prop: "bounce.inOut", valueInDemo: "defecto", what: "Rebote en ambos lados", validValues: "fijo" }], internals: {}, advanced: [], variations: [], pitfalls: [], references: [{ label: "bounce", url: "https://gsap.com/docs/v3/Eases#bounce" }] };
