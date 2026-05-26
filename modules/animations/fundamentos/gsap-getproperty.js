export const controls = [
  { type: 'slider', param: 'x', min: 0, max: 300, step: 10, default: 100 },
  { type: 'slider', param: 'duration', min: 0.1, max: 3, step: 0.1, default: 2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: '#10b981', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
    border: '2px solid #34d399',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'GET';
  
  const readout = document.createElement('div');
  readout.style.cssText = `position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: var(--bg-3); border: 1px solid var(--border-2); border-radius: var(--radius);
    padding: 0.5rem 1rem; font-family: var(--font-mono); font-size: var(--fs-xs);
    color: var(--text-2); white-space: nowrap;`;
  readout.textContent = 'x: 0';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' });
  wrapper.appendChild(box);
  wrapper.appendChild(readout);
  stage.appendChild(wrapper);
  
  return gsap.to(box, {
    x: params.x,
    duration: params.duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      const val = gsap.getProperty(box, 'x');
      readout.textContent = `x: ${val.toFixed(1)}`;
    }
  });
}

export function getCode(params) {
  const html = `<div class="caja"></div><div class="readout"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #10b981; border-radius: 12px; }`;
  const js = `const tween = gsap.to(".caja", { x: ${params.x}, duration: ${params.duration}, onUpdate: () => {
  const currentX = gsap.getProperty(".caja", "x");
  document.querySelector(".readout").textContent = currentX.toFixed(1);
} });`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.getProperty()</code> lee el valor <strong>actual</strong> de una propiedad mientras se anima. Útil para cálculos dinámicos o sincronización.</p>",
  method: "<p>Firma: <code>gsap.getProperty(target, property, unit?)</code>. Devuelve el valor actual (número).</p>",
  varsTable: [
    { prop: "target", valueInDemo: ".caja", what: "Qué elemento leer", validValues: "selector o elemento" },
    { prop: "property", valueInDemo: "x", what: "Propiedad a leer", validValues: "string: 'x', 'rotation', etc." }
  ],
  internals: {
    "Diferencia con CSS getComputedStyle": [
      "<code>gsap.getProperty()</code> entiende aliasing de GSAP (x, y, rotation, etc.)",
      "<code>getComputedStyle</code> devuelve <code>transform: matrix(...)</code>"
    ]
  },
  advanced: ["Usa en <code>onUpdate</code> para actualizar UI basada en el progreso actual."],
  variations: ["Lee múltiples elementos: <code>gsap.getProperty(\".elementos\", \"x\")</code> devuelve el primero."],
  pitfalls: ["Leer propiedades cada frame en <code>onUpdate</code> puede ser lento con muchos elementos."],
  references: [
    { label: "gsap.getProperty()", url: "https://gsap.com/docs/v3/GSAP/gsap.getProperty()" }
  ]
};
