import { useState } from "react"
import {
  ClientNavigationComponent,
  navClients,
} from "@/components/client-forms/client-navigation-component"
import { AccoutingForm } from "@/components/modules/client/forms/accounting-form"
import { AddressForm } from "@/components/modules/client/forms/address-form"
import { ContactForm } from "@/components/modules/client/forms/contact-form"
import { RepresentativeForm } from "@/components/modules/client/forms/representative-form"
import { EnterpriseForm } from "../../../components/modules/client/forms/enterprise-form"
import { useClientFormStore } from "@/components/modules/client/zustand/client-form.zustand"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { useParams } from "react-router"

export const FormClientComponent = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedForm, setSelectedForm] = useState<string>("Empresa")
  const [enabledForms, setEnabledForms] = useState<string[]>(["Empresa"])
  const { formData, updateFormData } = useClientFormStore()

  const handleNext = (currentForm: string, data: unknown) => {
    updateFormData({ [currentForm.toLowerCase()]: data })

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
      await api.post("/client", combinedData)
      console.log("Todos os dados foram enviados com sucesso:", combinedData)
    } catch (error) {
      console.error("Erro ao enviar os dados:", error)
    }
  }

  const renderForm = () => {
    switch (selectedForm) {
      case "Empresa":
        return <EnterpriseForm onNext={data => handleNext("Empresa", data)} />
      case "Contatos":
        return <ContactForm onNext={data => handleNext("Contatos", data)} />
      case "Endereços":
        return <AddressForm onNext={data => handleNext("Endereços", data)} />
      case "Representante":
        return (
          <RepresentativeForm
            onNext={data => handleNext("Representante", data)}
          />
        )
      case "Proprietário":
        return (
          <AccoutingForm onNext={data => handleNext("Proprietário", data)} />
        )
      default:
        return <div>Selecione uma opção para ver o formulário.</div>
    }
  }

  return (
    <div className="flex px-2">
      <aside className="w-96 bg-gray-100 items-center flex overscroll-none flex-col space-y-6">
        <h2 className="text-2xl font-semibold p-2">
          {id ? "Editar cliente" : " Cadastro cliente"}
        </h2>
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
