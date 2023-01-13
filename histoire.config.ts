// histoire.config.js
import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  outDir: '.histoire/dist',
  setupFile: './histoire.setup.ts',
  theme: {
    title: 'Wisemen',
  },
})
