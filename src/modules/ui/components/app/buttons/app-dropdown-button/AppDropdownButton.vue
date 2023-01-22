<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

import { Float, FloatArrow } from '@headlessui-float/vue'

interface Props {
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  transitionName?: string

  hasArrow?: boolean
  hasFlip?: boolean
  hasShift?: boolean
}

withDefaults(defineProps<Props>(), {
  hasFlip: true,
  hasShift: true,
  placement: 'bottom-start',
  transitionName: 'scale-bounce-transition',
  hasArrow: false,
})
</script>

<template>
  <Popover>
    <Float
      :flip="hasFlip"
      :shift="hasShift"
      :placement="placement"
      :transition-name="transitionName"
      :arrow="hasArrow"
      :offset="hasArrow ? 15 : 4"
    >
      <PopoverButton>
        <slot name="button" />
      </PopoverButton>

      <PopoverPanel v-slot="{ close }">
        <div v-if="hasArrow" class="absolute w-full h-full bg-white rounded shadow-main -z-10" />

        <FloatArrow v-if="hasArrow" class="absolute w-5 h-5 rotate-45 bg-white shadow-main -z-10" />
        <div class="z-50 flex flex-col gap-2 p-2 bg-white rounded shadow-main">
          <slot name="panel" :close="close" />
        </div>
      </PopoverPanel>
    </Float>
  </Popover>
</template>
