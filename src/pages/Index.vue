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
  addSnackbar({
    message: 'lorem ipsum',
    type: 'success',
    position: 'bottom-right',
  })
}
</script>

<template>
  <div>
    <button @click="onClick">
      Test
    </button>
  </div>
</template>
