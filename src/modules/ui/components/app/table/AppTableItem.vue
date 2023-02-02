<script setup lang="ts">
import FormInputField from '../../forms/field/FormInputField.vue'
import { useTableContext } from '@/modules/ui/composables/app/table/useTable'
interface Props {
  isHeader?: boolean
}
const props = withDefaults(defineProps<Props>(),
  {
    isHeader: false,
  },
)
const { t } = useI18n()
const context = useTableContext()

const headerKey = getCurrentInstance()?.vnode.key as string

// Sort
const sortableRows = computed(() => context?.sortableRows)
const currentSort = computed(() => context?.currentSort)
const isSortable = computed(() => {
  return sortableRows?.value.includes(headerKey)
})
const sort = () => {
  if (isSortable.value)
    context.sort(headerKey)
}

// Filter
const filter = computed({
  get: () => context?.filters.find(filter => filter.field === headerKey)?.value,
  set: (value) => {
    const relevantFilter = context.filters.find(filter => filter.field === headerKey)
    if (relevantFilter && value !== undefined)
      relevantFilter.value = value
  },
})

const isFilterEnabled = computed(() => {
  return context?.filters.find(filter => filter.field === headerKey)?.isEnabled
})
const setFilterEnabled = (enabled: boolean) => {
  const relevantFilter = context.filters.find(filter => filter.field === headerKey)
  if (relevantFilter)
    relevantFilter.isEnabled = enabled
}

const isFilterable = computed(() => {
  return !!context?.filters.find(filter => filter.field === headerKey)
})
</script>

<template>
  <Component :is="isHeader ? 'th' : 'td'" scope="col" class="px-6 py-3 h-[1px]">
    <div class="flex flex-col gap-2 h-full">
      <div class="flex flex-row justify-between gap-2 items-start h-full">
        <slot />
        <AppIconButton v-if="isSortable" @component:click="sort">
          <SortAscendingIcon v-if="currentSort.field === headerKey && currentSort.direction === 'asc'" />
          <SortDescendingIcon v-else />
        </AppIconButton>
      </div>
      <div v-if="isFilterable" class="flex gap-2 items-center">
        <FormInputField v-model="filter" :placeholder="t('label.filter')" class="text-black w-full" />
        <AppIconButton @component:click="setFilterEnabled(!isFilterEnabled)">
          <FilterIcon v-if="isFilterEnabled" />
          <NoFilterIcon v-else />
        </AppIconButton>
      </div>
    </div>
  </Component>
</template>
