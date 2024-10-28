import { showMessageError } from '@/common/messages/Err/toast-err'
import { showMessageSuccess } from '@/common/messages/Success/toast-success'
import { api } from '@/infra/auth/database/acess-api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { TSystemSchemaDto } from '../dto/system.dto'
import { useSystemZustand } from '../entity/system.entity'

export const SystemAdd = () => {
  const queryClient = useQueryClient()
  const { onClose } = useSystemZustand()

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['post-system'],
    mutationFn: async (data: TSystemSchemaDto) => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      if (data.image_url instanceof File) {
        formData.append('image', data.image_url)
      }

      const res = await api.post('/systems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    },
    onSuccess: () => {
      showMessageSuccess({
        message: 'Sistema adicionado com sucesso!',
      })
      queryClient.invalidateQueries({ queryKey: ['get-systems'] })
      onClose()
    },
    onError: (error: unknown) => {
      let errorMessage = 'Verifique suas credenciais.'

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }

      showMessageError(errorMessage)
      console.error('Erro de login:', error)
    },
  })

  return {
    mutate,
    isSuccess,
  }
}
