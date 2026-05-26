export const controls = [
  { type: 'toggle', param: 'pauseMaster', default: false, label: 'pausar timeline master' }
];

export function render({ stage, params, gsap }) {
  const boxes = [];
  const colors = ['#ec4899', '#f59e0b', '#10b981'];
  for (let i = 0; i < 3; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '60px', height: '60px', borderRadius: '10px',
      background: colors[i], display: 'grid', placeItems: 'center',
      fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
      margin: '5px', willChange: 'transform'
    });
    box.textContent = i + 1;
    stage.appendChild(box);
    boxes.push(box);
  }

  // Sub-timeline para el grupo 1
  const tl1 = gsap.timeline();
  tl1.to(boxes[0], { y: -80, duration: 0.4, ease: 'back.out' })
    .to(boxes[1], { y: -80, duration: 0.4, ease: 'back.out' }, 0);

  // Sub-timeline para el grupo 2
  const tl2 = gsap.timeline();
  tl2.to(boxes[2], { y: -80, duration: 0.4, ease: 'back.out' });

  // Master timeline que controla las sub-timelines
  const master = gsap.timeline({ repeat: -1, paused: params.pauseMaster });
  master.add(tl1)
    .add(tl2, '+=0.3');

  return master;
}

export function getCode(params) {
  return {
    html: `<div class="box">1</div><div class="box">2</div><div class="box">3</div>`,
    css: `.box { width: 60px; height: 60px; background: #ec4899; margin: 5px; }`,
    js: `// Sub-timeline 1
const tl1 = gsap.timeline();
tl1.to(".box:nth-child(1)", { y: -80, duration: 0.4 })
   .to(".box:nth-child(2)", { y: -80, duration: 0.4 }, 0);

// Sub-timeline 2
const tl2 = gsap.timeline();
tl2.to(".box:nth-child(3)", { y: -80, duration: 0.4 });

// Master timeline
const master = gsap.timeline();
master.add(tl1)
      .add(tl2, "+=0.3");`
  };
}

export const docs = {
  intro: "<p>Anida timelines dentro de timelines. Perfecto para organizar animaciones complejas en componentes reutilizables.</p>",
  method: "<p>Crea sub-timelines, luego usa <code>.add(subTimeline, posición)</code> para insertarlas en la master.</p>",
  varsTable: [
    { prop: ".add()", valueInDemo: "tl1, tl2", what: "Inserta sub-timeline", validValues: "timeline object" },
    { prop: "posición", valueInDemo: "'+=0.3'", what: "Dónde se inserta", validValues: "número, string con operador" }
  ],
  internals: {
    "Ventajas": ["Modularidad. Reutiliza sub-timelines. Mantenimiento más limpio."]
  },
  advanced: ["Haz una librería de efectos como sub-timelines reutilizables."],
  variations: ["Anida 3-4 niveles de profundidad sin problema."],
  pitfalls: ["Pausa la master y se pausan todas las sub-timelines. Es feature, no bug."],
  references: [
    { label: "Nested timelines", url: "https://gsap.com/docs/v3/GSAP/Timeline" }
  ]
};
