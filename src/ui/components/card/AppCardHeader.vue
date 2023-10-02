<script setup lang="ts">
import { twMerge } from '@/ui/utils//tailwind/twMerge'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="twMerge('flex flex-col p-4', props.class)">
    <slot />
  </div>
</template>
