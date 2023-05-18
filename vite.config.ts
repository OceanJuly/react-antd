import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/nodered.itealab.net': {
        target: 'https://nodered.itealab.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nodered.itealab.net/, '')
      }
    }
  }
})
