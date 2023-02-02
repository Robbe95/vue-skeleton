<script setup lang="ts">
import type { PaginationNumber } from '@/modules/ui/composables/app/pagination/usePagination'

const emit = defineEmits<{
  (event: 'component:click'): void
}>()
</script>

<template>
  <button class="w-8 h-8 bg-primary-500 text-white rounded-md" @click="emit('component:click')">
    <slot />
  </button>
</template>
