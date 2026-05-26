export const controls = [
  { type: 'slider', param: 'killDelay', min: 0, max: 3, step: 0.1, default: 1.2 }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '90px', height: '90px', borderRadius: '16px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
    border: '2px solid #60a5fa',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.85rem', willChange: 'transform'
  });
  box.textContent = 'LOOP';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  const tween = gsap.to(box, { x: 200, y: -100, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  
  gsap.delayedCall(params.killDelay, () => {
    gsap.killTweensOf(box);
    box.style.background = '#ef4444';
    box.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.4)';
  });
  
  return tween;
}

export function getCode(params) {
  const html = `<div class="box-animada"></div>`;
  const css = `.box-animada { width: 90px; height: 90px; background: #3b82f6; border-radius: 16px; }`;
  const js = `const tween = gsap.to(".box-animada", { x: 200, repeat: -1, duration: 2 });

gsap.delayedCall(${params.killDelay}, () => {
  gsap.killTweensOf(".box-animada");  // Detiene todas las animaciones
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.killTweensOf()</code> detiene todas las animaciones de un elemento (o lista de elementos). Es útil para cleanup o cuando algo cambia de contexto.</p>",
  method: "<p>Firma: <code>gsap.killTweensOf(target, properties?, onlyActive?)</code>.</p>",
  varsTable: [
    { prop: "target", valueInDemo: ".box", what: "Qué animar detener", validValues: "selector, elemento, array" },
    { prop: "properties", valueInDemo: "opcional", what: "Sólo matar propiedades específicas", validValues: "string o array" },
    { prop: "onlyActive", valueInDemo: "false", what: "Sólo queued, no en progreso", validValues: "boolean" }
  ],
  internals: {
    "Variantes": [
      "<code>gsap.killTweensOf(\".elemento\")</code> — mata todos",
      "<code>gsap.killTweensOf(\".elemento\", \"x,y\")</code> — mata sólo x e y",
      "<code>gsap.killTweensOf(\".elemento\", true)</code> — mata sólo queued"
    ]
  },
  advanced: ["Si quieres matar todo GSAP en la página, usa <code>gsap.globalTimeline.clear()</code>"],
  variations: ["En un cleanup de componente React: mata tweens para evitar memory leaks."],
  pitfalls: ["Si olvidas matar tweens cuando unmounteas un componente, pueden ejecutar código en elementos que ya no existen."],
  references: [
    { label: "gsap.killTweensOf()", url: "https://gsap.com/docs/v3/GSAP/gsap.killTweensOf()" }
  ]
};
