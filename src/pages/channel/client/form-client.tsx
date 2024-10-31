import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import { RepresentativeForm } from "@/components/modules/client/forms/representative-form"
import { OwnerForm } from "@/components/modules/client/forms/accounting-form"
import {
  ClientNavigationComponent,
  navClients,
} from "@/components/client-forms/client-navigation-component"
import { toast } from "react-toastify"
import { EnterpriseForm } from "@/components/modules/client/forms/enterprise-form"
import { ContactClientForm } from "@/components/modules/client/forms/contact-client-form"
import { AddressClientForm } from "@/components/modules/client/forms/address-client-form"
import { useFormStore } from "@/components/modules/client/zustand/form-client.zustand"
import { useQuery } from "@tanstack/react-query"

export const FormClientComponent = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedForm, setSelectedForm] = useState<string>("Empresa")
  const [enabledForms, setEnabledForms] = useState<string[]>(["Empresa"])
  const { formData, updateFormData } = useFormStore()

  const {
    data: clientData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const response = await api.get(`/client/${id}`)
      return response.data
    },
    enabled: !!id,
  })

  useEffect(() => {
    if (clientData) {
      updateFormData(clientData)
    }
  }, [clientData, updateFormData])

  console.log("Dados do cliente:", clientData)

  const handleNext = (currentForm: string, data: unknown) => {
    updateFormData({ [currentForm.toLowerCase()]: data })

    const nextFormIndex =
      navClients.findIndex(client => client.title === currentForm) + 1
    if (nextFormIndex < navClients.length) {
      const nextFormTitle = navClients[nextFormIndex].title
      if (!enabledForms.includes(nextFormTitle)) {
        setEnabledForms(prev => [...prev, nextFormTitle])
      }
      setSelectedForm(nextFormTitle)
    } else {
      submitAllData()
    }
  }

  const submitAllData = async () => {
    try {
      const combinedData = {
        ...formData,
      }

      if (id) {
        await api.patch(`/client/${id}`, combinedData)
        toast.success("Cliente atualizado com sucesso!")
      } else {
        await api.post("/client", combinedData)
        toast.success("Cliente cadastrado com sucesso!")
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error)
      toast.error("Erro ao enviar os dados do cliente.")
    }
  }

  const renderForm = () => {
    switch (selectedForm) {
      case "Empresa":
        return (
          <EnterpriseForm
            initialValues={formData}
            onNext={data => handleNext("Empresa", data)}
          />
        )
      case "Contatos":
        return (
          <ContactClientForm
            initialValues={formData.contacts[0]}
            onNext={data => handleNext("Contatos", [data])}
          />
        )
      case "Endereços":
        return (
          <AddressClientForm
            initialValues={formData.address[0]}
            onNext={data => handleNext("Endereços", [data])}
          />
        )
      case "Representante":
        return (
          <RepresentativeForm
            initialValues={formData.representative}
            onNext={data => handleNext("Representante", data)}
          />
        )
      case "Proprietário":
        return (
          <OwnerForm
            initialValues={formData.owner}
            onNext={data => handleNext("Proprietário", data)}
          />
        )
      default:
        return <div>Selecione uma opção para ver o formulário.</div>
    }
  }

  return (
    <div className="flex px-2">
      <aside className="w-96 bg-gray-100 items-center flex overscroll-none flex-col space-y-6">
        <h2 className="text-2xl font-semibold p-2">
          {id ? "Editar cliente" : "Cadastro cliente"}
        </h2>
        <ClientNavigationComponent
          selected={selectedForm}
          onSelect={title =>
            enabledForms.includes(title) && setSelectedForm(title)
          }
        />
      </aside>
      <main className="flex-1 bg-white">
        {isLoading ? (
          <p>Carregando dados do cliente...</p>
        ) : error ? (
          <p>Erro ao carregar os dados: {error.message}</p>
        ) : (
          renderForm()
        )}
      </main>
    </div>
  )
}
