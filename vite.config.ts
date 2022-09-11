import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import SvgTransformer from './src/plugins/svg-transformer/svgTransformer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      theme: {
        outline: {
          primary: '2px solid #FEA81E',
        },
        colors: {
          primary: '#FEA81E',
        },
      },
      shortcuts: {
        'btn': 'py-2 px-4 font-semibold rounded-xl shadow-md cursor-pointer',
        'btn-primary': 'text-white bg-primary hover:bg-opacity-30 border-2 border-transparent',
        'btn-secondary': 'text-black border-primary border-2 hover:bg-opacity-30 bg-white',
        'tag': 'bg-primary bg-opacity-30 rounded-full px-4 py-1 max-w-max text-primary',
      },
    }),
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
