export const controls = [
  { type: 'dropdown', param: 'ease', options: ['power2.out', 'back.out', 'elastic.out', 'sine.inOut'], default: 'power2.out' }
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

  return gsap.to(boxes, {
    y: -100, duration: 0.6,
    stagger: { amount: 0.4, ease: params.ease },
    repeat: -1, repeatDelay: 0.5, yoyo: true
  });
}

export function getCode(params) {
  return {
    html: `<div class="boxes">...</div>`,
    css: `.boxes { display: flex; gap: 10px; }`,
    js: `gsap.to(".boxes div", {
  y: -100,
  duration: 0.6,
  stagger: {
    amount: 0.4,
    ease: "${params.ease}"
  }
});`
  };
}

export const docs = {
  intro: "<p>La ease del stagger controla CÓMO se distribuyen los delays entre elementos. Ej: power2.out = más elementos al inicio.</p>",
  method: "<p><code>stagger: { amount: 0.5, ease: 'power2.out' }</code></p>",
  varsTable: [
    { prop: "ease", valueInDemo: "power2.out", what: "Curva del stagger", validValues: "cualquier ease de GSAP" }
  ],
  internals: {
    "Efecto": ["Con power2.out: primeros elementos casi juntos, últimos más separados. Parece una onda que desacelera."]
  },
  advanced: ["Combina ease + from: 'center' para efectos cinemáticos complejos."],
  variations: ["elastic.out = stagger rebotón. sine.inOut = stagger suave."],
  pitfalls: ["Ease complicada con mucho spacing puede verse extraña."],
  references: [
    { label: "stagger ease", url: "https://gsap.com/docs/v3/GSAP/Tween/stagger" }
  ]
};
