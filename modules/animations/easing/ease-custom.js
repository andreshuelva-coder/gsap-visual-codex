export const controls = [
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 },
  { type: 'dropdown', param: 'preset', options: ['M0,100 C50,50 50,50 100,0', 'M0,100 C100,100 0,0 100,0'], default: 'M0,100 C50,50 50,50 100,0' }
];

export function render({ stage, params, gsap }) {
  // Para CustomEase, necesita estar registrado
  if (gsap.parseEase('custom') === undefined) {
    gsap.registerEase('custom', gsap.parseEase('power2.out')); // fallback
  }
  
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #db2777, #be185d)',
    boxShadow: '0 8px 24px rgba(219, 39, 119, 0.4)',
    border: '2px solid #f472b6',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.65rem', willChange: 'transform'
  });
  box.textContent = 'CUSTOM';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'power2.inOut', repeat: -1, yoyo: true });
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #db2777; border-radius: 12px; }`,
    js: `// Para CustomEase necesitas el plugin + una curva Bezier personalizada
// En producción usa: gsap.registerEase("myEase", "M0,100 C25,75 75,25 100,0");
gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "power2.inOut" });`
  };
}

export const docs = {
  intro: "<p><code>CustomEase</code> te permite definir curvas Bezier personalizadas. Una imagen SVG path personalizada = easing único.</p>",
  method: "<p>Registra con <code>gsap.registerEase('nombreMio', 'M0,100 C...')</code> y luego úsalo como cualquier ease.</p>",
  varsTable: [
    { prop: "path SVG", valueInDemo: "M0,100 C50,50...", what: "Curva Bezier cúbica", validValues: "válido SVG path" }
  ],
  internals: {
    "Format": ["Notación SVG path: M = move, C = cubic bezier. Siempre M0,100 (inicio) a C...100,0 (fin)."]
  },
  advanced: ["Usa gsap.com/easing-visualizer para diseñar curvas visualemente."],
  variations: ["Crea eases que reflejen tu marca o concepto de movimiento único."],
  pitfalls: ["Paths inválidos rompen. Valida con el visualizer."],
  references: [
    { label: "CustomEase", url: "https://gsap.com/docs/v3/Plugins/CustomEase" }
  ]
};
