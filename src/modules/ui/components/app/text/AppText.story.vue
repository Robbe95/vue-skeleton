<script setup lang="ts">
import AppText from './AppText.vue'
</script>

<template>
  <Story
    title="App/Text/AppText"
  >
    <AppText variant="title">
      Title
    </AppText>
    <AppText variant="subtitle">
      Subtitle
    </AppText>
    <AppText variant="text">
      Text
    </AppText>
    <AppText variant="label">
      Label
    </AppText>
    <AppText variant="link">
      Link
    </AppText>

    <AppText variant="text" class="w-80" :number-of-lines="2">
      2 lines of text.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit animi, iure eos omnis aliquid incidunt optio placeat ipsam, ad praesentium assumenda, odit veritatis fugit id beatae quam dolorem consequuntur aut.
    </AppText>
  </Story>
</template>
