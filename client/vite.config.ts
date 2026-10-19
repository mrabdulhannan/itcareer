import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // In development, API calls go to the Express server.
    proxy: { "/api": "http://localhost:4000" },
  },
});
