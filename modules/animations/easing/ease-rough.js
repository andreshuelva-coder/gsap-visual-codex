export const controls = [
  { type: 'slider', param: 'clamp', min: 0, max: 1, step: 0.05, default: 0.3 },
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.5 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #ec4899, #be185d)',
    boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)',
    border: '2px solid #f472b6',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.65rem', willChange: 'transform'
  });
  box.textContent = 'ROUGH';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'power2.out', repeat: -1, yoyo: true });
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #ec4899; border-radius: 12px; }`,
    js: `// RoughEase — animación "áspera" y orgánica
gsap.to(".caja", { 
  x: 200, 
  duration: ${params.duration}, 
  ease: "rough(clamp: ${params.clamp})"
});`
  };
}

export const docs = {
  intro: "<p><code>RoughEase</code> añade "rugosidad" — la animación tiene pequeños saltos y oscilaciones. Muy orgánico.</p>",
  method: "<p>Parámetro <code>clamp</code> controla qué tan áspera.</p>",
  varsTable: [
    { prop: "clamp", valueInDemo: "0.3", what: "Cantidad de rugosidad", validValues: "0-1" }
  ],
  internals: {
    "Efecto": ["Genera oscilaciones pseudoaleatorias dentro de la trayectoria."]
  },
  advanced: ["Ideal para efectos de terremotos, inestabilidad."],
  variations: ["<code>clamp: 0</code> = liso. <code>clamp: 1</code> = muy áspero."],
  pitfalls: ["Demasiada rugosidad se ve quebrado. Usa 0.2-0.5."],
  references: [
    { label: "RoughEase", url: "https://gsap.com/docs/v3/Eases#rough" }
  ]
};
