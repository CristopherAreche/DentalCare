import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          ui: [
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/react-fontawesome",
          ],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
