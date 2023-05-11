<script setup lang="ts" generic="TModel extends string | number | null">
import { generateUuid } from '@/helpers/uuid/generateUuid'
import type { Option } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'
import { useFormInputGroupContext } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'

interface Props {
  hasSuccess?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  isTouched?: boolean
  isDirty?: boolean
  placeholder?: string
  unit?: string
  type?: 'number' | 'text' | 'password' | 'email' | 'tel' | 'url' | 'number'
  label?: string
  errors?: { _errors: string[] }
}

const {
  hasSuccess = false,
  isReadOnly = false,
  isDisabled = false,
  isTouched = false,
  isDirty = false,
  placeholder = undefined,
  unit = undefined,
  label = undefined,
  errors = { _errors: [] },
  type = 'text',
} = defineProps<Props>()

const emits = defineEmits<{
  change: [value: TModel]
  blur: []
}>()

const modelValue = defineModel<TModel>('modelValue', { required: true })

const slots = defineSlots<{
  label?: (props: {}) => any
  'front-content'?: (props: {}) => any
  'back-content'?: (props: {}) => any
}>()

const errorShown = computed(() => errors._errors.length > 0 && (isTouched || isDirty))

const borderColor = computed(() => {
  if (errorShown.value)
    return 'border-danger-500'
  if (hasSuccess)
    return 'border-success-500'
  if (isReadOnly)
    return 'border-gray-300'
  return 'border-primary-500'
})

// Group logic
const element = ref<HTMLElement>()
const uuid = generateUuid()

if (typeof modelValue.value === 'number') {
  const context = useFormInputGroupContext()
  const propsRef = computed(() => ({
    value: typeof modelValue.value === 'number' ? modelValue.value : 0,
    disabled: isDisabled,
  }))
  const option: Option = ref({ id: uuid, element: element.value, propsRef: propsRef.value })

  const change = (value: TModel): void => {
    if (isDisabled || !context || typeof value !== 'number')
      return
    const newValue = context.change(option, value) as TModel
    modelValue.value = newValue
  }

  watch(
    () => modelValue.value, (value) => {
      if (typeof value === 'number')
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
}
// end group logic
</script>

<template>
  <div ref="element" class="relative">
    <FormLabel :for="uuid">
      <slot name="label">
        {{ label }}
      </slot>
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
          v-model="modelValue"
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
