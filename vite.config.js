import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Check if deploying to GitHub Pages
const isGithubPages = process.env.GITHUB_PAGES === "true";
const base = isGithubPages ? "/VALORANT/" : "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons8-valorant-192.png", "apple-touch-icon.png"],
      manifest: {
        name: "VALORANT App",
        short_name: "VALORANT",
        description: "A VALORANT-themed PWA built with React + Vite",
        theme_color: "#000000",
        background_color: "#000000",
        display: "fullscreen",
        orientation: "landscape",
        scope: base,
        start_url: base,
        icons: [
          {
            src: "icons8-valorant-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons8-valorant-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons8-valorant-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
