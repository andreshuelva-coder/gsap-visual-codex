export const controls = [
  { type: 'dropdown', param: 'variant', options: ['.out', '.in', '.inOut'], default: '.out' },
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
    border: '2px solid #34d399',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'CIRC';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  return gsap.to(box, { x: 280, duration: params.duration, ease: `circ${params.variant}`, repeat: -1, yoyo: true });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #10b981; border-radius: 12px; }`;
  const js = `gsap.to(".caja", {
  x: 200,
  duration: ${params.duration},
  ease: "circ${params.variant}",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>circ</code> es circular. Similar a sine pero con curvatura ligeramente diferente. Suave pero con ligera aceleración.</p>",
  method: "<p>Úsalo cuando quieras algo más elegante que power pero no tan suave como sine.</p>",
  varsTable: [
    { prop: "circ.out", valueInDemo: "recomendado", what: "Rápido luego suave", validValues: ".in, .out, .inOut" }
  ],
  internals: { "Fórmula": ["Basada en un arco de círculo."] },
  advanced: ["A veces preferible a sine para animaciones de UI."],
  variations: ["Comparar circ vs sine en la misma duración y notar la diferencia sutil."],
  pitfalls: ["Tan suave que a veces se confunde con sine. Úsala sin pensar demasiado."],
  references: [
    { label: "circ ease", url: "https://gsap.com/docs/v3/Eases#circ" }
  ]
};
