import type { CSSProperties, Component, ComponentPublicInstance, Raw, VNodeProps } from 'vue'

export type ComponentProps = ComponentPublicInstance['$props']

export type ModalId = number | string | symbol
export type StyleValue = string | CSSProperties | (string | CSSProperties)[]

export interface Constructor<P = any> {
  __isFragment?: never
  __isTeleport?: never
  __isSuspense?: never
  new (...args: any[]): { $props: P }
}

export type RawProps = VNodeProps & {
  // used to differ from a single VNode object as children
  __v_isVNode?: never
  // used to differ from Array children
  [Symbol.iterator]?: never
} & Record<string, any>

export interface ModalSlotOptions { component: Raw<Component>; attrs?: Record<string, any> }
export type ModalSlot = string | Component | ModalSlotOptions
export interface UseModalOptions<P> {
  component: Constructor<P>
  attrs?: (RawProps & P) | (object extends P ? null : never)
}

export interface UseModalReturnType {
  open: () => void
  close: () => void
  moveToTop: () => void
  moveToBottom: () => void
  destroy: () => void
  onOpen: (cb: () => void) => void
  onClose: (cb: () => void) => void
}

export interface RenderedModal extends UseModalOptions<any> {
  id: string
  isOpen: boolean
  title?: string
}
