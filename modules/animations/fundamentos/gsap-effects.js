export const controls = [
  { type: 'slider', param: 'intensity', min: 0.5, max: 2, step: 0.1, default: 1 },
  { type: 'dropdown', param: 'effectType', options: ['pulse', 'wobble', 'bounce'], default: 'pulse' }
];

export function render({ stage, params, gsap }) {
  gsap.registerEffect({
    name: 'pulse',
    effect: (targets, config) => {
      return gsap.timeline().to(targets, { scale: 1.2 * config.intensity, duration: 0.3 }, 0)
        .to(targets, { scale: 1, duration: 0.3 });
    },
    defaults: { intensity: 1 }
  });
  
  gsap.registerEffect({
    name: 'wobble',
    effect: (targets, config) => {
      return gsap.timeline()
        .to(targets, { rotation: -5, duration: 0.1 }, 0)
        .to(targets, { rotation: 5, duration: 0.1 })
        .to(targets, { rotation: 0, duration: 0.1 });
    },
    defaults: {}
  });
  
  gsap.registerEffect({
    name: 'bounce',
    effect: (targets, config) => {
      return gsap.to(targets, { y: -30, duration: 0.5, ease: 'bounce.out' });
    },
    defaults: {}
  });
  
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '90px', height: '90px', borderRadius: '16px',
    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    boxShadow: '0 8px 24px rgba(6, 182, 212, 0.4)',
    border: '2px solid #22d3ee',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.75rem', willChange: 'transform'
  });
  box.textContent = 'FX';
  
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  
  return gsap.effects[params.effectType](box, { intensity: params.intensity });
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 90px; height: 90px; background: #06b6d4; border-radius: 16px; }`;
  const js = `gsap.registerEffect({
  name: 'pulse',
  effect: (targets, config) => {
    return gsap.timeline()
      .to(targets, { scale: 1.2 * config.intensity, duration: 0.3 }, 0)
      .to(targets, { scale: 1, duration: 0.3 });
  },
  defaults: { intensity: 1 }
});

gsap.effects.pulse(".caja", { intensity: ${params.intensity} });`;
  return { html, css, js };
}

export const docs = {
  intro: "<p>Los <code>effects</code> (efectos) permiten registrar animaciones reutilizables con config. Úsalos para patrones que repites: pulse, flip, bounce, etc.</p>",
  method: "<p>Firma: <code>gsap.registerEffect({ name, effect, defaults })</code>. Luego llamas <code>gsap.effects.nombreDelEfecto(target, config)</code>.</p>",
  varsTable: [
    { prop: "name", valueInDemo: "pulse", what: "Nombre del efecto", validValues: "string" },
    { prop: "effect", valueInDemo: "función", what: "La animación (devuelve timeline)", validValues: "function" },
    { prop: "defaults", valueInDemo: "{ intensity: 1 }", what: "Config por defecto", validValues: "object" }
  ],
  internals: {
    "Ventajas": ["Reutilizabilidad. Sin repetir código. Fácil mantenimiento."]
  },
  advanced: ["Los effects devuelven un tween/timeline, así que puedes encadenarlos."],
  variations: ["Registra bibliotecas de efectos propias de tu proyecto."],
  pitfalls: ["Registra los effects al inicio, no dentro de componentes que se renderizen múltiples veces."],
  references: [
    { label: "gsap.registerEffect()", url: "https://gsap.com/docs/v3/GSAP/gsap.registerEffect()" }
  ]
};
