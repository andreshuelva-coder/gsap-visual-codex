export const controls = [{ type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }];
export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, { width: '70px', height: '70px', borderRadius: '12px', background: '#10b981', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)', border: '2px solid #34d399', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700', fontSize: '0.6rem', willChange: 'transform' });
  box.textContent = 'LOG';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'sine.out', repeat: -1, yoyo: true });
}
export function getCode(params) {
  return { html: `<div class="caja"></div>`, css: `.caja { width: 70px; height: 70px; background: #10b981; border-radius: 12px; }`, js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "sine.out" });` };
}
export const docs = { intro: "<p>Logarítmico — crecimiento lento al inicio, luego se acelera. Similar a log(x).</p>", method: "<p>Raramente usado. Para científicas o académicas.</p>", varsTable: [], internals: {}, advanced: [], variations: [], pitfalls: [], references: [] };
