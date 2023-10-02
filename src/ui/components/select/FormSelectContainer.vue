<script setup lang="ts" generic="T, TModel extends T[] | T | undefined">
import { computed, ref } from 'vue'
import {
  Combobox,
} from '@headlessui/vue'
import { Float } from '@headlessui-float/vue'
import { scaleBounceTransition } from '@/ui/transitions'
import { useProvideFormSelectContext } from '@/ui/composables/select/useFormSelectContext'

interface Props {
  displayFunction?: (value: T) => string
  keyValue?: keyof T
  items: T[]
}

const {
  items,
  displayFunction = (value: T): string => {
    return String(value)
  },
} = defineProps<Props>()

const model = defineModel<TModel>('modelValue', { required: true })
const isMultiple = computed<boolean>(() => Array.isArray(model.value))
const search = ref<string>('')

function getDisplayValue(value: T | T[] | undefined): string {
  if (value === undefined)
    return ''

  else
    if (Array.isArray(value))
      return value.map(value => displayFunction(value)).join(', ')
    else
      return displayFunction(value)
}

const filteredItems = computed(() => {
  return items.filter((item) => {
    return getDisplayValue(item)?.toLowerCase().includes(search.value.toLowerCase())
  })
})

useProvideFormSelectContext({
  value: model,
  search,
  getDisplayValue,
})
</script>

<template>
  <!-- eslint-disable vue/no-extra-parens -->
  <!-- eslint-disable vue/valid-v-model -->

  <div class="text-left">
    <Combobox
      v-model="(model as any)"
      immediate
      :multiple="isMultiple"
    >
      <Float placement="bottom-start" adaptive-width :offset="4" flip v-bind="scaleBounceTransition">
        <slot :items="filteredItems" />
      </Float>
    </Combobox>
  </div>
</template>
