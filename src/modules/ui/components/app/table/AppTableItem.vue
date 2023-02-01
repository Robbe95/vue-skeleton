<script setup lang="ts">
import { useTableContext } from '@/modules/ui/composables/app/table/useTable'
const props = withDefaults(defineProps<Props>(),
  {
    isHeader: false,
  },
)
const context = useTableContext()
interface Props {
  isHeader: boolean
}

const headerKey = getCurrentInstance()?.vnode.key as string
const sortableRows = computed(() => context?.sortableRows)

const isSortable = computed(() => {
  return sortableRows?.value.includes(headerKey)
})
const sort = () => {
  if (isSortable.value)
    context.sort(headerKey)
}
</script>

<template>
  <Component :is="isHeader ? 'th' : 'td'" scope="col" class="px-6 py-3 ">
    <div class="flex flex-row justify-between gap-2">
      <slot />
      <button v-if="isSortable" @click="sort">
        S
      </button>
    </div>
  </Component>
</template>
