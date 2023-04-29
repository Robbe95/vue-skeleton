import { useAuthStore } from "@/modules/auth/stores/auth.store"
import { Routes } from "@/router/routes.type"
import { NavigationGuardNext } from "vue-router/dist/vue-router"

export const authMiddleware = async (next: NavigationGuardNext) => {
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