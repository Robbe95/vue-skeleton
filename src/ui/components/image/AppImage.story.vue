<script setup lang="ts">
</script>

<template>
  <Story
    title="App/Image/AppImage"
  >
    <Variant title="Default">
      <AppImage src="https://picsum.photos/200/300" alt="Image" />
    </Variant>
    <Variant title="Preview">
      <AppImage src="https://picsum.photos/200/300" alt="Image" is-preview class="rounded-full" />
    </Variant>
  </Story>
</template>
