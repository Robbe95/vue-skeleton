<script setup lang="ts">
import type { SnackbarContainerState } from '@/modules/ui/composables/app/snackbar/useSnackbar'

const snackbarContainer = inject('snackbarContainer') as SnackbarContainerState
const clearSnackbar = inject('clearSnackbar') as (container: SnackbarContainerState, snackbarUuid: string) => void

const snackbars = computed(() => snackbarContainer.snackbars)
</script>

<template>
  <TransitionGroup name="snackbar">
    <AppSnackbar
      v-for="snackbar in snackbars.value" :key="snackbar.uuid"
      :snackbar="snackbar" @close="clearSnackbar(snackbarContainer, snackbar.uuid)"
    />
  </Transitiongroup>
</template>

<style scoped>
.snackbar-move, /* apply transition to moving elements */
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.5s ease;
}

.snackbar-enter-from,
.snackbar-leave-to {
  transform: scale(0);
  opacity: 0;
}

.snackbar-leave-active {
  position: absolute;
}
</style>
