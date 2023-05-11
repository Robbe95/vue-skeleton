import { enableAcceptedCookies } from '@/composables/cookies/useCookiesConsent'

export const cookiesMiddleware = (): void => {
  enableAcceptedCookies()
}
