<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import AppIconButton from '@/modules/ui/components/app/buttons/AppIconButton.vue'
interface Props {
  isOpen: boolean

}

defineProps<Props>()
const emit = defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-[999]" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex items-center justify-center min-h-full p-4 text-center"
        >
          <TransitionChild
            as="template"
            class="ease-[cubic-bezier(.8,_.16,_0,_1.3)]"
            enter="duration-300 ease-out "
            enter-from="opacity-0 scale-0"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-0"
          >
            <DialogPanel
              class="relative p-8 text-left bg-white rounded shadow-main lg:px-24"
            >
              <DialogTitle
                as="h3"
                class="text-3xl font-bold"
              >
                <slot name="title" />
              </DialogTitle>
              <div class="mt-2">
                <p>
                  <slot name="content" />
                </p>
              </div>

              <div class="mt-4">
                <slot name="footer" />
              </div>
              <AppIconButton class="absolute bg-danger-100 text-danger-500 top-4 right-4" @click="emit('close')">
                <CloseIcon />
              </AppIconButton>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
