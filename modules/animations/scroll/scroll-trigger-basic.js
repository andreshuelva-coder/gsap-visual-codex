export const controls = [
  { type: 'slider', param: 'triggerHeight', min: 100, max: 400, step: 50, default: 200, hint: 'Alto del área trigger' }
];

export function render({ stage, params, gsap }) {
  // En scroll, necesitamos crear contenido largo + elemento que animar
  const container = document.createElement('div');
  Object.assign(container.style, { minHeight: '200vh', padding: '2rem' });

  const spacer = document.createElement('div');
  Object.assign(spacer.style, { height: '400px', background: 'var(--bg-3)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' });
  spacer.innerHTML = '<p style="padding: 2rem; color: var(--text-2);">Scroll down para ver la animación</p>';

  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '100px', height: '100px', background: 'var(--accent)', borderRadius: 'var(--radius)',
    opacity: '0', position: 'sticky', top: '2rem'
  });

  container.appendChild(spacer);
  container.appendChild(box);
  stage.appendChild(container);

  // ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(box, {
    opacity: 1, scale: 1.5, duration: 0.8,
    scrollTrigger: {
      trigger: box,
      start: 'top center',
      end: 'center center',
      scrub: 1,
      markers: false
    }
  });

  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  return {
    html: `<div class="spacer"></div><div class="caja"></div>`,
    css: `.spacer { height: 400px; background: var(--bg-3); margin-bottom: 2rem; }
.caja { width: 100px; height: 100px; background: var(--accent); }`,
    js: `gsap.registerPlugin(ScrollTrigger);
gsap.to(".caja", {
  opacity: 1,
  scale: 1.5,
  scrollTrigger: {
    trigger: ".caja",
    start: "top center",
    end: "center center",
    scrub: 1
  }
});`
  };
}

export const docs = {
  intro: "<p><code>ScrollTrigger</code> vincula animaciones al scroll. Cuando el usuario scrollea un elemento a la vista, la animación comienza.</p>",
  method: "<p>Registra el plugin, luego usa <code>scrollTrigger: { trigger, start, end }</code> en un tween.</p>",
  varsTable: [
    { prop: "trigger", valueInDemo: ".caja", what: "Elemento que activa", validValues: "selector o elemento" },
    { prop: "start", valueInDemo: "top center", what: "Cuándo empieza", validValues: "distancia + punto" },
    { prop: "end", valueInDemo: "center center", what: "Cuándo termina", validValues: "distancia + punto" },
    { prop: "scrub", valueInDemo: "1", what: "Amarre al scroll (número = lag)", validValues: "true/false o número" }
  ],
  internals: { "ScrollTrigger": ["Es EL plugin más popular de GSAP. Imprescindible para sitios modernos."] },
  advanced: ["Combina con timeline para secuencias complejas al scroll."],
  variations: ["scrub: true = sin lag. scrub: 0.5 = medio segundo de lag."],
  pitfalls: ["Sin ScrollTrigger registrado, lanza error. Siempre registra primero."],
  references: [
    { label: "ScrollTrigger", url: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/" }
  ]
};
