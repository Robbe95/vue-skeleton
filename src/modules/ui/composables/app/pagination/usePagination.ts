import type { ComputedRef, Ref } from 'vue'

export interface PaginationOptions {
  rowsPerPage: number
}
export type PaginationNumber = number | '...'
export const usePagination = <T>(inputData: T[] | Ref<T[]>, options: PaginationOptions = { rowsPerPage: 10 }): {
  currentPage: Ref<number>
  rowsPerPage: Ref<number>
  rowsAmount: Ref<number>
  nextPage: () => void
  previousPage: () => void
  paginationOptions: Ref<PaginationNumber[]>
  maxPage: Ref<number>
  paginatedData: Ref<T[]>
  setPage: (page: number) => void
} => {
  const data = ref(inputData) as Ref<T[]>
  const currentPage = ref(1)
  const rowsPerPage = ref(options.rowsPerPage)
  const rowsAmount = ref(0)
  const maxPage = computed(() => {
    return Math.ceil(data.value?.length / rowsPerPage.value)
  })
  const nextPage = (): void => {
    if (currentPage.value < rowsAmount.value / rowsPerPage.value - 1)
      currentPage.value++
  }
  const previousPage = (): void => {
    if (currentPage.value > 0)
      currentPage.value--
  }
  const setPage = (page: number): void => {
    if (page >= 0 && page <= maxPage.value)
      currentPage.value = page
  }

  const paginationOptions = computed<PaginationNumber[]>(() => {
    const delta = 2
    const left = currentPage.value - delta
    const right = currentPage.value + delta + 1
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= maxPage.value; i++) {
      if ((i === 1 || i === maxPage.value) || (i >= left && i < right))
        range.push(i)
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2)
          rangeWithDots.push(l + 1)

        else if (i - l !== 1)
          rangeWithDots.push('...')
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots as PaginationNumber[]
  })

  const paginatedData = computed<T[]>(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value
    const end = start + rowsPerPage.value
    return data.value?.slice(start, end)
  }) as ComputedRef<T[]>

  return {
    currentPage,
    rowsPerPage,
    rowsAmount,
    nextPage,
    previousPage,
    paginationOptions,
    maxPage,
    paginatedData,
    setPage,
  }
}
