import type { ComputedRef, InjectionKey, Ref } from 'vue'

import type { PaginationNumber } from '../pagination/usePagination'
import { usePagination } from '../pagination/usePagination'

export type Key<T> = keyof T

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
  pagination: PaginationControls
}

export interface PaginationControls {
  rowsPerPage: number
  currentPage: Ref<number>
  nextPage(): void
  previousPage(): void
  setPage(page: number): void
  paginationOptions: ComputedRef<PaginationNumber[]>
}

export interface FilterableRow<T> {
  field: Key<T> | 'global'
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

  const fillEmptyData = () => {
    const emptyData = tableData.value[0]
    const emptyDataKeys = Object.keys(emptyData)
    tableData.value = tableData.value.map((row) => {
      emptyDataKeys.forEach((key) => {
        if (row[key] === undefined)
          row[key as keyof T] = '' as any
      })
      return row
    })
  }

  watch(() => data, () => {
    fillEmptyData()
  }, { deep: true })

  fillEmptyData()

  const tableHeaders = computed<Key<T>[]>(() => data.reduce((acc: Key<T>[], curr: T) => [...new Set([...acc, ...Object.keys(curr)])], []))
  const rowsAmount = computed(() => tableData.value.length)

  const currentSort = ref<CurrentSort<T>>({ field: null, direction: 'asc' })

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
    let filteredData = tableData.value.filter((row) => {
      const globalFilter = filters.value.find(filter => filter.field === 'global')
      if (!globalFilter?.isEnabled)
        return true
      if (globalFilter.type === 'input')
        return Object.values(row).some(value => value.toString().toLowerCase().includes(globalFilter.value?.toLowerCase()))
      else if (globalFilter.type === 'dropdown')
        return Object.values(row).includes((value: any) => value === globalFilter.value?.toLowerCase())
      return false
    })
    if (filters.value.length > 0) {
      filteredData = filteredData.filter((row) => {
        return filters.value.filter(filter => filter.field !== 'global').every((filter) => {
          if (!filter.isEnabled)
            return true
          if (filter.type === 'dropdown')
            return row[filter.field as keyof T] === filter.value
          else if (filter.type === 'input')
            return row[filter.field as keyof T]?.toLowerCase().includes(filter.value?.toLowerCase())

          return false
        })
      })
    }
    return filteredData
  })

  setupFilters()

  const {
    currentPage,
    nextPage,
    previousPage,
    paginatedData,
    paginationOptions,
    setPage,
  } = usePagination(filteredData, { rowsPerPage: options.rowsPerPage })

  provide(TableContext, {
    sort,
    filters: filters.value ?? [],
    sortableRows: options.sortableRows ?? [],
    currentSort: currentSort.value,
    pagination: {
      rowsPerPage: options.rowsPerPage,
      setPage,
      currentPage,
      nextPage,
      previousPage,
      paginationOptions,
    },
  })

  return {
    tableHeaders,
    tableData,
    filteredData,
    rowsAmount,
    currentPage,
    nextPage,
    previousPage,
    paginationOptions,
    filters,
    paginatedData,
    data,
    setPage,
  }
}
