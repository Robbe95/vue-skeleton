<script setup lang="ts">
import type { RandomData } from '@/helpers/example-data/tableData'
import { data } from '@/helpers/example-data/tableData'
import type { FilterableRow, Key } from '@/modules/ui/composables/app/table/useTable'
import { useTable } from '@/modules/ui/composables/app/table/useTable'

const tableData = ref<RandomData[]>(data)
const sortableRows = ref<Key<RandomData>[]>(['postalZip', 'postalZip', 'email'])
const filterableRows = ref<FilterableRow<RandomData>[]>(
  [
    { field: 'email', type: 'input' },
    { field: 'phone', type: 'input' },
    { field: 'global', type: 'input' },
  ],
)
const { tableHeaders, paginatedData, provideData } = useTable(tableData.value, {
  sortableRows: sortableRows.value,
  filterableRows: filterableRows.value,
  rowsPerPage: 10,
})

const changeData = (): void => {
  tableData.value[0].name = 'Changed'
  tableData.value[0].otherStuff = 'Changed'
}

provideData()
</script>

<template>
  <Story
    title="App/Table/AppTable"
  >
    <Variant title="Default">
      <div class="p-4">
        <button @click="changeData">
          Change some stuff
        </button>
        <div>
          <AppTable has-pagination>
            <template #header>
              <AppTableRow is-header>
                <AppTableItem v-for="tableHeader in tableHeaders" :key="tableHeader" is-header>
                  {{ tableHeader }}
                </AppTableItem>
              </AppTableRow>
            </template>
            <template #body>
              <AppTableRow v-for="tableRow in paginatedData" :key="tableRow.name">
                <AppTableItem v-for="tableItem in tableRow" :key="tableItem">
                  {{ tableItem }}
                </AppTableItem>
              </AppTableRow>
            </template>
          </AppTable>
        </div>
      </div>
    </Variant>
  </Story>
</template>
