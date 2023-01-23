<script setup lang="ts">
import type { FormInputGroupStateDefinition, Option } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'
import { FormInputGroupContext } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'

interface Props {
  disabled?: boolean
  valueMeasurement?: string
  percentProgress?: boolean
  valueProgress?: boolean
  totalValue?: number
  maxLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  percentProgress: false,
  valueProgress: false,
  valueMeasurement: '',
  maxLabel: false,
})

const options = ref<Option[]>([])

const setupApi: FormInputGroupStateDefinition = {
  options,
  maxLabel: computed(() => props.maxLabel),
  valueMeasurement: computed(() => props.valueMeasurement),
  percentProgress: computed(() => props.percentProgress),
  valueProgress: computed(() => props.valueProgress),
  maxValue: computed(() => props.totalValue),
  valueUsed: computed(() => options.value.reduce((acc, option) => {
    return acc + (option.value?.propsRef?.value ?? 0)
  }, 0)),
  disabled: computed(() => props.disabled),
  change(contextOption: Option, newValue: number): number | null {
    if (contextOption.value.propsRef.disabled)
      return null
    if (!props.totalValue)
      return newValue
    const maxAllowed = props.totalValue - (setupApi.valueUsed.value ?? 0) + (contextOption.value.propsRef.value ?? 0)
    const value = Math.min(newValue, maxAllowed)
    contextOption.value.propsRef.value = value
    return value
  },
  registerOption(action: Option) {
    options.value.push(action)
  },
  unregisterOption(id: string) {
    const idx = options.value.findIndex(slider => slider.value.id === id)
    if (idx === -1)
      return
    options.value.splice(idx, 1)
  },
}

provide(FormInputGroupContext, setupApi)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
