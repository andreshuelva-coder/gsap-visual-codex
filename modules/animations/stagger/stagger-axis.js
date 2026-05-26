export const controls = [
  { type: 'dropdown', param: 'axis', options: ['x', 'y'], default: 'x' }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  Object.assign(container.style, { display: 'flex', gap: '10px', flexDirection: params.axis === 'y' ? 'column' : 'row', flexWrap: 'wrap', justifyContent: 'center' });
  
  const boxes = [];
  for (let i = 0; i < 5; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '50px', height: '50px', borderRadius: '8px',
      background: `hsl(${i * 72}, 70%, 50%)`, display: 'grid', placeItems: 'center',
      color: 'white', fontWeight: '700', willChange: 'transform'
    });
    box.textContent = i + 1;
    container.appendChild(box);
    boxes.push(box);
  }
  stage.appendChild(container);

  const direction = params.axis === 'x' ? { x: 150 } : { y: 150 };
  return gsap.to(boxes, {
    ...direction, duration: 0.6, ease: 'back.out',
    stagger: { amount: 0.3, axis: params.axis },
    repeat: -1, repeatDelay: 0.5, yoyo: true
  });
}

export function getCode(params) {
  const dir = params.axis === 'x' ? 'x: 150' : 'y: 150';
  return {
    html: `<div class="boxes"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>`,
    css: `.boxes { display: flex; gap: 10px; } .boxes div { width: 50px; height: 50px; background: #3b82f6; }`,
    js: `gsap.to(".boxes div", {
  ${dir},
  duration: 0.6,
  stagger: {
    amount: 0.3,
    axis: "${params.axis}"
  }
});`
  };
}

export const docs = {
  intro: "<p><code>axis</code> controla si el stagger se basa en posición X (horizontal) o Y (vertical) de los elementos.</p>",
  method: "<p>Automáticamente calcula distancia en ese eje y staggerea según eso.</p>",
  varsTable: [
    { prop: "axis", valueInDemo: "x", what: "Eje de distancia", validValues: "'x' o 'y'" }
  ],
  internals: {
    "Cálculo": ["Ordena elementos por su posición en ese eje, luego staggerea en ese orden."]
  },
  advanced: ["Combina axis + from para flujos directionales complejos."],
  variations: ["axis: 'y' en una lista vertical = stagger de arriba a abajo natural."],
  pitfalls: ["Si elementos no están ordenados en el eje elegido, resulta caótico."],
  references: [
    { label: "axis stagger", url: "https://gsap.com/docs/v3/GSAP/Tween/stagger" }
  ]
};
