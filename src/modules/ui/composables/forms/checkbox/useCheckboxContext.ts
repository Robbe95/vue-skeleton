import { inject } from 'vue'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface CheckboxStateDefinition {
  selectedValue: Ref<any>
  hasLabels: boolean
  displayFunction: Ref<(value: any) => string>
  keyValue: ComputedRef<string | undefined>
  compareFunction: (a: any, b: any) => boolean
  handleItemClicked: (value: any) => void
  isDisabled: ComputedRef<boolean>
}

export const CheckboxGroupContext = Symbol('CheckboxGroupContext') as InjectionKey<CheckboxStateDefinition>

export const useCheckboxContext = (): CheckboxStateDefinition | null => {
  const context = inject(CheckboxGroupContext, null)
  return context
}
