import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'
import type { Route } from './routes.type'
import { Routes } from './routes.type'
import exampleRouter from '@/modules/example/router/example.router'
import authRouter from '@/modules/auth/router/auth.router'
import { authMiddleware } from '@/middleware/auth.middleware'
import { cookiesMiddleware } from '@/middleware/cookies.middleware'

const routes = [
  {
    path: '/',
    component: (): Promise<Component> => import('../layouts/Main.vue'),
    children: [
      {
        component: (): Promise<Component> => import('../pages/Index.vue'),
        name: Routes.INDEX,
        path: '',
      },
      ...exampleRouter,
      ...authRouter,
    ],
  },
  {
    path: '/sidebar',
    component: (): Promise<Component> => import('../layouts/SidebarLayout.vue'),
    children: [
      {
        component: (): Promise<Component> => import('../pages/TableExample.vue'),
        name: Routes.EXAMPLE_TABLE,
        path: '',
      },
    ],
  },

] satisfies Route[]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  authMiddleware(next)
  cookiesMiddleware()
})

export default router
