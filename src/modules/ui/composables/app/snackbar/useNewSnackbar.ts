import AppSnackbar from '@/modules/ui/components/app/snackbar/AppSnackbar.vue'
export type SnackbarLocation = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export interface Snackbar {
  id: string
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

export const useSnackbar = () => {
  const positionToCss = (element: HTMLElement, position: SnackbarLocation) => {
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

  const renderContainer = (position: SnackbarLocation) => {
    const container = document.createElement('div')
    container.id = position
    container.style.position = 'fixed'
    container.style.zIndex = '9999'
    positionToCss(container, position)
    document.body.appendChild(container)
    return container
  }

  const renderSnackbar = ({ message, type, time, position = 'bottom-left' }: AddSnackbarArgs) => {
    const container = document.getElementById(position) || renderContainer(position)
    const tempDiv = document.createElement('div')

    const instance = createApp({
      render: () => h(AppSnackbar, {
        snackbar: {
          message,
          type,
          time,
        },
      }),
    })
    container.appendChild(tempDiv)
    instance.mount(tempDiv)
  }
  return {
    renderSnackbar,
  }
}
