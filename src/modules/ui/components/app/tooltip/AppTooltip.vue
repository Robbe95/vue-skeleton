<script setup lang="ts">
import {
  onMounted,
  ref,

} from 'vue'

import type { Middleware } from '@floating-ui/dom'
import {
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom'

interface Props {
  offset: number
  hasFlip: boolean
  hasShift: boolean
  placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
}

const props = withDefaults(defineProps<Props>(), {
  offset: 12,
  hasFlip: true,
  hasShift: true,
  placement: 'bottom',
})

const tooltipSlot = ref()
const element = ref<HTMLElement | undefined>()
const tooltip = ref<HTMLElement | undefined>()
function update(): void {
  if (!element.value || !tooltip.value)
    return

  const middleware: Middleware[] = []

  if (props.offset)
    middleware.push(offset(props.offset))

  if (props.hasFlip)
    middleware.push(flip())

  if (props.hasShift)
    middleware.push(shift())

  computePosition(element.value, tooltip.value, {
    placement: props.placement,
    middleware,
  }).then(({ x, y }) => {
    if (!tooltip.value)
      return
    Object.assign(tooltip.value.style, {
      left: `${x}px`,
      top: `${y}px`,
    })
  })
}
const tooltipShow = ref(false)
function showTooltip(): void {
  tooltipShow.value = true

  nextTick(() => {
    update()
  })
}

function hideTooltip(): void {
  tooltipShow.value = false
}

onMounted(() => {
  hideTooltip();
  ([
    ['mouseenter', showTooltip],
    ['mouseleave', hideTooltip],
    ['focus', showTooltip],
    ['blur', hideTooltip],
  ] as const).forEach(([event, listener]) => {
    if (!element.value)
      return
    element.value.addEventListener(event, listener)
  })
})
</script>

<template>
  <div class="relative max-w-max">
    <div ref="element" class="grid place-items-center max-w-max">
      <slot name="element" />
    </div>
    <Transition name="scale-bounce-transition">
      <div
        v-if="tooltipShow"
        id="tooltip"
        ref="tooltip"
        :class="[tooltipSlot?.childElementCount === 0 ? 'opacity-0' : 'opacity-100']"
        class="absolute z-50 flex text-black rounded shadow-primary min-w-max"
      >
        <div ref="tooltipSlot" class="flex items-center justify-center flex-col w-full max-w-[60ch]">
          <slot name="tooltip" />
        </div>
      </div>
    </Transition>
  </div>
</template>
