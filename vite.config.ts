import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    open: false,
  },

  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',

    // Raise chunk warning threshold slightly (lucide-react is large by design)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Split vendor code into separate cacheable chunks.
        // React/ReactDOM rarely changes → long-lived browser cache.
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },

    // Minify with esbuild (default, fastest)
    minify: 'esbuild',

    // Emit sourcemaps only in development (omit in production for smaller output)
    sourcemap: false,

    // Inline assets smaller than 4 KB as base64 (avoids extra HTTP requests)
    assetsInlineLimit: 4096,
  },
});
