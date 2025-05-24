import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
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
        scope: "/VALORANT/",
        start_url: "/VALORANT/",
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
  base: process.env.GITHUB_PAGES === "true" ? "/VALORANT/" : "/",
});
