<script setup lang="ts">
interface Props {
  infoPosition?: 'start' | 'middle' | 'end'
}

withDefaults(defineProps<Props>(), {
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
      class="h-[1px] w-full bg-white/50"
      :class="{ 'w-4': infoPosition === 'start' }"
    />
    <slot />
    <div
      class="h-[1px] w-full bg-white/50"
      :class="{ 'w-8': infoPosition === 'end' }"
    />
  </div>
</template>
