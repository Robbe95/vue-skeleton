<script setup lang="ts" generic="T">
import FormSelectContainer from '@/ui/components/select/FormSelectContainer.vue'
import FormSelectInput from '@/ui/components/select/FormSelectInput.vue'
import FormSelectOption from '@/ui/components/select/FormSelectOption.vue'
import FormSelectOptions from '@/ui/components/select/FormSelectOptions.vue'

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

const model = defineModel<T | T[]>('modelValue')
</script>

<template>
  <FormSelectContainer
    v-slot="{ items: slotItems }"
    v-model="model"
    :items="items"
    :display-function="displayFunction"
  >
    <FormSelectInput />
    <FormSelectOptions v-slot="{ item, active, disabled, selected }" :items="slotItems">
      <slot>
        <FormSelectOption
          :value="item"
          :is-active="active"
          :is-disabled="disabled"
          :is-selected="selected"
        />
      </slot>
    </FormSelectOptions>
  </FormSelectContainer>
</template>
