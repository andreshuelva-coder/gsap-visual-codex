export const controls = [
  { type: 'dropdown', param: 'gridType', options: ['rows', 'cols', 'diagonal'], default: 'rows' }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gap: '10px',
    justifyContent: 'center'
  });
  
  const boxes = [];
  for (let i = 0; i < 16; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '50px', height: '50px', borderRadius: '8px',
      background: `hsl(${(i % 8) * 45}, 70%, 50%)`,
      display: 'grid', placeItems: 'center',
      color: 'white', fontWeight: '700', willChange: 'transform',
      fontSize: '0.7rem'
    });
    box.textContent = i + 1;
    container.appendChild(box);
    boxes.push(box);
  }
  stage.appendChild(container);

  const gridConfig = params.gridType === 'diagonal' 
    ? { grid: [4, 4], from: 'center', amount: 0.8 }
    : { grid: [4, 4], amount: 0.5 };

  return gsap.to(boxes, {
    y: -80, duration: 0.5, ease: 'back.out',
    stagger: gridConfig,
    repeat: -1, repeatDelay: 0.5, yoyo: true
  });
}

export function getCode(params) {
  return {
    html: `<div class="grid"><!-- 16 divs --></div>`,
    css: `.grid { display: grid; grid-template-columns: repeat(4, 50px); gap: 10px; }`,
    js: `gsap.to(".grid div", {
  y: -80,
  duration: 0.5,
  stagger: {
    grid: [4, 4],
    amount: 0.5
  }
});`
  };
}

export const docs = {
  intro: "<p>Stagger en grid 2D anima elementos en patrones geométricos. <code>grid: [rows, cols]</code> define la forma.</p>",
  method: "<p>Combina grid + from para efectos ondulantes o espirales.</p>",
  varsTable: [
    { prop: "grid", valueInDemo: "[4,4]", what: "Filas y columnas", validValues: "[rows, cols]" },
    { prop: "from", valueInDemo: "center", what: "Punto de origen", validValues: "'start', 'center', 'end'" }
  ],
  internals: {
    "Grid calcula": ["La distancia de cada elemento desde el punto de origen y lo mapea al stagger."]
  },
  advanced: ["from: 'center' con grid = onda explosiva desde el centro."],
  variations: ["from: 'start' = onda lineal en raster."],
  pitfalls: ["Grid incorrecto crea animación rarísima. Asegúrate de contar elementos correctamente."],
  references: [
    { label: "grid stagger", url: "https://gsap.com/docs/v3/GSAP/Tween/stagger" }
  ]
};
