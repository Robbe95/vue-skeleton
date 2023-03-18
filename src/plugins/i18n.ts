import { createI18n } from 'vue-i18n'
import { defineNuxtPlugin } from 'nuxt/app'
import en from '@/locales/en.json'
import nl from '@/locales/nl.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'nl', // set locale
  fallbackLocale: 'nl', // set fallback locale
  messages: {
    nl,
    en,
  },
})

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(i18n)
})
