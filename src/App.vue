<script setup lang="ts">
import CookiesConsent from './components/cookies/CookiesConsent.vue'
import { hasChoosenCookies, hasCookiesOpened } from './composables/cookies/useCookiesConsent'
import { scaleBounceTransition } from './transitions'
</script>

<template>
  <RouterView />
  <AppButton @click="hasCookiesOpened = true">
    open cookies
  </AppButton>
  <Transition v-bind="scaleBounceTransition">
    <CookiesConsent v-if="!hasChoosenCookies || hasCookiesOpened" />
  </Transition>
</template>

<style></style>
