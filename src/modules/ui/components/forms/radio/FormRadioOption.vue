<script setup lang="ts">
import {
  RadioGroupOption,
} from '@headlessui/vue'

interface Props {
  label?: string
  value: any
}
defineProps<Props>()
const slots = useSlots()
</script>

<template>
  <RadioGroupOption id="radio" v-slot="{ checked }" :value="value" class="flex items-center gap-2">
    <div class="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-primary-500 bg-white">
      <div class="h-2 w-2 rounded-full bg-primary-500 transition duration-300" :class="[checked ? 'scale-100' : 'scale-0']" />
    </div>
    <label for="radio">
      <template v-if="!slots.default && label">
        <span class="text-black">{{ label }}</span>
      </template>
      <slot />

    </label>
  </RadioGroupOption>
</template>
