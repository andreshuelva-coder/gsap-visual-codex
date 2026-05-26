export const controls = [
  { type: 'dropdown', param: 'variant', options: ['.out', '.in', '.inOut'], default: '.inOut' },
  { type: 'slider', param: 'duration', min: 0.5, max: 3, step: 0.1, default: 1.5 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    boxShadow: '0 8px 24px rgba(6, 182, 212, 0.4)',
    border: '2px solid #22d3ee',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'SINE';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  return gsap.to(box, { x: 280, duration: params.duration, ease: `sine${params.variant}`, repeat: -1, yoyo: true });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #06b6d4; border-radius: 12px; }`;
  const js = `gsap.to(".caja", {
  x: 200,
  duration: ${params.duration},
  ease: "sine${params.variant}",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>sine</code> es una onda sinusoidal. SUAVE. <code>sine.inOut</code> es probablemente la más bonita para movimientos largos.</p>",
  method: "<p>Úsalo en animaciones que deben sentirse naturales y fluidas. Especialmente buena para scrolling suave.</p>",
  varsTable: [
    { prop: "sine.out", valueInDemo: "rápido luego suave", what: "Empieza rápido, termina lento", validValues: ".in, .out, .inOut" },
    { prop: "sine.inOut", valueInDemo: "perfecto", what: "Suave en ambos lados", validValues: "mejor opción" }
  ],
  internals: { "Matemática": ["Basada en la función seno. La onda más natural."] },
  advanced: ["Combina <code>sine.inOut</code> con <code>ScrollTrigger</code> para smoothscroll de película."],
  variations: ["<code>sine.out</code> para entradas, <code>sine.in</code> para salidas."],
  pitfalls: ["Ni muy rápida ni muy lenta — usualmente 1.5-2s de duration."],
  references: [
    { label: "sine ease", url: "https://gsap.com/docs/v3/Eases#sine" }
  ]
};
