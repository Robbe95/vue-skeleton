<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue'
import AppIcon from '@/ui/components/icon/AppIcon.vue'
import { twMerge } from '@/ui/utils//tailwind/twMerge'
import { useModalContext } from '@/ui/composables/modal/useModalContext'

interface Props {
  hideCloseButton?: boolean
  class?: string
}

const props = defineProps<Props>()
const { close } = useModalContext()

function handleClickCloseButton(): void {
  close()
}
</script>

<template>
  <div :class="twMerge('flex p-4 justify-between gap-4', props.class)">
    <DialogTitle>
      <slot />
    </DialogTitle>
    <div v-if="!hideCloseButton">
      <button @click="handleClickCloseButton">
        <AppIcon icon="close" />
      </button>
    </div>
  </div>
</template>
