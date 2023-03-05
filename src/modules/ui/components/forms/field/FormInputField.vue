<script setup lang="ts">
import type { Option } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'
import { useFormInputGroupContext } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'
import { generateUuid } from '@/helpers/uuid/generateUuid'

interface Props {
  modelValue: any
  hasSuccess?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  isTouched?: boolean
  isDirty?: boolean
  placeholder?: string
  unit?: string
  type?: string
  label?: string
  errors?: { _errors: string[] }
}

const props = withDefaults(defineProps<Props>(), {
  hasSuccess: false,
  isReadOnly: false,
  isDisabled: false,
  isTouched: false,
  isDirty: false,
  placeholder: undefined,
  unit: undefined,
  type: 'text',
  label: undefined,
  errors: () => ({ _errors: [] }),
})

const emits = defineEmits<{
  (event: 'update:modelValue', value: any): void
  (event: 'change', value: any): void
  (event: 'blur'): void
}>()

const slots = useSlots()
const { placeholder, type, modelValue, isReadOnly, errors, hasSuccess, isTouched, isDirty } = toRefs(props)

const errorShown = computed(() => errors.value._errors.length > 0 && (isTouched.value || isDirty.value))

const borderColor = computed(() => {
  if (errorShown.value)
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
// end group logic
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
      <div v-if="slots['front-content']" class="flex rounded rounded-r-none border bg-gray-200 px-4" :class="borderColor">
        <slot name="front-content" />
      </div>

      <div
        class="flex h-full rounded border"
        :class="[borderColor,
                 {
                   'rounded-l-none border-l-0': slots['front-content'],
                   'rounded-r-none border-r-0': slots['back-content'],
                 },
        ]"
      >
        <input
          :id="uuid"
          v-model="model"
          :disabled="isDisabled"
          :type="type"
          min="0"
          class="relative w-full rounded px-4 py-2 placeholder:transition-all placeholder:duration-300 focus:placeholder:translate-x-1 focus:placeholder:opacity-0"
          :placeholder="placeholder"
          :readonly="isReadOnly"
          @blur="emits('blur')"
        >

        <div
          v-if="unit"
          :class="[borderColor, {
            'rounded-r-none border-r-0': slots['back-content'],
          }]"
          class="flex min-w-max items-center rounded rounded-l-none border-l bg-white px-3 text-primary-500"
        >
          {{ unit }}
        </div>
      </div>
      <div v-if="slots['back-content']" class="flex rounded rounded-l-none border bg-gray-200 px-4" :class="borderColor">
        <slot name="back-content" />
      </div>
    </div>

    <TransitionExpand :duration="0.2">
      <p v-if="errorShown">
        <span class="text-sm text-danger-500">{{ errors._errors[0] }}</span>
      </p>
    </TransitionExpand>
  </div>
</template>
