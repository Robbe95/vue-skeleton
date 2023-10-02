<script setup lang="ts">
</script>

<template>
  <Story
    title="App/Divider/AppDivider"
  >
    <Variant title="Default">
      <AppDivider />
    </Variant>
    <Variant title="With content">
      <AppDivider>
        Content
      </AppDivider>
    </Variant>
    <Variant title="With content middle">
      <AppDivider info-position="middle">
        Content
      </AppDivider>
    </Variant>
    <Variant title="With content end">
      <AppDivider info-position="end">
        Content
      </AppDivider>
    </Variant>
  </Story>
</template>
