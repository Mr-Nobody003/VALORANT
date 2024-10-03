import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:process.env.NODE_ENV === 'production'
    ? '/VALORANT/' // for GitHub Pages
    : '/', // for Vercel
})
