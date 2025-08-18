import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // 👈 this ensures assets resolve correctly on Vercel
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
