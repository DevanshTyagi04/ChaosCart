import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/health': { target: 'http://localhost:4001', changeOrigin: true },
      '/api/users': { target: 'http://localhost:4001', changeOrigin: true },
      '/api/products': { target: 'http://localhost:4002', changeOrigin: true },
      '/api/orders': { target: 'http://localhost:4003', changeOrigin: true }
    }
  }
})
