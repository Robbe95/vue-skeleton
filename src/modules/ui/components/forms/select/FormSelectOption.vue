<script setup lang="ts" generic="T">
import { ComboboxOption } from '@headlessui/vue'
import { useSelectContext } from '@/modules/ui/composables/forms/select/useFormSelectContext'
import { fadeTransition } from '@/transitions'

interface Props {
  value: T
}

const { value } = defineProps<Props>()
const slots = useSlots()
const context = useSelectContext<T>('FormSelectOptions')

const compareFunction = (a: any, b: any): boolean => {
  if (context.keyValue.value)
    return a[context.keyValue.value] === b[context.keyValue.value]
  else
    return a === b
}

const isSelected = computed(() => {
  if (context.hasMultiple.value)
    return !!(context.selectedValue.value as T[]).some((singleValue: T) => compareFunction(singleValue, value))
  else return compareFunction(context.selectedValue.value, value)
})

const isInSearchQuery = computed(() => {
  if (context.hasSearch.value && context.searchValue.value)
    return context.displayFunction.value(value).toLowerCase().includes(context.searchValue.value.toLowerCase())
  else return true
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-extra-parens -->
  <ComboboxOption v-if="isInSearchQuery" v-slot="{ active }" :value="(value as any)">
    <button
      class="flex w-full gap-2 rounded border border-transparent bg-white px-2 py-1 text-left text-black transition-all"
      :class="{ 'border-primary-500 bg-primary-100': active }"
    >
      <div v-if="context.hasMultiple.value" class="grid h-6 w-6 place-items-center rounded border border-primary-500 bg-white">
        <Transition v-bind="fadeTransition">
          <CheckmarkIcon v-if="isSelected" class="h-2 text-primary-500" />
        </Transition>
      </div>

      <slot v-if="slots.default" />
      <div v-else>
        {{ context.displayFunction.value(value as T) }}
      </div>
    </button>
  </ComboboxOption>
</template>
