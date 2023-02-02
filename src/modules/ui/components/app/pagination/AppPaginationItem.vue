<script setup lang="ts">
import type { PaginationNumber } from '@/modules/ui/composables/app/pagination/usePagination'

interface Props {
  isDots?: boolean
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isDots: false,
  isActive: false,
})

const emit = defineEmits<{
  (event: 'component:click'): void
}>()
</script>

<template>
  <button
    :class="{
      'shadow-main border border-primary': !isDots,
      'bg-primary-500 shadow-primary-200 shad0w-lg text-white': isActive,
      'text-black': !isActive,

    }"
    class="w-8 h-8 rounded-md" @click="emit('component:click')"
  >
    <slot />
  </button>
</template>
