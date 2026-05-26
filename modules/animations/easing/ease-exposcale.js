export const controls = [
  { type: 'slider', param: 'exponent', min: 1, max: 5, step: 0.5, default: 2 },
  { type: 'slider', param: 'duration', min: 0.5, max: 1.5, step: 0.1, default: 1 }
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
    fontSize: '0.6rem', willChange: 'transform'
  });
  box.textContent = 'EXPO';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'expo.out', repeat: -1, yoyo: true });
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #f59e0b; border-radius: 12px; }`,
    js: `// ExpoScaleEase — aceleración exponencial configurable
gsap.to(".caja", { 
  x: 200, 
  duration: ${params.duration}, 
  ease: "expoScale(exponent: ${params.exponent})"
});`
  };
}

export const docs = {
  intro: "<p><code>ExpoScaleEase</code> es como <code>expo</code> pero con exponente personalizado para control total.</p>",
  method: "<p>Parámetro <code>exponent</code> define la pendiente de la curva exponencial.</p>",
  varsTable: [
    { prop: "exponent", valueInDemo: "2", what: "Potencia de escalado", validValues: "1-5" }
  ],
  internals: {
    "Matemática": ["Basada en funciones exponenciales: e^x donde x es el exponent."]
  },
  advanced: ["Para máximo control sobre easing exponencial."],
  variations: ["<code>exponent: 5</code> = ultrarápido. <code>exponent: 1</code> = casi lineal."],
  pitfalls: ["Exponentes muy altos son jarring. Usa 2-3 típicamente."],
  references: [
    { label: "ExpoScaleEase", url: "https://gsap.com/docs/v3/Eases" }
  ]
};
