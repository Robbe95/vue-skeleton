import type { TransitionClasses } from '.'

export const scaleBounceTransition: TransitionClasses = {
  enterFromClass: 'scale-0 opacity-0',
  enterActiveClass: '[transition:cubic-bezier(.8,.16,0,1.3)_0.5s_transform,0.2s_opacity]',
  enterToClass: '',
  leaveFromClass: '',
  leaveActiveClass: '[transition:cubic-bezier(.8,.16,0,1.3)_0.5s_transform,0.2s_opacity]',
  leaveToClass: 'scale-0 opacity-0',
}
