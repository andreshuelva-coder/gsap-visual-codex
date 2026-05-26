export const controls = [
  { type: 'dropdown', param: 'power', options: ['power1', 'power2', 'power3', 'power4'], default: 'power2' },
  { type: 'dropdown', param: 'variant', options: ['.out', '.in', '.inOut'], default: '.out' },
  { type: 'slider', param: 'duration', min: 0.5, max: 3, step: 0.1, default: 2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: '#3b82f6', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
    border: '2px solid #60a5fa',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = params.power;
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  const easeFunc = `${params.power}${params.variant}`;
  return gsap.to(box, { x: 280, duration: params.duration, ease: easeFunc, repeat: -1, yoyo: true });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #3b82f6; border-radius: 12px; }`;
  const easeStr = `${params.power}${params.variant}`;
  const js = `gsap.to(".caja", {
  x: 200,
  duration: ${params.duration},
  ease: "${easeStr}",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p>Las <strong>power eases</strong> son la familia más comúnmente usada. Modelan un movimiento basado en potencias matemáticas.</p><ul><li><code>power1</code> — suave</li><li><code>power2</code> — estándar, ej. power2.out es lo más usado</li><li><code>power3/power4</code> — aceleración agresiva</li></ul>",
  method: "<p>Usa <code>ease: 'power2.out'</code> para la mayoría de casos. <code>.out</code> hace que termine rápido (natural). <code>.in</code> comienza rápido. <code>.inOut</code> suave en ambos lados.</p>",
  varsTable: [
    { prop: "power1-4", valueInDemo: "power2", what: "Intensidad de la aceleración", validValues: "power1, power2, power3, power4" },
    { prop: ".out/.in/.inOut", valueInDemo: ".out", what: "Dónde se aplica", validValues: ".in, .out, .inOut" }
  ],
  internals: {
    "Matemática": ["power2.out = easing cuadrático inverso. Gráficamente es una parábola invertida."]
  },
  advanced: ["Para 99% de interfaces, <code>power2.out</code> es la respuesta. Úsala por defecto."],
  variations: ["Cambia a <code>power3.out</code> para movimientos más rápidos al final."],
  pitfalls: ["<code>power4.in</code> es brutalmente lento al inicio — úsalo sólo si sabes por qué."],
  references: [
    { label: "Todas las eases en GSAP", url: "https://gsap.com/docs/v3/Eases" }
  ]
};
