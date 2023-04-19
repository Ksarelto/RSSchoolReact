import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './src/client/main.tsx',
      output: {
        dir: 'dist/client',
        name: 'client',
        format: 'cjs',
        entryFileNames: '[name].cjs'
      }
    }
  },
})
