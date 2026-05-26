/**
 * ease-explorer.js
 * 
 * Explorador interactivo de TODAS las eases de GSAP.
 * Dropdown para elegir, animación en vivo, y gráfico SVG de la curva.
 */

const ALL_EASES = [
  'power1.out', 'power1.inOut', 'power1.in',
  'power2.out', 'power2.inOut', 'power2.in',
  'power3.out', 'power3.inOut', 'power3.in',
  'power4.out', 'power4.inOut', 'power4.in',
  'sine.out', 'sine.inOut', 'sine.in',
  'cubic.out', 'cubic.inOut', 'cubic.in',
  'circ.out', 'circ.inOut', 'circ.in',
  'expo.out', 'expo.inOut', 'expo.in',
  'back.out', 'back.inOut',
  'elastic.out',
  'bounce.out'
];

export const controls = [
  { type: 'dropdown', param: 'ease', options: ALL_EASES, default: 'power2.out' },
  { type: 'slider', param: 'duration', min: 0.5, max: 3, step: 0.1, default: 1.5 }
];

export function render({ stage, params, gsap }) {
  // Contenedor principal
  const main = document.createElement('div');
  main.style.cssText = 'width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;';

  // Lado izquierdo: caja animada
  const demo = document.createElement('div');
  demo.style.cssText = 'display: flex; justify-content: flex-start; align-items: center; position: relative; height: 120px; background: var(--bg-3); border-radius: var(--radius-md); padding: 1rem; border: 1px solid var(--border-1);';
  
  const box = document.createElement('div');
  Object.assign(box.style, {
    width: '60px', height: '60px', borderRadius: '10px',
    background: 'var(--accent)', color: 'var(--accent-ink)',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '0.65rem',
    willChange: 'transform'
  });
  box.textContent = '▶';
  demo.appendChild(box);

  // Lado derecho: gráfico de la curva
  const graph = document.createElement('svg');
  graph.setAttribute('viewBox', '0 0 200 100');
  graph.setAttribute('style', 'width: 100%; height: 100px; background: var(--bg-3); border-radius: var(--radius-md); border: 1px solid var(--border-1);');
  
  main.appendChild(demo);
  main.appendChild(graph);
  stage.appendChild(main);

  // Función para actualizar
  let tween = null;
  const update = () => {
    if (tween) tween.kill();
    
    // Animar caja
    tween = gsap.to(box, {
      x: '420px',
      duration: params.duration,
      ease: params.ease,
      repeat: -1,
      yoyo: true
    });

    // Dibujar curva
    drawEaseCurve(graph, params.ease);
  };

  update();
  
  // Retornar controles
  return {
    play: () => tween?.play?.(),
    pause: () => tween?.pause?.(),
    kill: () => { tween?.kill?.(); graph.innerHTML = ''; }
  };
}

/**
 * Dibuja una curva de ease en el SVG usando sample points.
 */
function drawEaseCurve(svg, easeName) {
  svg.innerHTML = '';
  const ease = gsap.parseEase(easeName);
  
  // Grid
  const gridG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  for (let i = 0; i <= 4; i++) {
    const x = (i * 50);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', x);
    line.setAttribute('y2', 100);
    line.setAttribute('stroke', 'var(--border-2)');
    line.setAttribute('stroke-width', '0.5');
    gridG.appendChild(line);
  }
  svg.appendChild(gridG);

  // Axes
  const axisG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  xAxis.setAttribute('x1', 0); xAxis.setAttribute('y1', 100);
  xAxis.setAttribute('x2', 200); xAxis.setAttribute('y2', 100);
  xAxis.setAttribute('stroke', 'var(--text-3)'); xAxis.setAttribute('stroke-width', '1');
  axisG.appendChild(xAxis);

  const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  yAxis.setAttribute('x1', 0); yAxis.setAttribute('y1', 0);
  yAxis.setAttribute('x2', 0); yAxis.setAttribute('y2', 100);
  yAxis.setAttribute('stroke', 'var(--text-3)'); yAxis.setAttribute('stroke-width', '1');
  axisG.appendChild(yAxis);
  svg.appendChild(axisG);

  // Curva
  const pathD = [];
  for (let t = 0; t <= 1; t += 0.02) {
    const progress = ease(t);
    const x = t * 200;
    const y = 100 - (progress * 100);
    pathD.push(`${t === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD.join(' '));
  path.setAttribute('stroke', 'var(--accent)');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('fill', 'none');
  svg.appendChild(path);

  // Label en la esquina
  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', 5); label.setAttribute('y', 15);
  label.setAttribute('font-family', 'var(--font-mono)');
  label.setAttribute('font-size', '10');
  label.setAttribute('fill', 'var(--accent)');
  label.textContent = easeName;
  svg.appendChild(label);
}

export function getCode(params) {
  const html = `<div class="caja"></div>`;
  const css = `.caja { width: 60px; height: 60px; background: var(--accent); border-radius: 10px; }`;
  const js = `gsap.to(".caja", {
  x: 400,
  duration: ${params.duration},
  ease: "${params.ease}",
  repeat: -1,
  yoyo: true
});`;
  return { html, css, js };
}

export const docs = {
  intro: "<p>El <strong>ease explorer</strong> es tu herramienta de aprendizaje. Elige cualquier ease de GSAP, ve cómo se anima la caja, y observa la curva dibujada en tiempo real.</p><p>Las curvas planas significa lentitud. Las curvas empinadas significa rapidez. Una curva convexa es aceleración; cóncava es desaceleración.</p>",
  method: "<p>Todos las eases en GSAP siguen el patrón <code>familia.variante</code>: <code>power2.out</code>, <code>back.in</code>, <code>elastic.out</code>, etc.</p>",
  varsTable: [
    { prop: "familia", valueInDemo: "power, sine, back, elastic, bounce, ...", what: "El tipo de curva", validValues: "15+ familias" },
    { prop: "variante", valueInDemo: ".out, .in, .inOut", what: "Dónde se aplica", validValues: ".out (final), .in (inicio), .inOut (ambos)" },
    { prop: "parámetros", valueInDemo: "back.out(1.7)", what: "Algunos aceptan valores", validValues: "back(intensity), elastic(amp, period)" }
  ],
  internals: {
    "Cómo leer la curva": [
      "<strong>Eje X (tiempo)</strong>: 0 (inicio) a 1 (final).",
      "<strong>Eje Y (progreso)</strong>: 0 (valor inicial) a 1 (valor final).",
      "<strong>Recta diagonal</strong> = movimiento lineal (uniforme).",
      "<strong>Curva empinada al final</strong> = acceleración (.out).",
      "<strong>Curva suave al inicio</strong> = desaceleración (.in)."
    ]
  },
  advanced: ["Crea tu propia ease con <code>gsap.registerEase()</code> o usa <code>CustomEase</code> para bezier personalizados."],
  variations: ["Prueba back.out(3) para un overshoot enorme. Prueba elastic.out(0.3, 0.3) para oscilaciones rápidas."],
  pitfalls: ["Las eases complejas (elastic, bounce) pueden sentirse baratas si duration es muy corta (<0.5s)."],
  references: [
    { label: "Todos los eases visuales", url: "https://gsap.com/docs/v3/Eases" },
    { label: "Ease visualizer oficial", url: "https://gsap.com/easing-visualizer" }
  ]
};
