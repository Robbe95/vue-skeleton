import './src/assets/styles/tailwind.css'

// Import global CSS
import './src/assets/styles/transitions.scss' // Import global CSS
import { createPinia } from 'pinia'
import { defineSetupVue3 } from '@histoire/plugin-vue'
import { createI18n } from 'vue-i18n'

import en from './src/locales/en.json'
import nl from './src/locales/nl.json'
import router from './src/router/router'

export const setupVue3 = defineSetupVue3(({ app }) => {
  const pinia = createPinia()
  const i18n = createI18n({
    legacy: false,
    locale: 'nl', // set locale
    fallbackLocale: 'nl', // set fallback locale
    messages: {
      nl,
      en,
    },
  })
  app.use(pinia) // Add Pinia store
    .use(i18n)
    .use(router)
})
