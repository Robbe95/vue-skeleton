<script setup lang="ts">
interface Props {
  src: string
  alt: string
  isPreview?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isPreview: false,
  class: '',
})

const isModalOpen = ref(false)
function openModal(): void {
  if (!props.isPreview)
    return
  isModalOpen.value = true
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Component :is="isPreview ? 'button' : 'div'" @click="openModal">
    <img :src="src" :alt="alt" v-bind="$attrs">
    <AppModal v-if="isPreview" :is-open="isModalOpen" no-styling @close="isModalOpen = false">
      <template #content>
        <img :src="src" :alt="alt" class="w-[75vw]">
      </template>
    </AppModal>
  </Component>
</template>
