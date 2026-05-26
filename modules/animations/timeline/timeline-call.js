export const controls = [
  { type: 'toggle', param: 'showMsg', default: true, label: 'mostrar mensajes' }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '100px', height: '100px', borderRadius: '12px',
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
    border: '2px solid #818cf8',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: 'white', fontWeight: '700',
    fontSize: '0.8rem', willChange: 'transform'
  });
  box.textContent = '▶';

  const msg = document.createElement('div');
  Object.assign(msg.style, {
    marginTop: '20px', textAlign: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-sm)',
    color: 'var(--text-2)', minHeight: '30px'
  });

  stage.appendChild(box);
  stage.appendChild(msg);

  const tl = gsap.timeline({ repeat: -1 });
  tl.to(box, { rotation: 360, duration: 1 })
    .call(() => {
      if (params.showMsg) msg.textContent = '✓ Callback ejecutado!';
    })
    .to(box, { scale: 0.8, duration: 0.3 })
    .call(() => {
      if (params.showMsg) msg.textContent = 'Volviendo a normal...';
    })
    .to(box, { scale: 1, duration: 0.3 });

  return tl;
}

export function getCode(params) {
  return {
    html: `<div class="caja"></div><div class="msg"></div>`,
    css: `.caja { width: 100px; height: 100px; background: #6366f1; } .msg { margin-top: 20px; }`,
    js: `const tl = gsap.timeline();
tl.to(".caja", { rotation: 360, duration: 1 })
  .call(() => {
    console.log("Animación llegó aquí");
    document.querySelector(".msg").textContent = "¡Hola desde callback!";
  })
  .to(".caja", { scale: 0.8, duration: 0.3 });`
  };
}

export const docs = {
  intro: "<p><code>.call(función)</code> ejecuta código en un punto específico de la timeline. Perfecto para sincronizar lógica con animación.</p>",
  method: "<p>La función se ejecuta de forma síncrona en ese frame. Es útil para actualizar UI, reproducir sonido, disparar eventos.</p>",
  varsTable: [
    { prop: ".call()", valueInDemo: "función", what: "Qué ejecutar", validValues: "cualquier función" },
    { prop: "parámetros", valueInDemo: "opcionales", what: "Pasar argumentos", validValues: "array como 3er arg" }
  ],
  internals: {
    "Timing": ["Se ejecuta exactamente en ese frame. Es "síncrono" con la animación."]
  },
  advanced: ["Encadena múltiples calls para crear narrativas complejas."],
  variations: [".call(() => {}, null, [arg1, arg2]) — pasar argumentos."],
  pitfalls: ["Si la función es lenta, ralentiza el frame. Mantén callbacks ligeros."],
  references: [
    { label: "call()", url: "https://gsap.com/docs/v3/GSAP/Timeline/call()" }
  ]
};
