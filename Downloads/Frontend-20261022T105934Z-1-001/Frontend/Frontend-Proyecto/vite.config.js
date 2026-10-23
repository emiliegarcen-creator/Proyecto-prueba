import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ticket': 'http://127.0.0.1:3001',
      '/usuarios': 'http://127.0.0.1:3001',
      '/maquina': 'http://127.0.0.1:3001',
      '/api': 'http://127.0.0.1:3001'
    }
  }
});