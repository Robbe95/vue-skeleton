import type { VueGtmPlugin } from '@gtm-support/vue-gtm'
import { createGtm } from '@gtm-support/vue-gtm'
import type { Router } from 'vue-router'

export const initializeGtm = (router: Router): VueGtmPlugin => {
  return createGtm({
    id: 'GTM-W442X2F',
    defer: false,
    compatibility: false,
    nonce: '2726c7f26c',
    enabled: false,
    debug: true,
    loadScript: true,
    vueRouter: router,
    trackOnNextTick: false,
  })
}
