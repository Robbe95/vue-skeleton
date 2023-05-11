<script setup lang="ts">
import { useCookiesConsent } from '@/composables/cookies/useCookiesConsent'

const { t } = useI18n()
const cookiesConsent = useCookiesConsent()
const acceptedCookies = computed(() => cookiesConsent.acceptedCookies.value)
const tempAcceptedCookies = ref([...acceptedCookies.value])
const updateCookies = (): void => {
  cookiesConsent.updateCookies(tempAcceptedCookies.value)
}
</script>

<template>
  <div
    class="fixed bottom-4 right-4 w-[calc(100vw-2rem)] rounded-lg border border-primary-500 bg-primary-100 p-6 md:w-auto"
  >
    <div class="mb-2 flex flex-row flex-wrap justify-evenly gap-4">
      <div v-for="cookie in cookiesConsent.cookieTypes" :key="cookie">
        <FormCheckboxGroup v-model="tempAcceptedCookies">
          <FormCheckbox :value="cookie">
            {{ t(`cookies.${cookie}`) }}
          </FormCheckbox>
        </FormCheckboxGroup>
      </div>
    </div>
    <div class="w-full">
      <AppButton class="w-full text-center" @component:click="updateCookies">
        {{ t(`cookies.accept`) }}
      </AppButton>
    </div>
  </div>
</template>
