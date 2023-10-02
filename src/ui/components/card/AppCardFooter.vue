<script setup lang="ts">
import { twMerge } from '@/ui/utils//tailwind/twMerge'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="twMerge('flex flex-col gap-1 p-4 pt-0', props.class)">
    <slot />
  </div>
</template>
