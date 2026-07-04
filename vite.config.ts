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
    host: "127.0.0.1",
    port: 3000,
    proxy: {
      '/api': {
        target: `${process.env.PUBLIC_ENV__BACKEND_URL}/v1`,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      }
    },
  },
});
