<script setup lang="ts">
import type { SortingState } from '@tanstack/vue-table'
import { FlexRender, createColumnHelper, getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import type { RandomData } from '@/helpers/example-data/tableData'
import { data } from '@/helpers/example-data/tableData'

const tableData = ref<RandomData[]>(data)

const columnHelper = createColumnHelper<RandomData>()

const columns = [
  columnHelper.group({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      columnHelper.accessor('name', {
        cell: info => info.getValue(),
        enableSorting: false,
        footer: props => props.column.id,
      }),
      columnHelper.accessor(row => row.phone, {
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => 'Last Name',
        footer: props => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Info',
    footer: props => props.column.id,
    columns: [
      columnHelper.accessor('country', {
        header: () => 'Country',
        footer: props => props.column.id,
      }),
      columnHelper.group({
        header: 'More Info',
        columns: [
          columnHelper.accessor('address', {
            header: () => 'Visits',
            enableSorting: true,
            cell: info => `${info.getValue().length} lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet `,
            footer: props => props.column.id,
          }),
          columnHelper.accessor('name', {
            header: 'Status',
            footer: props => props.column.id,
          }),
          columnHelper.accessor('postalZip', {
            header: 'Profile Progress',
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
  }),
]

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() {
    return tableData.value
  },
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value
      = typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
</script>

<template>
  <div class="block max-w-full  p-2">
    <table class="relative w-full border-collapse border-spacing-0">
      <thead class="sticky top-0 bg-white">
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            :class="
              header.column.getCanSort() ? 'cursor-pointer select-none' : ''
            "
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <template v-if="!header.isPlaceholder">
              <div
                class="flex justify-between px-4 text-left"
              >
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <div>
                  {{
                    { asc: ' 🔼', desc: ' 🔽' }[
                      header.column.getIsSorted() as string
                    ]
                  }}
                </div>
              </div>
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIndex) in table.getRowModel().rows" :key="row.id">
          <td
            v-for="(cell, index) in row.getVisibleCells()" :key="cell.id" class=" h-[1px] min-w-[20rem] p-0"
            :class="
              {
                'min-w-[25rem]': index === 0,
              }"
          >
            <AppTableCell
              class=" "
              :is-first-of-row="index === 0"
              :is-last-of-row="index === row.getVisibleCells().length - 1"
              :is-even="rowIndex % 2 === 0"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </AppTableCell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
