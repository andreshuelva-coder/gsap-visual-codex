export const controls = [
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1 },
  { type: 'toggle', param: 'autoRevert', default: true, label: 'auto-revertir al salir' }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  container.style.cssText = 'width: 100%; display: flex; gap: 10px; justify-content: center;';
  
  for (let i = 0; i < 3; i++) {
    const box = document.createElement('div');
    box.style.cssText = `width: 70px; height: 70px; border-radius: 12px; background: hsl(${i * 120}, 70%, 50%);
      display: grid; place-items: center; color: white; font-weight: 700; will-change: transform;`;
    box.textContent = i + 1;
    container.appendChild(box);
  }
  stage.appendChild(container);
  
  const boxes = container.querySelectorAll('div');
  const ctx = gsap.context(() => {
    gsap.to(boxes, { y: -80, duration: params.duration, ease: 'back.out', stagger: 0.1 });
  }, container);
  
  return { play: () => {}, pause: () => {}, kill: () => ctx.revert() };
}

export function getCode(params) {
  const html = `<div id="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`;
  const css = `#container { display: flex; gap: 10px; }
#container div { width: 70px; height: 70px; border-radius: 12px; background: #3b82f6; }`;
  const js = `const ctx = gsap.context(() => {
  gsap.to("#container div", { y: -80, duration: ${params.duration}, stagger: 0.1 });
}, "#container");

// Al limpiar: ctx.revert();`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.context()</code> agrupa animaciones de un componente para limpiarlas juntas. Crítico en React o frameworks dinámicos.</p>",
  method: "<p>Firma: <code>gsap.context(callback, scope?)</code>. Todas las animaciones dentro se asignan al contexto. Luego llamas <code>ctx.revert()</code> para limpiar.</p>",
  varsTable: [
    { prop: "callback", valueInDemo: "función", what: "Dónde van las animaciones", validValues: "function" },
    { prop: "scope", valueInDemo: "#container", what: "Elemento raíz (opcional)", validValues: "selector o elemento" }
  ],
  internals: {
    "Qué limpia revert()": [
      "Mata todos los tweens creados",
      "Revierte cambios de CSS",
      "Limpia listeners si los hubiera"
    ]
  },
  advanced: ["Nesting: un contexto dentro de otro para jerarquías de cleanup."],
  variations: ["En React: ctx.revert() en el useEffect return."],
  pitfalls: ["Sin context, los tweens pueden ejecutarse después de que el componente se destruya → memory leak."],
  references: [
    { label: "gsap.context()", url: "https://gsap.com/docs/v3/GSAP/gsap.context()" }
  ]
};
