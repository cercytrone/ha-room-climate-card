/**
 * Takes browser screenshots of the REAL card (the Lit component from `src/`)
 * as rendered by the dev playground (`dev/`) with simulated demo data:
 *
 *   screenshot-dark.png    – four cards, dark theme
 *   screenshot-light.png   – two cards, light theme
 *   screenshot-editor.png  – visual editor with live preview
 *
 * Starts the Vite dev server in-process and drives Chromium via Playwright
 * (`playwright` must be resolvable, e.g. installed globally). Run with
 * `npm run screenshots`.
 */
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { createServer } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/images');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const server = await createServer({
  configFile: resolve(root, 'vite.dev.config.ts'),
  server: { port: 0 },
  logLevel: 'warn',
});
await server.listen();
const url = server.resolvedUrls.local[0];

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 }, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  /** Switches the theme and shows only the first `count` demo cards in two columns. */
  const prepare = async (theme, count) => {
    await page.evaluate(
      ({ theme, count }) => {
        const select = document.querySelector('#theme');
        select.value = theme;
        select.dispatchEvent(new Event('change'));
        for (const sel of ['.demo-banner', 'header', '.toolbar']) {
          document.querySelector(sel).style.display = 'none';
        }
        const grid = document.querySelector('#cards');
        grid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
        grid.style.padding = '8px';
        [...grid.children].forEach((card, i) => {
          card.style.display = i < count ? '' : 'none';
        });
      },
      { theme, count },
    );
    await page.waitForTimeout(800);
  };

  await prepare('dark', 4);
  await (await page.$('#cards')).screenshot({ path: resolve(outDir, 'screenshot-dark.png') });
  console.log('screenshot-dark.png written');

  await prepare('light', 2);
  await (await page.$('#cards')).screenshot({ path: resolve(outDir, 'screenshot-light.png') });
  console.log('screenshot-light.png written');

  await prepare('dark', 0);
  await page.evaluate(() => {
    document.querySelector('#yaml').style.display = 'none';
    document.querySelector('.preview-box .hint').style.display = 'none';
    document.querySelector('.editor-panel').style.padding = '8px';
  });
  await page.waitForTimeout(500);
  const box = await (await page.$('.editor-panel')).boundingBox();
  await page.screenshot({
    path: resolve(outDir, 'screenshot-editor.png'),
    clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 1000) },
  });
  console.log('screenshot-editor.png written');
} finally {
  await browser.close();
  await server.close();
}
