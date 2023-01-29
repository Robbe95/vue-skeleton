import { Routes } from './routes.type'
import exampleRouter from '@/modules/example/router/example.router'
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
      ...exampleRouter,
    ],
  },
] satisfies Route[]
