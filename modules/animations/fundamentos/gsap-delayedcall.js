export const controls = [
  { type: 'slider',   param: 'delay', min: 0, max: 3, step: 0.1, default: 1.5 }
];

export function render({ stage, params, gsap }) {
  const message = document.createElement('div');
  message.style.cssText = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    text-align: center; font-family: var(--font-mono); color: var(--text-2); font-size: var(--fs-sm);`;
  message.textContent = `Ejecutándose en ${params.delay}s...`;
  stage.appendChild(message);
  
  let called = false;
  gsap.delayedCall(params.delay, () => {
    called = true;
    message.textContent = '✓ Función ejecutada';
    message.style.color = 'var(--accent)';
    gsap.to(message, { scale: 1.2, duration: 0.3, ease: 'back.out' });
  });
  
  return { play: () => {}, pause: () => {}, kill: () => { message.remove(); } };
}

export function getCode(params) {
  const html = `<!-- Elemento target o simplemente ejecutar una función -->`;
  const css = `/* No necesita estilos específicos */`;
  const js = `gsap.delayedCall(${params.delay}, () => {
  console.log("¡Han pasado ${params.delay} segundos!");
  // Aquí tu código: actualizar el DOM, enviar datos, etc.
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.delayedCall()</code> ejecuta una función después de un retraso. Es un timer que entiende el contexto de GSAP (pausable, reversible, etc.).</p>",
  method: "<p>Firma: <code>gsap.delayedCall(delay, callback, params?, scope?)</code>.</p>",
  varsTable: [
    { prop: "delay", valueInDemo: "1.5", what: "Segundos de espera", validValues: "Número >= 0" },
    { prop: "callback", valueInDemo: "función", what: "Qué ejecutar", validValues: "function" },
    { prop: "params", valueInDemo: "opcional", what: "Argumentos a pasar", validValues: "array" }
  ],
  internals: {
    "Diferencia con setTimeout": [
      "<code>setTimeout</code> no sabe de GSAP. <code>delayedCall</code> sí: puedes pausar, revertir, matar.",
      "Si pausas una timeline, sus <code>delayedCall</code> también se pausan."
    ]
  },
  advanced: ["Devuelve un Tween, así que puedes guardar la referencia y llamar <code>.kill()</code> para cancelarlo."],
  variations: ["Pasa parámetros: <code>gsap.delayedCall(1, myFunc, ['arg1', 'arg2'])</code>"],
  pitfalls: ["<code>delayedCall</code> es parte de la timeline global, así que afecta al <code>Time.globalTime</code> de GSAP."],
  references: [
    { label: "gsap.delayedCall()", url: "https://gsap.com/docs/v3/GSAP/gsap.delayedCall()" }
  ]
};
