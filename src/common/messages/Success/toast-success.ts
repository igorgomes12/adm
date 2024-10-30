import type { FC } from 'react'
import { FaRocket } from 'react-icons/fa'
import { Flip, toast } from 'react-toastify'

export const showMessageSuccess: FC<{ message: string }> = ({ message }) => {
  return toast.success(message, {
    theme: 'dark',
    icon: FaRocket,
    progressStyle: { background: 'rgb(34 197 94)' },
    transition: Flip,
  })
}
