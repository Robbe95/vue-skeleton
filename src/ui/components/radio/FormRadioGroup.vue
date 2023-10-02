<script setup lang="ts">
import { computed } from 'vue'
import {
  RadioGroup, RadioGroupLabel,
} from '@headlessui/vue'

interface Props {
  label?: string
  modelValue: any
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
}>()

const slots = useSlots()

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div>
    <RadioGroup v-model="model">
      <div class="mb-2">
        <RadioGroupLabel>
          <template v-if="!slots.label && label">
            <span class="text-black">{{ label }}</span>
          </template>
          <slot name="label" />
        </RadioGroupLabel>
      </div>

      <slot />
    </RadioGroup>
  </div>
</template>
