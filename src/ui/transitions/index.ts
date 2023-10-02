export interface TransitionClasses {
  enterFromClass?: string
  enterActiveClass?: string
  enterToClass?: string
  leaveFromClass?: string
  leaveActiveClass?: string
  leaveToClass?: string
  moveClass?: string

  enterFrom?: string
  enter?: string
  enterTo?: string
  leaveFrom?: string
  leave?: string
  leaveTo?: string
  move?: string

}

export * from '@/ui/transitions/scaleBounce.transition'
export * from '@/ui/transitions/snackbar.transition'
export * from '@/ui/transitions/fade.transition'
export * from '@/ui/transitions/list.transition'
export * from '@/ui/transitions/staticList.transition'
export * from '@/ui/transitions/popover.transition'
export * from '@/ui/transitions/modal.transition'
