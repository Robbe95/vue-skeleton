import type { InjectionKey } from 'vue'

type Key<T> = keyof T

interface TableOptions<T> {
  rowsPerPage: number
  sortableRows?: Key<T>[]
}

export interface TableStateDefinition {
  sort(header: string): void
  sortableRows: Key<any>[]
}

export const TableContext = Symbol('TableContext') as InjectionKey<TableStateDefinition>

export const useTableContext = () => {
  const context = inject(TableContext, null)
  if (context === null) {
    const err = new Error('No useTableContext provided.)')
    console.error(err)
    throw err
  }

  return context
}

export const useTable = <T extends Record<string, any>>(data: T[], options: TableOptions<T> = ({ rowsPerPage: 10 })) => {
  const tableData = ref(data)

  const tableHeaders = computed<Key<T>[]>(() => data.reduce((acc: Key<T>[], curr: T) => [...new Set([...acc, ...Object.keys(curr)])], []))
  const rowsAmount = computed(() => tableData.value.length)

  const currentPage = ref(0)
  const rowsPerPage = ref(options.rowsPerPage)
  const currentSort = ref<Key<T> | null>(null)

  const currentTableData = computed(() => {
    const start = currentPage.value * rowsPerPage.value
    const end = start + rowsPerPage.value
    return tableData.value.slice(start, end)
  })

  const nextPage = () => {
    if (currentPage.value < rowsAmount.value / rowsPerPage.value - 1)
      currentPage.value++
  }

  const previousPage = () => {
    if (currentPage.value > 0)
      currentPage.value--
  }

  const paginationOptions = computed(() => {
    const options = []
    for (let i = 1; i <= rowsAmount.value / rowsPerPage.value; i++)
      options.push(i)

    return options
  })

  const sort = (key: Key<T>) => {
    if (currentSort.value === key) {
      tableData.value.reverse()
    }
    else {
      tableData.value = tableData.value.sort((a, b) => {
        if (a[key] < b[key])
          return -1
        if (a[key] > b[key])
          return 1
        return 0
      })
    }
    currentSort.value = unref(ref(key))
  }

  provide(TableContext, {
    sort,
    sortableRows: options.sortableRows ?? [],
  })

  return {
    tableHeaders,
    tableData,
    rowsAmount,
    currentPage,
    currentTableData,
    nextPage,
    previousPage,
    paginationOptions,
  }
}
