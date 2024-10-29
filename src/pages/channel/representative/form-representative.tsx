import { AddressForm } from '@/components/modules/client/forms/address-form'
import { ContactForm } from '@/components/modules/client/forms/contact-form'
import { ComissaoForm } from '@/components/modules/representative-component/forms-navigation/comissao-form'
import { DadosGerais } from '@/components/modules/representative-component/forms-navigation/dados-gerais'
import { RepresentativeNavComponent } from '@/components/modules/representative-component/nav/navitgation-form'
import api from '@/infra/auth/database/acess-api/interceptors-axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const FormRepresentative: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedForm, setSelectedForm] = useState<string>('Dados Gerais')
  const [enabledForms, setEnabledForms] = useState<string[]>(['Dados Gerais'])
  const [formData, setFormData] = useState({
    dadosGerais: {
      id: id ? parseInt(id) : 0,
      name: '',
      region: '',
      status: '',
      type: 'REPRESENTATIVE' as 'REPRESENTATIVE' | 'CONSULTANT' | 'PARTHER',
      supervisor: '',
    },
    comissao: {
      implantation: 0,
      mensality: 0,
    },
    contatos: {
      name: '',
      contact: '',
      description: '',
      telefones: [
        {
          number: '',
          type: 'CELULAR' as 'CELULAR' | 'WHATSAPP' | 'TELEFONE',
          favorite: false,
        },
      ],
    },
    enderecos: {
      cep: '',
      street: '',
      bairro: '',
      municipio: '',
      UF: '',
      number: '',
      complement: '',
    },
  })

  const { data: representativeData, isLoading } = useQuery<any>({
    queryKey: ['representative', id],
    queryFn: async () => {
      if (!id) return null
      const response = await api.get(`/representative/${id}`)
      return response.data
    },
    enabled: !!id,
  })

  useEffect(() => {
    if (representativeData) {
      setFormData({
        dadosGerais: {
          id: representativeData.id,
          name: representativeData.name || '',
          region: representativeData.region || '',
          status: representativeData.status || '',
          type: representativeData.type || 'REPRESENTATIVE',
          supervisor: representativeData.supervisor || '',
        },
        comissao: {
          implantation: representativeData.commission?.implantation || 0,
          mensality: representativeData.commission?.mensality || 0,
        },
        contatos: {
          name: representativeData.name || '',
          contact: representativeData.contact || '',
          description: representativeData.description || '',
          telefones: [
            {
              number: representativeData.cellphone || '',
              type: 'CELULAR',
              favorite: false,
            },
            {
              number: representativeData.phone || '',
              type: 'TELEFONE',
              favorite: false,
            },
          ],
        },
        enderecos: {
          cep: representativeData.address?.postal_code || '',
          street: representativeData.address?.street || '',
          bairro: representativeData.address?.neighborhood || '',
          municipio: representativeData.address?.municipality_name || '',
          UF: representativeData.address?.state || '',
          number: representativeData.address?.number || '',
          complement: representativeData.address?.complement || '',
        },
      })
    }
  }, [representativeData, id])

  const createRepresentativeMutation = useMutation({
    mutationFn: async (newData: any) => {
      return await api.post(`/representative`, newData)
    },
    onSuccess: () => {
      toast.success('Representante criado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao criar o representante.')
    },
  })

  const updateRepresentativeMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      return await api.patch(`/representative`, updatedData, { params: { id } })
    },
    onSuccess: () => {
      toast.success('Representante atualizado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao atualizar o representante.')
    },
  })

  const handleNext = (currentForm: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [currentForm.toLowerCase()]: data,
    }))

    const forms = ['Dados Gerais', 'Comissão', 'Contatos', 'Endereços']
    const nextFormIndex = forms.indexOf(currentForm) + 1
    if (nextFormIndex < forms.length) {
      const nextFormTitle = forms[nextFormIndex]
      if (!enabledForms.includes(nextFormTitle)) {
        setEnabledForms(prev => [...prev, nextFormTitle])
      }
      setSelectedForm(nextFormTitle)
    } else {
      if (id) {
        updateRepresentativeMutation.mutate(formData)
      } else {
        createRepresentativeMutation.mutate(formData)
      }
    }
  }

  const renderForm = () => {
    if (isLoading) return <div>Carregando...</div>

    switch (selectedForm) {
      case 'Dados Gerais':
        return (
          <DadosGerais
            initialValues={formData.dadosGerais}
            onNext={data => handleNext('Dados Gerais', data)}
          />
        )
      case 'Comissão':
        return (
          <ComissaoForm
            initialValues={formData.comissao}
            onNext={data => handleNext('Comissão', data)}
          />
        )
      case 'Contatos':
        return (
          <ContactForm
            initialValues={formData.contatos}
            onNext={data => handleNext('Contatos', data)}
          />
        )
      case 'Endereços':
        return (
          <AddressForm
            initialValues={formData.enderecos}
            onNext={data => handleNext('Endereços', data)}
          />
        )
      default:
        return <div>Selecione uma opção para ver o formulário.</div>
    }
  }

  return (
    <div className="flex px-2">
      <aside className="w-96 bg-gray-100 h-screen items-center flex overscroll-none flex-col space-y-6">
        <h2 className="text-2xl font-semibold p-2">
          {id ? 'Editar Representante' : 'Cadastro Representante'}
        </h2>
        <RepresentativeNavComponent
          selected={selectedForm}
          onSelect={title => {
            if (enabledForms.includes(title)) {
              setSelectedForm(title)
            }
          }}
        />
      </aside>
      <main className="flex-1 bg-white">{renderForm()}</main>
    </div>
  )
}
