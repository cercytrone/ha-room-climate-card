/**
 * Renders the README previews from `scripts/showcase.ts`:
 *
 *   showcase.svg/.png        – four cards, dark theme
 *   showcase-light.svg/.png  – two cards, light theme ("daytime")
 *   editor.svg/.png          – the visual editor with a live preview
 *
 * Uses esbuild (a Vite dependency) to bundle the TypeScript file and
 * @resvg/resvg-js to rasterise it – no browser needed.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/images');
const tmpFile = resolve(root, '.tmp/showcase.mjs');

mkdirSync(outDir, { recursive: true });
mkdirSync(dirname(tmpFile), { recursive: true });

await build({
  entryPoints: [resolve(root, 'scripts/showcase.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  outfile: tmpFile,
  logLevel: 'warning',
});

const variants = [
  { mode: 'dark', name: 'showcase' },
  { mode: 'light', name: 'showcase-light' },
  { mode: 'editor', name: 'editor' },
  { mode: 'bands', name: 'showcase-bands' },
];

for (const variant of variants) {
  const svg = execFileSync(process.execPath, [tmpFile, variant.mode], {
    cwd: root,
    encoding: 'utf8',
  });
  writeFileSync(resolve(outDir, `${variant.name}.svg`), svg);

  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 2000 },
    font: { loadSystemFonts: true, defaultFontFamily: 'DejaVu Sans' },
  }).render();
  writeFileSync(resolve(outDir, `${variant.name}.png`), png.asPng());

  console.log(`${variant.name}.svg + ${variant.name}.png written (${png.width}px wide)`);
}
