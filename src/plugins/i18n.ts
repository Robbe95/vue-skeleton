import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import nl from '@/locales/nl.json'

const i18n = createI18n({
  legacy: false,
  locale: 'nl', // set locale
  fallbackLocale: 'nl', // set fallback locale
  messages: {
    nl,
    en,
  },
})

export default i18n
