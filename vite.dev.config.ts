import { defineConfig } from 'vite';

/**
 * Development playground only. It serves `dev/index.html` with a mocked
 * Home Assistant frontend so the card can be designed without a live instance.
 * It is never part of the published bundle.
 */
export default defineConfig({
  root: 'dev',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    // The Arena preview proxies the dev server through an external host name.
    allowedHosts: true,
    cors: true,
  },
  define: {
    __CARD_VERSION__: JSON.stringify('dev'),
  },
});
