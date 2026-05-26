export const controls = [
  { type: 'dropdown', param: 'pattern', options: ['exponencial', 'alternado', 'seno'], default: 'exponencial' }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  Object.assign(container.style, { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' });
  
  const boxes = [];
  for (let i = 0; i < 8; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '50px', height: '50px', borderRadius: '8px',
      background: `hsl(${i * 45}, 70%, 50%)`, display: 'grid', placeItems: 'center',
      color: 'white', fontWeight: '700', willChange: 'transform'
    });
    box.textContent = i + 1;
    container.appendChild(box);
    boxes.push(box);
  }
  stage.appendChild(container);

  let staggerFn = (index) => index * 0.05; // default
  if (params.pattern === 'alternado') staggerFn = (index) => index % 2 === 0 ? 0 : 0.2;
  else if (params.pattern === 'seno') staggerFn = (index) => Math.sin(index * 0.5) * 0.2;

  return gsap.to(boxes, {
    y: -100, duration: 0.6, ease: 'back.out',
    stagger: staggerFn,
    repeat: -1, repeatDelay: 0.5, yoyo: true
  });
}

export function getCode(params) {
  return {
    html: `<div class="boxes">...</div>`,
    css: `.boxes { display: flex; gap: 10px; }`,
    js: `const staggerFn = (index) => {
  // Tu lógica personalizada
  return index * 0.1 + Math.random() * 0.05;
};

gsap.to(".boxes div", {
  y: -100,
  duration: 0.6,
  stagger: staggerFn
});`
  };
}

export const docs = {
  intro: "<p>Pasa una FUNCIÓN como stagger. Se llama para cada elemento con index, y retorna el delay para ese elemento.</p>",
  method: "<p><code>stagger: (index) => index * 0.1</code> — máxima libertad para patterns personalizados.</p>",
  varsTable: [
    { prop: "función", valueInDemo: "(i) => i*0.05", what: "Retorna delay por index", validValues: "function(index) => number" }
  ],
  internals: {
    "Parámetro": ["index = número del elemento (0, 1, 2, ...). Retorna el delay en segundos para ese elemento."]
  },
  advanced: ["Combina con Math.random() para patrones aleatorios."],
  variations: ["Usa index para crear patterns oscilantes, exponenciales, o caóticos."],
  pitfalls: ["Si retornas negativos o muy grandes, comportamiento impredecible."],
  references: [
    { label: "stagger function", url: "https://gsap.com/docs/v3/GSAP/Tween/stagger" }
  ]
};
