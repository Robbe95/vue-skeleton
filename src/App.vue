<script setup lang="ts">
import CookiesConsent from './components/cookies/CookiesConsent.vue';
import { hasChoosenCookies, hasCookiesOpened } from './composables/cookies/useCookiesConsent';
</script>

<template>
  <RouterView />
  <AppButton @click="hasCookiesOpened = true">
    open cookies
  </AppButton>
  <Transition name="scale-bounce-transition">
    <CookiesConsent v-if="!hasChoosenCookies || hasCookiesOpened" />
  </Transition>
</template>

<style></style>
