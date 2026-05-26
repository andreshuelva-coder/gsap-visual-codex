export const controls = [
  { type: 'slider', param: 'repeatCount', min: 0, max: 5, step: 1, default: 2 },
  { type: 'toggle', param: 'yoyo', default: true, label: 'yoyo (ida y vuelta)' }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #ec4899, #db2777)',
    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
    border: '2px solid #f472b6',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'REP';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);

  const tl = gsap.timeline({
    repeat: params.repeatCount,
    yoyo: params.yoyo,
    repeatDelay: 0.3
  });
  tl.to(box, { x: 250, duration: 1, ease: 'power2.inOut' })
    .to(box, { y: 100, duration: 1, ease: 'power2.inOut' }, '<');

  return tl;
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #ec4899; border-radius: 12px; }`,
    js: `const tl = gsap.timeline({
  repeat: ${params.repeatCount},
  yoyo: ${params.yoyo},
  repeatDelay: 0.3
});
tl.to(".caja", { x: 250, duration: 1 })
  .to(".caja", { y: 100, duration: 1 }, "<");`
  };
}

export const docs = {
  intro: "<p><code>repeat</code> hace que la timeline se ejecute múltiples veces. <code>yoyo: true</code> hace que se revierta entre repeticiones (ida-vuelta).</p>",
  method: "<p>Configura en el objeto de timeline: <code>gsap.timeline({ repeat: 3, yoyo: true })</code>.</p>",
  varsTable: [
    { prop: "repeat", valueInDemo: "2", what: "Cuántas repeticiones extra (0 = una sola)", validValues: "número, -1 = infinito" },
    { prop: "yoyo", valueInDemo: "true", what: "Alterna dirección", validValues: "true/false" },
    { prop: "repeatDelay", valueInDemo: "0.3", what: "Espera entre repeticiones", validValues: "número (segundos)" }
  ],
  internals: {
    "repeat: -1": ["Infinito. Útil para loops."],
    "yoyo sin repeat": ["Sin repeat, yoyo no hace nada."]
  },
  advanced: ["repeatDelay > 0 añade pausa entre ciclos."],
  variations: ["Cambia repeatDelay a 1 para ver gaps claros."],
  pitfalls: ["repeat: -1 + yoyo: true = loop infinito (controlado solo con .kill())."],
  references: [
    { label: "Timeline repeat", url: "https://gsap.com/docs/v3/GSAP/Timeline" }
  ]
};
