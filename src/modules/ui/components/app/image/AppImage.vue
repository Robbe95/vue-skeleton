<script setup lang="ts">
interface Props {
  src: string
  alt: string
  isPreview?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  isPreview: false,
  class: '',
})

const isModalOpen = ref(false)
const openModal = (): void => {
  if (!props.isPreview)
    return
  isModalOpen.value = true
}
</script>

<template>
  <Component :is="isPreview ? 'button' : 'div'" @click="openModal">
    <!-- eslint-disable-next-line vue/no-parsing-error -->
    <img :src="src" :alt="alt" :class="class">
    <AppModal v-if="isPreview" :is-open="isModalOpen" no-styling @close="isModalOpen = false">
      <template #content>
        <img :src="src" :alt="alt" class="w-[75vw]">
      </template>
    </AppModal>
  </Component>
</template>
