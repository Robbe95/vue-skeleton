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
    <FormInputField v-model="value" :has-error="hasError" error-message="Error message" placeholder="placeohlder" @blur="setError">
      <template #label>
        Label
      </template>
      <template #front-content>
        <WarningIcon class="w-4" />
      </template>
      <template #back-content>
        <WarningIcon class="w-4" />
      </template>
    </FormInputField>
    <FormInputField v-model="value" :has-error="hasError" error-message="Error message" placeholder="placeohlder" @blur="setError">
      <template #label>
        Label
      </template>
      <template #front-content>
        <WarningIcon class="w-4" />
      </template>
      <template #back-content>
        <WarningIcon class="w-4" />
      </template>
    </FormInputField>
  </div>
</template>
