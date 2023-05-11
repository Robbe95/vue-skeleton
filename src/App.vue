<script setup lang="ts">
import CookiesConsent from './components/cookies/CookiesConsent.vue'
import { hasChoosenCookies, hasCookiesOpened } from './composables/cookies/useCookiesConsent'
import { scaleBounceTransition } from './transitions'

const options1 = ['one', 'two', 'three', 'four', 'five']
const selectedOption1 = ref<string>('one')
const search1 = ref<string>('')

interface Option {
  label: string
  value: string
}
const selectedMultiple = ref<Option[]>([])

const options2: Option[] = [
  { label: 'one', value: 'one123' },
  { label: 'two', value: 'two12312312' },
  { label: 'three', value: 'thre3123e' },
  { label: 'four', value: 'four3123' },
  { label: 'five', value: 'f123123ve' },
]
</script>

<template>
  <RouterView />
  <AppButton @click="hasCookiesOpened = true">
    open cookies
  </AppButton>
  <Transition v-bind="scaleBounceTransition">
    <CookiesConsent v-if="!hasChoosenCookies || hasCookiesOpened" />
  </Transition>
  <!-- <FormSelect v-model="selectedMultiple" :display-function="(value: Option) => value" has-multiple key-value="value"> -->
  <FormSelect
    v-model="selectedMultiple"
    :display-function="(value: Option) => value.label"
    key-value="value"
  >
    <template #input>
      <FormSelectInput v-model="search1" placeholder="Select" />
    </template>
    <template #options>
      <FormSelectOption
        v-for="option in options2"
        :key="option.value"
        :value="option"
      />
    </template>
  </FormSelect>
</template>

<style></style>
