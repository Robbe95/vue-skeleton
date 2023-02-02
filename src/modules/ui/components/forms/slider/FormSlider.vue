<script setup lang="ts">
import { onKeyStroke, useElementBounding, useFocus, useMouse, useMousePressed } from '@vueuse/core'
import { generateUuid } from '@/helpers/uuid/generateUuid'
import { useFormInputGroupContext } from '@/modules/ui/composables/forms/group/useFormInputGroupContext'

interface Props {
  min?: number
  max?: number
  disabledValue?: number
  isDisabled?: boolean
  step?: number
  modelValue: number
  percentProgress?: boolean
  valueProgress?: boolean
  valueMeasurement?: string
  maxLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  isDisabled: false,
  percentProgress: false,
  valueProgress: false,
  valueMeasurement: '',
  maxLabel: false,
})
const emit = defineEmits(['update:modelValue'])
const { x } = useMouse()

// Group logic
const uuid = generateUuid()

const context = useFormInputGroupContext()
const optionRef = ref<HTMLElement>()

const sliderValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const propsRef = computed(() => ({ value: sliderValue.value, disabled: props.isDisabled }))
const option = ref({ id: uuid, element: optionRef.value, propsRef: propsRef.value })

const change = (value: number): void => {
  if (props.isDisabled || !context)
    return
  const newValue = context.change(option, value)
  if (newValue)
    sliderValue.value = newValue
}

watch(
  () => sliderValue.value, (value) => {
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
const totalFree = computed(() => {
  if (context)
    return (context?.maxValue?.value ?? 0) - context.valueUsed.value + sliderValue.value
  return null
})

// Slider logic
const disabledAmount = computed(() => totalFree.value ?? props.disabledValue ?? props.max)
const maxAmount = computed(() => context?.maxValue?.value ?? props.max)
const sliderButton = ref<HTMLElement>()
const slider = ref<HTMLElement>()
const { pressed } = useMousePressed({ target: sliderButton })
const { focused } = useFocus(sliderButton)

const sliderWidth = computed(() => slider.value?.clientWidth ?? 0)
const pressedMouseInitialX = ref(0)
const pressedMouseInitialValue = ref(props.modelValue)

const model = computed({
  get: () => props.modelValue,
  set: (value: number) => {
    emit('update:modelValue', value)
  },
})

const updateValue = (value: number): void => {
  if (props.isDisabled)
    return
  const remainder = value % props.step
  const newValueRounded = value - remainder
  const actualMaxValue = Math.min(maxAmount.value, disabledAmount.value)
  model.value = Math.max(props.min, Math.min(newValueRounded, actualMaxValue))
}

onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault()
  if (focused.value) {
    const newValue = model.value - props.step
    updateValue(newValue)
  }
})

onKeyStroke('ArrowRight', (e) => {
  e.preventDefault()
  if (focused.value) {
    const newValue = model.value + props.step
    updateValue(newValue)
  }
})

watch(pressed, (value) => {
  if (value) {
    pressedMouseInitialX.value = x.value
    pressedMouseInitialValue.value = model.value
  }
})

const handleMouseMovement = (mouseMovement: number): void => {
  const valueRange = maxAmount.value - props.min
  const pixelsPerValue = sliderWidth.value / valueRange
  const valueDelta = mouseMovement / pixelsPerValue
  const newValue = pressedMouseInitialValue.value + valueDelta
  updateValue(newValue)
}

const sliderButtonStyle = computed(() => {
  const valueRange = maxAmount.value - props.min
  const pixelsPerValue = sliderWidth.value / valueRange
  const valueDelta = model.value - props.min
  const left = valueDelta * pixelsPerValue
  return {
    left: `${left - 8}px`,
  }
})

watch(x, (value) => {
  if (!pressed.value)
    return
  const mouseMovement = value - pressedMouseInitialX.value
  handleMouseMovement(mouseMovement)
})

const leftSliderWidth = computed(() => {
  const valueRange = maxAmount.value - props.min
  const pixelsPerValue = sliderWidth.value / valueRange
  const valueDelta = model.value - props.min
  const leftWidth = valueDelta * pixelsPerValue
  return leftWidth
})

const disabledValueSliderWidth = computed(() => {
  const valueRange = maxAmount.value - props.min
  const pixelsPerValue = sliderWidth.value / valueRange
  const valueDelta = (maxAmount.value - disabledAmount.value)
  const disabledWidth = valueDelta * pixelsPerValue
  return isNaN(disabledWidth) ? 0 : disabledWidth
})

const rightSliderWidth = computed(() => {
  const valueRange = maxAmount.value - props.min
  const pixelsPerValue = sliderWidth.value / valueRange
  const valueDelta = maxAmount.value - model.value
  const rightWidth = valueDelta * pixelsPerValue
  return rightWidth
})

const handleLabelClick = (): void => {
  if (props.isDisabled)
    return
  sliderButton.value?.focus()
}

const progressElement = ref<HTMLElement>()
const maxLabelElement = ref<HTMLElement>()

const { left: maxLabelLeft } = useElementBounding(maxLabelElement)
const { right: progressRight } = useElementBounding(progressElement)
const isProgressOverMaxLabel = computed(() => progressRight.value > maxLabelLeft.value)
</script>

<template>
  <div class="relative">
    <label class="text-primary-500" @click="handleLabelClick">
      <slot />
    </label>
    <div class="px-4 py-5 border rounded border-primary-500">
      <div ref="slider" class="relative flex flex-row items-center justify-center">
        <div class="h-1 rounded-full bg-primary-500" :style="`width: ${leftSliderWidth}px`">
          <button id="sliderButton" ref="sliderButton" class="slider-button border-[0.25rem] rounded-full border-primary-500 bg-white h-4 w-4 absolute z-10 top-1/2 -translate-y-1/2 focus:border-primary-500" :style="sliderButtonStyle" />
        </div>
        <div class="h-1 rounded-full bg-gray-500/50" :style="`width: ${rightSliderWidth - disabledValueSliderWidth}px`" />
        <div class="border-t-[2px] border-dashed border-primary-500" :style="`width: ${disabledValueSliderWidth}px`" />
      </div>
    </div>
    <div v-if="percentProgress || valueProgress" class="pb-4">
      <div ref="progressElement" class="absolute px-2 text-xs text-primary-500" :style="`left: ${leftSliderWidth}px`">
        <div>
          <span v-if="percentProgress" class="flanders-medium">
            {{ Math.round((model / maxAmount) * 100) }}%
          </span>
          <span v-if="valueProgress" class="flanders-medium">
            {{ model ?? 0 }}{{ valueMeasurement }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="maxLabel"
      :class="{
        'opacity-0': isProgressOverMaxLabel,
      }"
      class="absolute bottom-0 right-0 flex justify-end w-full text-xs transition-opacity"
    >
      <div ref="maxLabelElement">
        {{ maxAmount }}{{ valueMeasurement }}
      </div>
    </div>
  </div>
</template>
