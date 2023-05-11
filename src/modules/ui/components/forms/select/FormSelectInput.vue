<script setup lang="ts" generic="T">
import { ComboboxButton, ComboboxInput } from '@headlessui/vue'
import { useSelectContext } from '@/modules/ui/composables/forms/select/useFormSelectContext'
import { fadeTransition } from '@/transitions'

interface Props {
  placeholder: string
  selectedValue: T | T[]
}

const {
  placeholder,
  selectedValue,
} = defineProps<Props>()

const context = useSelectContext<T>('FormSelectInput')

const displayFunction = (value: T | T[]): string => {
  return context.displayFunction.value(value)
}

const handleChangeEvent = (event: Event): void => {
  context.searchValue.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <div>
    <label for="search" class="text-sm">
      <slot />
    </label>

    <div v-if="context.hasSearch.value" class="flex items-center justify-center text-black">
      <ComboboxInput id="search" :placeholder="placeholder"
        class="w-full rounded rounded-r-none border border-r-0 border-primary-500 px-4 py-2"
        :display-value="(displayFunction as any)" @change="handleChangeEvent" />
      <ComboboxButton class="h-auto rounded rounded-l-none border border-l-0 border-primary-500 bg-white p-2">
        <Transition v-bind="fadeTransition" mode="out-in">
          <div v-if="!context.isLoading.value" class="flex-none p-[0.15rem]">
            <SearchIcon v-if="context.hasSearch.value" class="h-4 flex-none" />
          </div>
          <div v-else class="h-4 flex-none">
            <AppLoader />
          </div>
        </Transition>
      </ComboboxButton>
    </div>
    <div v-else>
      <ComboboxButton
        class="flex w-full items-center justify-between rounded border border-primary-500 bg-white px-4 py-2 text-left">
        <div>
          {{ displayFunction(selectedValue as T | T[]) }}
        </div>
        <div class="h-full">
          <ChevronDownIcon class="h-4 flex-none" />
        </div>
      </ComboboxButton>
    </div>
  </div>
</template>
