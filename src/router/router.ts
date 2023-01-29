import { createRouter, createWebHistory } from 'vue-router'
import type { Route } from './routes.type'
import { Routes } from './routes.type'
import exampleRouter from '@/modules/example/router/example.router'
import authRouter from '@/modules/auth/router/auth.router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/Main.vue'),
    children: [
      {
        component: () => import('../pages/Index.vue'),
        name: Routes.INDEX,
        path: '',
      },
      ...exampleRouter,
      ...authRouter,
    ],
  },
] satisfies Route[]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
