<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})
</script>

<template>
  <div>
    <AppConfirmButton>
      <AppButton>
        Test
      </AppButton>
    </AppConfirmButton>
  </div>
</template>
