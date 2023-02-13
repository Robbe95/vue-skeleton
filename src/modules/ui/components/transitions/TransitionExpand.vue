<script lang="ts" setup>
interface Props {
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.5,
})

const durationString = computed(() => `${props.duration}s`)

const enter = (element: HTMLElement): void => {
  const width = getComputedStyle(element).width

  element.style.width = width
  element.style.position = 'absolute'
  element.style.visibility = 'hidden'
  element.style.height = 'auto'

  const height = getComputedStyle(element).height

  element.style.width = ''
  element.style.position = ''
  element.style.visibility = ''
  element.style.height = ''

  getComputedStyle(element)

  requestAnimationFrame(() => {
    element.style.height = height
  })
}

const afterEnter = (element: HTMLElement): void => {
  element.style.height = 'auto'
}

const leave = (element: HTMLElement): void => {
  const height = getComputedStyle(element).height

  element.style.height = height
  getComputedStyle(element)

  requestAnimationFrame(() => {
    element.style.height = '0'
  })
}
</script>

<template>
  <transition
    name="expand"
    class="expand-leave-active"
    @after-enter="afterEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height v-bind(durationString) cubic-bezier(0.645, 0.045, 0.355, 1), opacity v-bind(durationString);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  height: 0;
}

* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>
