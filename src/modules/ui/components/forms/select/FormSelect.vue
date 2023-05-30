<script setup lang="ts" generic="T, TMultiple = boolean, TModel = TMultiple extends true ? T[] : T ">
import { Float } from '@headlessui-float/vue'
import { Combobox, ComboboxOptions } from '@headlessui/vue'
import type { SelectStateDefinition } from '@/modules/ui/composables/forms/select/useFormSelectContext'
import { SelectGroupContext } from '@/modules/ui/composables/forms/select/useFormSelectContext'

interface Props {
  modelValue: TModel
  hasMultiple?: TMultiple
  hasSearch?: boolean
  hasPills?: boolean
  isDisabled?: boolean
  isSearching?: boolean
  isEmpty?: boolean
  isLoading?: boolean
  displayFunction?: (value: T | T[]) => string
  keyValue?: keyof T
  items: T[]
}

const {
  modelValue,
  items,
  hasMultiple = false,
  hasSearch = false,
  hasPills = false,
  isDisabled = false,
  isSearching = false,
  isEmpty = false,
  isLoading = false,
  keyValue,
  displayFunction = (value: T | T[]): string => {
    if (Array.isArray(value))
      return value.map(value => String(value)).join(', ')
    return String(value)
  },
} = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: TModel]
}>()

// const model = defineModel<TModel>('modelValue', { required: true })
const model = computed({
  get: () => modelValue,
  set: (value: TModel) => {
    emit('update:modelValue', value)
  },
})

const { t } = useI18n()

const compareFunction = (a: T, b: T): boolean => {
  if (keyValue)
    return a[keyValue] === b[keyValue]
  else
    return a === b
}

const removeValue = (value: T): void => {
  if (hasMultiple && Array.isArray(model.value))
    model.value = model.value.filter((singleValue: T) => !compareFunction(singleValue, value)) as TModel
}

const setupApi: SelectStateDefinition<T> = {
  selectedValue: model as Ref<T | T[]>,
  keyValue: computed(() => keyValue),
  displayFunction: computed(() => displayFunction),

  isDisabled: computed(() => isDisabled),
  isSearching: computed(() => isSearching),
  isEmpty: computed(() => isEmpty),
  isLoading: computed(() => isLoading),

  hasSearch: computed(() => hasSearch),
  hasMultiple: computed(() => hasMultiple as boolean),
  searchValue: ref(''),
}

provide(SelectGroupContext, setupApi)
</script>

<template>
  <div class="w-full">
    <!-- eslint-disable vue/valid-v-model -->
    <!-- eslint-disable vue/no-extra-parens -->
    <Combobox v-model="(model as any)" :multiple="(hasMultiple as boolean)">
      <Float placement="bottom-start" adaptive-width :offset="4" flip>
        <div class="flex w-auto max-w-max text-gray-700">
          <slot name="input" :selected-value="model" />
        </div>
        <ComboboxOptions>
          <div class="min-w-min rounded border border-primary-500 bg-white">
            <div class="w-full rounded p-2">
              <TransitionExpand>
                <div v-if="isLoading" class="flex w-full items-center justify-center">
                  <AppLoader class="h-16 w-16" />
                </div>
                <div v-else-if="isEmpty" class="w-full whitespace-nowrap">
                  {{ t('labels.no_results') }}
                </div>
                <div v-else class="flex w-full flex-col gap-1">
                  <template v-for="item in items" :key="keyValue ? item[keyValue] : item">
                    <slot name="item" :item="item" />
                  </template>
                </div>
              </TransitionExpand>
            </div>
          </div>
        </ComboboxOptions>
      </Float>
    </Combobox>
    <div v-if="hasMultiple && hasPills && Array.isArray(model)" class="mt-1 flex flex-wrap gap-1">
      <div v-for="singleValue in model" :key="keyValue ? (singleValue as any)[keyValue] : singleValue">
        <AppPill :key="singleValue" is-active class="max-w-max" has-close @component:remove="removeValue(singleValue)">
          {{ displayFunction(singleValue) }}
        </AppPill>
      </div>
    </div>
  </div>
</template>
