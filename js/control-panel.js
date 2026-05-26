/**
 * control-panel.js
 * ────────────────────────────────────────────────────────────────────
 * Motor genérico del panel de control. Lee un array de descriptores
 * (provistos por cada animación o por animations.json) y construye
 * sliders, dropdowns y toggles. Cuando cualquier control cambia,
 * emite un evento personalizado con los valores actuales.
 *
 * Tipos de control soportados:
 *   { type: 'slider',    param, min, max, step, default, label?, hint? }
 *   { type: 'dropdown',  param, options: [v | {value, label}], default, label? }
 *   { type: 'toggle',    param, default, label? }
 *   { type: 'number',    param, min, max, step, default, label? }
 *   { type: 'color',     param, default, label? }
 *   { type: 'segmented', param, options: [...], default, label? }
 *
 * Eventos emitidos sobre el <form>:
 *   'paramchange'  detail: { params, changed: paramName }
 * ──────────────────────────────────────────────────────────────────── */

/** Etiquetas humanas por parámetro (las legibles). Si no está, usa el id. */
const HUMAN_LABELS = {
  duration:   'duración',
  delay:      'retraso',
  ease:       'easing',
  repeat:     'repeticiones',
  repeatDelay:'pausa entre repeticiones',
  yoyo:       'yoyo (ida y vuelta)',
  stagger:    'stagger (desfase)',
  staggerFrom:'origen del stagger',
  x:          'posición X',
  y:          'posición Y',
  scale:      'escala',
  rotation:   'rotación',
  opacity:    'opacidad',
  transformOrigin: 'origen de transformación',
  scrub:      'scrub (atar al scroll)',
  pin:        'pin (fijar al scroll)',
  markers:    'mostrar markers',
  start:      'punto de inicio',
  end:        'punto final'
};

const formatNumber = (n, step) => {
  const decimals = step && step.toString().includes('.') ? step.toString().split('.')[1].length : 0;
  return Number(n).toFixed(decimals);
};

function renderControl(ctrl) {
  const id = `ctrl-${ctrl.param}`;
  const label = ctrl.label || HUMAN_LABELS[ctrl.param] || ctrl.param;
  const wrap = document.createElement('div');
  wrap.className = 'ctrl';
  wrap.dataset.param = ctrl.param;

  switch (ctrl.type) {

    case 'slider': {
      const labelRow = document.createElement('div');
      labelRow.className = 'ctrl-label-row';
      labelRow.innerHTML = `
        <label class="ctrl-label" for="${id}">${label}</label>
        <output class="ctrl-value" id="${id}-out">${formatNumber(ctrl.default, ctrl.step)}</output>
      `;
      const input = document.createElement('input');
      input.type = 'range';
      input.id = id;
      input.className = 'ctrl-slider';
      input.min = ctrl.min;
      input.max = ctrl.max;
      input.step = ctrl.step;
      input.value = ctrl.default;
      input.setAttribute('aria-label', label);
      // Pintamos el track
      const updateFill = () => {
        const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
        input.style.setProperty('--fill', pct + '%');
      };
      updateFill();
      input.addEventListener('input', () => {
        const out = wrap.querySelector('output');
        if (out) out.textContent = formatNumber(input.value, ctrl.step);
        updateFill();
      });
      wrap.appendChild(labelRow);
      wrap.appendChild(input);
      if (ctrl.hint) {
        const h = document.createElement('span');
        h.className = 'ctrl-hint';
        h.textContent = ctrl.hint;
        wrap.appendChild(h);
      }
      return wrap;
    }

    case 'dropdown': {
      const labelRow = document.createElement('label');
      labelRow.className = 'ctrl-label';
      labelRow.setAttribute('for', id);
      labelRow.textContent = label;
      const select = document.createElement('select');
      select.id = id;
      select.className = 'ctrl-select';
      select.setAttribute('aria-label', label);
      ctrl.options.forEach(opt => {
        const o = document.createElement('option');
        if (typeof opt === 'string' || typeof opt === 'number') {
          o.value = opt; o.textContent = opt;
        } else {
          o.value = opt.value; o.textContent = opt.label || opt.value;
        }
        select.appendChild(o);
      });
      select.value = ctrl.default;
      wrap.appendChild(labelRow);
      wrap.appendChild(select);
      return wrap;
    }

    case 'toggle': {
      const lab = document.createElement('label');
      lab.className = 'ctrl-toggle';
      lab.innerHTML = `
        <input type="checkbox" id="${id}" ${ctrl.default ? 'checked' : ''} aria-label="${label}">
        <span class="toggle-track"><span class="toggle-thumb"></span></span>
        <span class="toggle-label">${label}</span>
      `;
      wrap.appendChild(lab);
      return wrap;
    }

    case 'number': {
      const labelRow = document.createElement('label');
      labelRow.className = 'ctrl-label';
      labelRow.setAttribute('for', id);
      labelRow.textContent = label;
      const input = document.createElement('input');
      input.type = 'number';
      input.id = id;
      input.className = 'ctrl-number';
      if (ctrl.min !== undefined) input.min = ctrl.min;
      if (ctrl.max !== undefined) input.max = ctrl.max;
      if (ctrl.step !== undefined) input.step = ctrl.step;
      input.value = ctrl.default;
      wrap.appendChild(labelRow);
      wrap.appendChild(input);
      return wrap;
    }

    case 'color': {
      const labelRow = document.createElement('label');
      labelRow.className = 'ctrl-label';
      labelRow.setAttribute('for', id);
      labelRow.textContent = label;
      const row = document.createElement('div');
      row.className = 'ctrl-color';
      row.innerHTML = `
        <input type="color" id="${id}" value="${ctrl.default}" aria-label="${label}">
        <code class="ctrl-color-value">${ctrl.default}</code>
      `;
      wrap.appendChild(labelRow);
      wrap.appendChild(row);
      row.querySelector('input').addEventListener('input', e => {
        row.querySelector('code').textContent = e.target.value;
      });
      return wrap;
    }

    case 'segmented': {
      const labelRow = document.createElement('div');
      labelRow.className = 'ctrl-label';
      labelRow.textContent = label;
      const group = document.createElement('div');
      group.className = 'ctrl-segmented';
      group.setAttribute('role', 'radiogroup');
      group.setAttribute('aria-label', label);
      group.dataset.param = ctrl.param;
      ctrl.options.forEach(opt => {
        const value = typeof opt === 'object' ? opt.value : opt;
        const labelText = typeof opt === 'object' ? (opt.label || opt.value) : opt;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = labelText;
        btn.dataset.value = value;
        btn.setAttribute('aria-pressed', value === ctrl.default ? 'true' : 'false');
        btn.addEventListener('click', () => {
          group.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');
          group.dispatchEvent(new Event('change', { bubbles: true }));
        });
        group.appendChild(btn);
      });
      wrap.appendChild(labelRow);
      wrap.appendChild(group);
      return wrap;
    }

    default:
      console.warn('[control-panel] Tipo desconocido:', ctrl.type);
      return wrap;
  }
}

