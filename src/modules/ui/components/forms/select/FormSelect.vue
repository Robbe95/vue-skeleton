<script setup lang="ts">
import { Float } from '@headlessui-float/vue'
import { Combobox, ComboboxOptions } from '@headlessui/vue'
import type { SelectStateDefinition } from '@/modules/ui/composables/forms/select/useFormSelectContext'
import { SelectGroupContext } from '@/modules/ui/composables/forms/select/useFormSelectContext'

interface Props {
  modelValue: any

  hasMultiple: boolean
  hasSearch: boolean
  hasPills: boolean
  isDisabled: boolean
  isSearching: boolean
  isEmpty: boolean
  isLoading: boolean

  displayFunction?: (value: any) => string
  keyValue?: string
}

const props = withDefaults(defineProps<Props>(), {

  hasMultiple: false,
  hasSearch: false,
  hasPills: false,
  isDisabled: false,
  isSearching: false,
  isEmpty: false,
  isLoading: false,

  displayFunction: (value: any) => value,
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

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

const setupApi: SelectStateDefinition = {
  selectedValue: model,
  keyValue: computed(() => props.keyValue),
  displayFunction: computed(() => props.displayFunction),

  isDisabled: computed(() => props.isDisabled),
  isSearching: computed(() => props.isSearching),
  isEmpty: computed(() => props.isEmpty),
  isLoading: computed(() => props.isLoading),

  hasSearch: computed(() => props.hasSearch),
  hasMultiple: computed(() => props.hasMultiple),
  searchValue: ref(''),
}

provide(SelectGroupContext, setupApi)
</script>

<template>
  <div class="w-full">
    <Combobox v-model="model" :multiple="hasMultiple">
      <Float placement="bottom-start" adaptive-width :offset="4" flip>
        <div class="flex h-24 p-3 ml-4 text-gray-700 border-2 border-gray-300 shadow-md">
          <slot name="input" />
        </div>
        <ComboboxOptions>
          <div class="bg-white border rounded border-primary-500 ">
            <div class="w-full p-2 rounded">
              <TransitionExpand>
                <div v-if="isLoading" class="flex items-center justify-center w-full">
                  <AppLoader class="w-16 h-16" />
                </div>
                <div v-else-if="isEmpty " class="w-full">
                  {{ t('labels.no_results') }}
                </div>
                <div v-else class="flex flex-col w-full gap-1">
                  <slot name="options" />
                </div>
              </TransitionExpand>
            </div>
          </div>
        </ComboboxOptions>
      </Float>
    </Combobox>
    <div v-if="hasMultiple && hasPills" class="flex flex-wrap gap-1 mt-1">
      <div v-for="singleValue in model" :key="keyValue ? singleValue[keyValue] : singleValue">
        <AppPill :key="singleValue" is-active class="max-w-max" has-close @component:remove="removeValue(singleValue)">
          {{ displayFunction(singleValue) }}
        </AppPill>
      </div>
    </div>
  </div>
</template>
