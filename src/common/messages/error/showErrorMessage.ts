import { Flip, toast } from 'react-toastify'

export const showErrorMessage = (message: string) => {
  toast.error(message, {
    theme: 'dark',
    transition: Flip,
  })
}
