import type { Ref } from 'vue'
import { onUnmounted, ref, watch } from 'vue'
import type { RenderedModal, UseModalOptions, UseModalReturnType } from '@/ui/composables/modal/useModal.type'
import { generateUuid } from '@/ui/utils/uuid/generateUuid'

const renderedModals = ref<RenderedModal[]>([])

export function useModalContainer(): {
  modals: Ref<RenderedModal[]>
} {
  return { modals: renderedModals }
}

export function useModal<P>({ component, attrs }: UseModalOptions<P>): UseModalReturnType {
  const id = generateUuid()
  let onOpenCb: (() => void) | null = null
  let onCloseCb: (() => void) | null = null

  const onOpen = (cb: () => void): void => {
    onOpenCb = cb
  }

  const onClose = (cb: () => void): void => {
    onCloseCb = cb
  }

  const modal = ref<RenderedModal>({
    id,
    component,
    attrs,
    isOpen: false,
  })

  renderedModals.value.push(modal.value)

  const open = (): void => {
    modal.value.isOpen = true
    onOpenCb?.()
  }

  const close = (): void => {
    modal.value.isOpen = false
    onCloseCb?.()
  }

  const moveToTop = (): void => {
    renderedModals.value = renderedModals.value.filter(modal => modal.id !== id).concat(modal.value)
  }

  const moveToBottom = (): void => {
    renderedModals.value = [modal.value].concat(renderedModals.value.filter(modal => modal.id !== id))
  }

  const destroy = (): void => {
    renderedModals.value = renderedModals.value.filter(modal => modal.id !== id)
  }

  watch(() => modal.value.isOpen, (isOpen) => {
    if (isOpen)
      onOpenCb?.()
    else
      onCloseCb?.()
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    open,
    close,
    destroy,
    moveToTop,
    moveToBottom,
    onOpen,
    onClose,
  }
}
