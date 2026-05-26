export const controls = [
  { type: 'slider', param: 'scrubValue', min: 0, max: 1, step: 0.1, default: 1, hint: 'Lag del scrub (0=sin lag, 1=1s de retraso)' }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  Object.assign(container.style, { minHeight: '300vh', padding: '2rem' });
  
  const spacer = document.createElement('div');
  Object.assign(spacer.style, { height: '600px', background: 'var(--bg-3)', marginBottom: '2rem', borderRadius: 'var(--radius)' });
  spacer.textContent = 'Scroll para ver scrub';
  
  const box = document.createElement('div');
  Object.assign(box.style, { width: '100px', height: '100px', background: 'var(--accent)', borderRadius: 'var(--radius)', position: 'sticky', top: '2rem' });
  
  container.appendChild(spacer);
  container.appendChild(box);
  stage.appendChild(container);

  gsap.registerPlugin(ScrollTrigger);
  gsap.to(box, {
    rotation: 360, x: 500,
    scrollTrigger: {
      trigger: box,
      start: 'top 50%',
      end: 'center 50%',
      scrub: params.scrubValue
    }
  });

  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  return {
    html: `<div class="spacer"></div><div class="caja"></div>`,
    css: `.spacer { height: 600px; } .caja { width: 100px; height: 100px; background: var(--accent); }`,
    js: `gsap.to(".caja", {
  rotation: 360,
  x: 500,
  scrollTrigger: {
    trigger: ".caja",
    scrub: ${params.scrubValue}
  }
});`
  };
}

export const docs = {
  intro: "<p><code>scrub</code> vincula la animación directamente al scroll. No hay duración — el progreso depende del scroll del usuario.</p>",
  method: "<p><code>scrub: true</code> = sin lag. <code>scrub: 1</code> = 1 segundo de retraso (efecto suave).</p>",
  varsTable: [{ prop: "scrub", valueInDemo: "1", what: "Lag en segundos (0 = inmediato)", validValues: "true/false o número" }],
  internals: { "Efecto": ["El elemento se anima exactamente según la posición del scroll."] },
  advanced: ["scrub: 0.5 es lo típico para efecto suave sin retraso evidente."],
  variations: ["scrub: true = animación perfeccionista. scrub: 2 = muy lento y flotante."],
  pitfalls: ["scrub muy bajo en móviles puede causar lag. Usa 1+ en mobile."],
  references: [
    { label: "scrub", url: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/" }
  ]
};
