export const controls = [
  { type: 'dropdown', param: 'pattern', options: ['onda-rápida', 'respiración', 'rebote', 'lineal'], default: 'onda-rápida' }
];

export function render({ stage, params, gsap }) {
  const container = document.createElement('div');
  Object.assign(container.style, { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' });
  
  const boxes = [];
  for (let i = 0; i < 8; i++) {
    const box = document.createElement('div');
    Object.assign(box.style, {
      width: '50px', height: '50px', borderRadius: '8px',
      background: `hsl(${i * 45}, 70%, 50%)`, display: 'grid', placeItems: 'center',
      color: 'white', fontWeight: '700', willChange: 'transform'
    });
    box.textContent = i + 1;
    container.appendChild(box);
    boxes.push(box);
  }
  stage.appendChild(container);

  let config = {};
  if (params.pattern === 'onda-rápida') {
    config = { y: -100, duration: 0.4, stagger: 0.05, repeat: -1, yoyo: true, ease: 'power2.inOut' };
  } else if (params.pattern === 'respiración') {
    config = { scale: 1.2, duration: 1, stagger: 0.15, repeat: -1, yoyo: true, ease: 'sine.inOut' };
  } else if (params.pattern === 'rebote') {
    config = { y: -100, duration: 0.6, stagger: 0.1, repeat: -1, yoyo: true, ease: 'bounce.out' };
  } else {
    config = { x: 150, duration: 0.6, stagger: 0.08, repeat: -1, yoyo: true, ease: 'power1.inOut' };
  }

  return gsap.to(boxes, config);
}

export function getCode(params) {
  let code = '';
  if (params.pattern === 'onda-rápida') {
    code = `// Onda rápida
gsap.to(".boxes div", {
  y: -100,
  duration: 0.4,
  stagger: 0.05,
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut"
});`;
  } else if (params.pattern === 'respiración') {
    code = `// Efecto respiración
gsap.to(".boxes div", {
  scale: 1.2,
  duration: 1,
  stagger: 0.15,
  repeat: -1,
  yoyo: true
});`;
  } else {
    code = `// Patrón lineal
gsap.to(".boxes div", {
  x: 150,
  duration: 0.6,
  stagger: 0.08,
  repeat: -1,
  yoyo: true
});`;
  }
  return { html: `<div class="boxes">...</div>`, css: `.boxes { display: flex; gap: 10px; }`, js: code };
}

export const docs = {
  intro: "<p>Combinaciones probadas de stagger que funcionan bien. Úsalas como puntos de partida para tus propios patrones.</p>",
  method: "<p>Copia-pega y personaliza.</p>",
  varsTable: [],
  internals: {},
  advanced: ["Mezcla y empareja parámetros para crear nuevos efectos."],
  variations: ["Experimenta variando ease y amounts."],
  pitfalls: ["Lo que funciona en un contexto puede no funcionar en otro — siempre testea."],
  references: [
    { label: "stagger patterns", url: "https://gsap.com/docs/v3/GSAP/Tween/stagger" }
  ]
};
