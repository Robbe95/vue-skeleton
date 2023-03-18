import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "C:/Users/robbe/Work/FunStuff/vue-skeleton/node_modules/.pnpm/nuxt@3.3.1_ftlulqgqhjn43kfbkwjgypolwi/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}