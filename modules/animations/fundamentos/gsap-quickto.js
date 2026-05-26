export const controls = [
  { type: 'slider', param: 'targetX', min: -200, max: 200, step: 10, default: 100 },
  { type: 'slider', param: 'duration', min: 0.1, max: 1, step: 0.1, default: 0.5 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '90px', height: '90px', borderRadius: '16px',
    background: 'linear-gradient(135deg, #ec4899, #db2777)',
    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
    border: '2px solid #f472b6',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none',
    willChange: 'transform'
  });
  box.textContent = 'CLICK';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  const animateTo = gsap.quickTo(box, 'x', { duration: params.duration, ease: 'power2.inOut' });
  box.addEventListener('click', () => animateTo(params.targetX));
  
  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  const html = `<button class="boton">Click me</button>`;
  const css = `.boton { padding: 1rem; background: #ec4899; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; }`;
  const js = `const animateTo = gsap.quickTo(".boton", "x", { duration: ${params.duration} });
document.querySelector(".boton").addEventListener("click", () => {
  animateTo(${params.targetX});  // Anima a este valor
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.quickTo()</code> crea una función reutilizable para animar hacia valores. Perfecto para interactivos (clicks, hovers) o dinámicos.</p>",
  method: "<p>Firma: <code>gsap.quickTo(target, property, vars?)</code>. Devuelve una función que espera el valor destino.</p>",
  varsTable: [
    { prop: "target", valueInDemo: ".boton", what: "Qué animar", validValues: "selector o elemento" },
    { prop: "property", valueInDemo: "x", what: "Propiedad", validValues: "string" },
    { prop: "vars", valueInDemo: "{ duration: 0.5 }", what: "Config del tween", validValues: "object" }
  ],
  internals: {
    "Uso típico": ["Almacena la función devuelta y llámala repetidas veces con distintos valores."]
  },
  advanced: ["Más eficiente que crear tweens nuevos en cada interacción."],
  variations: ["Para valores múltiples, crea varios quickTo: <code>const setX = gsap.quickTo(el, 'x'); const setY = gsap.quickTo(el, 'y');</code>"],
  pitfalls: ["Usa quickTo para props que cambiarán dinámicamente, no para todo."],
  references: [
    { label: "gsap.quickTo()", url: "https://gsap.com/docs/v3/GSAP/gsap.quickTo()" }
  ]
};
