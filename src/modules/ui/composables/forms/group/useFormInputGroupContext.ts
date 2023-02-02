import { inject } from 'vue'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type Option = Ref<{ id: string; element: HTMLElement | undefined; propsRef: { value: number; disabled: boolean } }>

export interface FormInputGroupStateDefinition {
  // State
  valueMeasurement?: ComputedRef<string>
  percentProgress?: ComputedRef<boolean>
  valueProgress?: ComputedRef<boolean>
  maxLabel?: ComputedRef<boolean>

  options: Ref<Option[]>
  maxValue: ComputedRef<number | undefined>
  valueUsed: ComputedRef<number>

  disabled: Ref<boolean>
  change(option: Option, newValue: number): number | null
  registerOption(action: Option): void
  unregisterOption(id: string): void
}

export const FormInputGroupContext = Symbol('FormGroupContext') as InjectionKey<FormInputGroupStateDefinition>

export const useFormInputGroupContext = (): FormInputGroupStateDefinition | null => {
  const context = inject(FormInputGroupContext, null)
  return context
}
