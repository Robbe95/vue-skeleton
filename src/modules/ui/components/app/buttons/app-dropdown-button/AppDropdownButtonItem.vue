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
  <PopoverButton as="button" class="flex items-center justify-between w-full gap-2 px-2 py-1 rounded text-primary-500 hover:bg-primary-100 min-w-40" @click="emit('component:click')">
    <div>
      <slot />
    </div>
    <div v-if="hasArrow" class="w-2">
      <ChevronRightIcon />
    </div>
  </PopoverButton>
</template>
