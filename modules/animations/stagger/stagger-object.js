export const controls = [
  { type: 'dropdown', param: 'from', options: ['start', 'center', 'end', 'random'], default: 'start' },
  { type: 'slider', param: 'amount', min: 0, max: 1, step: 0.05, default: 0.3 }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  Object.assign(container.style, { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' });
  
  const boxes = [];
  for (let i = 0; i < 6; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '50px', height: '50px', borderRadius: '8px',
      background: `hsl(${i * 60}, 70%, 50%)`, display: 'grid', placeItems: 'center',
      color: 'white', fontWeight: '700', willChange: 'transform'
    });
    box.textContent = i + 1;
    container.appendChild(box);
    boxes.push(box);
  }
  stage.appendChild(container);

  return gsap.to(boxes, {
    y: -100, duration: 0.6, ease: 'back.out',
    stagger: { amount: params.amount, from: params.from },
    repeat: -1, repeatDelay: 0.5, yoyo: true
  });
}

export function getCode(params) {
  return {
    html: `<div class="boxes"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>`,
    css: `.boxes { display: flex; gap: 10px; } .boxes div { width: 50px; height: 50px; background: #3b82f6; }`,
    js: `gsap.to(".boxes div", {
  y: -100,
  duration: 0.6,
  stagger: {
    amount: ${params.amount},
    from: "${params.from}"
  }
});`
  };
}

export const docs = {
  intro: "<p>Stagger como objeto da control total. <code>amount</code> = duración total del spread. <code>from</code> = punto de origen.</p>",
  method: "<p><code>{ amount: 0.3, from: 'start' }</code> — los elementos se desparraman en 0.3s empezando desde el primero.</p>",
  varsTable: [
    { prop: "amount", valueInDemo: "0.3", what: "Duración total del stagger (s)", validValues: "número > 0" },
    { prop: "from", valueInDemo: "start", what: "Punto de origen", validValues: "'start', 'center', 'end', 'random'" }
  ],
  internals: {
    "from opciones": [
      "'start' = empieza desde el primero",
      "'center' = empieza desde el medio",
      "'end' = empieza desde el último",
      "'random' = orden aleatorio"
    ]
  },
  advanced: ["Combina each + amount para control granular."],
  variations: ["from: 'edges' anima desde los extremos hacia el centro."],
  pitfalls: ["amount muy grande hace que dure demasiado visiblemente."],
  references: [
    { label: "stagger object", url: "https://gsap.com/docs/v3/GSAP/Tween/stagger" }
  ]
};
