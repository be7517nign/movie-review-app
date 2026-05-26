import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: https://be7517nign.github.io/movie-review-app/
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
