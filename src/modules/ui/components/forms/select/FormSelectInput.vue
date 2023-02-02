<script setup lang="ts">
import { ComboboxButton, ComboboxInput } from '@headlessui/vue'
import { useSelectContext } from '@/modules/ui/composables/forms/select/useFormSelectContext'

interface Props {
  placeholder: string
}

defineProps<Props>()

const context = useSelectContext('FormSelectInput')

const displayFunction = (value: any): string => {
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
      <ComboboxInput
        id="search"
        :placeholder="placeholder"
        class="w-full px-4 py-2 border border-r-0 rounded rounded-r-none border-primary-500"
        :display-value="displayFunction"
        @change="handleChangeEvent"
      />
      <ComboboxButton class="h-auto p-2 bg-white border border-l-0 rounded rounded-l-none border-primary-500">
        <Transition name="fade" mode="out-in">
          <div v-if="!context.isLoading.value" class="flex-none p-[0.15rem]">
            <SearchIcon v-if="context.hasSearch.value" class="flex-none h-4" />
          </div>
          <div v-else class="flex-none h-4">
            <AppLoader />
          </div>
        </Transition>
      </ComboboxButton>
    </div>
    <div v-else>
      <ComboboxButton
        class="flex items-center justify-between w-full px-4 py-2 text-left bg-white border rounded border-primary-500"
      >
        <div>
          {{ displayFunction(context.selectedValue.value) }}
        </div>
        <div class="h-full">
          <ChevronDownIcon class="flex-none h-4" />
        </div>
      </ComboboxButton>
    </div>
  </div>
</template>
