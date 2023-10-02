import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router/router'
import i18n from './plugins/i18n'
import App from './App.vue'
import setupZod from './plugins/zod'

import './assets/styles/tailwind.css'
import './assets/styles/transitions.scss'

const pinia = createPinia()
setupZod()
const app = createApp(App)
app.use(pinia)
  .use(createHead())
  .use(i18n)
  .use(router)
  .use(VueQueryPlugin)
  .mount('#app')
