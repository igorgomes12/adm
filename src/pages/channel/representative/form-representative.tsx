import { AddressForm } from '@/components/modules/client/forms/address-form'
import { ContactForm } from '@/components/modules/client/forms/contact-form'
import { ComissaoForm } from '@/components/modules/representative-component/forms-navigation/comissao-form'
import { DadosGerais } from '@/components/modules/representative-component/forms-navigation/dados-gerais'
import { RepresentativeNavComponent } from '@/components/modules/representative-component/nav/navitgation-form'
import api from '@/components/sing-in/api/interceptors-axios'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

interface FormRepresentativeProps {
  id?: number
  onOpenFormClient: () => void
}

export const FormRepresentative: FC<FormRepresentativeProps> = ({
  id,
  onOpenFormClient,
}) => {
  const [selectedForm, setSelectedForm] = useState<string | null>(
    'Dados Gerais',
  )
  const [enabledForms, setEnabledForms] = useState<string[]>(['Dados Gerais'])
  const [formData, setFormData] = useState({
    dadosGerais: {
      name: '',
      region: '',
      status: '',
      type: 'REPRESENTATIVE' as 'REPRESENTATIVE' | 'CONSULTANT' | 'PARTHER',
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

  const { data: representativeData, isLoading } = useQuery({
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
        dadosGerais: representativeData.dadosGerais || {
          name: representativeData.dadosGerais?.name || '',
          region: representativeData.dadosGerais?.region || '',
          status: representativeData.dadosGerais?.status || '',
          type: representativeData.dadosGerais?.type || 'REPRESENTATIVE',
        },
        comissao: representativeData.comissao || {
          implantation: representativeData.comissao?.implantation || 0,
          mensality: representativeData.comissao?.mensality || 0,
        },
        contatos: representativeData.contatos || {
          name: representativeData.contatos?.name || '',
          contact: representativeData.contatos?.contact || '',
          description: representativeData.contatos?.description || '',
          telefones: representativeData.contatos?.telefones || [
            {
              number: '',
              type: 'CELULAR',
              favorite: false,
            },
          ],
        },
        enderecos: {
          cep: representativeData.enderecos?.cep || '',
          street: representativeData.enderecos?.street || '',
          bairro: representativeData.enderecos?.bairro || '',
          municipio: representativeData.enderecos?.municipio || '',
          UF: representativeData.enderecos?.UF || '',
          number: representativeData.enderecos?.number || '',
          complement: representativeData.enderecos?.complement || '',
        },
      })
    }
  }, [representativeData])

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
      onOpenFormClient()
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
