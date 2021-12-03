import { defineConfig } from 'vite'
// Plugin
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'
import styleImport from 'vite-plugin-style-import';
import postcssImport from "postcss-import"
import autoprefixer from 'autoprefixer'
import path from 'path'

// 生成组合别名
function pathResolve(dir: string) {
  // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --dev
  return path.resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 自动打开浏览器 true/false
    open: false,
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: "@", replacement: pathResolve("src")},
      { find: "assets", replacement: pathResolve("src/assets")},
      { find: "components", replacement: pathResolve("src/components")},
      { find: "pages", replacement: pathResolve("src/pages")},
      { find: "utils", replacement: pathResolve("src/utils")},
      { find: "styles", replacement: pathResolve("src/styles")},
      { find: "plugins", replacement: pathResolve("src/plugins")},
      { find: "mocks", replacement: pathResolve("src/mocks")},
      { find: "enums", replacement: pathResolve("src/enums")},
      
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "./src/styles/variable.less";@import 'vant/lib/index.less';`,
        modifyVars: {
        // 直接覆盖变量
        'action-sheet-description-font-size': '12px',
        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
        // hack: `true; @import "./src/styles/variable.less";`,
        },
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ]
})
