<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})

const value = ref('')
const hasError = ref(false)
const setError = (): void => {
  hasError.value = true
}
</script>

<template>
  <div>
    <FormFileUpload />
  </div>
</template>
