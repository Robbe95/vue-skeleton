<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useSnackbar } from '@/modules/ui/composables/app/snackbar/useSnackbar'
import { data } from '@/helpers/example-data/tableData'
import { useTable } from '@/modules/ui/composables/app/table/useTable'
useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})

const { tableHeaders, filteredData } = useTable(data, {
  sortableRows: ['postalZip', 'postalZip', 'email'],
  filterableRows: [{ field: 'email', type: 'input' }, { field: 'phone', type: 'input' }],
  rowsPerPage: 10,
})
</script>

<template>
  <div class="p-4">
    <div>
      <AppTable>
        <template #header>
          <AppTableRow is-header>
            <AppTableItem v-for="tableHeader in tableHeaders" :key="tableHeader" is-header>
              {{ tableHeader }}
            </AppTableItem>
          </AppTableRow>
        </template>
        <template #body>
          <AppTableRow v-for="tableRow in filteredData" :key="tableRow.name">
            <AppTableItem v-for="tableItem in tableRow" :key="tableItem">
              {{ tableItem }}
            </AppTableItem>
          </AppTableRow>
        </template>
      </AppTable>
    </div>
  </div>
</template>
