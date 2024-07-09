import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/api": {
        target: "https://cropify-server.vercel.app/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
// vite.config.js
