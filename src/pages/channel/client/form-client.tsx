import { useState } from 'react'
import { EnterpriseForm } from '../../../components/modules/client/forms/enterprise-form'
import { ContactForm } from '@/components/modules/client/forms/contact-form'
import { AddressForm } from '@/components/modules/client/forms/address-form'
import { RepresentativeForm } from '@/components/modules/client/forms/representative-form'
import { AccoutingForm } from '@/components/modules/client/forms/accounting-form'
import {
  ClientNavigationComponent,
  navClients,
} from '@/components/client-forms/client-navigation-component'
import api from '@/components/sing-in/api/interceptors-axios'
import type { TClient } from '@/components/modules/client/zod-form/zod_client.schema'

export const FormClientComponent = () => {
  const [selectedForm, setSelectedForm] = useState<string>('Empresa')
  const [enabledForms, setEnabledForms] = useState<string[]>(['Empresa'])

  const [formData, setFormData] = useState({
    enterprise: {},
    contact: {},
    address: {},
    representative: {},
    accounting: {},
  })

  const handleNext = (currentForm: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [currentForm.toLowerCase()]: data,
    }))

    const nextFormIndex =
      navClients.findIndex(client => client.title === currentForm) + 1
    if (nextFormIndex < navClients.length) {
      const nextFormTitle = navClients[nextFormIndex].title
      setEnabledForms([...enabledForms, nextFormTitle])
      setSelectedForm(nextFormTitle)
    } else {
      submitAllData()
    }
  }

  const submitAllData = async () => {
    try {
      const combinedData = {
        ...formData.enterprise,
        ...formData.contact,
        ...formData.address,
        ...formData.representative,
        ...formData.accounting,
      }
      await api.post('/client', combinedData)
      console.log('Todos os dados foram enviados com sucesso:', combinedData)
    } catch (error) {
      console.error('Erro ao enviar os dados:', error)
    }
  }

  const renderForm = () => {
    switch (selectedForm) {
      case 'Empresa':
        return (
          <EnterpriseForm
            onNext={(data: TClient) => handleNext('Empresa', data)}
          />
        )
      case 'Contatos':
        return (
          <ContactForm
            onNext={(data: TClient) => handleNext('Contatos', data)}
          />
        )
      case 'Endereços':
        return (
          <AddressForm
            onNext={(data: TClient) => handleNext('Endereços', data)}
          />
        )
      case 'Representante':
        return (
          <RepresentativeForm
            onNext={(data: TClient) => handleNext('Representante', data)}
          />
        )
      case 'Proprietário':
        return (
          <AccoutingForm
            onNext={(data: TClient) => handleNext('Proprietário', data)}
          />
        )
      default:
        return <div>Selecione uma opção para ver o formulário.</div>
    }
  }

  return (
    <div className="flex px-2">
      <aside className="w-96 bg-gray-100 items-center flex overscroll-none flex-col space-y-6">
        <h2 className="text-2xl font-semibold p-2">Cadastro cliente</h2>
        <ClientNavigationComponent
          selected={selectedForm}
          onSelect={title =>
            enabledForms.includes(title) && setSelectedForm(title)
          }
        />
      </aside>
      <main className="flex-1 bg-white">{renderForm()}</main>
    </div>
  )
}
