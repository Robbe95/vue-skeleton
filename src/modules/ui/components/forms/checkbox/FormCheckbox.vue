<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { Switch } from '@headlessui/vue'
import CheckmarkIcon from '@/components/icons/CheckmarkIcon.vue'
import { useCheckboxContext } from '@/modules/ui/composables/forms/checkbox/useCheckboxContext'
const props = withDefaults(defineProps<{
  modelValue?: boolean
  value?: any
  isDisabled?: boolean
}>(), {
  modelValue: false,
  value: null,
  isDisabled: false,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): () => void
}>()

const slots = useSlots()

const context = useCheckboxContext()

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  },
})

const isSelected = computed(() => {
  if (!context)
    return model.value
  else
    return !!context.selectedValue.value?.some((singleValue: any) => context.compareFunction(singleValue, props.value))
})

const handleClick = () => {
  if (context)
    context.handleItemClicked(props.value)
}
</script>

<template>
  <Switch
    id="switch"
    v-model="model"
    :value="value"
    class="flex gap-2 items-center"
    @click="handleClick"
  >
    <div
      class="rounded p-2 transition-colors border border-primary-500"
      :class="{
        'bg-white': isSelected,
        'bg-primary-100': !isSelected,
      }"
    >
      <CheckmarkIcon
        class="w-3 h-3 transition-opacity text-blue-primary"
        :class="{
          'text-primary-500': isSelected,
          'opacity-0': !isSelected,
        }"
      />
    </div>

    <label for="switch">
      <template v-if="!slots.default && context && context.hasLabels">
        <span class="text-black">{{ context?.displayFunction.value(value) }}</span>
      </template>
      <slot />

    </label>
  </Switch>
</template>
