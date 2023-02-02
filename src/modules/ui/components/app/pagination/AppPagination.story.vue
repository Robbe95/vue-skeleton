<script setup lang="ts">
import type { RandomData } from '@/helpers/example-data/tableData'
import { data } from '@/helpers/example-data/tableData'
import { usePagination } from '@/modules/ui/composables/app/pagination/usePagination'

const tableData = ref<RandomData[]>(data)

const { currentPage, paginationOptions, setPage } = usePagination(tableData.value, {
  rowsPerPage: 10,
})
</script>

<template>
  <Story
    title="App/Pagination/AppPagination"
  >
    <Variant title="Default">
      <AppPagination
        class="mt-1"
        :current-option="currentPage"
        :options="paginationOptions"
        @page:set="setPage"
      />
    </Variant>
  </Story>
</template>
