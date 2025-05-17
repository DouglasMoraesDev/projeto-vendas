// frontend/vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'), // <- Agora dentro do próprio frontend
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'public/index.html')
    }
  }
})
