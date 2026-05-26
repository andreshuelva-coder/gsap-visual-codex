export const controls = [
  { type: 'slider', param: 'staggerAmount', min: 0, max: 0.5, step: 0.05, default: 0.1 },
  { type: 'slider', param: 'duration', min: 0.3, max: 1, step: 0.1, default: 0.6 }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  Object.assign(container.style, { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' });
  
  const boxes = [];
  for (let i = 0; i < 6; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '50px', height: '50px', borderRadius: '8px',
      background: `hsl(${i * 60}, 70%, 50%)`,
      display: 'grid', placeItems: 'center',
      color: 'white', fontWeight: '700', willChange: 'transform'
    });
    box.textContent = i + 1;
    container.appendChild(box);
    boxes.push(box);
  }
  stage.appendChild(container);

  return gsap.to(boxes, {
    y: -100,
    duration: params.duration,
    stagger: params.staggerAmount,
    ease: 'back.out',
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: true
  });
}

export function getCode(params) {
  return {
    html: `<div class="boxes">
  <div>1</div><div>2</div><div>3</div>
  <div>4</div><div>5</div><div>6</div>
</div>`,
    css: `.boxes { display: flex; gap: 10px; } .boxes div { width: 50px; height: 50px; background: #3b82f6; }`,
    js: `gsap.to(".boxes div", {
  y: -100,
  duration: ${params.duration},
  stagger: ${params.staggerAmount},
  ease: "back.out"
});`
  };
}

export const docs = {
  intro: "<p><code>stagger</code> añade un desfase entre las animaciones de múltiples elementos. Crea efecto en cascada.</p>",
  method: "<p>Forma simple: <code>stagger: 0.1</code> = cada elemento empieza 0.1s después del anterior.</p>",
  varsTable: [
    { prop: "stagger", valueInDemo: "0.1", what: "Desfase entre elementos (segundos)", validValues: "número > 0" }
  ],
  internals: {
    "Cálculo": ["Elemento 0: empieza en 0s. Elemento 1: en 0.1s. Elemento 2: en 0.2s. Etc."]
  },
  advanced: ["Combina con stagger object para más control."],
  variations: ["stagger: 0.05 = más rápido. stagger: 0.3 = más lento."],
  pitfalls: ["stagger muy grande puede verse desconectado."],
  references: [
    { label: "stagger", url: "https://gsap.com/docs/v3/GSAP/Tween/stagger" }
  ]
};
