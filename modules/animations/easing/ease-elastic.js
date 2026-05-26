export const controls = [
  { type: 'slider', param: 'amplitude', min: 0.3, max: 3, step: 0.1, default: 1 },
  { type: 'slider', param: 'period', min: 0.1, max: 1, step: 0.05, default: 0.3 },
  { type: 'slider', param: 'duration', min: 0.5, max: 3, step: 0.1, default: 2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
    boxShadow: '0 8px 24px rgba(167, 139, 250, 0.4)',
    border: '2px solid #c4b5fd',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.65rem', willChange: 'transform'
  });
  box.textContent = 'ELASTIC';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  return gsap.to(box, { 
    x: 280, 
    duration: params.duration, 
    ease: `elastic.out(${params.amplitude}, ${params.period})`,
    repeat: -1, 
    yoyo: true 
  });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #a78bfa; border-radius: 12px; }`;
  const js = `gsap.to(".caja", {
  x: 200,
  duration: ${params.duration},
  ease: "elastic.out(${params.amplitude}, ${params.period})",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>elastic</code> simula un muelle — oscila alrededor del destino. Dos parámetros: amplitud (qué tan lejos) y período (qué tan rápido).</p>",
  method: "<p><code>elastic.out(1, 0.3)</code> — amplitude=1, period=0.3. Aumenta amplitude para más oscilaciones amplias.</p>",
  varsTable: [
    { prop: "amplitude", valueInDemo: "1", what: "Tamaño de las oscilaciones", validValues: "0.3-3" },
    { prop: "period", valueInDemo: "0.3", what: "Velocidad de oscilación", validValues: "0.1-1" }
  ],
  internals: { "Fórmula": ["Espiral sinusoidal exponencialmente decreciente."] },
  advanced: ["Úsalo con moderación — una mala elastic se ve barata."],
  variations: ["<code>elastic.out(1, 0.3)</code> vs <code>elastic.out(0.5, 0.3)</code> — experimenta."],
  pitfalls: ["Con duration muy corta se ve pixelado. Usa 1s+ para que se vea suave."],
  references: [
    { label: "elastic ease", url: "https://gsap.com/docs/v3/Eases#elastic" }
  ]
};
