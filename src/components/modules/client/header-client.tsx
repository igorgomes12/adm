import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { FaRocket } from 'react-icons/fa'
import { Flip, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useNavigate, useParams } from 'react-router-dom'
import { useFormStore } from '../representative-component/zustand/gerenciador-zustand'
import { api } from '@/infra/auth/database/acess-api/api'
import type { TClient } from './zod-form/zod_client.schema'
import { Button } from '@/components/ui/button'

interface IHeaderClientFormsProps {
  title: string
  setActiveComponent?: (component: string | null) => void
}

export const HeaderClientForms: FC<IHeaderClientFormsProps> = ({
  title,
  setActiveComponent,
}) => {
  const { formData, updateFormData, setMutationSuccess } = useFormStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const createMutation = useMutation({
    mutationKey: ['post-client'],
    mutationFn: async (data: TClient) => {
      const res = await api.post<TClient>('/client', {
        ...data,
        status: 'ativo',
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-representative'] })
      toast.success('Estabelecimento adicionado com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
        autoClose: 1000,
        onClose: () => navigate('/clientes-de-venda'),
      })
      resetFormData()
      setActiveComponent && setActiveComponent('Clientes de venda')
      setMutationSuccess(true)
    },
    onError: (error: Error) => {
      console.error('Erro ao adicionar estabelecimento:', error)
      toast.error(
        'Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente.' +
          (error.message || ''),
      )
      setMutationSuccess(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: TClient) => {
      const res = await api.patch(`/client`, data, {
        params: { id },
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-client'] })
      toast.success('Representante atualizado com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
        autoClose: 1000,
        onClose: () => navigate('/clientes-de-venda'),
      })
      resetFormData()
      setActiveComponent && setActiveComponent('Clientes de venda')
      setMutationSuccess(true)
    },
    onError: (error: Error) => {
      console.error('Erro ao atualizar representante:', error)
      toast.error(
        'Ocorreu um erro ao atualizar o representante. Por favor, tente novamente.' +
          (error.message || ''),
      )
      setMutationSuccess(false)
    },
  })

  const handleSave = () => {
    setMutationSuccess(false)

    const completeData: any = {
      type: formData.type || 'REPRESENTATIVE',
      region: formData.region || 'centro',
      supervisor: formData.supervisor || '',
      status: formData.status || 'ativo',
      name: formData?.name?.toUpperCase() || '',
      commission: {
        implantation: formData.commission?.implantation,
        mensality: formData.commission?.mensality,
      },
      contact: {
        email: formData.contact?.email || 'joao.silva@example.com',
        cellphone: formData.contact?.cellphone || '',
        phone: formData.contact?.phone || '(11) 3333-3333',
      },
      address: {
        postal_code: formData.address?.postal_code || '29210250',
        street: formData.address?.street || 'Rua nova',
        number: formData.address?.number || '12',
        neighborhood: formData.address?.neighborhood || 'Itapebussu',
        municipality_name: formData.address?.municipality_name || 'Guarapari',
        state: formData.address?.state || 'ES',
        complement: formData.address?.complement || 'casa',
      },
    }

    if (id) {
      updateMutation.mutate(completeData)
    } else {
      createMutation.mutate(completeData)
    }
  }

  const resetFormData = () => {
    updateFormData({
      name: '',
      type: 'REPRESENTATIVE',
      region: '',
      supervisor: '',
      status: 'ativo',
      commission: { implantation: 0, mensality: 1 },
      contact: { cellphone: '', phone: '', email: '' },
      address: {
        postal_code: '',
        street: '',
        number: '',
        neighborhood: '',
        municipality_name: '',
        state: '',
        complement: '',
      },
    })
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
