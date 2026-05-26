export const controls = [
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
    border: '2px solid #f87171',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'EXPO';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'expo.out', repeat: -1, yoyo: true });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #ef4444; border-radius: 12px; }`;
  const js = `gsap.to(".caja", {
  x: 200,
  duration: ${params.duration},
  ease: "expo.out",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>expo</code> es RÁPIDO. Curva exponencial. Empieza lentísimo, termina brutal. <code>expo.out</code> es la única viable.</p>",
  method: "<p>Úsalo en transiciones que necesitan impacto. No en todo — reservado para momentos especiales.</p>",
  varsTable: [
    { prop: "expo.out", valueInDemo: "defecto", what: "Único que se usa", validValues: "prácticamente siempre" }
  ],
  internals: { "Gráfica": ["Casi plana al inicio, casi vertical al final."] },
  advanced: ["Combina con durations cortas (0.5-1s) para máximo impacto."],
  variations: ["Muy poco usado. Casi nunca necesitas esto."],
  pitfalls: ["Con duration larga se ve aburrido. Con duration muy corta es jarring."],
  references: [
    { label: "expo ease", url: "https://gsap.com/docs/v3/Eases#expo" }
  ]
};
