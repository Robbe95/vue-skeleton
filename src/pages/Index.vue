<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useSnackbar } from '@/modules/ui/composables/app/snackbar/useSnackbar'

const { addSnackbar } = useSnackbar()
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
  addSnackbar({ message: 'Dit is een test', type: 'success' })
}

const onClick2 = () => {
  addSnackbar({ message: 'Dit is een 2', type: 'info', position: 'top-right' })
}
</script>

<template>
  <div class="p-40">
    <AppTabs />
  </div>
</template>
