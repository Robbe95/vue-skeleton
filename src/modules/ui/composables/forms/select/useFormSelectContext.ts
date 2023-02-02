import { inject } from 'vue'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type SelectOption = Ref<{ id: string; element: HTMLElement | null; propsRef: { value: any; disabled: boolean } }>
export type SelectInput = Ref<{ id: string; element: HTMLElement | null; propsRef: { search: string; disabled: boolean } }>

export interface SelectStateDefinition {
  selectedValue: Ref<any>
  displayFunction: Ref<(value: unknown) => string>
  searchValue: Ref<string | undefined>

  keyValue: ComputedRef<string | undefined>
  isSearching: ComputedRef<boolean>
  isEmpty: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  isLoading: ComputedRef<boolean>
  hasMultiple: ComputedRef<boolean>
  hasSearch: ComputedRef<boolean>

}

export const SelectGroupContext = Symbol('SelectGroupContext') as InjectionKey<SelectStateDefinition>

export const useSelectContext = (component: string): SelectStateDefinition => {
  const context = inject(SelectGroupContext, null)

  if (context === null) {
    const err = new Error(`<${component} /> is missing a parent <FormSelect /> component.`)
    throw err
  }

  return context
}
