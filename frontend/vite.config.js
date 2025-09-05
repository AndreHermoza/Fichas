import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://super-duper-memory-jjrvp6vr5qg9cp6q9-5000.app.github.dev", 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})