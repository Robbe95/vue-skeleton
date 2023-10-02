<script setup lang="ts">
interface Props {
  errorMessage?: string
}
const { errorMessage } = defineProps<Props>()
</script>

<template>
  <p class="text-subtext text-destructive">
    <slot>
      {{ errorMessage }}
    </slot>
  </p>
</template>
