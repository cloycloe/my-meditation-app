import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "My Meditation App",
        short_name: "MeditationApp",
        description: "A simple meditation app to track your mindfulness journey.",
        theme_color: "#75A586", // Your primary color, can be a brand color.
        background_color: "#ffffff", // Background color when the app is launched.
        start_url: "/index.html", // This makes sure the app starts from the main page.
        display: "standalone", // Makes the app look like a native app.
        icons: [
          {
            src: "/icons/icon-192x192.png",  // Update paths to your actual icons
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
