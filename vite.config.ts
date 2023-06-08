import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      svgoOptions: {},
      symbolId: "icon-[dir]-[name]"
    })
  ],
  css: {
    // 预处理配置
    preprocessorOptions: {
      less: {
        math: 'always',
        // globalVars: {
          // 全局变量配置
        // },
        // 覆盖依赖命名的 css 变量
        modifyVars: {

        },
        additionalData: `@import "${path.resolve(__dirname, "./src/assets/style/variable.less")}";`
      }
    }
  },
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
      },
      '/nodered.itealab.net': {
        target: 'https://nodered.itealab.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nodered.itealab.net/, '')
      },
      '/flow.itealab.net': {
        target: 'https://flow.itealab.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/flow.itealab.net/, '')
      },
      '/tid.itealab.net': {
        target: 'https://tid.itealab.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tid.itealab.net/, '')
      }
    }
  }
})