<script setup lang="ts">
import type { PaginationNumber } from '@/modules/ui/composables/app/pagination/usePagination'
interface Props {
  options: PaginationNumber[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'page:next'): void
  (event: 'page:prev'): void
  (event: 'page:set', page: number): void
}>()

const setPage = (page: PaginationNumber) => {
  if (typeof page === 'number')
    emit('page:set', page)
}
</script>

<template>
  <div class="flex gap-12">
    <AppPaginationItem v-for="option in options" :key="option" :value="option" @component:click="setPage(option)">
      {{ option }}
    </AppPaginationItem>
  </div>
</template>
