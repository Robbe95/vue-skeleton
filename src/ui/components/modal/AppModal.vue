<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import type { ModalProps } from '@/ui/components/modal/appModal.style'
import { modalVariants } from '@/ui/components/modal/appModal.style'
import { modalBackgroundTransition, modalTransition } from '@/ui/transitions'
import { useProvideModalContext } from '@/ui/composables/modal/useModalContext'

interface Props {
  hasIrremovableMask?: boolean
  size?: ModalProps['size']
}

const {
  hasIrremovableMask = false,
  size = 'default',
} = defineProps<Props>()

defineSlots<{
  default: (props: { close: () => void }) => any
}>()

useProvideModalContext({
  close: handleCloseModal,
})

const isOpen = defineModel<boolean>('isOpen', {
  required: true,
})

function handleCloseModal(): void {
  isOpen.value = false
}

function handleClickOutside(): void {
  if (!hasIrremovableMask)
    handleCloseModal()
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog class="relative z-[999]" @close="handleClickOutside">
      <TransitionChild
        as="template"
        v-bind="modalBackgroundTransition"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto">
        <TransitionChild
          as="template"
          v-bind="modalTransition"
        >
          <DialogPanel :class="modalVariants({ size })">
            <slot :close="handleCloseModal" />
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
