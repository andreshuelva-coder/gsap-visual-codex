export const controls = [
  { type: 'slider',   param: 'duration', min: 0.1, max: 3,    step: 0.05, default: 1.5 },
  { type: 'dropdown', param: 'ease',     options: ['power1.out','power2.inOut','sine.inOut','cubic.inOut'], default: 'power2.inOut' },
  { type: 'slider',   param: 'fromX',    min: -300, max: 300, step: 5,    default: -250 },
  { type: 'slider',   param: 'toX',      min: -300, max: 300, step: 5,    default: 200 },
  { type: 'slider',   param: 'fromOpacity', min: 0, max: 1, step: 0.1, default: 0.2 },
  { type: 'slider',   param: 'toOpacity',   min: 0, max: 1, step: 0.1, default: 1 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '90px', height: '90px', borderRadius: '16px',
    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    boxShadow: '0 8px 24px rgba(167, 139, 250, 0.4)',
    border: '2px solid #c4b5fd',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.75rem', letterSpacing: '0.05em', willChange: 'transform'
  });
  box.textContent = 'FROM→TO';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.fromTo(box, { x: params.fromX, opacity: params.fromOpacity }, { x: params.toX, opacity: params.toOpacity, duration: params.duration, ease: params.ease });
}

export function getCode(params) {
  const html = `<div class="caja">FROM→TO</div>`;
  const css = `.caja { width: 90px; height: 90px; border-radius: 16px; background: linear-gradient(135deg, #a78bfa, #8b5cf6);
  box-shadow: 0 8px 24px rgba(167, 139, 250, 0.4); border: 2px solid #c4b5fd; display: grid; place-items: center;
  color: white; font-weight: 700; }`;
  const from = [`  x: ${params.fromX}`, `  opacity: ${params.fromOpacity}`].join(',\n');
  const to = [`  x: ${params.toX}`, `  opacity: ${params.toOpacity}`, `  duration: ${params.duration}`, `  ease: "${params.ease}"`].join(',\n');
  const js = `gsap.fromTo(".caja",\n{\n${from}\n},\n{\n${to}\n});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.fromTo()</code> te da control total: defines tanto el <strong>punto de partida</strong> como el <strong>destino</strong> en la misma línea. Es la forma más explícita de decir qué quieres.</p>",
  method: "<p>Firma: <code>gsap.fromTo(target, fromVars, toVars)</code>. El primer objeto (<code>fromVars</code>) define el inicio; el segundo (<code>toVars</code>) el final.</p>",
  varsTable: [
    { prop: "x (from)", valueInDemo: "-250", what: "Posición inicial", validValues: "Número" },
    { prop: "x (to)", valueInDemo: "200", what: "Posición final", validValues: "Número" },
    { prop: "opacity (from)", valueInDemo: "0.2", what: "Opacidad inicial", validValues: "0-1" },
    { prop: "opacity (to)", valueInDemo: "1", what: "Opacidad final", validValues: "0-1" }
  ],
  internals: {
    "Sintaxis": ["<code>gsap.fromTo(target, { inicio }, { fin })</code>"]
  },
  advanced: ["Cuando necesites máxima claridad, <code>fromTo</code> es mejor que <code>from</code> o <code>to</code>."],
  variations: ["Úsalo para animaciones que van de 'estado A' a 'estado B' sin ambigüedad."],
  pitfalls: ["El segundo objeto <code>toVars</code> debe incluir <code>duration</code> y otros parámetros de tween."],
  references: [
    { label: "gsap.fromTo()", url: "https://gsap.com/docs/v3/GSAP/gsap.fromTo()" }
  ]
};
