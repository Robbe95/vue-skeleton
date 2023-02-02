<script setup lang="ts">
import { ComboboxOption } from '@headlessui/vue'
import { useSelectContext } from '@/modules/ui/composables/forms/select/useFormSelectContext'

interface Props {
  value: any
}

const props = defineProps<Props>()
const slots = useSlots()
const context = useSelectContext('FormSelectOptions')

const compareFunction = (a: any, b: any): boolean => {
  if (context.keyValue.value)
    return a[context.keyValue.value] === b[context.keyValue.value]
  else
    return a === b
}

const isSelected = computed(() => {
  if (context.hasMultiple.value)
    return !!context.selectedValue.value.some((singleValue: any) => compareFunction(singleValue, props.value))
  else return compareFunction(context.selectedValue.value, props.value)
})

const isInSearchQuery = computed(() => {
  if (context.hasSearch.value && context.searchValue.value)
    return context.displayFunction.value(props.value).toLowerCase().includes(context.searchValue.value.toLowerCase())
  else return true
})
</script>

<template>
  <ComboboxOption v-if="isInSearchQuery" v-slot="{ active }" :value="value">
    <button
      class="flex w-full gap-2 px-2 py-1 text-left text-black transition-all bg-white border border-transparent rounded"
      :class="{ 'border-primary-500 bg-primary-100': active }"
    >
      <div v-if="context.hasMultiple.value" class="grid w-6 h-6 bg-white border rounded border-primary-500 place-items-center">
        <Transition name="fade">
          <CheckmarkIcon v-if="isSelected" class="h-2 text-primary-500" />
        </Transition>
      </div>

      <slot v-if="slots.default" />
      <div v-else>
        {{ context.displayFunction.value(props.value) }}
      </div>
    </button>
  </ComboboxOption>
</template>
