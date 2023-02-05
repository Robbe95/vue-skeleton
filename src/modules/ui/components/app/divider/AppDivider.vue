<script setup lang="ts">
interface Props {
  infoPosition?: 'start' | 'middle' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  infoPosition: 'start',
})

const slots = useSlots()
</script>

<template>
  <div
    class="flex items-center"
    :class="{
      'gap-1': slots.default,
    }"
  >
    <div
      class="w-full h-[1px] bg-white/50"
      :class="{ 'w-4': infoPosition === 'start' }"
    />
    <slot />
    <div
      class="w-full h-[1px] bg-white/50"
      :class="{ 'w-8': infoPosition === 'end' }"
    />
  </div>
</template>
