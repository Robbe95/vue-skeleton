<script setup lang="ts">
import type { Snackbar } from '@/ui/composables/snackbar/useSnackbar'

interface Props {
  snackbar: Snackbar
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (event: 'close'): void
}>()
const classes = computed(() => {
  switch (props.snackbar.type) {
    case 'success':
      return 'bg-success-100 border border-success-500'
    case 'error':
      return 'bg-danger-100 border border-danger-500'
    case 'info':
      return 'bg-primary-100 border border-primary-500'
    case 'warning':
      return 'bg-secondary-100 border border-secondary-500'
  }
})

const textColor = computed(() => {
  switch (props.snackbar.type) {
    case 'success':
      return 'text-success-500'
    case 'error':
      return 'text-danger-500'
    case 'info':
      return 'text-primary-500'
    case 'warning':
      return 'text-secondary-500'
  }
})

function closeSnackbar(): void {
  emit('close')
}
</script>

<template>
  <div class="flex w-80 items-center justify-between gap-4 rounded px-4 py-2" role="alert" :class="classes">
    <div>
      {{ snackbar.message }}
    </div>
    <div>
      <button @click="closeSnackbar">
        <AppIcon icon="close" :class="textColor" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scale-bounce-transition {
  &-enter-active,
  &-leave-active {
    transition:
      cubic-bezier(.8, .16, 0, 1.3) 0.5s transform,
      0.2s opacity;
  }

  &-enter-from,
  &-leave-to {
    transform: scale(0);
    opacity: 0 !important;
  }
}
</style>