function readValues(form, controls) {
  const out = {};
  controls.forEach(ctrl => {
    const wrap = form.querySelector(`[data-param="${ctrl.param}"]`);
    if (!wrap) return;
    switch (ctrl.type) {
      case 'slider':
      case 'number':
        out[ctrl.param] = Number(wrap.querySelector('input').value);
        break;
      case 'dropdown':
        out[ctrl.param] = wrap.querySelector('select').value;
        break;
      case 'toggle':
        out[ctrl.param] = wrap.querySelector('input').checked;
        break;
      case 'color':
        out[ctrl.param] = wrap.querySelector('input[type="color"]').value;
        break;
      case 'segmented': {
        const active = wrap.querySelector('button[aria-pressed="true"]');
        out[ctrl.param] = active ? active.dataset.value : ctrl.default;
        break;
      }
    }
  });
  return out;
}

/**
 * Construye el panel completo dentro de `form`.
 * Devuelve un controlador con: { getValues(), setValues(obj), reset(), randomize() }.
 */
export function buildPanel(form, controls, onChange) {
  form.innerHTML = '';
  form.className = 'control-panel-form';

  if (!controls || !controls.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-controls';
    empty.textContent = 'Esta animación no expone parámetros configurables. Mira el código y juégate los valores tú mismo.';
    form.appendChild(empty);
    return { getValues: () => ({}), setValues: () => {}, reset: () => {}, randomize: () => {} };
  }

  controls.forEach(c => form.appendChild(renderControl(c)));

  // Emite cambio cuando cualquier control cambia
  const emit = (changed) => {
    const params = readValues(form, controls);
    form.dispatchEvent(new CustomEvent('paramchange', { detail: { params, changed }, bubbles: true }));
    if (onChange) onChange(params, changed);
  };
  form.addEventListener('input', e => emit(e.target.closest('[data-param]')?.dataset.param));
  form.addEventListener('change', e => emit(e.target.closest('[data-param]')?.dataset.param));

  function setValues(values) {
    controls.forEach(ctrl => {
      if (!(ctrl.param in values)) return;
      const wrap = form.querySelector(`[data-param="${ctrl.param}"]`);
      if (!wrap) return;
      const v = values[ctrl.param];
      switch (ctrl.type) {
        case 'slider': {
          const inp = wrap.querySelector('input');
          inp.value = v;
          inp.dispatchEvent(new Event('input', { bubbles: true }));
          break;
        }
        case 'number':   wrap.querySelector('input').value = v; break;
        case 'dropdown': wrap.querySelector('select').value = v; break;
        case 'toggle':   wrap.querySelector('input').checked = !!v; break;
        case 'color':    {
          wrap.querySelector('input[type="color"]').value = v;
          wrap.querySelector('code').textContent = v;
          break;
        }
        case 'segmented': {
          wrap.querySelectorAll('button').forEach(b => {
            b.setAttribute('aria-pressed', b.dataset.value === String(v) ? 'true' : 'false');
          });
          break;
        }
      }
    });
    emit(null);
  }

  function reset() {
    const defaults = Object.fromEntries(controls.map(c => [c.param, c.default]));
    setValues(defaults);
  }

  function randomize() {
    const out = {};
    controls.forEach(ctrl => {
      switch (ctrl.type) {
        case 'slider':
        case 'number': {
          const r = ctrl.min + Math.random() * (ctrl.max - ctrl.min);
          const stepped = ctrl.step ? Math.round(r / ctrl.step) * ctrl.step : r;
          out[ctrl.param] = Number(stepped.toFixed(3));
          break;
        }
        case 'dropdown': {
          const opt = ctrl.options[Math.floor(Math.random() * ctrl.options.length)];
          out[ctrl.param] = typeof opt === 'object' ? opt.value : opt;
          break;
        }
        case 'toggle': out[ctrl.param] = Math.random() > 0.5; break;
        case 'color':  out[ctrl.param] = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0'); break;
        case 'segmented': {
          const opt = ctrl.options[Math.floor(Math.random() * ctrl.options.length)];
          out[ctrl.param] = typeof opt === 'object' ? opt.value : opt;
          break;
        }
      }
    });
    setValues(out);
  }

  // Devolvemos los valores iniciales también
  return {
    getValues: () => readValues(form, controls),
    setValues, reset, randomize
  };
}
