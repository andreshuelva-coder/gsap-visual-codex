# GSAP Visual Codex

> Enciclopedia visual interactiva de GSAP 3 en español.
> 236 animaciones — cada una con prompt sugerido, demo en vivo, panel de control y código copiable.
> Pensado para **vibe coders** que pilotan IAs.

---

## ⚡ Cómo arrancar

No hay build. No hay bundlers. No hay node_modules.

Cualquier servidor estático sirve. Si tienes Python:

```bash
cd gsap-visual-codex
python3 -m http.server 8000
```

Y abre `http://localhost:8000`. Listo.

> ⚠️ **No abras `index.html` con doble-click** (file://). Los módulos ES y `fetch()` necesitan un servidor HTTP, incluso si es local.

Otros servidores que también valen:
```bash
npx serve .            # con Node
php -S localhost:8000  # con PHP
```

---

## 📁 Estructura

```
gsap-visual-codex/
├── index.html                    ← Home animada
├── glosario.html                 ← (Fase 12)
├── como-usar.html                ← (Fase 11)
├── combos.html                   ← Recetas combinando varias animaciones (Fase 11)
├── favoritos.html                ← (Fase 12)
│
├── data/
│   └── animations.json           ← Catálogo único de las 236 animaciones (config + metadata)
│
├── css/
│   ├── tokens.css                ← Variables: colores, tipografía, espaciado, motion
│   ├── base.css                  ← Reset, tipografía global, componentes base
│   ├── nav.css                   ← Header, megamenú, drawer móvil, breadcrumbs, búsqueda
│   ├── animation-page.css        ← Layout de los 5 bloques de cada ficha
│   ├── controls.css              ← Sliders, dropdowns, toggles del panel
│   └── home.css                  ← Estilos exclusivos de index.html
│
├── js/
│   ├── plugin-loader.js          ← Carga lazy de plugins GSAP y librerías externas
│   ├── theme.js                  ← Toggle claro/oscuro
│   ├── code-copy.js              ← Sistema de copia al portapapeles con toast
│   ├── control-panel.js          ← Motor que construye el panel desde un array de descriptores
│   ├── code-sync.js              ← Sincronización panel ↔ código highlighteado
│   ├── code-download.js          ← Descarga la animación como .html standalone
│   ├── nav.js                    ← Construye header, megamenú y footer desde el JSON
│   ├── search.js                 ← Buscador Cmd+K con fuzzy match
│   └── animation-page.js         ← Orquestador de la página de animación individual
│
├── shared/
│   ├── plantilla-animacion.html  ← Plantilla canónica de cada ficha (no se sirve, se copia)
│   └── page-loader.js            ← Inyecta header/footer/buscador en cada página
│
├── modules/
│   └── animations/
│       ├── fundamentos/
│       │   └── gsap-to.js        ← ★ Módulo piloto completo
│       ├── easing/, timeline/, ...   (un subdirectorio por categoría)
│
├── animations/
│   ├── fundamentos/
│   │   └── gsap-to.html          ← ★ Página piloto completa
│   ├── easing/, timeline/, ...   (un subdirectorio por categoría)
│
└── assets/                       ← Imágenes, SVGs y fuentes locales si las hubiera
```

---

## ✍️ Cómo añadir una animación nueva (3 pasos)

Pongamos que quieres añadir `gsap.from`:

### 1. Comprueba que esté en `data/animations.json`

Las 236 animaciones ya están listadas. Cada una tiene este schema:

```json
{
  "id": "gsap-from",
  "slug": "gsap-from",
  "nameEs": "Animar desde un estado (gsap.from)",
  "nameEn": "Tween from a state (gsap.from)",
  "promptSuggested": "Quiero que el elemento aparezca desde fuera de pantalla...",
  "difficulty": "principiante",
  "plugins": ["core"],
  "extraCdn": [],
  "tags": ["tween", "from"],
  "related": ["gsap-to", "gsap-fromto"],
  "minVersion": "3.0.0",
  "controls": [],          ← lo rellenarás tú o el módulo lo aporta
  "docs": {}               ← lo rellenarás tú o el módulo lo aporta
}
```

### 2. Crea el módulo `modules/animations/fundamentos/gsap-from.js`

Mira `modules/animations/fundamentos/gsap-to.js` como plantilla. Cada módulo exporta tres cosas:

```js
export const controls = [ /* descriptores de sliders/dropdowns/toggles */ ];

export function render({ stage, params, gsap }) {
  // poblar stage con el DOM necesario
  // aplicar la animación con gsap
  return tween;   // o timeline, o instance con .play/.pause/.kill
}

export function getCode(params) {
  return {
    html: '<div class="caja"></div>',
    css:  '.caja { ... }',
    js:   'gsap.from(".caja", { ... })'
  };
}

// Opcional: sobrescribe los docs del JSON
export const docs = {
  intro: "...",
  method: "...",
  varsTable: [ ... ],
  /* etc. */
};
```

### 3. Crea la página HTML `animations/fundamentos/gsap-from.html`

Copia tal cual `shared/plantilla-animacion.html` y cambia **solo dos atributos** del `<body>`:

```html
<body data-animation-id="gsap-from" data-category="fundamentos">
```

Eso es todo. El resto se rellena automáticamente.

---

## 🎛 Tipos de control disponibles para el panel

| `type`        | uso típico                                                  |
|---------------|-------------------------------------------------------------|
| `slider`      | duraciones, x/y, escala, rotación, opacidad, repeticiones   |
| `dropdown`    | easing, transformOrigin, scrub mode                         |
| `toggle`      | yoyo, paused, autoAlpha, markers (ScrollTrigger), etc.      |
| `number`      | valores libres                                              |
| `color`       | colores hex                                                 |
| `segmented`   | enums cortos (alternativa visual al dropdown)               |

Ejemplo:
```js
{ type: 'slider', param: 'duration', min: 0.1, max: 3, step: 0.05, default: 1, hint: 'Cuánto tarda' }
```

---

## 🔌 Plugins disponibles

Todos los plugins de GSAP 3.12.5 están declarados en `data/animations.json > config.plugins`.

**Cargas lazy**: tu animación declara qué plugins necesita en su entrada del JSON (`"plugins": ["ScrollTrigger", "Flip"]`) y `plugin-loader.js` los inyecta dinámicamente solo cuando el usuario visita esa ficha.

**Plugins de Club GreenSock** (de pago, gratis con membresía): se cargan desde **jsdelivr** como fallback porque cdnjs no los aloja. Se muestra un badge `🌿 Club GreenSock` en la ficha.

---

## 🌑 Tema y estilo

- Variables CSS en `css/tokens.css` — cámbialas ahí y se propaga por todo.
- Toggle claro/oscuro en el header (botón). Persiste en `localStorage`.
- Fuentes: **Bricolage Grotesque** (display), **DM Sans** (cuerpo), **JetBrains Mono** (código) — todas desde Google Fonts.
- Color de acento principal: el verde GSAP (`#88ce02`).

---

## ⌨️ Atajos

- **⌘K / Ctrl+K** → buscador global con fuzzy match.
- **↑ ↓** dentro del buscador → navegar resultados.
- **↵** → ir a la animación seleccionada.
- **Esc** → cerrar buscador o megamenú.

---

## 📚 Créditos y enlaces

- **GSAP** es propiedad de [GreenSock](https://gsap.com/), ahora parte de Webflow Inc.
  Este sitio es un recurso educativo no oficial.
- **Documentación oficial**: <https://gsap.com/docs/v3/>
- **Cheatsheet oficial**: <https://gsap.com/cheatsheet/>
- **Easing visualizer**: <https://gsap.com/docs/v3/Eases>

---

## 🛣 Estado del proyecto

| Fase | Contenido                                  | Estado     |
|------|--------------------------------------------|------------|
| 1    | Cimientos (arquitectura, plantilla, piloto)| ✅ Hecho   |
| 2    | Fundamentos (12 animaciones)               | ⏳ Próxima |
| 3    | Easing (30+)                                | ⏳         |
| 4    | Timelines                                   | ⏳         |
| 5    | Stagger                                     | ⏳         |
| 6    | Scroll / ScrollTrigger                      | ⏳         |
| 7    | SVG (Morph, Draw, MotionPath)               | ⏳         |
| 8    | Texto (SplitText, Scramble, TextPlugin)    | ⏳         |
| 9    | Interacción (Draggable, Observer)           | ⏳         |
| 10   | Flip, Physics, Three/Pixi, React            | ⏳         |
| 11   | Combos + cómo usar                          | ⏳         |
| 12   | Pulido (glosario, favoritos, polish)        | ⏳         |

Actualmente sólo `fundamentos/gsap-to` tiene módulo implementado.
El resto muestra un placeholder hasta que llegue su fase.

---

> _GSAP Visual Codex · hecho con 🌿 para vibe coders hispanohablantes._
