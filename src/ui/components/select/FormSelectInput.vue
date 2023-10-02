<script setup lang="ts">
import { ComboboxInput } from '@headlessui/vue'
import { computed } from 'vue'
import { useFormSelectContext } from '@/ui/composables/select/useFormSelectContext'

interface Props {
  isDisabled?: boolean
}

defineProps<Props>()
const { t } = useI18n()

const {
  getDisplayValue,
  search,
  value,
} = useFormSelectContext()

const hasValue = computed<boolean>(() => {
  if (Array.isArray(value.value))
    return value.value.length > 0
  else
    return value.value !== null && value.value !== undefined && value.value !== ''
})

function handleSearchChange(event: Event): void {
  search.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <ComboboxInput
    class="relative w-full rounded border border-border bg-input px-4 py-2 text-left placeholder:transition-all placeholder:duration-300 focus:placeholder:translate-x-1 focus:placeholder:opacity-0"
    :display-value="(item: any) => getDisplayValue(item as any)"
    :placeholder="hasValue ? getDisplayValue(value) : t('labels.select')" :disabled="isDisabled"
    @change="handleSearchChange"
  />
</template>
