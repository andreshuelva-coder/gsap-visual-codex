export const controls = [
  { type: 'slider', param: 'pauseAt', min: 0, max: 2, step: 0.1, default: 1 }
];

export function render({ stage, params, gsap }) {
  const boxes = [];
  for (let i = 0; i < 3; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '60px', height: '60px', borderRadius: '10px',
      background: `hsl(${i * 120}, 70%, 50%)`,
      display: 'grid', placeItems: 'center', color: 'white',
      fontWeight: '700', margin: '5px', willChange: 'transform'
    });
    box.textContent = i + 1;
    stage.appendChild(box);
    boxes.push(box);
  }

  const tl = gsap.timeline({ repeat: -1 });
  tl.to(boxes[0], { y: -80, duration: 0.5 })
    .to(boxes[1], { y: -80, duration: 0.5 }, 0)
    .to(boxes[2], { y: -80, duration: 0.5 }, 0)
    .addPause(params.pauseAt)
    .to(boxes[0], { rotation: 360, duration: 0.5 })
    .to(boxes[1], { rotation: 360, duration: 0.5 }, '<')
    .to(boxes[2], { rotation: 360, duration: 0.5 }, '<');

  return tl;
}

export function getCode(params) {
  return {
    html: `<div class="box">1</div><div class="box">2</div><div class="box">3</div>`,
    css: `.box { width: 60px; height: 60px; background: #3b82f6; margin: 5px; }`,
    js: `const tl = gsap.timeline();
tl.to(".box", { y: -80, duration: 0.5 }, 0)
  .addPause(${params.pauseAt})
  .to(".box", { rotation: 360, duration: 0.5 });

// La timeline se pausa automáticamente en ese punto`
  };
}

export const docs = {
  intro: "<p><code>.addPause(tiempo)</code> pausa la timeline automáticamente en un punto. El usuario (o código) llama <code>.resume()</code> para continuar.</p>",
  method: "<p>Útil para secuencias que necesitan intervención del usuario (ej: "presiona para continuar").</p>",
  varsTable: [
    { prop: "addPause()", valueInDemo: "1", what: "En qué segundo pausar", validValues: "tiempo, label, o '+=0.5'" }
  ],
  internals: {
    "Resume": ["Llama <code>.resume()</code> o <code>.play()</code> para que continúe."]
  },
  advanced: ["Combina con eventos UI: click = resume()."],
  variations: ["Múltiples addPause en puntos estratégicos."],
  pitfalls: ["Si olvidas llamar .resume() la timeline nunca continúa."],
  references: [
    { label: "addPause()", url: "https://gsap.com/docs/v3/GSAP/Timeline/addPause()" }
  ]
};
