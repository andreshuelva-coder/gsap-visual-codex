export const controls = [
  { type: 'dropdown', param: 'goToLabel', options: ['inicio', 'mitad', 'fin'], default: 'inicio' }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '80px', height: '80px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
    border: '2px solid #a78bfa',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.75rem', willChange: 'transform'
  });
  box.textContent = 'LABEL';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);

  const tl = gsap.timeline();
  tl.to(box, { x: 100, duration: 0.5, ease: 'power2.out' })
    .addLabel('mitad')
    .to(box, { y: 100, duration: 0.5, ease: 'power2.out' })
    .addLabel('fin')
    .to(box, { rotation: 360, duration: 0.5, ease: 'power2.out' });

  // Navegar al label según control
  const seekMap = { 'inicio': 0, 'mitad': 'mitad', 'fin': 'fin' };
  tl.seek(seekMap[params.goToLabel]);
  
  return tl;
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 80px; height: 80px; background: #8b5cf6; border-radius: 12px; }`,
    js: `const tl = gsap.timeline();
tl.to(".caja", { x: 100, duration: 0.5 })
  .addLabel("mitad")
  .to(".caja", { y: 100, duration: 0.5 })
  .addLabel("fin")
  .to(".caja", { rotation: 360, duration: 0.5 });

// Saltar a un label
tl.seek("mitad");`
  };
}

export const docs = {
  intro: "<p>Los <code>labels</code> son puntos de referencia en la timeline. Útiles para saltar rápidamente o crear flujos complejos.</p>",
  method: "<p>Usa <code>.addLabel('nombreDelLabel')</code> para marcar un momento. Luego <code>.seek('nombreDelLabel')</code> para saltar.</p>",
  varsTable: [
    { prop: "addLabel()", valueInDemo: "'mitad'", what: "Marca un punto", validValues: "string cualquiera" },
    { prop: "seek()", valueInDemo: "'mitad'", what: "Salta a ese label", validValues: "string o número (segundos)" }
  ],
  internals: {
    "Labels son invisibles": ["No afectan el tiempo de ejecución. Solo marcan posiciones para referencia."]
  },
  advanced: ["Combina labels con callbacks para flujos narrativos."],
  variations: ["Crea labels cada 0.5 segundos para un control granular."],
  pitfalls: ["Si buscas un label que no existe, no hace nada silenciosamente."],
  references: [
    { label: "addLabel()", url: "https://gsap.com/docs/v3/GSAP/Timeline/addLabel()" }
  ]
};
