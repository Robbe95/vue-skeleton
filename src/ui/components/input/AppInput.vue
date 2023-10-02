<!-- eslint-disable-next-line vue/max-len -->
<script setup lang="ts" generic="T extends InputType">
import type { InputHTMLAttributes } from 'vue'

import {
  input,
  inputIcon,
  inputWrapper,
} from './appInput.style'
import type { Icon } from '@/ui/icons'
import type { InputType, InputValue } from '@/ui/types'

export interface Props<T extends InputType> extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'disabled'> {
  /**
   * The type of input for the component. Can be one of:
   * 'date', 'email', 'number', 'password', 'text', 'time', 'datetime-local'
   * Defaults to 'text'.
   */
  type?: T

  /**
   * Whether the input is disabled or not.
   * If true, the input is disabled and cannot be focused.
   */
  isDisabled?: boolean

  /**
   * Whether the input border should be red.
   */
  isInvalid?: boolean

  /**
   * The icon to display on the left side of the input.
   */
  iconLeft?: Icon | null

  /**
   * The icon to display on the right side of the input.
   */
  iconRight?: Icon | null
}

const props = withDefaults(defineProps<Props<T>>(), {
  // @ts-expect-error Yet another vue ts error
  type: 'text',
  isDisabled: false,
  isInvalid: false,
  iconLeft: null,
  iconRight: null,
})

const value = defineModel<InputValue<T>>({
  required: true,
})

const computedValue = computed<InputValue<T>>({
  get: () => value.value,
  set: (newValue: InputValue<T>) => {
    const { type } = props

    if (type === 'number')
      value.value = (newValue === '' ? '' : Number(newValue)) as InputValue<T>
    else
      value.value = newValue
  },
})

const isFocused = ref<boolean>(false)

const attrs = useAttrs()

const inputWrapperClasses = computed<string>(() => {
  const { isDisabled, isInvalid } = props

  return inputWrapper({
    isDisabled,
    isInvalid,
    isFocused: isFocused.value,
    class: attrs.class as string,
  })
})

const inputClasses = computed<string>(() => input())

const inputIconClasses = computed<string>(() => {
  const { isInvalid } = props

  return inputIcon({
    isInvalid,
  })
})

const inputAttrs = computed<Record<string, unknown>>(() => ({
  ...props,
  ...attrs,
  class: undefined,
}))

function onFocus(): void {
  isFocused.value = true
}

function onBlur(): void {
  isFocused.value = false
}
</script>

<template>
  <div :class="inputWrapperClasses">
    <slot name="left">
      <AppIcon
        v-if="iconLeft !== null"
        :icon="iconLeft"
        :class="inputIconClasses"
        class="ml-3"
      />
    </slot>

    <input
      v-model="computedValue"
      v-bind="inputAttrs"
      :disabled="isDisabled"
      :type="type as string"
      :class="inputClasses"
      @focus="onFocus"
      @blur="onBlur"
    >

    <slot name="right">
      <AppIcon
        v-if="iconRight !== null"
        :icon="iconRight"
        :class="inputIconClasses"
        class="mr-3"
      />
    </slot>
  </div>
</template>
