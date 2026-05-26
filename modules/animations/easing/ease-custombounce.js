export const controls = [
  { type: 'slider', param: 'strength', min: 0.2, max: 1, step: 0.1, default: 0.8 },
  { type: 'toggle', param: 'endAtStart', default: false, label: 'bounce hacia atrás' },
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.5 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    boxShadow: '0 8px 24px rgba(249, 115, 22, 0.4)',
    border: '2px solid #fb923c',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.6rem', willChange: 'transform'
  });
  box.textContent = 'CBOUNCE';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'bounce.out', repeat: -1, yoyo: true });
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #f97316; border-radius: 12px; }`,
    js: `// CustomBounce ofrece control sobre strength y squash
// Requiere plugin premium CustomBounce
gsap.to(".caja", { 
  x: 200, 
  duration: ${params.duration}, 
  ease: "customBounce(strength: ${params.strength}, endAtStart: ${params.endAtStart})"
});`
  };
}

export const docs = {
  intro: "<p><code>CustomBounce</code> (plugin Club) es <code>bounce.out</code> pero configurable. Controla strength, squash, etc.</p>",
  method: "<p>Requiere registración con GreenSock. Muy similar a <code>bounce</code> pero con diales ajustables.</p>",
  varsTable: [
    { prop: "strength", valueInDemo: "0.8", what: "Intensidad del bounce", validValues: "0.2-1" },
    { prop: "endAtStart", valueInDemo: "false", what: "Bouncea hacia atrás", validValues: "true/false" }
  ],
  internals: {
    "Club GreenSock": ["Disponible con membresía. Para mayor control usa esto en lugar de bounce.out."]
  },
  advanced: ["Combina con <code>squash</code> para efecto elástico de squash."],
  variations: ["Ajusta strength para bounces suaves o agresivos."],
  pitfalls: ["Plugin de pago — no funciona sin registración oficial."],
  references: [
    { label: "CustomBounce", url: "https://gsap.com/docs/v3/Plugins/CustomBounce" }
  ]
};
