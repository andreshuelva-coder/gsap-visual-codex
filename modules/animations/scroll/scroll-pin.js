export const controls = [
  { type: 'toggle', param: 'pinSpacing', default: true, label: 'pinSpacing (reserva espacio)' }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  Object.assign(container.style, { minHeight: '400vh' });
  
  const pinned = document.createElement('div');
  Object.assign(pinned.style, {
    width: '200px', height: '200px', background: 'linear-gradient(135deg, var(--accent), var(--hot))',
    borderRadius: 'var(--radius-lg)', margin: '100px auto', color: 'white',
    display: 'grid', placeItems: 'center', fontWeight: '700'
  });
  pinned.textContent = 'PINNED';

  const after = document.createElement('div');
  Object.assign(after.style, { padding: '2rem', background: 'var(--bg-2)', margin: '2rem', borderRadius: 'var(--radius-lg)' });
  after.innerHTML = '<p>Este contenido empuja el pinned cuando termina...</p>';

  container.appendChild(pinned);
  container.appendChild(after);
  stage.appendChild(container);

  gsap.registerPlugin(ScrollTrigger);
  gsap.to(pinned, {
    rotation: 360,
    scrollTrigger: {
      trigger: pinned,
      pin: true,
      pinSpacing: params.pinSpacing,
      start: 'top 50%',
      end: 'bottom 50%',
      scrub: 1
    }
  });

  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  return {
    html: `<div class="pinned">PINNED</div><div class="after">Content after...</div>`,
    css: `.pinned { width: 200px; height: 200px; background: var(--accent); }`,
    js: `gsap.to(".pinned", {
  rotation: 360,
  scrollTrigger: {
    trigger: ".pinned",
    pin: true,
    pinSpacing: ${params.pinSpacing},
    scrub: 1
  }
});`
  };
}

export const docs = {
  intro: "<p><code>pin: true</code> fija un elemento en pantalla mientras scrollea. Se mueve de nuevo cuando la animación termina.</p>",
  method: "<p><code>pinSpacing: true</code> (default) reserva espacio para que no colapse. <code>false</code> = sin reserva.</p>",
  varsTable: [
    { prop: "pin", valueInDemo: "true", what: "Fijar en pantalla", validValues: "true/false" },
    { prop: "pinSpacing", valueInDemo: "true", what: "Reservar espacio", validValues: "true/false" }
  ],
  internals: { "Pin": ["Muy usado en hero sections y presentaciones."] },
  advanced: ["pin + timeline = secuencias cinematográficas complejas."],
  variations: ["pin: '.selector' para fijar un elemento diferente al trigger."],
  pitfalls: ["Demasiados pins en una página = performance issues. Usa con moderación."],
  references: [
    { label: "pin", url: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/" }
  ]
};
