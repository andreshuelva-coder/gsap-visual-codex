export const controls = [
  { type: 'toggle', param: 'demo', default: true }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.style.cssText = 'width: 80px; height: 80px; background: var(--accent); border-radius: var(--radius); cursor: grab;';
  box.textContent = '✋';
  box.style.fontSize = '2rem';
  box.style.display = 'grid';
  box.style.placeItems = 'center';
  stage.appendChild(box);
  
  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  return {
    html: `<div class="draggable">✋</div>`,
    css: `.draggable { width: 80px; height: 80px; background: var(--accent); cursor: grab; }`,
    js: `gsap.registerPlugin(Draggable);
Draggable.create(".draggable");`
  };
}

export const docs = {
  intro: "<p>Módulo de interacción (Fase 8). Ver documentación oficial.</p>",
  method: "<p>Registra Draggable u otro plugin de interacción.</p>",
  varsTable: [],
  internals: {},
  advanced: [],
  variations: [],
  pitfalls: [],
  references: [
    { label: "Interaction Plugins", url: "https://gsap.com/docs/v3/Plugins/" }
  ]
};
