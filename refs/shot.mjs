// Captura de pantalla con Playwright local (aislado por proceso: cada agente
// puede usarlo en paralelo sin pisar a los demás).
//
// Uso:
//   node refs/shot.mjs --url <url> [--width 390] [--height 844] --out refs/tmp/foo.png
//        [--fullpage] [--prescroll] [--scrollto 1200] [--selector "css"] [--wait 800]
//
// --prescroll: recorre toda la página primero (dispara reveals al scroll)
// --scrollto:  posición Y final antes de capturar
// --selector:  captura solo ese elemento en vez del viewport
import { chromium } from 'playwright';

const arg = (name, def) => {
  const i = process.argv.indexOf('--' + name);
  if (i === -1) return def;
  const v = process.argv[i + 1];
  return (v === undefined || String(v).startsWith('--')) ? true : v;
};

const url = arg('url');
if (!url || url === true) { console.error('falta --url'); process.exit(1); }
const width = parseInt(arg('width', '390'), 10);
const height = parseInt(arg('height', '844'), 10);
const out = arg('out', 'refs/tmp/shot.png');
const fullpage = !!arg('fullpage', false);
const prescroll = !!arg('prescroll', false);
const scrollto = parseInt(arg('scrollto', '0'), 10);
const selector = arg('selector', null);
const wait = parseInt(arg('wait', '800'), 10);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
const errores = [];
page.on('pageerror', e => errores.push(String(e)));
await page.goto(url, { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(1500);

const scrollA = (v) => page.evaluate(y => {
  if (window.lenis) window.lenis.scrollTo(y, { immediate: true });
  else window.scrollTo(0, y);
}, v);

if (prescroll) {
  const alto = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= alto; y += Math.round(height * 0.8)) {
    await scrollA(y);
    await page.waitForTimeout(90);
  }
}
await scrollA(scrollto);
await page.waitForTimeout(wait);

if (selector && selector !== true) {
  await page.locator(selector).first().screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage: fullpage });
}
await browser.close();
console.log('guardado: ' + out);
if (errores.length) console.log('ERRORES JS EN PÁGINA:\n' + errores.join('\n'));
