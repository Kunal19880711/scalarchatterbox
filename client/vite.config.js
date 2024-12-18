import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:8000", // Backend server with Socket.IO
        ws: true, // Enable WebSocket proxying
        changeOrigin: true,
      },
    },
  },
});
