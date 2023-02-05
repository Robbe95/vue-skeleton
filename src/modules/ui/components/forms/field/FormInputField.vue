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

const emits = defineEmits<{
  (event: 'update:modelValue', value: any): void
  (event: 'change', value: any): void
  (event: 'blur'): void
}>()
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
  <div ref="element" class="relative">
    <FormLabel :for="uuid">
      <slot name="label" />
      <template v-if="!slots.label">
        {{ label }}
      </template>
    </FormLabel>
    <div class="flex ">
      <div v-if="slots['front-content']" class="px-4 bg-gray-200 flex rounded rounded-r-none border" :class="borderColor">
        <slot name="front-content" />
      </div>

      <div
        class="flex border rounded h-full"
        :class="[borderColor,
                 {
                   'border-l-0 rounded-l-none': slots['front-content'],
                   'border-r-0 rounded-r-none': slots['back-content'],
                 },
        ]"
      >
        <input
          :id="uuid"
          v-model="model"
          :disabled="isDisabled"
          :type="type"
          min="0"
          class="relative w-full px-4 py-2 rounded focus:placeholder:translate-x-1 placeholder:transition-all focus:placeholder:opacity-0 placeholder:duration-300"
          :placeholder="placeholder"
          :readonly="isReadOnly"
          @blur="emits('blur')"
        >

        <div
          v-if="unit"
          :class="[borderColor, {
            'border-r-0 rounded-r-none': slots['back-content'],
          }]"
          class="flex items-center px-3 bg-white border-l rounded rounded-l-none text-green-dark min-w-max"
        >
          {{ unit }}
        </div>
      </div>
      <div v-if="slots['back-content']" class="px-4 bg-gray-200 flex rounded rounded-l-none border" :class="borderColor">
        <slot name="back-content" />
      </div>
    </div>

    <TransitionExpand :duration="0.2">
      <p v-if="hasError">
        <span class="text-danger-500 text-sm">{{ errorMessage }}</span>
      </p>
    </TransitionExpand>

    <!-- <FormError :error-message="errorMessage" /> -->
  </div>
</template>
