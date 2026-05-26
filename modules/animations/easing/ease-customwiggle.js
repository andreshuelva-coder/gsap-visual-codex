export const controls = [
  { type: 'slider', param: 'wiggles', min: 2, max: 10, step: 1, default: 5 },
  { type: 'dropdown', param: 'type', options: ['easeOut', 'easeInOut'], default: 'easeOut' },
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.5 }
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
    fontSize: '0.6rem', willChange: 'transform'
  });
  box.textContent = 'WIGGLE';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'elastic.out', repeat: -1, yoyo: true });
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #06b6d4; border-radius: 12px; }`,
    js: `// CustomWiggle (plugin Club) — oscilaciones irregulares
gsap.to(".caja", { 
  x: 200, 
  duration: ${params.duration}, 
  ease: "customWiggle(wiggles: ${params.wiggles}, type: '${params.type}')"
});`
  };
}

export const docs = {
  intro: "<p><code>CustomWiggle</code> (plugin Club) crea oscilaciones erráticas e impredecibles. Más "orgánico" que elastic.</p>",
  method: "<p>Parámetros: <code>wiggles</code> (cuántas oscilaciones), <code>type</code> (easeOut o easeInOut).</p>",
  varsTable: [
    { prop: "wiggles", valueInDemo: "5", what: "Número de movimientos irregulares", validValues: "2-10" },
    { prop: "type", valueInDemo: "easeOut", what: "Cómo desacelera", validValues: "easeOut, easeInOut" }
  ],
  internals: {
    "Club": ["Plugin de Club GreenSock. Ideal para efectos nerviosos u orgánicos."]
  },
  advanced: ["Úsalo para personajes, mascotas, efectos de "temblor"."],
  variations: ["<code>wiggles: 10</code> para más caótico. <code>wiggles: 2</code> para oscilaciones suaves."],
  pitfalls: ["Requiere registración oficial de GreenSock."],
  references: [
    { label: "CustomWiggle", url: "https://gsap.com/docs/v3/Plugins/CustomWiggle" }
  ]
};
