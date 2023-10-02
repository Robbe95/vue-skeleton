import { enableAcceptedCookies } from '@/composables/cookies/useCookiesConsent'

export function cookiesMiddleware(): void {
  enableAcceptedCookies()
}
