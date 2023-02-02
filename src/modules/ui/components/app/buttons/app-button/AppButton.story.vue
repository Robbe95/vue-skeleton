<script setup lang="ts">
const handleClick = (): void => {
  console.error('click')
}
</script>

<template>
  <Story
    title="App/Buttons/AppButton"
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
