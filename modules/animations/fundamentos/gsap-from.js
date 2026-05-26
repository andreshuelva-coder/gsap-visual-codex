export const controls = [
  { type: 'slider',   param: 'duration', min: 0.1, max: 3,    step: 0.05, default: 1 },
  { type: 'dropdown', param: 'ease',
    options: ['power1.out','power2.out','elastic.out(1,0.3)','back.out(1.7)','bounce.out','none'],
    default: 'power2.out' },
  { type: 'slider',   param: 'x',        min: -300, max: 300, step: 5,    default: -200 },
  { type: 'slider',   param: 'y',        min: -200, max: 200, step: 5,    default: 0 },
  { type: 'toggle',   param: 'yoyo',     default: false }
];

export function render({ stage, params, gsap }) {
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '90px', height: '90px', borderRadius: '16px',
    background: 'linear-gradient(135deg, #ff5e7a, #f87171)',
    boxShadow: '0 8px 24px rgba(255, 94, 122, 0.4)',
    border: '2px solid #ff8fa3',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', color: '#0a1400', fontWeight: '700',
    fontSize: '0.85rem', letterSpacing: '0.05em', willChange: 'transform'
  });
  box.textContent = 'FROM';
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, { width: '100%', display: 'flex', justifyContent: 'center', paddingRight: '8%' });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);
  return gsap.from(box, { x: params.x, y: params.y, duration: params.duration, ease: params.ease, yoyo: params.yoyo });
}

export function getCode(params) {
  const html = `<div class="caja">FROM</div>`;
  const css = `.caja { width: 90px; height: 90px; border-radius: 16px; background: linear-gradient(135deg, #ff5e7a, #f87171);
  box-shadow: 0 8px 24px rgba(255, 94, 122, 0.4); border: 2px solid #ff8fa3; display: grid; place-items: center;
  font-family: 'JetBrains Mono', monospace; color: #0a1400; font-weight: 700; }`;
  const lines = [`  x: ${params.x}`, `  y: ${params.y}`, `  duration: ${params.duration}`, `  ease: "${params.ease}"`];
  if (params.yoyo) lines.push(`  yoyo: true`);
  const js = `gsap.from(".caja", {\n${lines.join(',\n')}\n});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p><code>gsap.from()</code> es el opuesto de <code>gsap.to()</code>. <strong>Define el punto de partida</strong> de la animación, no el final. El elemento empieza en los valores que indicas y anima hacia su <strong>estado natural (el CSS actual)</strong>.</p><p>Úsalo para efectos de <strong>aparición</strong>: hacer que algo sea invisible (x: -500) y luego entre deslizándose hasta su posición real.</p>",
  method: "<p>Firma: <code>gsap.from(target, vars)</code>. Igual que <code>gsap.to()</code>, pero invierte la lógica: los valores de <code>vars</code> son el <strong>inicio</strong>, no el destino.</p>",
  varsTable: [
    { prop: "x", valueInDemo: "-200", what: "Punto de partida (píxeles a la izquierda)", validValues: "Número" },
    { prop: "y", valueInDemo: "0", what: "Punto de partida vertical", validValues: "Número" },
    { prop: "duration", valueInDemo: "1", what: "Duración", validValues: "Número > 0" },
    { prop: "ease", valueInDemo: "power2.out", what: "Curva", validValues: "Ver Easing" }
  ],
  internals: {
    "Diferencia from vs to": [
      "<code>gsap.to(\".caja\", { x: 200 })</code> — la caja va HACIA x:200",
      "<code>gsap.from(\".caja\", { x: 200 })</code> — la caja EMPIEZA en x:200 y va hacia 0 (su CSS actual)"
    ]
  },
  advanced: [
    "Combina <code>gsap.from()</code> con <code>stagger</code> para animar listas apareciendo en cascada.",
    "Usa con <code>immediateRender: false</code> si quieres que el CSS inicial se vea antes de que empiece la animación."
  ],
  variations: [
    "Cambia <code>x: -200</code> a <code>x: -500</code> y <code>y: -300</code> para entrada diagonal.",
    "Añade <code>repeat: -1, yoyo: true</code> para un efecto de 'breathing'.",
    "Combina con <code>autoAlpha: 0</code> para aparición con fade."
  ],
  pitfalls: [
    "Si ves que el elemento <strong>aparece instantáneamente en su posición inicial</strong> antes de animar, configura <code>immediateRender: false</code>.",
    "Recuerda: los valores van al <strong>inicio</strong>, no al final. Si quieres entrada por arriba, usa <code>y: -500</code>, no <code>y: 500</code>."
  ],
  references: [
    { label: "Documentación gsap.from()", url: "https://gsap.com/docs/v3/GSAP/gsap.from()" },
    { label: "Comparación to vs from", url: "https://gsap.com/docs/v3/GSAP/Differences" }
  ]
};
