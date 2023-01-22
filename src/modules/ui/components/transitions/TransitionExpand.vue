<script lang="ts" setup>
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
  transition:
   height 0.5s cubic-bezier(0.645, 0.045, 0.355, 1),
   opacity 0.5s;

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
