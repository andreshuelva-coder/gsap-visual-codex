export const controls = [
  { type: 'dropdown', param: 'positionType', options: ['absoluto', 'relativo', 'paralelo', 'label'], default: 'relativo' },
  { type: 'slider', param: 'baseDelay', min: 0, max: 1, step: 0.1, default: 0.2 }
];

export function render({ stage, params, gsap }) {
  const boxes = [];
  const colors = ['#3b82f6', '#06b6d4', '#10b981'];
  for (let i = 0; i < 3; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '60px', height: '60px', borderRadius: '10px',
      background: colors[i], display: 'grid', placeItems: 'center',
      fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
      fontSize: '0.7rem', willChange: 'transform', margin: '5px'
    });
    box.textContent = i + 1;
    stage.appendChild(box);
    boxes.push(box);
  }

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
  
  let posStr;
  if (params.positionType === 'paralelo') posStr = 0;
  else if (params.positionType === 'absoluto') posStr = params.baseDelay;
  else if (params.positionType === 'relativo') posStr = `+=${params.baseDelay}`;
  else posStr = '+=0.2';

  tl.to(boxes[0], { x: 200, duration: 0.6 })
    .to(boxes[1], { x: 200, duration: 0.6 }, posStr)
    .to(boxes[2], { x: 200, duration: 0.6 }, posStr);
    
  return tl;
}

export function getCode(params) {
  let posStr = params.baseDelay;
  if (params.positionType === 'paralelo') posStr = 0;
  else if (params.positionType === 'relativo') posStr = `"+=${params.baseDelay}"`;
  return {
    html: `<div class="box">1</div><div class="box">2</div><div class="box">3</div>`,
    css: `.box { width: 60px; height: 60px; background: #3b82f6; margin: 5px; }`,
    js: `const tl = gsap.timeline();
tl.to(".box:nth-child(1)", { x: 200, duration: 0.6 })
  .to(".box:nth-child(2)", { x: 200, duration: 0.6 }, ${posStr})
  .to(".box:nth-child(3)", { x: 200, duration: 0.6 }, ${posStr});`
  };
}

export const docs = {
  intro: "<p>La posición (3er argumento de .to) controla CUÁNDO empieza ese tween respecto a la timeline.</p><ul><li><code>0</code> = desde el inicio (paralelo)</li><li><code>0.5</code> = en el segundo 0.5 (absoluto)</li><li><code>'+=0.2'</code> = 0.2 después del anterior (relativo)</li><li><code>'<'</code> = al mismo tiempo que el anterior</li><li><code>'<+=0.1'</code> = 0.1 después del anterior</li></ul>",
  method: "<p>La sintaxis es flexible y poderosa. Combina valores absolutos, relativos y operadores.</p>",
  varsTable: [
    { prop: "0", valueInDemo: "paralelo", what: "Desde el inicio", validValues: "número absoluto" },
    { prop: "'+=0.2'", valueInDemo: "relativo", what: "Después del anterior", validValues: "string '+=' / '-='" },
    { prop: "'<'", valueInDemo: "mismo tiempo", what: "Simultáneo con anterior", validValues: "operador" }
  ],
  internals: {
    "Operadores": [
      "<code>'<'</code> = al inicio del anterior",
      "<code>'>'</code> = al final de la timeline actual",
      "<code>'<+=0.5'</code> = 0.5 después del inicio del anterior"
    ]
  },
  advanced: ["Combina con labels para código más legible."],
  variations: ["Experimenta: cambia '<' a '<+=0.1' para ver diferencia."],
  pitfalls: ["Fácil confundir '+=' (relativo al anterior) con número absoluto."],
  references: [
    { label: "Position parameter", url: "https://gsap.com/docs/v3/GSAP/gsap.timeline()" }
  ]
};
