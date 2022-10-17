import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import routes from './router/routes'
import App from './App.vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'

import en from './locales/en.json'
import nl from './locales/nl.json'

const pinia = createPinia()

const i18n = createI18n({
  locale: 'nl', // set locale
  fallbackLocale: 'nl', // set fallback locale
  messages: {
    nl,
    en,
  },
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(pinia)
  .use(createHead())
  .use(i18n)
  .use(router)
  .mount('#app')
