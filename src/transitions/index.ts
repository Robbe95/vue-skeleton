export interface TransitionClasses {
  enterFromClass?: string
  enterActiveClass?: string
  enterToClass?: string
  leaveFromClass?: string
  leaveActiveClass?: string
  leaveToClass?: string
  moveClass?: string
}

export * from './scaleBounce.transition'
export * from './snackbar.transition'
export * from './fade.transition'
export * from './list.transition'
export * from './staticList.transition'
