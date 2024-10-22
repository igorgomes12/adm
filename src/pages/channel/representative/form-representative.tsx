import { useState, type FC } from 'react'
import { AddressForm } from '@/components/modules/client/forms/address-form'
import { ContactForm } from '@/components/modules/client/forms/contact-form'
import { ComissaoForm } from '@/components/modules/representative-component/forms-navigation/comissao-form'
import { DadosGerais } from '@/components/modules/representative-component/forms-navigation/dados-gerais'
import { RepresentativeNavComponent } from '@/components/modules/representative-component/nav/navitgation-form'

interface FormRepresentativeProps {
  onOpenFormClient: () => void
}

export const FormRepresentative: FC<FormRepresentativeProps> = ({
  onOpenFormClient,
}) => {
  const [selectedForm, setSelectedForm] = useState<string | null>(
    'Dados Gerais',
  )
  const [enabledForms, setEnabledForms] = useState<string[]>(['Dados Gerais'])

  const [formData, setFormData] = useState({
    dadosGerais: {},
    comissao: {},
    contatos: {},
    enderecos: {},
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
      console.log('Todos os dados foram capturados:', formData)
      onOpenFormClient()
    }
  }

  const renderForm = () => {
    switch (selectedForm) {
      case 'Dados Gerais':
        return <DadosGerais onNext={data => handleNext('Dados Gerais', data)} />
      case 'Comissão':
        return <ComissaoForm onNext={data => handleNext('Comissão', data)} />
      case 'Contatos':
        return <ContactForm onNext={data => handleNext('Contatos', data)} />
      case 'Endereços':
        return <AddressForm onNext={data => handleNext('Endereços', data)} />
      default:
        return <div>Selecione uma opção para ver o formulário.</div>
    }
  }

  return (
    <div className="flex px-2">
      <aside className="w-96 bg-gray-100 h-screen items-center flex overscroll-none flex-col space-y-6">
        <h2 className="text-2xl font-semibold p-2">Cadastro representante</h2>
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
