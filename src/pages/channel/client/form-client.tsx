import { ClientNavigationComponent } from '@/components/client-forms/client-navigation-component'
import { useState } from 'react'

export const FormClientComponent = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null)

  const renderForm = () => {
    switch (selectedForm) {
      case 'Empresa':
        return <EmpresaForm />
      case 'Contatos':
        return <ContasForm />
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
          onSelect={setSelectedForm}
        />
      </aside>
      <main className="flex-1 p-6 bg-white">{renderForm()}</main>
    </div>
  )
}
const EmpresaForm = () => (
  <div>
    <h3>Formulário de Empresa</h3>
    {/* Campos do formulário */}
  </div>
)

const ContasForm = () => (
  <div>
    <h3>Formulário de Contas</h3>
    {/* Campos do formulário */}
  </div>
)
