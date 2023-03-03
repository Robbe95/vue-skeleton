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

const handleIconClicked = (): void => {
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
    <div ref="hiddenHoverElement" class="absolute left-0 z-20 h-screen w-4" />
    <button
      v-if="hidden"
      class="absolute top-0 z-50 flex h-screen flex-col items-center justify-center overflow-hidden bg-primary-500 text-white transition-all duration-500"
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
      class="sticky top-0 flex h-screen w-full flex-col justify-between overflow-auto bg-primary-500 text-white transition-all duration-500"
      :class="{
        'w-80': !minified,
        'w-32': minified,
        'w-0 overflow-hidden': hidden,

      }"
    >
      <div>
        <div class="flex items-center justify-between gap-4 p-4">
          <h2 class="text-xl font-bold ">
            <slot name="title" />
            Title
          </h2>
          <button @click="handleIconClicked">
            <ChevronRightIcon
              v-if="hasMinified"
              class="w-3"
              :class="{
                'rotate-180 transition-transform': minified,
              }"
            />
            <CloseIcon
              v-if="hasHidden"
              class="w-3"
            />
          </button>
        </div>
        <AppDivider />
        <div class="flex h-full flex-col gap-2 p-4">
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
