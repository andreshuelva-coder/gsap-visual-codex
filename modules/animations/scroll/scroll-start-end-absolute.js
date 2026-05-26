export const controls = [
  { type: 'toggle', param: 'demo', default: true, label: 'ver demo' }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '100px', height: '100px', background: 'var(--accent)',
    borderRadius: 'var(--radius)', padding: '1rem', color: 'white'
  });
  box.innerHTML = '<p style="font-size: 0.7rem; font-weight: 700;">ScrollTrigger</p>';
  stage.appendChild(box);
  
  gsap.registerPlugin(ScrollTrigger);
  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 100px; height: 100px; background: var(--accent); }`,
    js: `gsap.registerPlugin(ScrollTrigger);
gsap.to(".caja", {
  opacity: 1,
  scrollTrigger: {
    trigger: ".caja",
    start: "top center",
    end: "center center"
  }
});`
  };
}

export const docs = {
  intro: "<p>Módulo de ScrollTrigger. Ver documentación oficial para detalles.</p>",
  method: "<p>Registra ScrollTrigger, luego configura scrollTrigger en tu tween.</p>",
  varsTable: [],
  internals: {},
  advanced: [],
  variations: [],
  pitfalls: [],
  references: [
    { label: "ScrollTrigger", url: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/" }
  ]
};
