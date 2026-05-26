export const controls = [
  { type: 'slider', param: 'duration', min: 0.5, max: 3, step: 0.1, default: 1.8 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #ec4899, #be185d)',
    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
    border: '2px solid #f472b6',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'BOUNCE';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'bounce.out', repeat: -1, yoyo: true });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #ec4899; border-radius: 12px; }`;
  const js = `gsap.to(".caja", {
  x: 200,
  duration: ${params.duration},
  ease: "bounce.out",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>bounce.out</code> simula una pelota rebotando. Múltiples picos decrecientes.</p>",
  method: "<p>Úsalo en efectos lúdicos, caídas, saltos. NO en interfaces serias.</p>",
  varsTable: [
    { prop: "bounce.out", valueInDemo: "defecto", what: "Automático, sin parámetros", validValues: "fijo" }
  ],
  internals: { "Efecto": ["Una serie de curvas cortas que simulan fricción de un rebote real."] },
  advanced: ["Combina con <code>y: -100</code> para simular gravedad real."],
  variations: ["Muy poco usado, pero cuando es, es memorable."],
  pitfalls: ["No la uses en animaciones de 0.5s o menos — no se ve bien."],
  references: [
    { label: "bounce ease", url: "https://gsap.com/docs/v3/Eases#bounce" }
  ]
};
