export const controls = [
  { type: 'dropdown', param: 'variant', options: ['.out', '.in', '.inOut'], default: '.inOut' },
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
    border: '2px solid #fbbf24',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'CUBIC';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  return gsap.to(box, { x: 280, duration: params.duration, ease: `cubic${params.variant}`, repeat: -1, yoyo: true });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #f59e0b; border-radius: 12px; }`;
  const js = `gsap.to(".caja", {
  x: 200,
  duration: ${params.duration},
  ease: "cubic${params.variant}",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>cubic</code> es la familia "media-dorada" para muchos diseñadores. Entre power2 (ágil) y sine (suave).</p>",
  method: "<p>Úsalo como defecto cuando no sepas qué ease usar. Es predecible y agradable.</p>",
  varsTable: [
    { prop: "cubic.inOut", valueInDemo: "recomendado", what: "La opción segura", validValues: ".in, .out, .inOut" }
  ],
  internals: { "CSS": ["Equivale a cubic-bezier(0.25, 0.1, 0.25, 1) en CSS."] },
  advanced: ["Es lo que usa CSS por defecto en muchas propiedades."],
  variations: ["cubic vs power2 — casi indistinguibles para ojo humano."],
  pitfalls: ["No tiene nada especial. Es la opción aburrida pero correcta."],
  references: [
    { label: "cubic ease", url: "https://gsap.com/docs/v3/Eases#cubic" }
  ]
};
