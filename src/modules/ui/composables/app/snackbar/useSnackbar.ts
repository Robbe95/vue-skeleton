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

const snackbars = ref<Snackbar[]>([])
const currentPosition = ref<SnackbarLocation>('top-right')
export const useSnackbar = () => {
  const addSnackbar = ({ message, type, position, time = 5000 }: AddSnackbarArgs) => {
    const id = Math.random().toString(36).substr(2, 9)
    snackbars.value.push({ id, message, type, time })
    if (position)
      currentPosition.value = position
  }

  const removeSnackbar = (toBeRemoved: Snackbar) => {
    snackbars.value = snackbars.value.filter(snackbar => snackbar.id !== toBeRemoved.id)
  }

  return {
    snackbars,
    addSnackbar,
    removeSnackbar,
    currentPosition,
  }
}
