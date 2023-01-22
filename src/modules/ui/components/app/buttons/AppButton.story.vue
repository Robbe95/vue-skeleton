<script setup lang="ts">
import AppButton from './AppButton.vue'

const handleClick = () => {
  console.error('click')
}
</script>

<template>
  <Story
    title="App/Buttons"
  >
    <Variant title="Default">
      <AppButton @component:click="handleClick">
        Click me
      </AppButton>
    </Variant>
    <Variant title="Secondary">
      <AppButton type="secondary" @component:click="handleClick">
        Click me
      </AppButton>
    </Variant>
    <Variant title="Loading">
      <AppButton is-loading @component:click="handleClick">
        Click me
      </AppButton>
    </Variant>
  </Story>
</template>
