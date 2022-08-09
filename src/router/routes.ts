import { Routes } from './routeTypes.d'
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
]
