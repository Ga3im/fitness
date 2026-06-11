import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // Кэшировать вообще все файлы из сборки
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
      },
      manifest: {
        name: "Таймер тренировок",
        short_name: "Таймер",
        description: "Интервальный таймер для тренировок",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        icons: [
          {
            src: "pwa-192x192.png", // Добавьте иконку в папку public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png", // Добавьте иконку в папку public
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
