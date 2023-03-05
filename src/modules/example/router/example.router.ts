import type { Component } from 'vue'
import type { Route } from '@/router/routes.type'
import { Routes } from '@/router/routes.type'

export default [
  {
    component: (): Promise<Component> => import('../pages/ExampleApiPage.vue'),
    name: Routes.EXAMPLE_INDEX,
    path: 'example',
  },
  {
    component: (): Promise<Component> => import('../pages/ExampleFormPage.vue'),
    name: Routes.EXAMPLE_FORM,
    path: 'example-form',
  },

] satisfies Route[]
