<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useModalContainer } from '@/ui/composables/modal/useModal'

const { modals } = useModalContainer()

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <Teleport v-if="isMounted" to="body">
    <template
      v-for="modal in modals"
      :key="modal.id"
    >
      <Component
        :is="modal.component"
        v-model:is-open="modal.isOpen"
        v-bind="modal.attrs"
      />
    </template>
  </Teleport>
</template>
