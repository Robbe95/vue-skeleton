import type { App, Ref } from 'vue'
import { generateUuid } from '@/helpers/uuid/generateUuid'
import AppSnackbarContainer from '@/modules/ui/components/app/snackbar/AppSnackbarContainer.vue'
export type SnackbarLocation = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export interface Snackbar {
  uuid: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  time: number
}

export interface AddSnackbarArgs {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  time?: number
  position?: SnackbarLocation
}

export interface SnackbarContainerState {
  container: HTMLElement
  render?: App<Element>
  div: HTMLElement
  snackbars: Ref<Snackbar[]>
}

export interface SnackbarState {
  uuid: string
  snackbar: App<Element>
}

const snackbarContainers: SnackbarContainerState[] = []

export const useSnackbar = (): {
  addSnackbar: (args: AddSnackbarArgs) => void
} => {
  const positionToCss = (element: HTMLElement, position: SnackbarLocation): void => {
    switch (position) {
      case 'top-left':
        element.style.top = '4px'
        element.style.left = '4px'
        break
      case 'top-right':
        element.style.top = '4px'
        element.style.right = '4px'
        break
      case 'bottom-left':
        element.style.bottom = '4px'
        element.style.left = '4px'
        break
      case 'bottom-right':
        element.style.bottom = '4px'
        element.style.right = '4px'
        break
    }
  }

  const clearSnackbar = (container: SnackbarContainerState, snackbarUuid: string): void => {
    const snackbar = container.snackbars.value.find(snackbar => snackbar.uuid === snackbarUuid)
    if (snackbar) {
      container.snackbars.value.splice(container.snackbars.value.indexOf(snackbar), 1)
      if (container.snackbars.value.length === 0) {
        setTimeout(() => {
          container.container.remove()
          container.render?.unmount()
          snackbarContainers.splice(snackbarContainers.indexOf(container), 1)
        }, 500)
      }
    }
  }

  const renderContainer = (position: SnackbarLocation): SnackbarContainerState => {
    const container = document.createElement('div')
    container.id = position
    container.style.position = 'fixed'
    container.style.zIndex = '9999'
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.gap = '0.25rem'

    positionToCss(container, position)
    document.body.appendChild(container)
    let relevantContainer = snackbarContainers.find(container => container.container.id === position)
    if (!relevantContainer) {
      relevantContainer = {
        container,
        div: document.createElement('div'),
        snackbars: ref<Snackbar[]>([]),
      } as SnackbarContainerState
      snackbarContainers.push(relevantContainer as SnackbarContainerState)
    }

    const instance = createApp({
      render: () => h(AppSnackbarContainer),
    })

    relevantContainer.render = instance
    instance.provide('snackbarContainer', relevantContainer)
    instance.provide('clearSnackbar', clearSnackbar)

    instance.mount(container)

    return relevantContainer
  }

  const addSnackbar = ({ message, type, time = 5000, position = 'bottom-left' }: AddSnackbarArgs): void => {
    const relevantContainer = snackbarContainers.find(container => container.container.id === position) || renderContainer(position)

    const newSnackbarUuid = generateUuid()
    relevantContainer.snackbars.value.push({
      uuid: newSnackbarUuid,
      message,
      type,
      time,
    })

    setTimeout(() => {
      clearSnackbar(relevantContainer, newSnackbarUuid)
    }, time)
  }

  return {
    addSnackbar,
  }
}
