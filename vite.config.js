import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@vercel/analytics/react'],
    },},
  base: process.env.GITHUB_PAGES === 'true'
    ? '/VALORANT/' // Base path for GitHub Pages
    : undefined, // Root path for Vercel
})
