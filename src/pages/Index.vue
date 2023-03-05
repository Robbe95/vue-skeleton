<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { decodeCredential } from 'vue3-google-login'
useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})

const isLoading = ref(false)
const callback = (response: any): void => {
  console.log(response)
  const userData = decodeCredential(response.credential)
  console.log('Handle the userData', userData)
}
</script>

<template>
  <div>
    <AppButton @component:click="isLoading = !isLoading">
      Dit is een button
    </AppButton>
    <AppButton :is-ready="isLoading">
      Dit is een button
    </AppButton>
    <FormFileUpload />
    <GoogleLogin :callback="callback" prompt auto-login />
  </div>
</template>
