import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'public' // Aqui é o ponto chave: onde o backend vai servir os arquivos
  }
})
