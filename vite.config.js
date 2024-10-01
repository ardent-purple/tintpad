import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'tintpad',
        short_name: 'tintpad',
        description:
          'tintpad is a free web app for displaying or animating any color on your screen. Use it to create a primitive lightpad. The app can be used to set a mood, create an environment, create a simple light source for reading or just good mood',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/any-size.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}'],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  root: './', // Set the root to the current directory
  build: {
    outDir: './docs', // Output directory for all files
    rollupOptions: {
      input: './index.html', // Entry point for your project
      output: {
        // Ensure a single JS bundle
        manualChunks: undefined,
      },
    },
    cssCodeSplit: false, // Ensures CSS is bundled into a single file
    minify: 'esbuild', // Minify both JS and CSS
  },
  esbuild: {
    minify: true, // Minify JS files
    minifyWhitespace: true, // Minify HTML files
  },
})
