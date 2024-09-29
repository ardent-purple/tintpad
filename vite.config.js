import { defineConfig } from 'vite'

export default defineConfig({
  root: './', // Set the root to the current directory
  build: {
    outDir: './dist', // Output directory for all files
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
  },
})
