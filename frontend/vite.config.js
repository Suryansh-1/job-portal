import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { AppleIcon } from "lucide-react"

export default defineConfig({

  server:{
    proxy:{
      "/api": "https://job-portal-back-aobx.onrender.com"
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
