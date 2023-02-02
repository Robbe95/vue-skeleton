<script setup lang="ts">
import type { PaginationNumber } from '@/modules/ui/composables/app/pagination/usePagination'
interface Props {
  options: PaginationNumber[]
  currentOption: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (event: 'page:next'): void
  (event: 'page:prev'): void
  (event: 'page:set', page: number): void
}>()

const setPage = (page: PaginationNumber): void => {
  if (typeof page === 'number')
    emit('page:set', page)
}

const currentSelectionPosition = computed(() => {
  return props.options.findIndex(option => typeof option === 'number')
})

watch(currentSelectionPosition, (position) => {
  if (position === 0)
    emit('page:prev')
  if (position === props.options.length - 1)
    emit('page:next')
})
const calculatedPostion = ref<string>()

const calculateNewPosition = (): void => {
  const getCurrentPosition = document.querySelector('.current-item')?.getBoundingClientRect()
  if (getCurrentPosition === undefined)
    return
  calculatedPostion.value = `left: ${getCurrentPosition.left}px`
}

watch(() => [props.currentOption, props.options], () => {
  nextTick(() => calculateNewPosition())
}, { deep: true })

onMounted(() => {
  calculateNewPosition()
})
</script>

<template>
  <div class="flex items-center justify-end gap-2">
    <AppPaginationItem is-active :style="calculatedPostion" class="absolute z-50 transition-all">
      {{ currentOption }}
    </AppPaginationItem>
    <AppPaginationItem
      v-for="option in options"
      :key="option"
      :class="{
        'current-item': currentOption === option,
      }"
      :is-dots="option === '...'"
      :value="option"
      @component:click="setPage(option)"
    >
      {{ option }}
    </AppPaginationItem>
  </div>
</template>
