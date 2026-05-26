export const controls = [
  { type: 'slider', param: 'linearRatio', min: 0.1, max: 0.9, step: 0.1, default: 0.7 },
  { type: 'slider', param: 'duration', min: 0.5, max: 2, step: 0.1, default: 1.5 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '70px', height: '70px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
    boxShadow: '0 8px 24px rgba(167, 139, 250, 0.4)',
    border: '2px solid #c4b5fd',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.65rem', willChange: 'transform'
  });
  box.textContent = 'SLOWMO';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '5%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.to(box, { x: 280, duration: params.duration, ease: 'power1.inOut', repeat: -1, yoyo: true });
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div>`,
    css: `.caja { width: 70px; height: 70px; background: #a78bfa; border-radius: 12px; }`,
    js: `// SlowMo — empieza LENTÍSIMO, luego acelera
gsap.to(".caja", { 
  x: 200, 
  duration: ${params.duration}, 
  ease: "slowMo(linearRatio: ${params.linearRatio})"
});`
  };
}

export const docs = {
  intro: "<p><code>SlowMo</code> es casi plana al inicio (ultralentísimo), luego acelera brutalmente. Efecto cinematográfico de "cámara lenta".</p>",
  method: "<p>Parámetro <code>linearRatio</code> controla cuánto tiempo es lentísimo antes de acelerar.</p>",
  varsTable: [
    { prop: "linearRatio", valueInDemo: "0.7", what: "Duración relativa de la fase lenta", validValues: "0.1-0.9" }
  ],
  internals: {
    "Efecto": ["Combina una fase lineal lenta + una rápida para efecto de aceleración dramática."]
  },
  advanced: ["Úsalo en entradas de grandes transiciones."],
  variations: ["<code>linearRatio: 0.9</code> para más lentitud. <code>linearRatio: 0.1</code> para aceleración más rápida."],
  pitfalls: ["Demasiada lentitud se ve congelado. Balance es clave."],
  references: [
    { label: "SlowMo", url: "https://gsap.com/docs/v3/Eases#slowmo" }
  ]
};
