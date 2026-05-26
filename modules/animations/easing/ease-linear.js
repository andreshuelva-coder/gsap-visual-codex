export const controls = [
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: '#64748b', boxShadow: '0 8px 24px rgba(100, 116, 139, 0.4)',
    border: '2px solid #94a3b8',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'LINEAR';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'none', repeat: -1, yoyo: true });
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #64748b; border-radius: 12px; }`,
    js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "none" });`
  };
}

export const docs = {
  intro: "<p><code>ease: 'none'</code> (o <code>'linear'</code>) crea movimiento uniforme. Ni aceleración, ni desaceleración. Raramente se usa — se siente robótico.</p>",
  method: "<p>Úsalo SOLO cuando necesites movimiento predecible y mecánico (ej: progreso bar, cronómetro visual).</p>",
  varsTable: [
    { prop: "none / linear", valueInDemo: "defecto", what: "Velocidad constante", validValues: "fijo" }
  ],
  internals: { "Gráfica": ["Una línea recta diagonal de esquina a esquina."] },
  advanced: ["Prácticamente nunca lo usarás en UI moderna."],
  variations: ["Para movimientos UI, reemplaza siempre con <code>power2.out</code>."],
  pitfalls: ["Si crees que necesitas <code>linear</code>, probablemente equivocado. Usa sine o power2."],
  references: [
    { label: "none ease", url: "https://gsap.com/docs/v3/Eases#none" }
  ]
};
