import { inject, provide } from 'vue'
import type { InjectionKey, Ref } from 'vue'

export interface FormSelectContext<T> {
  getDisplayValue: (value: T) => string
  value: Ref<T>
  search: Ref<string>
}

export const formSelectContext = Symbol('FormSelectContext') as InjectionKey<FormSelectContext<any>>

export function useFormSelectContext<T>(): FormSelectContext<T> {
  const context = inject(formSelectContext, null)
  if (!context)
    throw new Error('FormSelectContext not provided')

  return context
}

export function useProvideFormSelectContext<T>(context: FormSelectContext<T>): void {
  provide(formSelectContext, context)
}
