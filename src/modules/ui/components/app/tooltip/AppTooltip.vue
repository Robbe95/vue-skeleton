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
import { useMouseInElement, watchDebounced } from '@vueuse/core'
import { scaleBounceTransition } from '@/transitions'

interface SlotEvents {
  onBlur: () => void
  onFocus: () => void
  onKeydown: (event: KeyboardEvent) => void
}

interface Props {
  offset: number
  hasNoFlip: boolean
  hasNoShift: boolean
  placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
}

const props = withDefaults(defineProps<Props>(), {
  offset: 12,
  hasNoFlip: false,
  hasNoShift: false,
  placement: 'bottom',
})

defineSlots<{
  element: (props: { events: SlotEvents }) => any
  tooltip: (props: {}) => any
}>()

const tooltipSlot = ref()
const element = ref<HTMLElement>()
const tooltip = ref<HTMLElement>()
const tooltipWrapper = ref<HTMLElement>()

const { isOutside: tooltipWrapperOutside } = useMouseInElement(tooltipWrapper)
const { isOutside: tooltipOutside } = useMouseInElement(tooltip)

const update = (): void => {
  if (!element.value || !tooltip.value)
    return

  const middleware: Middleware[] = []

  if (props.offset)
    middleware.push(offset(props.offset))

  if (!props.hasNoFlip)
    middleware.push(flip())

  if (!props.hasNoShift)
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
const showTooltip = (): void => {
  tooltipShow.value = true

  nextTick(() => {
    update()
  })
}

const hideTooltip = (): void => {
  if (tooltipOutside.value && tooltipWrapperOutside.value)
    tooltipShow.value = false
}

onMounted(() => {
  hideTooltip();
  ([
    ['focus', showTooltip],
    ['blur', hideTooltip],
  ] as const).forEach(([event, listener]) => {
    if (!element.value)
      return
    element.value.addEventListener(event, listener)
  })
})

const handleEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape')
    hideTooltip()
}

watchDebounced(() => [tooltipOutside.value, tooltipWrapperOutside.value], () => {
  hideTooltip()
}, { debounce: 200, maxWait: 1000 })

watch(() => [tooltipOutside.value, tooltipWrapperOutside.value], () => {
  if (!tooltipOutside.value || !tooltipWrapperOutside.value)
    showTooltip()
})

const slotEvents = {
  onBlur: hideTooltip,
  onFocus: showTooltip,
  onKeydown: handleEscape,
}
</script>

<template>
  <div ref="tooltipWrapper" class="relative max-w-max">
    <div ref="element" class="grid max-w-max place-items-center">
      <slot name="element" :events="slotEvents" />
    </div>
    <Teleport to="body">
      <Transition v-bind="scaleBounceTransition">
        <div v-if="tooltipShow" id="tooltip" ref="tooltip" role="tooltip"
          :class="[tooltipSlot?.childElementCount === 0 ? 'opacity-0' : 'opacity-100']"
          class="absolute z-50 flex min-w-max rounded text-black shadow-main">
          <div ref="tooltipSlot" class="flex w-full max-w-[60ch] flex-col items-center justify-center">
            <slot name="tooltip" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
