<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useSnackbar } from '@/modules/ui/composables/app/snackbar/useNewSnackbar'

const { renderSnackbar } = useSnackbar()
useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})

const onClick = () => {
  renderSnackbar({ message: 'Dit is een test', type: 'success' })
}

const onClick2 = () => {
  renderSnackbar({ message: 'Dit is een 2', type: 'info', position: 'top-right' })
}
</script>

<template>
  <div>
    <button @click="onClick">
      Test
    </button>
    <button @click="onClick2">
      Test
    </button>
  </div>
</template>
