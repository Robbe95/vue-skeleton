import type { TransitionClasses } from '.'

export const fadeTransition: TransitionClasses = {
  enterActiveClass: 'transition-opacity ease duration-300',
  leaveActiveClass: 'transition-opacity ease duration-300',
  enterFromClass: 'opacity-0',
  leaveToClass: 'opacity-0',
}
