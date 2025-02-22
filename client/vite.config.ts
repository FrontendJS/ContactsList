import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [TanStackRouterVite({}), react()],
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
