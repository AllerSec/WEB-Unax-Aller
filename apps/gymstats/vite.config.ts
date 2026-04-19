import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/gymstats/',
  build: {
    outDir: '../../public/gymstats',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'GymStats · Unax Aller',
        short_name: 'GymStats',
        description: 'Registra cada serie de tu entrenamiento',
        theme_color: '#faf9f4',
        background_color: '#faf9f4',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/gymstats/',
        start_url: '/gymstats/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
    }),
  ],
});
