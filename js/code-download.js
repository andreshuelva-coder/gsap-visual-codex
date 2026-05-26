/**
 * code-download.js
 * ────────────────────────────────────────────────────────────────────
 * Descarga la animación actual como un .html standalone listo para abrir.
 * Inyecta los CDN necesarios según los plugins que use la animación.
 * ──────────────────────────────────────────────────────────────────── */

import { getPluginConfig } from './plugin-loader.js';

const TEMPLATE = (title, css, html, js, scriptTags) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    background: #0d0f10;
    color: #f1f3f0;
    font-family: system-ui, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
${css}
</style>
</head>
<body>
${html}

${scriptTags}
<script>
${js}
</script>
</body>
</html>
`;

export async function downloadStandalone({ animation, html = '', css = '', js }) {
  const config = await getPluginConfig();

  // Construir tags de script de CDN
  const pluginIds = (animation.plugins || []).filter(id => id !== 'core');
  const cdnList = [config.plugins.core.cdn];
  pluginIds.forEach(id => {
    const def = config.plugins[id];
    if (def) cdnList.push(def.cdnFallback || def.cdn);
  });
  (animation.extraCdn || []).forEach(id => {
    const def = config.externalLibraries[id];
    if (def) cdnList.push(def.cdn);
  });

  const scriptTags = cdnList.map(src => `<script src="${src}"></script>`).join('\n');

  const finalHtml = TEMPLATE(
    animation.nameEs || 'GSAP Animation',
    css,
    html,
    js,
    scriptTags
  );

  // Descargar
  const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${animation.slug || 'gsap-animation'}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
