import type { NavigationGuardNext } from 'vue-router/dist/vue-router'
import { Routes } from '@/router/routes.type'

export const authMiddleware = async (next: NavigationGuardNext): Promise<void> => {
  // const requiresAuth = to.meta.auth
  // if (!requiresAuth) {
  //   next()
  //   return
  // }
  // const authStore = useAuthStore()
  try {
    // await authStore.getUser()
    // const isAuthenticated = userStore.isLoggedIn
    // if (requiresAuth && !isAuthenticated)
    //   next(Routes.LOGIN)
    // else
    next()
  }
  catch (error) {
    next(Routes.LOGIN)
  }
}
