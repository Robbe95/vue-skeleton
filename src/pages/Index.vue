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
    <div>
      // This is the content of the sidebar
    </div>
  </div>
</template>
