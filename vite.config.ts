import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
  version: string;
};

export default defineConfig({
  define: {
    __CARD_VERSION__: JSON.stringify(pkg.version),
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
      fileName: () => 'ha-room-climate-card.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
