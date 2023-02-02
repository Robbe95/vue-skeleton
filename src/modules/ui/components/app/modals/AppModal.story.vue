<script setup lang="ts">
const modalOpen1 = ref(false)
const handleClick = (): void => {
  modalOpen1.value = true
}
</script>

<template>
  <Story
    title="App/Modals/AppModal"
  >
    <Variant title="Default">
      <AppButton @component:click="handleClick">
        Click me
      </AppButton>
      <AppModal
        :is-open="modalOpen1"
        @close="modalOpen1 = false"
      >
        <template #title>
          Title here
        </template>
        <template #content>
          Content here
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error temporibus nulla ab eius enim similique atque officia? Porro consectetur, ea iusto perspiciatis ullam nisi minus, inventore iste quisquam placeat nemo?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In quidem ullam ipsam minima, vitae commodi expedita corporis aliquid illum quis laudantium adipisci laboriosam est maxime quae enim aliquam sed ipsa.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam iste, adipisci sapiente odit beatae architecto aspernatur perferendis quis. Esse dicta, minima non aperiam sunt ad veniam ab velit officiis magni.
        </template>
        <template #footer>
          Footer here
        </template>
      </AppModal>
    </Variant>
  </Story>
</template>
