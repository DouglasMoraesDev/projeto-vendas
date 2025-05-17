// frontend/vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // define a pasta public como raiz do Vite
  root: path.resolve(__dirname, 'public'),
  build: {
    // saída em frontend/dist
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
    rollupOptions: {
      // entry explícito (não é obrigatório se root estiver correto, mas deixa claro)
      input: path.resolve(__dirname, 'public/index.html')
    }
  }
})
