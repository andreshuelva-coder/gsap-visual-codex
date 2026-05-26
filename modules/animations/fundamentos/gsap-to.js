/**
 * gsap.to — animación piloto (Fase 1).
 *
 * Cada módulo de animación exporta esta misma firma:
 *   - controls? : descriptores de UI (opcional; si no, se usan los del JSON)
 *   - render({stage, params, gsap})  → devuelve la animación
 *   - getCode(params)                → { html, css, js }
 *   - docs?     : sobrescribe los docs del JSON (opcional)
 */

export const controls = [
  { type: 'slider',   param: 'duration', min: 0.1, max: 3,    step: 0.05, default: 1,   hint: 'Cuánto tarda en segundos' },
  { type: 'dropdown', param: 'ease',
    options: ['power1.out','power2.out','power3.out','power4.out','elastic.out(1,0.3)','back.out(1.7)','bounce.out','sine.inOut','expo.out','none'],
    default: 'power2.out' },
  { type: 'slider',   param: 'x',        min: -300, max: 300, step: 5,    default: 200, hint: 'Píxeles a la derecha' },
  { type: 'slider',   param: 'y',        min: -200, max: 200, step: 5,    default: 0 },
  { type: 'slider',   param: 'rotation', min: -360, max: 360, step: 5,    default: 0,   hint: 'Grados' },
  { type: 'slider',   param: 'scale',    min: 0.2,  max: 3,   step: 0.05, default: 1 },
  { type: 'slider',   param: 'repeat',   min: 0,    max: 5,   step: 1,    default: 0,   hint: '0 = una vez · -1 = infinito' },
  { type: 'toggle',   param: 'yoyo',     default: false, label: 'yoyo (vuelve al origen)' }
];

/**
 * Pinta una caja en el stage y le aplica gsap.to con los params actuales.
 * @returns el Tween (tiene .play/.pause/.kill).
 */
export function render({ stage, params, gsap }) {
  // Caja a animar
  const box = document.createElement('div');
  box.className = 'demo-box';
  Object.assign(box.style, {
    width: '90px',
    height: '90px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))',
    boxShadow: '0 8px 24px var(--accent-glow)',
    border: '2px solid var(--accent-soft)',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-ink)',
    fontWeight: '700',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    willChange: 'transform'
  });
  box.textContent = 'BOX';

  // Origen visual: caja a la izquierda
  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '8%'
  });
  wrapper.appendChild(box);
  stage.appendChild(wrapper);

  // Aplicar el tween — la línea estrella de GSAP
  const tween = gsap.to(box, {
    x: params.x,
    y: params.y,
    rotation: params.rotation,
    scale: params.scale,
    duration: params.duration,
    ease: params.ease,
    repeat: params.repeat,
    yoyo: params.yoyo
  });

  return tween;
}

/**
 * Genera el código HTML/CSS/JS exacto que se muestra en el bloque 4.
 * Debe coincidir 1:1 con lo que produce render() para los mismos params.
 */
export function getCode(params) {
  const html = `<div class="caja">BOX</div>`;

  const css = `.caja {
  width: 90px;
  height: 90px;
  border-radius: 16px;
  background: linear-gradient(135deg, #88ce02, #6ba301);
  box-shadow: 0 8px 24px rgba(136, 206, 2, 0.4);
  border: 2px solid #b8e84a;
  display: grid;
  place-items: center;
  font-family: 'JetBrains Mono', monospace;
  color: #0a1400;
  font-weight: 700;
}`;

  // Construye el vars object como texto, omitiendo defaults aburridos
  const lines = [];
  lines.push(`  x: ${params.x}`);
  if (params.y !== 0)        lines.push(`  y: ${params.y}`);
  if (params.rotation !== 0) lines.push(`  rotation: ${params.rotation}`);
  if (params.scale !== 1)    lines.push(`  scale: ${params.scale}`);
  lines.push(`  duration: ${params.duration}`);
  lines.push(`  ease: "${params.ease}"`);
  if (params.repeat) lines.push(`  repeat: ${params.repeat}`);
  if (params.yoyo)   lines.push(`  yoyo: ${params.yoyo}`);

  const js = `// Mueve la caja a su nuevo estado
gsap.to(".caja", {
${lines.join(',\n')}
});`;

  return { html, css, js };
}
