<script setup lang="ts">
import { twMerge } from '@/ui/utils//tailwind/twMerge'

const props = defineProps<{
  src: string
  class?: string
}>()
</script>

<template>
  <img
    :src="src"
    :class="twMerge('h-48 w-full object-cover', props.class)"
  >
</template>
