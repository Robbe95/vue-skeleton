<script setup lang="ts">
import { useTableContext } from '@/modules/ui/composables/app/table/useTableContext'

interface Props {
  hasPagination?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasPagination: false,
})

const { t } = useI18n()
const context = useTableContext()

const hasGlobalFilter = computed(() => {
  return !!context?.filters.find(filter => filter.field === 'global')
})

const filter = computed({
  get: () => context?.filters.find(filter => filter.field === 'global')?.value,
  set: (value) => {
    const relevantFilter = context?.filters.find(filter => filter.field === 'global')
    if (relevantFilter && value !== undefined)
      relevantFilter.value = value
  },
})

const isFilterEnabled = computed(() => {
  return context?.filters.find(filter => filter.field === 'global')?.isEnabled
})
const setFilterEnabled = (enabled: boolean): void => {
  const relevantFilter = context?.filters.find(filter => filter.field === 'global')
  if (relevantFilter)
    relevantFilter.isEnabled = enabled
}

const currentPage = computed(() => {
  return context?.pagination.currentPage.value
})

const pageOptions = computed(() => {
  return context?.pagination.paginationOptions.value
})

const setPage = (page: number): void => {
  context?.pagination.setPage(page)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-end mb-2">
      <FormInputField v-if="hasGlobalFilter" v-model="filter" :placeholder="t('label.filter')" />
      <AppIconButton @component:click="setFilterEnabled(!isFilterEnabled)">
        <FilterIcon v-if="isFilterEnabled" />
        <NoFilterIcon v-else />
      </AppIconButton>
    </div>
    <div class="relative overflow-x-auto rounded-lg">
      <table class="w-full text-sm text-left table-auto">
        <thead class="text-xs text-white uppercase bg-gray-700 sticky top-0">
          <slot name="header" />
        </thead>
        <tbody>
          <slot name="body" />
        </tbody>
      </table>
    </div>
    <AppPagination
      v-if="hasPagination && pageOptions && currentPage"
      class="mt-1"
      :current-option="currentPage"
      :options="pageOptions"
      @page:set="setPage"
    />
  </div>
</template>
