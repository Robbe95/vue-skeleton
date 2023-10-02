import { StorageSerializers, useStorage } from '@vueuse/core'

export const cookieTypes = [
  'analytics',
  'others',
] as const

export type CookieType = typeof cookieTypes[number]
export const acceptedCookies = useStorage<CookieType[]>('acceptedCookies', [], undefined, { serializer: StorageSerializers.object })
export const hasChoosenCookies = useStorage<boolean>('hasChoosenCookies', false)
export const hasCookiesOpened = ref(false)

function handleAnalyticsCookieUpdated(accepted: boolean): void {
  // TODO handle this
  console.error('Analytics cookie updated', accepted)
}

export function enableAcceptedCookies(): void {
  handleAnalyticsCookieUpdated(acceptedCookies.value.includes('analytics'))
}

watch(() => acceptedCookies.value, () => {
  enableAcceptedCookies()
})

export function useCookiesConsent(): {
  acceptedCookies: Ref<CookieType[]>
  updateCookies: (newAcceptedCookies: CookieType[]) => void
  cookieTypes: typeof cookieTypes
} {
  const updateCookies = (newAcceptedCookies: CookieType[]): void => {
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
