import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import vike from "vike/plugin";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [
    vike(),
    react(),
    tailwindcss()
  ],
  server: {
    cors: true,
    port: 3000,
    proxy: {
      '/api': {
        target: `${process.env.BACKEND_URL}/v1`,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      }
    },
  },
});
