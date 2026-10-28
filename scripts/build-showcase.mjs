/**
 * Renders `docs/images/showcase.svg` (and a PNG version) from
 * `scripts/showcase.ts`. Uses esbuild (a Vite dependency) to bundle the
 * TypeScript file and @resvg/resvg-js to rasterise it – no browser needed.
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

const svg = execFileSync(process.execPath, [tmpFile], { cwd: root, encoding: 'utf8' });
writeFileSync(resolve(outDir, 'showcase.svg'), svg);

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: 2000 },
  font: { loadSystemFonts: true, defaultFontFamily: 'DejaVu Sans' },
}).render();
writeFileSync(resolve(outDir, 'showcase.png'), png.asPng());

console.log(`showcase.svg + showcase.png written to docs/images (${png.width}px wide)`);
