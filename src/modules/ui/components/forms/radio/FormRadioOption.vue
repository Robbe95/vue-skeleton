<script setup lang="ts">
import {
  RadioGroupOption,
} from '@headlessui/vue'

interface Props {
  label?: string
  value: any
}
const props = defineProps<Props>()
const slots = useSlots()
</script>

<template>
  <RadioGroupOption id="radio" v-slot="{ checked }" :value="value" class="flex gap-2 items-center">
    <div class="border-primary-500 border bg-white rounded-full h-6 w-6 flex items-center justify-center flex-none">
      <div class="h-2 w-2 bg-primary-500 transition duration-300 rounded-full" :class="[checked ? 'scale-100' : 'scale-0']" />
    </div>
    <label for="radio">
      <template v-if="!slots.default && label">
        <span class="text-black">{{ label }}</span>
      </template>
      <slot />

    </label>
  </RadioGroupOption>
</template>
