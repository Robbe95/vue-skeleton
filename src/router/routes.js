import MainLayout from '../layouts/Main.vue'
import Index from '../pages/Index.vue'
export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        component: Index,
        name: 'index',
        path: '',
      },
    ],
  },
]
