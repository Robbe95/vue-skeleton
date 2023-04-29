import { StorageSerializers, useStorage } from "@vueuse/core"
import { useGtm } from '@gtm-support/vue-gtm';

export const cookieTypes = [
  'analytics',
  'others'
] as const

export type CookieType = typeof cookieTypes[number]
export const acceptedCookies = useStorage<CookieType[]>('acceptedCookies', [], undefined, { serializer: StorageSerializers.object })
export const hasChoosenCookies = useStorage<boolean>('hasChoosenCookies', false)
export const hasCookiesOpened = ref(false)
const handleAnalyticsCookieUpdated = (accepted: boolean) => {
  useGtm()?.enable(accepted)
}

export const enableAcceptedCookies = () => {
  handleAnalyticsCookieUpdated(acceptedCookies.value.includes('analytics'))
}

watch(() => acceptedCookies.value, () => {
  enableAcceptedCookies()
})




export const useCookiesConsent = () => {
  const updateCookies = (newAcceptedCookies: CookieType[]) => {
    hasChoosenCookies.value = true
    hasCookiesOpened.value = false
    acceptedCookies.value = newAcceptedCookies
  }
  return {
    acceptedCookies,
    updateCookies,
    cookieTypes,
  }
}
