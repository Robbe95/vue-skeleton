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
</script>

<template>
  <div>
    <FormInputField v-model="value">
      <template #front-content>
        <WarningIcon class="w-4" />
      </template>
      <template #back-content>
        <WarningIcon class="w-4" />
      </template>
    </FormInputField>
  </div>
</template>
