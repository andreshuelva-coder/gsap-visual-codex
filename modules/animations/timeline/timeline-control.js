export const controls = [
  { type: 'dropdown', param: 'action', options: ['play', 'pause', 'reverse', 'seek-50%', 'timeScale-0.5x'], default: 'play' },
  { type: 'slider', param: 'timeScale', min: 0.2, max: 2, step: 0.1, default: 1 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '80px', height: '80px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    boxShadow: '0 8px 24px rgba(249, 115, 22, 0.4)',
    border: '2px solid #fb923c',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.8rem', willChange: 'transform'
  });
  box.textContent = 'CTRL';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);

  const tl = gsap.timeline({ paused: true });
  tl.to(box, { x: 300, duration: 2, ease: 'power2.inOut' })
    .to(box, { y: 150, duration: 2, ease: 'power2.inOut' }, 0)
    .to(box, { rotation: 360, duration: 2, ease: 'power2.inOut' }, 0);

  // Aplicar acción
  if (params.action === 'play') tl.play();
  else if (params.action === 'pause') tl.pause();
  else if (params.action === 'reverse') tl.reverse();
  else if (params.action === 'seek-50%') tl.seek(tl.duration() * 0.5);

  tl.timeScale(params.timeScale);
  
  return tl;
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 80px; height: 80px; background: #f97316; border-radius: 12px; }`,
    js: `const tl = gsap.timeline({ paused: true });
tl.to(".caja", { x: 300, duration: 2 });

// Control
tl.play();           // Ejecuta
tl.pause();          // Pausa
tl.reverse();        // Al revés
tl.seek(1);          // Salta a 1 segundo
tl.timeScale(0.5);   // Mitad de velocidad`
  };
}

export const docs = {
  intro: "<p>Las timelines son completamente controlables: puedes pausar, revertir, saltar, cambiar velocidad todo en tiempo real.</p>",
  method: "<p>Métodos principales: <code>.play()</code>, <code>.pause()</code>, <code>.reverse()</code>, <code>.seek(tiempo)</code>, <code>.timeScale()</code>.</p>",
  varsTable: [
    { prop: ".play()", valueInDemo: "ejecuta", what: "Comienza desde donde estaba", validValues: "no args" },
    { prop: ".pause()", valueInDemo: "pausa", what: "Congela en el frame actual", validValues: "no args" },
    { prop: ".reverse()", valueInDemo: "atrás", what: "Al revés desde donde está", validValues: "no args" },
    { prop: ".seek(t)", valueInDemo: "0.5", what: "Salta a tiempo t", validValues: "número (segundos)" },
    { prop: ".timeScale(n)", valueInDemo: "1", what: "Velocidad (1=normal)", validValues: "número > 0" }
  ],
  internals: {
    "timeScale": ["1 = velocidad normal. 0.5 = mitad. 2 = doble. Afecta TODAS las animaciones dentro."]
  },
  advanced: ["Usa seek() + setInterval() para crear un scrubber interactivo (timeline controlada por usuario)."],
  variations: ["timeScale(0) pausa sin usar .pause() — es un hack útil."],
  pitfalls: ["timeScale(0) no es lo mismo que pause() — tiene implicaciones con callbacks."],
  references: [
    { label: "Timeline methods", url: "https://gsap.com/docs/v3/GSAP/Timeline" }
  ]
};
