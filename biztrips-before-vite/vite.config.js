import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      // <– frontend sees /api/..., Vite shunts it to Spring Boot
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
