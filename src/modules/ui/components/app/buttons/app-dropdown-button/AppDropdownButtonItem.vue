<script setup lang="ts">
import { PopoverButton } from '@headlessui/vue'
interface Props {
  hasArrow?: boolean
}
withDefaults(defineProps<Props>(),
  {
    hasArrow: false,
  },
)
const emit = defineEmits(['component:click'])
</script>

<template>
  <PopoverButton as="button" class="flex w-full min-w-40 items-center justify-between gap-2 rounded px-2 py-1 text-primary-500 hover:bg-primary-100" @click="emit('component:click')">
    <div>
      <slot />
    </div>
    <div v-if="hasArrow" class="w-2">
      <ChevronRightIcon />
    </div>
  </PopoverButton>
</template>
