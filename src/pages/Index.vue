<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { routeNames } from '@/router/routes.type'

useHead({
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Dit is een test component',
    },
  ],

})

const isLoading = ref(false)
</script>

<template>
  <div>
    <AppButton @component:click="isLoading = !isLoading">
      Dit is een button
    </AppButton>
    <AppButton :is-ready="isLoading">
      Dit is een button
    </AppButton>
    <FormFileUpload />
    <div class="h-[100vh]" />
    <PrefetchLink :to="routeNames.EXAMPLE_INDEX" use-hover>
      <AppButton>
        Go to example
      </AppButton>
    </PrefetchLink>
  </div>
</template>
