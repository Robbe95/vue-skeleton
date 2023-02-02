import type { InjectionKey } from 'vue'

type Key<T> = keyof T

interface TableOptions<T> {
  rowsPerPage: number
  sortableRows?: Key<T>[]
  filterableRows?: FilterableRow<T>[]
}

export interface TableStateDefinition {
  filters: Filter<any>[]
  sort(header: string): void
  sortableRows: Key<any>[]
  currentSort: CurrentSort<any>
}

export interface FilterableRow<T> {
  field: Key<T>
  type: 'dropdown' | 'input'
}

export interface CurrentSort<T> {
  field: Key<T> | null
  direction: 'asc' | 'desc'
}
export interface Filter<T> {
  field: Key<T> | 'global'
  type: 'dropdown' | 'input'
  value: string
  isEnabled: boolean
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
  const currentSort = ref<CurrentSort<T>>({ field: null, direction: 'asc' })

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
    if (currentSort.value.field === key) {
      tableData.value.reverse()
      currentSort.value.direction = currentSort.value.direction === 'asc' ? 'desc' : 'asc'
    }
    else {
      tableData.value = tableData.value.sort((a, b) => {
        if (a[key] < b[key])
          return -1
        if (a[key] > b[key])
          return 1
        return 0
      })
      currentSort.value.direction = 'asc'
    }
    currentSort.value.field = unref(ref(key))
  }

  const filters = ref<Filter<T>[]>([])
  const setupFilters = () => {
    if (options.filterableRows) {
      options.filterableRows.forEach((filter) => {
        filters.value.push({
          field: unref(ref(filter.field)),
          type: filter.type,
          value: '',
          isEnabled: true,
        })
      })
      filters.value.push({
        field: 'global',
        type: 'input',
        value: '',
        isEnabled: true,
      })
    }
  }

  const filteredData = computed(() => {
    if (filters.value.length > 0) {
      return tableData.value.filter((row) => {
        return filters.value.every((filter) => {
          if (!filter.isEnabled)
            return true
          if (filter.type === 'dropdown')
            return row[filter.field as keyof T] === filter.value
          else if (filter.type === 'input')
            return row[filter.field as keyof T].toLowerCase().includes(filter.value.toLowerCase())

          return false
        })
      })
    }
    return tableData.value
  })

  setupFilters()

  provide(TableContext, {
    sort,
    filters: filters.value ?? [],
    sortableRows: options.sortableRows ?? [],
    currentSort: currentSort.value,
  })

  return {
    tableHeaders,
    tableData,
    filteredData,
    rowsAmount,
    currentPage,
    currentTableData,
    nextPage,
    previousPage,
    paginationOptions,
    filters,
  }
}
