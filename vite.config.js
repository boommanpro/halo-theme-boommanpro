import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

export default defineConfig({
  root: 'src',
  base: '/themes/halo-theme-boommanpro/assets/dist/',
  build: {
    outDir: fileURLToPath(new URL('./templates/assets/dist/', import.meta.url)),
    emptyOutDir: true,
    minify: true,
    cssMinify: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.js'),
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        chunkFileNames: '[name].[hash].js',
        manualChunks: {
          highlight: ['highlight.js']
        }
      }
    },
    sourcemap: false
  }
});
