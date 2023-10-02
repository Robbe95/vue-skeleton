<script setup lang="ts">
import type { FloatProps } from '@headlessui-float/vue'
import { Float } from '@headlessui-float/vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { popoverTransition } from '@/ui/transitions'

export interface Props {
  placement?: FloatProps['placement']

  hasAdaptiveWidth?: FloatProps['adaptiveWidth']
  hasNoOffset?: boolean
  hasNoShift?: boolean
  hasNoFlip?: boolean
  hasAutoPlacement?: boolean
}

const {
  placement = 'bottom',

  hasAdaptiveWidth = false,
  hasAutoPlacement = false,
  hasNoFlip = false,
  hasNoOffset = false,
  hasNoShift = false,
} = defineProps<Props>()

const SHIFT_VALUE = 8
const OFFSET_VALUE = 4
const FLIP_VALUE = 8
</script>

<template>
  <Popover>
    <Float
      :placement="placement"
      :adaptive-width="hasAdaptiveWidth"
      :auto-placement="hasAutoPlacement"

      :flip="hasNoFlip ? undefined : FLIP_VALUE"
      :shift="hasNoShift ? undefined : SHIFT_VALUE"
      :offset="hasNoOffset ? undefined : OFFSET_VALUE"

      portal
      v-bind="popoverTransition"
      tailwindcss-origin-class
    >
      <PopoverButton as="div" class="max-w-max">
        <slot name="activator" />
      </PopoverButton>

      <PopoverPanel
        v-slot="{ close }"
        class="rounded-popover border border-border bg-popover px-4 py-3 text-popover-foreground shadow-popover-shadow"
      >
        <slot name="panel" :close="close" />
      </PopoverPanel>
    </Float>
  </Popover>
</template>
