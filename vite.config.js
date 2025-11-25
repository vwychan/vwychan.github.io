import { defineConfig } from 'vite';

export default defineConfig({
  // For GitHub Pages:
  // - Repo name is "vwychan.github.io" → served at root URL
  // - So base should be '/' (not '/vwychan.github.io/')
  base: '/',
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});


