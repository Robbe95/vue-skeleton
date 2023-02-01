<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useSnackbar } from '@/modules/ui/composables/app/snackbar/useSnackbar'
import { data } from '@/helpers/example-data/tableData'
import { useTable } from '@/modules/ui/composables/app/table/useTable'
const { addSnackbar } = useSnackbar()
useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})

const { tableHeaders, currentTableData } = useTable(data, {
  sortableRows: ['address', 'name'],
  rowsPerPage: 2,
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
          <AppTableRow v-for="tableRow in currentTableData" :key="tableRow.name">
            <AppTableItem v-for="tableItem in tableRow" :key="tableItem">
              {{ tableItem }}
            </AppTableItem>
          </AppTableRow>
        </template>
      </AppTable>
    </div>
  </div>
</template>
