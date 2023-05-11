<script setup lang="ts">
interface Props {
  isFirstOfRow?: boolean
  isLastOfRow?: boolean
  isEven?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isFirstOfRow: false,
  isLastOfRow: false,
  isEven: false,
})
</script>

<template>
  <div
    class="my-1 h-full  border-y bg-primary-100/50 px-4 py-1"
    :class="{
      'rounded-l border-l': props.isFirstOfRow,
      'rounded-r border-r': props.isLastOfRow,
      'bg-primary-500/10': props.isEven,
      'bg-primary-500/20': !props.isEven,
    }"
  >
    <slot />
  </div>
</template>>
