export const controls = [
  { type: 'slider', param: 'duration', min: 0.3, max: 1, step: 0.1, default: 0.6 }
];

export function render({ stage, params, gsap }) {
  const boxes = [];
  const colors = ['#3b82f6', '#ec4899', '#f59e0b'];
  const methods = ['TO', 'FROM', 'FROMTO'];
  
  for (let i = 0; i < 3; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '60px', height: '60px', borderRadius: '10px',
      background: colors[i],
      display: 'grid', placeItems: 'center',
      fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
      fontSize: '0.6rem', margin: '5px', willChange: 'transform'
    });
    box.textContent = methods[i];
    stage.appendChild(box);
    boxes.push(box);
  }

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
  tl.to(boxes[0], { y: -80, duration: params.duration, ease: 'back.out' })
    .from(boxes[1], { y: -100, duration: params.duration, ease: 'back.out' }, '<')
    .fromTo(boxes[2], { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: params.duration, ease: 'back.out' }, '<');

  return tl;
}

export function getCode(params) {
  return {
    html: `<div class="box">1</div><div class="box">2</div><div class="box">3</div>`,
    css: `.box { width: 60px; height: 60px; background: #3b82f6; margin: 5px; }`,
    js: `const tl = gsap.timeline();
tl.to(".box:nth-child(1)", { y: -80, duration: ${params.duration} })
  .from(".box:nth-child(2)", { y: -100, duration: ${params.duration} }, "<")
  .fromTo(".box:nth-child(3)", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: ${params.duration} }, "<");`
  };
}

export const docs = {
  intro: "<p>Puedes mezclar .to(), .from() y .fromTo() en la misma timeline para máxima flexibilidad.</p>",
  method: "<p>Cada método define un comportamiento diferente: to (hacia), from (desde), fromTo (explícito).</p>",
  varsTable: [
    { prop: ".to()", valueInDemo: "hacia", what: "Anima HACIA esos valores", validValues: "propiedades finales" },
    { prop: ".from()", valueInDemo: "desde", what: "Anima DESDE esos valores", validValues: "propiedades iniciales" },
    { prop: ".fromTo()", valueInDemo: "A→B", what: "Define ambos", validValues: "2 objetos" }
  ],
  internals: {
    "Cuándo usar cada": [
      ".to: cuando sabes el destino",
      ".from: para entradas (empieza fuera, entra)",
      ".fromTo: máximo control"
    ]
  },
  advanced: ["Combina para crear narrativas visuales sofisticadas."],
  variations: ["Experimenta reordenando .to/.from para diferentes flujos."],
  pitfalls: ["from() necesita leer el estado CSS actual — asegúrate que esté accesible."],
  references: [
    { label: "Timeline methods", url: "https://gsap.com/docs/v3/GSAP/Timeline" }
  ]
};
