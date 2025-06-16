import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      com: path.resolve(__dirname, '../com')
    }
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, '../com') // permite acceso al directorio com
      ]
    }
  }
})