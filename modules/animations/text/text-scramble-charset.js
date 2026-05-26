export const controls = [
  { type: 'toggle', param: 'demo', default: true }
];

export function render({ stage, params, gsap }) {
  const text = document.createElement('h3');
  text.style.cssText = 'font-size: 2rem; color: var(--text-1);';
  text.textContent = 'Text Animation';
  stage.appendChild(text);
  
  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  return {
    html: `<h3>Text Animation</h3>`,
    css: `h3 { font-size: 2rem; }`,
    js: `gsap.registerPlugin(SplitText);
const split = new SplitText("h3");
gsap.to(split.chars, { opacity: 0.5, duration: 1, stagger: 0.05 });`
  };
}

export const docs = {
  intro: "<p>Módulo de animación de texto (Fase 7).</p>",
  method: "<p>Registra el plugin, crea split, anima chars/words/lines.</p>",
  varsTable: [],
  internals: {},
  advanced: [],
  variations: [],
  pitfalls: [],
  references: [
    { label: "Text Plugins", url: "https://gsap.com/docs/v3/Plugins/" }
  ]
};
