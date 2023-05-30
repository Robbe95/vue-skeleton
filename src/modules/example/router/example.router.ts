import type { Component } from 'vue'
import type { Route } from '@/router/routes.type'
import { routeNames } from '@/router/routes.type'
import { QueryKey } from '@/http/queryKeys'

export default [
  {
    component: (): Promise<Component> => import('../pages/ExampleApiPage.vue'),
    name: routeNames.EXAMPLE_INDEX,
    path: 'example',
    meta: {
      prefetchRoutes: [QueryKey.FACTS],
    },
  },
  {
    component: (): Promise<Component> => import('../pages/ExampleFormPage.vue'),
    name: routeNames.EXAMPLE_FORM,
    path: 'example-form',
  },

] satisfies Route[]
