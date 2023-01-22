// histoire.config.js
import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    HstVue(),
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

  ],
  outDir: 'histoire/dist',
  setupFile: './histoire.setup.ts',
  theme: {
    title: 'Wisemen',
  },
})
