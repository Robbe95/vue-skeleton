import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import SvgTransformer from './src/plugins/svg-transformer/svgTransformer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Components({
      dts: true,
    }),
    AutoImport({
      dts: true,
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md

      ],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
        {
          axios: [
            ['default', 'axios'],
          ],
        },
      ],
      resolvers: [
        /* ... */
      ],
    }),
    SvgTransformer({
      svgFolderPath: './src/assets/icons',
      outputPath: './src/components/icons',
      basePath: './src',
    }),

  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
