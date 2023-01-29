import { Routes } from '@/router/routes.type'

interface Route {
  path: string
  component: () => Promise<unknown>
  children?: Route[]
  name?: Routes
}

export default [
  {
    component: () => import('../pages/ExampleApiView.vue'),
    name: Routes.EXAMPLE_INDEX,
    path: 'example',
  },
] satisfies Route[]
