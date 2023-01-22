<script setup lang="ts">
import AppIconButton from './AppIconButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
</script>

<template>
  <Story
    title="App/IconButtons"
  >
    <Variant title="Default">
      <AppIconButton class="bg-danger-100 text-danger-500">
        <CloseIcon />
      </AppIconButton>
    </Variant>
  </Story>
</template>
