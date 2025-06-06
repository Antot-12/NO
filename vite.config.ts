import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/NO/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://naas.isalman.dev',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
