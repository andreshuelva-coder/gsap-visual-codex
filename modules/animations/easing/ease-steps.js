export const controls = [
  { type: 'slider', param: 'steps', min: 2, max: 12, step: 1, default: 4 },
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #4f46e5, #4338ca)',
    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
    border: '2px solid #818cf8',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.65rem', willChange: 'transform'
  });
  box.textContent = 'STEPS';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: `steps(${params.steps})`, repeat: -1, yoyo: true });
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #4f46e5; border-radius: 12px; }`,
    js: `gsap.to(".caja", { x: 200, duration: ${params.duration}, ease: "steps(${params.steps})" });`
  };
}

export const docs = {
  intro: "<p><code>steps(n)</code> hace que la animación progrese en <code>n</code> pasos discretos, no continuos. Efecto de cine mudo.</p>",
  method: "<p>Úsalo para animaciones pixel-art, retro, o efectos de fotograma clave.</p>",
  varsTable: [
    { prop: "steps", valueInDemo: "4", what: "Cuántos pasos", validValues: "2-12, típico 4-8" }
  ],
  internals: { "Efecto": ["A veces también se llama 'jump' — salta entre valores discretos."] },
  advanced: ["Combina con imagen secuencial para simular cine sin sprite sheet."],
  variations: ["<code>steps(12)</code> más granular. <code>steps(2)</code> muy jarring."],
  pitfalls: ["Con duration muy corta no se ven los pasos. Usa 1s+."],
  references: [
    { label: "steps ease", url: "https://gsap.com/docs/v3/Eases#steps" }
  ]
};
