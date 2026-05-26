export const controls = [
  { type: 'toggle', param: 'showEvents', default: true, label: 'mostrar eventos' }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '80px', height: '80px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
    border: '2px solid #34d399',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'EV';

  const log = document.createElement('div');
  Object.assign(log.style, {
    marginTop: '20px', fontSize: 'var(--fs-xs)',
    color: 'var(--text-2)', fontFamily: 'var(--font-mono)',
    maxHeight: '100px', overflow: 'hidden'
  });

  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' });
  wrapper.appendChild(box);
  wrapper.appendChild(log);
  stage.appendChild(wrapper);

  const tl = gsap.timeline({
    repeat: -1,
    onStart: () => {
      if (params.showEvents) log.textContent = 'onStart ▶';
    },
    onUpdate: () => {
      if (params.showEvents) log.textContent = `onUpdate: ${(tl.progress() * 100).toFixed(0)}%`;
    },
    onComplete: () => {
      if (params.showEvents) log.textContent = 'onComplete ✓';
    }
  });

  tl.to(box, { x: 200, duration: 1.5, ease: 'power2.inOut' })
    .to(box, { rotation: 360, duration: 1.5, ease: 'power2.inOut' }, 0);

  return tl;
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 80px; height: 80px; background: #10b981; border-radius: 12px; }`,
    js: `const tl = gsap.timeline({
  onStart: () => console.log("Timeline comenzó"),
  onUpdate: () => console.log("Frame:", tl.progress()),
  onComplete: () => console.log("Timeline terminó")
});

tl.to(".caja", { x: 200, duration: 1.5 });`
  };
}

export const docs = {
  intro: "<p>Los callbacks de timeline se disparan en momentos clave: inicio, cada frame (onUpdate), fin (onComplete).</p>",
  method: "<p>Configura en el objeto timeline: <code>{ onStart: () => {}, onUpdate: () => {}, onComplete: () => {} }</code>.</p>",
  varsTable: [
    { prop: "onStart", valueInDemo: "función", what: "Al comenzar", validValues: "function" },
    { prop: "onUpdate", valueInDemo: "función", what: "Cada frame", validValues: "function" },
    { prop: "onComplete", valueInDemo: "función", what: "Al terminar", validValues: "function" },
    { prop: "onRepeat", valueInDemo: "función", what: "En cada repetición", validValues: "function" }
  ],
  internals: {
    "onUpdate": ["Se dispara ~60 veces por segundo. Mantén ligero."]
  },
  advanced: ["onUpdate es perfecto para actualizar UI en tiempo real (progress bars, contadores)."],
  variations: ["onRepeat se dispara CADA VEZ que el repeat ocurre."],
  pitfalls: ["onUpdate + código lento = lag. Usa throttle si es necesario."],
  references: [
    { label: "Timeline callbacks", url: "https://gsap.com/docs/v3/GSAP/Timeline" }
  ]
};
