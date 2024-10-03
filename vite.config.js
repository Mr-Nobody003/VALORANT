import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL === 'true'
    ? '/' // No base path for Vercel
    : '/VALORANT/', // Base path for GitHub Pages
})
