export const controls = [
  { type: 'toggle', param: 'yoyo', default: true, label: 'yoyo (ida-vuelta)' }
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
    stagger: 0.08,
    repeat: 2,
    yoyo: params.yoyo,
    repeatDelay: 0.3
  });
}

export function getCode(params) {
  return {
    html: `<div class="boxes">...</div>`,
    css: `.boxes { display: flex; gap: 10px; }`,
    js: `gsap.to(".boxes div", {
  y: -100,
  duration: 0.6,
  stagger: 0.08,
  repeat: 2,
  yoyo: ${params.yoyo},
  repeatDelay: 0.3
});`
  };
}

export const docs = {
  intro: "<p>Stagger con repeat + yoyo crea loops de cascadas. Los elementos se animan en cascada, vuelven, y repiten.</p>",
  method: "<p>Combina repeat, yoyo y stagger para efectos hipnóticos.</p>",
  varsTable: [
    { prop: "repeat", valueInDemo: "2", what: "Cuántas repeticiones", validValues: "número, -1 = infinito" },
    { prop: "yoyo", valueInDemo: "true", what: "Invierte cada repeat", validValues: "true/false" }
  ],
  internals: {
    "Ciclo": ["Cascada normal → pausa → cascada al revés → pausa → repite."]
  },
  advanced: ["yoyo con stagger negativo = patrón ondulante infinito."],
  variations: ["repeat: -1 = loop perfecto de cascadas."],
  pitfalls: ["Demasiadas repeticiones = agotador para la vista. Usa 1-2."],
  references: [
    { label: "repeat + yoyo", url: "https://gsap.com/docs/v3/GSAP/Tween" }
  ]
};
