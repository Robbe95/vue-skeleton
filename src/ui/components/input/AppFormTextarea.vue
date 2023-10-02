<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue'
import type { z } from 'zod'

import { textarea } from './appTextarea.style'
import { generateUuid } from '@/ui/utils/uuid/generateUuid'

export interface Props extends /* @vue-ignore */ Omit<TextareaHTMLAttributes, 'disabled'> {
  /**
   * The error messages associated with the component, if any.
   * It should be an object with an "_errors" property containing an array of strings.
   */
  errors?: z.ZodFormattedError<string> | undefined | null

  /**
   * The label to be displayed above the component.
   */
  label?: string | null

  /**
   * Determines if the component has emitted a `blur` event.
   */
  isTouched: boolean

  /**
   * Determines if the input is required.
   */
  isRequired?: boolean

  /**
   * Whether the input is disabled or not.
   * If true, the input is disabled and cannot be focused.
   */
  isDisabled?: boolean

  /**
   * The resize property specifies whether or not an element is resizable by the user.
   * It can be set to none, both, horizontal or vertical:
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | 'block' | 'inline'

  /**
   * The tailwind class to be applied to the textarea.
   */
  heightClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: null,
  isDisabled: false,
  isRequired: false,
  resize: 'none',
})

const value = defineModel<string | null>({
  required: true,
})

const id = `app-form-input-${generateUuid()}`
const attrs = useAttrs()

const isInvalid = computed<boolean>(() => {
  const { errors, isTouched } = props

  return isTouched && errors != null
})

const textareaAttrs = computed<Record<string, unknown>>(() => ({
  ...props,
  ...attrs,
  class: undefined,
}))

const textareaClasses = computed<string>(() => {
  const { isDisabled } = props

  return textarea({
    isDisabled,
    isInvalid: isInvalid.value,
  })
})
</script>

<template>
  <div>
    <AppFormLabel
      v-if="label !== null"
      :id="id"
      :label="label"
      :is-invalid="isInvalid"
      :is-required="isRequired"
      :is-disabled="isDisabled ?? false"
    />

    <textarea
      v-model="value"
      v-bind="textareaAttrs"
      :disabled="isDisabled"
      :class="[
        textareaClasses,
        heightClass,
        {
          'resize-none': resize === 'none',
          'resize-vertical': resize === 'vertical',
          'resize-horizontal': resize === 'horizontal',
          'resize-both': resize === 'both',
        },
      ]"
    />

    <AppFormError
      :is-touched="isTouched"
      :errors="errors"
    />
  </div>
</template>
