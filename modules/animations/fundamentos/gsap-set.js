export const controls = [
  { type: 'slider',   param: 'x',        min: -300, max: 300, step: 5,    default: 150 },
  { type: 'slider',   param: 'scale',    min: 0.5,  max: 2.5, step: 0.1,  default: 1.5 },
  { type: 'slider',   param: 'opacity',  min: 0,    max: 1,   step: 0.1,  default: 0.7 },
  { type: 'dropdown', param: 'bgColor',  options: ['#88ce02', '#ff5e7a', '#a78bfa', '#3b82f6'], default: '#88ce02' }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, { width: '90px', height: '90px', borderRadius: '16px', display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700', fontSize: '0.75rem', willChange: 'transform' });
  box.textContent = 'SET';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  gsap.set(box, { x: params.x, scale: params.scale, opacity: params.opacity, background: params.bgColor, boxShadow: `0 8px 24px ${params.bgColor}33` });
  return { play: () => {}, pause: () => {}, kill: () => {} };
}

export function getCode(params) {
  const html = `<div class="caja">SET</div>`;
  const css = `.caja { width: 90px; height: 90px; border-radius: 16px; display: grid; place-items: center; color: white; }`;
  const js = `gsap.set(".caja", {
  x: ${params.x},
  scale: ${params.scale},
  opacity: ${params.opacity},
  background: "${params.bgColor}"
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.set()</code> cambia propiedades <strong>instantáneamente</strong>, sin animar. Es perfecto para setup inicial o cambios rápidos.",p>",
  method: "<p>Firma: <code>gsap.set(target, vars)</code>. No devuelve un Tween, devuelve el target modificado.</p>",
  varsTable: [
    { prop: "cualquier", valueInDemo: "varios", what: "Acepta cualquier propiedad CSS", validValues: "Lo que sea" }
  ],
  internals: { "No es tween": ["gsap.set() es un atajo para aplicar estilos. Equivale a manipular el DOM directamente pero en la sintaxis GSAP."] },
  advanced: ["Úsalo antes de iniciar otra animación para preparar el estado inicial."],
  variations: ["Anima múltiples elementos: <code>gsap.set(\".cajas\", { x: 0, opacity: 1 })</code>"],
  pitfalls: ["No deberías usar <code>gsap.set()</code> en un callback <code>onUpdate</code> repetidamente — es lento."],
  references: [
    { label: "gsap.set()", url: "https://gsap.com/docs/v3/GSAP/gsap.set()" }
  ]
};
