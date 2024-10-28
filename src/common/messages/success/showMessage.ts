import { FaRocket } from 'react-icons/fa'
import { Flip, toast } from 'react-toastify'

export const showSuccessMessage = (message: string) => {
  toast.success(message, {
    theme: 'dark',
    icon: FaRocket,
    progressStyle: { background: '#1f62cf' },
    transition: Flip,
  })
}
