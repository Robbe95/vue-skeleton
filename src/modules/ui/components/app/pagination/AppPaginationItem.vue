<script setup lang="ts">
interface Props {
  isDots?: boolean
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isDots: false,
  isActive: false,
})

const emit = defineEmits<{
  (event: 'component:click'): void
}>()
</script>

<template>
  <button
    :class="{
      'border border-primary-500 shadow-main': !isDots,
      'bg-primary-500 text-white shadow-lg shadow-primary-200': isActive,
      'text-black': !isActive,
    }"
    class="h-8 w-8 rounded-md" @click="emit('component:click')"
  >
    <slot />
  </button>
</template>
