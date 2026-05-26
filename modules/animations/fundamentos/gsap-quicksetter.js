export const controls = [
  { type: 'slider', param: 'rotationSpeed', min: 0, max: 360, step: 10, default: 100, hint: 'Grados por frame' }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '80px', height: '80px', borderRadius: '16px',
    background: 'linear-gradient(45deg, #f59e0b, #f97316)',
    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
    border: '2px solid #fbbf24',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    willChange: 'transform'
  });
  box.textContent = '↻';
  box.style.fontSize = '2rem';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  const setRotation = gsap.quickSetter(box, 'rotation', 'deg');
  let angle = 0;
  return gsap.to({ angle: 0 }, {
    angle: 360,
    duration: 4,
    repeat: -1,
    onUpdate: function() { setRotation(this.targets()[0].angle); },
    ease: 'none'
  });
}

export function getCode(params) {
  const html = `<div class="spinner">↻</div>`;
  const css = `.spinner { width: 80px; height: 80px; background: #f59e0b; border-radius: 16px; display: grid; place-items: center; font-size: 2rem; }`;
  const js = `const setRotation = gsap.quickSetter(".spinner", "rotation", "deg");
gsap.to({ angle: 0 }, {
  angle: 360,
  duration: 4,
  repeat: -1,
  onUpdate: function() { setRotation(this.targets()[0].angle); },
  ease: 'none'
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.quickSetter()</code> crea una función super-optimizada para cambiar una propiedad. Mucho más rápido que <code>gsap.set()</code> en loops.</p>",
  method: "<p>Firma: <code>gsap.quickSetter(target, property, unit?)</code>. Devuelve una función que aplica el cambio.</p>",
  varsTable: [
    { prop: "target", valueInDemo: ".spinner", what: "Qué elemento", validValues: "selector o elemento" },
    { prop: "property", valueInDemo: "rotation", what: "Propiedad", validValues: "string" },
    { prop: "unit", valueInDemo: "deg", what: "Unidad (opcional)", validValues: "string" }
  ],
  internals: {
    "Performance": ["quickSetter es 10x+ más rápido que <code>gsap.set()</code> repetido en onUpdate."]
  },
  advanced: ["Ideal para animaciones de UI generadas dinámicamente o mucha densidad."],
  variations: ["Combina múltiples quickSetters para animar varias propiedades a la vez."],
  pitfalls: ["No es tan flexible como un tween normal — sólo cambia una propiedad."],
  references: [
    { label: "gsap.quickSetter()", url: "https://gsap.com/docs/v3/GSAP/gsap.quickSetter()" }
  ]
};
