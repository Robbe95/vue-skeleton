import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { UserConfigExport } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { buildParseEnv } from './src/plugins/env'

export default ({ mode }): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [
      buildParseEnv(process.env),
      vue(),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
      }),
      Components({
        dts: true,
        dirs: ['src/components', 'src/modules'],

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
          'vitest',
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

  })
}
