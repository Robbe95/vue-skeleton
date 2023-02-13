<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

interface Props {
  hasMinified?: boolean
  hasHidden?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasMinified: false,
  hasHidden: false,
})

const minified = ref(false)
const hidden = ref(false)

const handleIconClicked = (event: MouseEvent): void => {
  if (props.hasHidden)
    hidden.value = !hidden.value
  else if (props.hasMinified)
    minified.value = !minified.value
}

const hiddenHoverElement = ref<HTMLElement | null>(null)
const { isOutside } = useMouseInElement(hiddenHoverElement)
</script>

<template>
  <div class="relative">
    <div ref="hiddenHoverElement" class="absolute left-0 h-screen w-4 z-20" />
    <button
      v-if="hidden"
      class="h-screen bg-primary-500 text-white flex justify-center flex-col transition-all duration-500 top-0 absolute overflow-hidden z-50 items-center"
      :class="{
        'w-8': !isOutside,
        'w-0': isOutside,

      }"
      @click="handleIconClicked"
    >
      <ChevronRightIcon
        class="w-3"
      />
    </button>
    <div
      class="h-screen bg-primary-500 text-white flex justify-between flex-col w-full transition-all duration-500 sticky top-0 overflow-auto"
      :class="{
        'w-80': !minified,
        'w-32': minified,
        'w-0 overflow-hidden': hidden,

      }"
    >
      <div>
        <div class="flex justify-between items-center p-4 gap-4">
          <h2 class="font-bold text-xl ">
            <slot name="title" />
            Title
          </h2>
          <button @click="handleIconClicked">
            <ChevronRightIcon
              v-if="hasMinified"
              class="w-3"
              :class="{
                'transform rotate-180 transition-transform': minified,
              }"
            />
            <CloseIcon
              v-if="hasHidden"
              class="w-3"
            />
          </button>
        </div>
        <AppDivider />
        <div class="p-4 flex flex-col gap-2 h-full">
          <slot />
        </div>
      </div>
      <div>
        <AppDivider />
        <div class="p-4">
          <slot name="footer" />
          Footer
        </div>
      </div>
    </div>
  </div>
</template>
