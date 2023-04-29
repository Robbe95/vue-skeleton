<script setup lang="ts">
import { useCookiesConsent } from '@/composables/cookies/useCookiesConsent';

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
    class="fixed right-4 bottom-4 border-primary-500 bg-primary-100 p-6 border rounded-lg md:w-auto w-[calc(100vw-2rem)]">
    <div class="flex flex-row justify-evenly gap-4 flex-wrap mb-2">
      <div v-for="cookie in cookiesConsent.cookieTypes">
        <FormCheckboxGroup v-model="tempAcceptedCookies">
          <FormCheckbox :value="cookie">
            {{ t(`cookies.${cookie}`) }}
          </FormCheckbox>
        </FormCheckboxGroup>
      </div>
    </div>
    <div class="w-full">
      <AppButton @component:click="updateCookies" class="w-full text-center">
        {{ t(`cookies.accept`) }}
      </AppButton>

    </div>
  </div>
</template>
