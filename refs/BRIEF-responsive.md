# Brief responsive — Copia web Makai

Contexto compartido para los agentes de la fase responsive. Leer entero antes de tocar nada.

## Proyecto

Réplica estática (HTML/CSS/JS vanilla + GSAP 3.12.5 + Lenis) de https://makai-capcana.com/
para importar en GoHighLevel: **sin frameworks ni build steps**. Paridad visual desktop
(1440px) ya conseguida. Esta fase: paridad responsive.

- Página: `copia-de-makai-limpio.html` (~428 KB, en la raíz del repo)
- CSS del theme capturado: `style.css` (~1.3 MB) — **conserva sus propias media queries**,
  por eso la copia ya responde bastante bien. Al final tiene overrides propios bajo
  `/* ==== ajustes-copia-local ==== */` pensados para desktop (fit-text en px, heroes 100vh,
  galería flex 4 columnas): si algo se ve mal en móvil, suele ser por estos overrides o por
  estilos inline congelados por la extensión de guardado.
- Interacciones GSAP: `js/main.js` (verificado, no tocar). Los módulos se saltan elementos
  ocultos (`offsetWidth 0`), así que al cargar en viewport móvil operan sobre las variantes
  mobile correctas.
- La web original es WordPress + Salient: **cada sección existe en versión desktop y
  `*-mobile`** (las mobile llevan `vc_hidden-lg vc_hidden-md vc_hidden-sm` → visibles solo
  <768px; las desktop llevan `vc_hidden-xs` → ocultas <768px).

## Servidor y verificación

- Servidor ya corriendo (NO levantar otro, NO matarlo): `http://127.0.0.1:8123/copia-de-makai-limpio.html`
  — añadir siempre `?nocache=<timestamp>` para esquivar la caché heurística.
- Original de referencia: `https://makai-capcana.com/`
- **PROHIBIDO usar las herramientas MCP de navegador (playwright MCP / browser-use)**: son
  una única instancia compartida y los agentes se pisarían entre sí. Verificar SIEMPRE con
  el helper local (un navegador propio por proceso):
  `node refs/shot.mjs --url "<url>" --width 390 --height 844 --out refs/tmp/<agente>-<nombre>.png [--fullpage] [--prescroll] [--scrollto Y] [--selector "css"]`
  (también reporta errores JS de la página). Para sondas más finas, escribir scripts Node
  propios con `playwright` (ya instalado en `node_modules`) siguiendo el patrón de
  `refs/shot.mjs`, guardándolos como `refs/tmp/probe-<agente>-*.mjs`.
- Capturas temporales y scripts propios: SIEMPRE en `refs/tmp/` con prefijo del agente
  (ej. `mobile-hero.png`, `probe-nav-menu.mjs`) para no chocar con otros agentes.
- Rutas con espacios (OneDrive): entrecomillar siempre.

## Referencias ya capturadas (full-page, tras disparar reveals)

- `refs/original-390-full.png` — original a 390×844 (altura total 17952px)
- `refs/original-768-full.png` — original a 768×1024 (altura total 32915px)
- `refs/copia-390-full.png` — copia a 390×844 (altura total 18554px)
- `refs/copia-768-full.png` — copia a 768×1024 (altura total 33102px)

## Breakpoints medidos en la original

| Rango | Comportamiento |
|---|---|
| ≥1025px | Nav desktop completo (sin hamburger) |
| 1000–1024px | Hamburger + off-canvas; sin clase `mobile` en body; secciones desktop |
| 768–999px | Hamburger; body con clase `mobile`; secciones desktop |
| <768px | Hamburger; body `mobile`; **swap a secciones `*-mobile`**; hero desktop a altura 0 |

Nota: `body.mobile` la añade el JS de Salient según el ancho (≤999px); muchas reglas de
`style.css` dependen de ella. En la copia la gestiona `js/mobile-nav.js` (agente mobile-nav).

## Propiedad de archivos (regla dura: cada agente SOLO edita los suyos)

| Archivo | Propietario |
|---|---|
| `css/responsive-mobile.css` (media queries ≤767px) | agente responsive-mobile |
| `css/responsive-tablet.css` (media queries 768–1024px) | agente responsive-tablet |
| `css/mobile-nav.css` + `js/mobile-nav.js` | agente mobile-nav |
| `copia-de-makai-limpio.html`, `style.css`, `js/main.js` | coordinador (NO editar; si hace falta un cambio ahí, anotarlo en el reporte final) |

Los tres CSS se cargan DESPUÉS de `style.css`, así que a igualdad de especificidad ganan
por cascada. Evitar `!important` salvo contra estilos inline congelados.

## Estilo de código

Comentarios en español, mismo tono que `js/main.js` / sección `ajustes-copia-local` de
`style.css`: explicar el "por qué" medido en la original (px/s, proporciones, breakpoints),
no el "qué". Sin dependencias nuevas.
