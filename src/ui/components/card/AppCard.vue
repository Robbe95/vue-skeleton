<script setup lang="ts">
import { twMerge } from '@/ui/utils//tailwind/twMerge'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <section
    :class="twMerge(
      'overflow-hidden rounded-card border border-border bg-card text-card-foreground shadow-card-shadow transition-shadow duration-300 hover:shadow-card-hover-shadow focus:shadow-card-hover-shadow',
      props.class,
    )"
  >
    <slot />
  </section>
</template>
