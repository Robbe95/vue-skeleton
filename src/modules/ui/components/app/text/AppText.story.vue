<script setup lang="ts">
import AppText from './AppText.vue'
</script>

<template>
  <Story
    title="App/Text/AppText"
  >
    <AppText as="title">
      Title
    </AppText>
    <AppText as="subtitle">
      Subtitle
    </AppText>
    <AppText as="text">
      Text
    </AppText>
    <AppText as="label">
      Label
    </AppText>
    <AppText as="link">
      Link
    </AppText>

    <AppText as="text" class="w-80" :number-of-lines="2">
      2 lines of text.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit animi, iure eos omnis aliquid incidunt optio placeat ipsam, ad praesentium assumenda, odit veritatis fugit id beatae quam dolorem consequuntur aut.
    </AppText>
  </Story>
</template>
