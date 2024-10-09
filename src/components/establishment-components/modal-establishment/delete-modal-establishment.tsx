import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/components/sing-in/api/interceptors-axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEstablishmentDeleteZustand } from '../zustand-establishment/delete-establisment'

export const ModalEstablishmentDelete = () => {
  const { id, isOpen, onClose } = useEstablishmentDeleteZustand()
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  console.log('Modal Delete - isOpen:', isOpen, 'id:', id)

  const { mutate } = useMutation({
    mutationKey: ['delete-establishement'],
    mutationFn: async () => {
      const res = await api.delete(`/establishment`, {
        params: { id },
      })
      return res.data
    },
    onSuccess: () => {
      toast.success('Sistema excluído com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['get-establishment'] })
      onClose()
    },
    onError: error => {
      console.error('Erro ao excluir o sistema:', error)
      toast.error('Erro ao excluir o sistema. Por favor, tente novamente.')
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
          Tem certeza que deseja excluir a estabelecimento?
        </h1>
        <p className="text-center mb-4">
          Esta ação não pode ser desfeita. A estabelecimento com ID {id} será
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
