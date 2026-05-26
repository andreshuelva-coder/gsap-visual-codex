export const controls = [
  { type: 'slider',   param: 'duration1', min: 0.1, max: 2, step: 0.1, default: 0.8 },
  { type: 'slider',   param: 'duration2', min: 0.1, max: 2, step: 0.1, default: 0.6 },
  { type: 'slider',   param: 'gap',       min: 0,   max: 1, step: 0.1, default: 0.2 },
  { type: 'toggle',   param: 'repeat',    default: false, label: 'repetir todo' }
];

export function render({ stage, params, gsap }) {
  const box1 = document.createElement('div');
  const box2 = document.createElement('div');
  const box3 = document.createElement('div');
  [box1, box2, box3].forEach((b, i) => {
    b.style.cssText = `width: 70px; height: 70px; border-radius: 12px; margin: 5px;
      display: inline-grid; place-items: center; font-weight: 700; font-size: 0.7rem;
      font-family: var(--font-mono); will-change: transform;`;
    if (i === 0) { b.style.background = '#88ce02'; b.style.color = '#0a1400'; b.textContent = '1'; }
    else if (i === 1) { b.style.background = '#ff5e7a'; b.style.color = 'white'; b.textContent = '2'; }
    else { b.style.background = '#a78bfa'; b.style.color = 'white'; b.textContent = '3'; }
  });
  stage.appendChild(box1); stage.appendChild(box2); stage.appendChild(box3);
  
  const tl = gsap.timeline({ repeat: params.repeat ? -1 : 0 });
  tl.to(box1, { y: -80, duration: params.duration1, ease: 'bounce.out' })
    .to(box2, { y: -80, duration: params.duration2, ease: 'back.out' }, `-=${params.gap}`)
    .to(box3, { y: -80, duration: 0.5, ease: 'sine.out' }, `-=${params.gap}`);
  return tl;
}

export function getCode(params) {
  const html = `<div class="box-1">1</div><div class="box-2">2</div><div class="box-3">3</div>`;
  const css = `.box-1, .box-2, .box-3 { width: 70px; height: 70px; display: grid; place-items: center; font-weight: 700; }
  .box-1 { background: #88ce02; color: #0a1400; } .box-2 { background: #ff5e7a; color: white; } .box-3 { background: #a78bfa; }`;
  const overlap = (-params.gap).toFixed(2);
  const js = `const tl = gsap.timeline();
tl.to(".box-1", { y: -80, duration: ${params.duration1} })
  .to(".box-2", { y: -80, duration: ${params.duration2} }, "${overlap}")
  .to(".box-3", { y: -80, duration: 0.5 }, "${overlap}");`;
  return { html, css, js };
}

export const docs = {
  intro: "<p>Una <code>Timeline</code> (línea de tiempo) secuencia múltiples animaciones. Puedes hacerlas en orden, con solapamiento o en paralelo.</p>",
  method: "<p>Creas una timeline con <code>gsap.timeline()</code>, luego le añades tweens con <code>.to()</code>, <code>.from()</code>, etc. Las posiciones (strings como <code>\"+=0.2\"</code>) controlan la sincronización.</p>",
  varsTable: [
    { prop: ".to() / .from()", valueInDemo: "3 cajas", what: "Añadir tween a la timeline", validValues: "target y vars" },
    { prop: "posición (3er arg)", valueInDemo: "-=0.2", what: "Dónde empieza en la timeline", validValues: "tiempo absoluto o relativo" }
  ],
  internals: {
    "Posiciones en timeline": [
      "<code>\"+=0.2\"</code> — 0.2 segundos después del final del anterior",
      "<code>\"<\"</code> — al mismo tiempo que el anterior",
      "<code>\"0.5\"</code> — 0.5 segundos desde el inicio"
    ]
  },
  advanced: ["Las timelines aceptan <code>repeat</code>, <code>yoyo</code>, <code>onComplete</code>, etc. como tweens normales."],
  variations: ["Anima <code>.progress</code> de una timeline para el scroll-driven (ScrollTrigger)."],
  pitfalls: ["Si no especificas la posición del tween, entra automáticamente al final."],
  references: [
    { label: "gsap.timeline()", url: "https://gsap.com/docs/v3/GSAP/gsap.timeline()" }
  ]
};
