import { Routes } from './routeTypes.d'

interface Route {
  path: string
  component: () => Promise<unknown>
  children?: Route[]
  name?: Routes
}

export default [
  {
    path: '/',
    component: () => import('../layouts/Main.vue'),
    children: [
      {
        component: () => import('../pages/Index.vue'),
        name: Routes.INDEX,
        path: '',
      },
    ],
  },
] satisfies Route[]
