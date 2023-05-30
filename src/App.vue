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

const displayFunction = (value: Option | Option[]): string => {
  if (Array.isArray(value))
    return value.map(value => value.label).join(', ')

  return value.label
}
</script>

<template>
  <RouterView />
  <AppTooltip placement="left">
    <template #element="{ events }">
      <AppButton v-bind="events">
        Left
      </AppButton>
    </template>
    <template #tooltip>
      <div class="rounded bg-white p-2 shadow">
        <p class="text-sm text-gray-800">
          Left
        </p>
      </div>
    </template>
  </AppTooltip>

  <AppButton @click="hasCookiesOpened = true">
    open cookies
  </AppButton>
  <Transition v-bind="scaleBounceTransition">
    <CookiesConsent v-if="!hasChoosenCookies || hasCookiesOpened" />
  </Transition>
  <!-- <FormSelect v-model="selectedMultiple" :display-function="(value: Option) => value" has-multiple key-value="value"> -->
</template>

<style></style>
