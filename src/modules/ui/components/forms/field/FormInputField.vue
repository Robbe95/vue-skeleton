<script setup lang="ts">
import type { Option } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'
import { useFormInputGroupContext } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'
import { generateUuid } from '@/helpers/uuid/generateUuid'

interface Props {
  modelValue: any
  hasSuccess?: boolean
  hasError?: boolean
  errorMessage?: string
  isReadOnly?: boolean
  isDisabled?: boolean
  placeholder?: string
  unit?: string
  type?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  hasSuccess: false,
  hasError: false,
  errorMessage: undefined,
  isReadOnly: false,
  isDisabled: false,
  placeholder: undefined,
  unit: undefined,
  type: 'text',
  label: undefined,
})

const emits = defineEmits(['update:modelValue', 'change', 'blur'])
const slots = useSlots()
const { placeholder, type, modelValue, isReadOnly, errorMessage, hasError, hasSuccess } = toRefs(props)

const borderColor = computed(() => {
  if (hasError.value)
    return 'border-danger-500'
  if (hasSuccess.value)
    return 'border-success-500'
  if (isReadOnly.value)
    return 'border-gray-300'
  return 'border-primary-500'
})

const model = computed({
  get() {
    return modelValue.value
  },
  set(value) {
    emits('update:modelValue', value)
    emits('change', value)
  },
})

// Group logic
const context = useFormInputGroupContext()
const element = ref<HTMLElement>()
const uuid = generateUuid()
const propsRef = computed(() => ({ value: model.value as number, disabled: props.isDisabled }))
const option: Option = ref({ id: uuid, element: element.value, propsRef: propsRef.value })

const change = (value: number): void => {
  if (props.isDisabled || !context)
    return
  const newValue = context.change(option, value)
  model.value = newValue
}

watch(
  () => model.value, (value) => {
    change(value)
  },
)

onMounted(() => {
  if (context)
    context.registerOption(option)
})
onUnmounted(() => {
  if (context)
    context.unregisterOption(uuid)
})
</script>

<template>
  <div ref="element" class="relative flex flex-col gap-1">
    <FormLabel for="input">
      <slot name="label" />
      <template v-if="!slots.label">
        {{ label }}
      </template>
    </FormLabel>
    <div
      class="flex border rounded"
      :class="[borderColor]"
    >
      <input
        id="input"
        v-model="model"
        :disabled="isDisabled"
        :type="type"
        min="0"
        class="relative w-full px-4 py-2 rounded"
        :placeholder="placeholder"
        :readonly="isReadOnly"
        @blur="emits('blur')"
      >

      <div
        v-if="unit"
        :class="[borderColor]"
        class="flex items-center px-3 bg-white border-l rounded rounded-l-none text-green-dark min-w-max"
      >
        {{ unit }}
      </div>
    </div>

    <!-- <FormError :error-message="errorMessage" /> -->
  </div>
</template>
