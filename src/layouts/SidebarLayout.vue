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
  <div class="sidebar-layout">
    <AppSidebar has-hidden />
    <div class="transition-all duration-500">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.sidebar-layout {
  display: grid;
  grid-template-columns: auto 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar content";
}
</style>
