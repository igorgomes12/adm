import { toast, Flip } from 'react-toastify'

export const showMessageError = (errorMessage: string) => {
  toast.error(`Erro ao realizar login: ${errorMessage}`, {
    theme: 'dark',
    transition: Flip,
  })
}
