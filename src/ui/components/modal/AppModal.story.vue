<script setup lang="ts">
import { reactive } from 'vue'
import AppModal from '@/ui/components/modal/AppModal.vue'
import AppButton from '@/ui/components/button/AppButton.vue'
import type { ModalProps } from '@/ui/components/modal/appModal.style'
import { modalSizeOptions } from '@/ui/components/modal/appModal.style'

import AppModalHeader from '@/ui/components/modal/AppModalHeader.vue'
import AppModalTitle from '@/ui/components/modal/AppModalTitle.vue'
import AppModalDescription from '@/ui/components/modal/AppModalDescription.vue'
import AppModalContent from '@/ui/components/modal/AppModalContent.vue'
import AppModalFooter from '@/ui/components/modal/AppModalFooter.vue'

interface State {
  isOpen: boolean
  hideCloseButton?: boolean
  hasIrremovableMask?: boolean
  title?: string
  content?: string
  description?: string
  size?: ModalProps['size']
}

const state = reactive<State>({
  isOpen: false,
  hideCloseButton: false,
  hasIrremovableMask: false,
  title: 'Modal title',
  description: 'Description here',
  content: 'Content here Lorem ipsum dolor sit amet consectetur adipisicing elit. Error temporibus nulla ab eius enim similique atque officia? Porro consectetur, ea iusto perspiciatis ullam nisi minus, inventore iste quisquam placeat nemo?Lorem ipsum dolor sit amet consectetur adipisicing elit. In quidem ullam ipsam minima, vitae commodi expedita corporis aliquid illum quis laudantium adipisci laboriosam est maxime quae enim aliquam sed ipsa.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam iste, adipisci sapiente odit beatae architecto aspernatur perferendis quis. Esse dicta, minima non aperiam sunt ad veniam ab velit officiis magni.',
})

function handleClick(): void {
  state.isOpen = true
}
</script>

<template>
  <Story
    title="App/Modals/AppModal"
  >
    <Variant title="Default" auto-props-disabled>
      <template #controls>
        <HstCheckbox v-model="state.isOpen" title="Open" />
        <HstCheckbox v-model="state.hideCloseButton" title="No close button" />
        <HstCheckbox v-model="state.hasIrremovableMask" title="Not dismissable" />
        <HstSelect v-model="state.size" title="Size" :options="modalSizeOptions" />

        <HstText v-model="state.title" title="Title" />
        <HstText v-model="state.description" title="Description" />

        <HstTextarea v-model="state.content" title="Content" />
      </template>

      <AppButton @component:click="handleClick">
        Click me
      </AppButton>
      <AppModal
        v-model:is-open="state.isOpen" :size="state.size"
        :has-irremovable-mask="state.hasIrremovableMask"
      >
        <template #default="{ close }">
          <AppModalHeader :close="close" :hide-close-button="state.hideCloseButton">
            <AppModalTitle>
              {{ state.title }}
            </AppModalTitle>
            <AppModalDescription>
              {{ state.content }}
            </AppModalDescription>
          </AppModalHeader>
          <AppModalContent>
            {{ state.content }}
          </AppModalContent>
          <AppModalFooter>
            <div class="flex justify-end gap-2">
              <AppButton variant="ghost" @click="close">
                Cancel
              </AppButton>
              <AppButton @click="close">
                Confirm
              </AppButton>
            </div>
          </AppModalFooter>
        </template>
      </AppModal>
    </Variant>
  </Story>
</template>
