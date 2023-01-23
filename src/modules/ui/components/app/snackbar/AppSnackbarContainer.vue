<script setup lang="ts">
import { useSnackbar } from '@/modules/ui/composables/app/snackbar/useSnackbar'

const { snackbars, currentPosition } = useSnackbar()

const cssPosition = computed(() => {
  switch (currentPosition.value) {
    case 'top-left':
      return 'top-4 left-4'
    case 'top-right':
      return 'top-4 right-4'
    case 'bottom-left':
      return 'bottom-4 left-4'
    case 'bottom-right':
      return 'bottom-4 right-4'
  }
})
</script>

<template>
  <div class="fixed flex flex-col gap-1" :class="cssPosition">
    <TransitionGroup name="snackbar">
      <AppSnackbar v-for="snackbar in snackbars" :key="snackbar.id" :snackbar="snackbar">
        {{ snackbar.message }}
      </AppSnackbar>
    </TransitionGroup>
  </div>
</template>
