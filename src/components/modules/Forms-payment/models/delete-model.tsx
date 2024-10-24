import api from '@/components/sing-in/api/interceptors-axios'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Flip, toast } from 'react-toastify'

import { FaRocket } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'
import { usePaymentZustand } from '../zustand-payment/payment-zustand'

export const ModalPaymentDelete = () => {
  const { id, isOpen, onClose } = usePaymentZustand()
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['delete-payment'],
    mutationFn: async () => {
      const res = await api.delete(`/payment`, {
        params: { id },
      })
      return res.data
    },
    onSuccess: () => {
      toast.success('Forma excluída com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
      })
      queryClient.invalidateQueries({ queryKey: ['get-payment'] })
      onClose()
    },
    onError: error => {
      toast.error(
        'Erro ao excluir a forma de pagamento. Por favor, tente novamente. ' +
          error.message,
        {
          theme: 'colored',
          icon: <IoWarningOutline />,
          transition: Flip,
        },
      )
    },
    onSettled: () => {
      setIsDeleting(false)
    },
  })

  const handleDelete = () => {
    setIsDeleting(true)
    mutate()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-lg sm:text-xl font-semibold mb-4 text-center">
          Tem certeza que deseja excluir a Forma de pagamento?
        </h1>
        <p className="text-center mb-4">
          Esta ação não pode ser desfeita. A Forma de pagamento com ID {id} será
          permanentemente removido.
        </p>
        <div className="flex w-full flex-col sm:flex-row justify-center gap-2">
          <Button
            className="w-full"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            className="w-full"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </Button>
        </div>
      </div>
    </div>
  )
}
