import type { Component } from 'vue'
import type { Route } from '@/router/routes.type'
import { routeNames } from '@/router/routes.type'

export default [
  {
    component: (): Promise<Component> => import('../pages/LoginPage.vue'),
    name: routeNames.LOGIN,
    path: 'login',
  },
] satisfies Route[]
