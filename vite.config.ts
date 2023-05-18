import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
        react(),
  			//使用 svg 图标
        createSvgIconsPlugin({
          iconDirs: [resolve(process.cwd(), "src/assets/icons")],
          svgoOptions: {},
          symbolId: "icon-[dir]-[name]"
        }),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://nodered.itealab.net/chatgpt',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
