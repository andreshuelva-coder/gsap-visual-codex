export const controls = [
  { type: 'slider', param: 'duration', min: 0.3, max: 1.5, step: 0.1, default: 0.8 },
  { type: 'toggle', param: 'repeat', default: false, label: 'repetir timeline' }
];

export function render({ stage, params, gsap }) {
  // 3 cajas
  const boxes = [];
  const colors = ['#88ce02', '#ff5e7a', '#a78bfa'];
  for (let i = 0; i < 3; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '60px', height: '60px', borderRadius: '10px',
      background: colors[i],
      display: 'grid', placeItems: 'center',
      fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
      fontSize: '0.7rem', willChange: 'transform',
      margin: '5px'
    });
    box.textContent = i + 1;
    stage.appendChild(box);
    boxes.push(box);
  }

  // Timeline encadena 3 animaciones
  const tl = gsap.timeline({ repeat: params.repeat ? -1 : 0 });
  tl.to(boxes[0], { y: -100, duration: params.duration, ease: 'back.out' })
    .to(boxes[1], { y: -100, duration: params.duration, ease: 'back.out' }, 0)
    .to(boxes[2], { y: -100, duration: params.duration, ease: 'back.out' }, 0);
  return tl;
}

export function getCode(params) {
  return {
    html: `<div class="box-1">1</div><div class="box-2">2</div><div class="box-3">3</div>`,
    css: `.box-1, .box-2, .box-3 { width: 60px; height: 60px; background: #88ce02; border-radius: 10px; margin: 5px; }`,
    js: `const tl = gsap.timeline();
tl.to(".box-1", { y: -100, duration: ${params.duration} })
  .to(".box-2", { y: -100, duration: ${params.duration} }, 0)
  .to(".box-3", { y: -100, duration: ${params.duration} }, 0);`
  };
}

export const docs = {
  intro: "<p>Una <code>Timeline</code> agrupa múltiples animaciones. Las sincroniza, pausa juntas, etc. Es el contenedor perfecto.</p>",
  method: "<p>Crea con <code>gsap.timeline()</code>, agrega tweens con <code>.to()</code>, <code>.from()</code>, etc.</p>",
  varsTable: [
    { prop: "tl.to()", valueInDemo: "3 cajas", what: "Añadir tween", validValues: "target y vars" },
    { prop: "paused", valueInDemo: "false", what: "Pausa timeline al crear", validValues: "true/false" }
  ],
  internals: { "Base": ["Una timeline ES un tween. Tiene métodos play/pause/reverse."] },
  advanced: ["Una timeline puede contener otras timelines (anidación)."],
  variations: ["Cambia las posiciones: <code>\"0\"</code> (paralelo), <code>\"+=0.2\"</code> (secuencial)."],
  pitfalls: ["Sin especificar posición, los tweens se apilan. Especifica <code>0</code> para paralelo."],
  references: [
    { label: "gsap.timeline()", url: "https://gsap.com/docs/v3/GSAP/gsap.timeline()" }
  ]
};
