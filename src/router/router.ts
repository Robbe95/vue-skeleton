import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'
import type { Route } from './routes.type'
import { routeNames } from './routes.type'
import authRouter from '@/modules/auth/router/auth.router'
import { authMiddleware } from '@/middleware/auth.middleware'
import { cookiesMiddleware } from '@/middleware/cookies.middleware'

export const routes: Route[] = [
  {
    path: '/',
    component: (): Promise<Component> => import('../layouts/MainLayout.vue'),
    name: routeNames.MAIN,
    children: [
      {
        component: (): Promise<Component> => import('../pages/Index.vue'),
        name: routeNames.INDEX,
        path: '',
      },
      ...authRouter,
    ],
  },
  {
    path: '/sidebar',
    component: (): Promise<Component> => import('../layouts/SidebarLayout.vue'),
    name: routeNames.SIDEBAR,
    children: [
    ],
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (_to, _from, next) => {
  authMiddleware(next)
  cookiesMiddleware()
})

export default router
