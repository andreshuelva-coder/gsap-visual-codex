export const controls = [
  { type: 'slider', param: 'intensity', min: 0.5, max: 3, step: 0.1, default: 1.7 },
  { type: 'slider', param: 'duration', min: 0.5, max: 3, step: 0.1, default: 1.5 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
    border: '2px solid #fbbf24',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.7rem', willChange: 'transform'
  });
  box.textContent = 'BACK';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  return gsap.to(box, { x: 280, duration: params.duration, ease: `back.out(${params.intensity})`, repeat: -1, yoyo: true });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 70px; height: 70px; background: #f59e0b; border-radius: 12px; }`;
  const js = `gsap.to(".caja", {
  x: 200,
  duration: ${params.duration},
  ease: "back.out(${params.intensity})",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>back.out</code> hace un <strong>overshoot</strong> — va un poco más allá del objetivo y vuelve. Sensación juguetona y energética.</p><p>Parámetro: <code>back.out(1.7)</code> — 1.7 es el default, aumenta para más overshoot.</p>",
  method: "<p>Úsalo en apariciones, clics que causan satisfacción, o UI que debe ser juguetona.</p>",
  varsTable: [
    { prop: "intensity", valueInDemo: "1.7", what: "Cuánto overshoot", validValues: "0.5-3, típico 1.7" }
  ],
  internals: { "Efecto": ["La curva va SOBRE el 100% brevemente, luego vuelve."] },
  advanced: ["Combina con <code>stagger</code> en listas para efecto en cascada juguetón."],
  variations: ["<code>back.in</code> hace lo opuesto — sale hacia atrás."],
  pitfalls: ["Demasiado overshoot se ve artificial. 1.7-2.5 es lo bueno."],
  references: [
    { label: "back ease", url: "https://gsap.com/docs/v3/Eases#back" }
  ]
};
