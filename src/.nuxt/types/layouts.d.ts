import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "main" | "sidebar-layout"
declare module "C:/Users/robbe/Work/FunStuff/vue-skeleton/node_modules/.pnpm/nuxt@3.3.1_ftlulqgqhjn43kfbkwjgypolwi/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}