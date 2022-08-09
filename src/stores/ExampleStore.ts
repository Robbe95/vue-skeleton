import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', () => {
  const example = ref(null)
  return {
    example,
  }
})
