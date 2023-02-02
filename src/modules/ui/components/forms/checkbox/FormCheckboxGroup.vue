<script setup lang="ts">
import { computed, provide } from 'vue'
import { CheckboxGroupContext } from '@/modules/ui/composables/forms/checkbox/useCheckboxContext'
import type { CheckboxStateDefinition } from '@/modules/ui/composables/forms/checkbox/useCheckboxContext'

interface Props {
  modelValue: any
  isDisabled?: boolean
  displayFunction?: (value: any) => string
  keyValue?: string
  hasLabels?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  hasLabels: false,
  displayFunction: (value: any) => value,
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => {
    return props.modelValue
  },
  set: (value: any) => emit('update:modelValue', value),
})

const compareFunction = (a: any, b: any): boolean => {
  if (props.keyValue)
    return a[props.keyValue] === b[props.keyValue]
  else
    return a === b
}

const removeValue = (value: any): void => {
  model.value = model.value.filter((singleValue: any) => !compareFunction(singleValue, value))
}

const defaultDisplayFunction = (value: any): any => value
const setupApi: CheckboxStateDefinition = {
  selectedValue: model,
  compareFunction,
  hasLabels: props.hasLabels,
  handleItemClicked: (value: any) => {
    if (model.value.some((singleValue: any) => compareFunction(singleValue, value)))
      removeValue(value)
    else
      model.value.push(value)
  },
  keyValue: computed(() => props.keyValue),
  displayFunction: computed(() => props.displayFunction ?? defaultDisplayFunction),
  isDisabled: computed(() => props.isDisabled),
}

provide(CheckboxGroupContext, setupApi)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
