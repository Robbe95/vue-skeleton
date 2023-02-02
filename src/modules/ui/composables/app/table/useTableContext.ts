import type { InjectionKey } from 'vue'
import type { CurrentSort, Filter, Key, PaginationControls } from './useTable'

export interface TableStateDefinition {
  filters: Filter<any>[]
  sort(header: string): void
  sortableRows: Key<any>[]
  currentSort: CurrentSort<any>
  pagination: PaginationControls
}

export const TableContext = Symbol('TableContext') as InjectionKey<TableStateDefinition>

export const useTableContext = (): TableStateDefinition | null => {
  const context = inject(TableContext, null)
  // if (context === null) {
  //   const err = new Error('No useTableContext provided.)')
  //   console.error(err)
  //   throw err
  // }

  return context
}
