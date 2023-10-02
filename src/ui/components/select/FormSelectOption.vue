<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { formSelectOptionVariants } from '@/ui/components/select/formSelect.style'
import type { FormSelectOptionProps } from '@/ui/components/select/formSelect.style'
import { useFormSelectContext } from '@/ui/composables/select/useFormSelectContext'

interface Props {
  value: T
  isActive?: boolean
  isSelected?: boolean
  isDisabled?: boolean
}

const {
  value,
  isActive = false,
  isSelected = false,
  isDisabled = false,
} = defineProps<Props>()

const optionStatus = computed<FormSelectOptionProps['variant']>(() => {
  if (isDisabled)
    return 'disabled'
  else
    return 'default'
})

const { getDisplayValue } = useFormSelectContext()
</script>

<template>
  <button :class="formSelectOptionVariants({ variant: optionStatus, selected: isSelected, active: isActive })">
    {{ getDisplayValue(value) }}
  </button>
</template>
