import type { Component } from 'vue'
import type { Route } from '@/router/routes.type'
import { Routes } from '@/router/routes.type'

export default [
  {
    component: (): Promise<Component> => import('../pages/LoginPage.vue'),
    name: Routes.LOGIN,
    path: 'login',
  },
] satisfies Route[]
