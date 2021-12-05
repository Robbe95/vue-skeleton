import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'virtual:windi.css'
import routes from './router/routes'

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
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(pinia)
  .use(i18n)
  .use(router)
  .mount('#app')
