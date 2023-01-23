<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue'
import type { Snackbar } from '@/modules/ui/composables/app/snackbar/useSnackbar'
import { useSnackbar } from '@/modules/ui/composables/app/snackbar/useSnackbar'

interface Props {
  snackbar: Snackbar
}

const props = defineProps<Props>()

const { removeSnackbar } = useSnackbar()

onMounted(() => {
  setTimeout(() => {
    removeSnackbar(props.snackbar)
  }, props.snackbar.time)
})

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
</script>

<template>
  <div class="flex items-center justify-between gap-4 px-4 py-2 rounded w-80" :class="classes">
    <div>
      {{ snackbar.message }}
    </div>
    <div>
      <button @click="removeSnackbar(snackbar)">
        <CloseIcon class="h-3 " :class="textColor" />
      </button>
    </div>
  </div>
</template>
