import { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import api from '@/components/sing-in/api/interceptors-axios'
import { toast } from 'react-toastify'
import { FaRocket } from 'react-icons/fa'
import { Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { CreateRepresentativeSchemaDto } from '../modules/representative-component/zod/create-representative.dto'
import { useFormStore } from '../modules/representative-component/zustand/gerenciador-zustand'

interface IHeaderFormsProps {
  title: string
}

export const HeaderForms: FC<IHeaderFormsProps> = ({ title }) => {
  const { formData } = useFormStore()
  const queryClient = useQueryClient()

  const { mutate: mutation } = useMutation({
    mutationKey: ['post-representative'],
    mutationFn: async (data: CreateRepresentativeSchemaDto) => {
      const res = await api.post<CreateRepresentativeSchemaDto>(
        '/representative',
        {
          ...data,
          status: true,
        },
      )
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-establishment'] })
      toast.success('Estabelecimento adicionado com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
      })
    },
    onError: (error: Error) => {
      console.error('Erro ao adicionar estabelecimento:', error)
      if (error instanceof Error)
        toast.error(
          'Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente.' +
            (error.message || error.message || ''),
        )
    },
  })

  const handleSave = () => {
    const completeData: CreateRepresentativeSchemaDto = {
      id: formData.id ?? 0, // Defina um valor padrão para 'id'
      type: formData.type || 'REPRESENTATIVE',
      region: formData.region || 'BRASIL',
      supervisor: formData.supervisor || 'ADMINISTRACAO',
      status: formData.status || 'ativo', // Certifique-se de que é uma string
      name: formData?.name?.toUpperCase() || '',
      commission: {
        implantation: formData.commission?.implantation ?? 0,
        mensality: formData.commission?.mensality ?? 0,
      },
      contact: {
        email: formData.contact?.email || '',
        cellphone: formData.contact?.cellphone || '',
        phone: formData.contact?.phone || '',
      },
      address: {
        postal_code: formData.address?.postal_code || '',
        street: formData.address?.street || '',
        number: formData.address?.number || '',
        neighborhood: formData.address?.neighborhood || '',
        municipality_name: formData.address?.municipality_name || '',
        state: formData.address?.state || '',
        complement: formData.address?.complement || '',
      },
      created_at: formData.created_at || new Date(),
    }

    mutation(completeData)
  }

  return (
    <>
      <div className="flex items-start justify-between w-full">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          {title}
        </h1>
        <Button onClick={handleSave} variant={'blue'}>
          Salvar
        </Button>
      </div>
    </>
  )
}
