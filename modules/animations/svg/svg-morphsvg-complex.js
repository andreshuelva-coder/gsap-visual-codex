export const controls = [
  { type: 'toggle', param: 'demo', default: true }
];

export function render({ stage, params, gsap }) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 200 200');
  svg.setAttribute('width', '200');
  svg.setAttribute('height', '200');
  svg.setAttribute('style', 'border: 1px solid var(--border-2); border-radius: var(--radius);');
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M50,50 L150,50 L150,150 L50,150 Z');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'var(--accent)');
  path.setAttribute('stroke-width', '2');
  
  svg.appendChild(path);
  stage.appendChild(svg);
  
  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  return {
    html: `<svg viewBox="0 0 200 200"><path d="..."/></svg>`,
    css: `svg { border: 1px solid var(--border-2); }`,
    js: `gsap.registerPlugin(DrawSVGPlugin);
gsap.to("path", { strokeDasharray: 500, duration: 2 });`
  };
}

export const docs = {
  intro: "<p>Módulo SVG de Fase 6. Ver documentación oficial.</p>",
  method: "<p>Registra el plugin SVG necesario.</p>",
  varsTable: [],
  internals: {},
  advanced: [],
  variations: [],
  pitfalls: [],
  references: [
    { label: "SVG Plugins", url: "https://gsap.com/docs/v3/Plugins/" }
  ]
};
