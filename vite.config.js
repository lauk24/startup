import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: './service/public',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});