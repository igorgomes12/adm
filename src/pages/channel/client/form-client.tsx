import {
  ClientNavigationComponent,
  navClients,
} from '@/components/client-forms/client-navigation-component'
import { useState } from 'react'
import { EnterpriseForm } from '../../../components/modules/client/forms/enterprise-form'
import { ContactForm } from '@/components/modules/client/forms/contact-form'

export const FormClientComponent = () => {
  const [selectedForm, setSelectedForm] = useState<string>('Empresa')
  const [enabledForms, setEnabledForms] = useState<string[]>(['Empresa'])

  const handleNext = (currentForm: string) => {
    const nextFormIndex =
      navClients.findIndex(client => client.title === currentForm) + 1
    if (nextFormIndex < navClients.length) {
      const nextFormTitle = navClients[nextFormIndex].title
      setEnabledForms([...enabledForms, nextFormTitle])
      setSelectedForm(nextFormTitle)
    }
  }

  const renderForm = () => {
    switch (selectedForm) {
      case 'Empresa':
        return <EnterpriseForm onNext={() => handleNext('Empresa')} />
      case 'Contatos':
        return <ContactForm onNext={() => handleNext('Contatos')} />
      default:
        return <div>Selecione uma opção para ver o formulário.</div>
    }
  }

  return (
    <div className="flex h-screen">
      <aside className="w-96 bg-gray-100 items-center flex flex-col space-y-6">
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
