import { FaRocket } from 'react-icons/fa'
import { Flip, toast } from 'react-toastify'

export const showMessageSuccess = () => {
  toast.success('Login realizado com sucesso!', {
    theme: 'dark',
    icon: FaRocket,
    progressStyle: { background: '#1f62cf' },
    transition: Flip,
  })
}
