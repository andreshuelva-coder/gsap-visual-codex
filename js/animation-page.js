/**
 * animation-page.js — versión corregida
 */

async function init() {
  // Esperar a que GSAP esté disponible
  let attempts = 0;
  while (!window.gsap && attempts < 50) {
    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }
  
  if (!window.gsap) {
    console.error('GSAP no cargó');
    return;
  }

  const body = document.body;
  const animId = body.dataset.animationId;
  const category = body.dataset.category;

  if (!animId || !category) return;

  // Rellenar cabecera
  const titleEl = document.getElementById('animation-title');
  const subEl = document.querySelector('.subtitle');
  const humanTitle = animId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  if (titleEl) titleEl.textContent = humanTitle;
  if (subEl) subEl.textContent = animId;

  // Cargar módulo
  let mod;
  try {
    mod = await import(`/modules/animations/${category}/${animId}.js`);
  } catch(e) {
    console.error('No se pudo cargar el módulo:', animId, e);
    const stage = document.getElementById('demo-stage');
    if (stage) stage.innerHTML = `<p style="color:red;padding:2rem">Error cargando módulo: ${e.message}</p>`;
    return;
  }

  const { controls = [], render, getCode, docs } = mod;

  // Stage
  const stage = document.getElementById('demo-stage');
  if (!stage) return;

  // Params desde controles
  const params = {};
  controls.forEach(c => { params[c.param] = c.default ?? 0; });

  // Panel de control
  const panelEl = document.getElementById('control-panel');
  if (panelEl && controls.length > 0) {
    panelEl.innerHTML = '';
    controls.forEach(ctrl => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:1rem;margin-bottom:0.75rem;';
      
      const label = document.createElement('label');
      label.textContent = ctrl.label || ctrl.param;
      label.style.cssText = 'min-width:100px;font-size:0.85rem;color:var(--text-2,#888);';
      row.appendChild(label);

      if (ctrl.type === 'slider') {
        const input = document.createElement('input');
        input.type = 'range';
        input.min = ctrl.min;
        input.max = ctrl.max;
        input.step = ctrl.step;
        input.value = ctrl.default;
        
        const valSpan = document.createElement('span');
        valSpan.textContent = ctrl.default;
        valSpan.style.cssText = 'min-width:40px;font-family:monospace;font-size:0.85rem;';
        
        input.addEventListener('input', () => {
          params[ctrl.param] = parseFloat(input.value);
          valSpan.textContent = input.value;
          runRender();
          updateCode();
        });
        
        row.appendChild(input);
        row.appendChild(valSpan);

      } else if (ctrl.type === 'dropdown') {
        const select = document.createElement('select');
        select.style.cssText = 'padding:0.25rem 0.5rem;background:var(--bg-2,#1a1d20);color:var(--text-1,#e4e8ec);border:1px solid var(--border-1,#333);border-radius:4px;';
        (ctrl.options || []).forEach(opt => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          if (opt === ctrl.default) option.selected = true;
          select.appendChild(option);
        });
        select.addEventListener('change', () => {
          params[ctrl.param] = select.value;
          runRender();
          updateCode();
        });
        row.appendChild(select);

      } else if (ctrl.type === 'toggle') {
        const btn = document.createElement('button');
        btn.textContent = ctrl.default ? 'ON' : 'OFF';
        btn.style.cssText = 'padding:0.25rem 1rem;border-radius:4px;border:1px solid var(--border-1,#333);background:var(--bg-2,#1a1d20);color:var(--accent,#88ce02);cursor:pointer;';
        btn.addEventListener('click', () => {
          params[ctrl.param] = !params[ctrl.param];
          btn.textContent = params[ctrl.param] ? 'ON' : 'OFF';
          runRender();
          updateCode();
        });
        row.appendChild(btn);
      }

      panelEl.appendChild(row);
    });
  }

  // Animación actual
  let currentAnim = null;

  function runRender() {
    stage.innerHTML = '';
    if (currentAnim?.kill) currentAnim.kill();
    gsap.killTweensOf('*');
    try {
      currentAnim = render({ stage, params, gsap: window.gsap });
    } catch(e) {
      console.error('Error en render:', e);
      stage.innerHTML = `<p style="color:red;padding:1rem">Error: ${e.message}</p>`;
    }
  }

  function updateCode() {
    if (!getCode) return;
    try {
      const code = getCode(params);
      const codeEl = document.getElementById('code-display');
      if (codeEl && code.js) {
        codeEl.textContent = code.js;
        if (window.hljs) hljs.highlightElement(codeEl);
      }
    } catch(e) { console.warn('updateCode error:', e); }
  }

  // Botones
  document.getElementById('btn-play')?.addEventListener('click', () => currentAnim?.play?.());
  document.getElementById('btn-pause')?.addEventListener('click', () => currentAnim?.pause?.());
  document.getElementById('btn-restart')?.addEventListener('click', runRender);

  // Copiar código
  document.getElementById('btn-copy-code')?.addEventListener('click', () => {
    const code = getCode?.(params);
    if (code?.js) {
      navigator.clipboard.writeText(code.js);
    }
  });

  // Render inicial
  runRender();
  updateCode();
}

document.addEventListener('DOMContentLoaded', init);
