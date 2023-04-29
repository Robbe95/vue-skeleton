import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import vue3GoogleLogin from 'vue3-google-login'
import router from './router/router'
import i18n from './plugins/i18n'
import App from './App.vue'
import setupZod from './plugins/zod'

import './assets/styles/tailwind.css'
import './assets/styles/transitions.scss'
import { initializeGtm } from './plugins/gtm'
import { envSchema } from './plugins/env'

envSchema.parse(import.meta.env)

const pinia = createPinia()
setupZod()
const gtm = initializeGtm(router)
const app = createApp(App)
app.use(pinia)
  .use(createHead())
  .use(i18n)
  .use(router)
  .use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  })
  .use(gtm)
  .mount('#app')
