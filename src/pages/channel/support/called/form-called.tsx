import { DadosGeraisCalled } from "@/components/modules/support/called/data/mod/dados-gerais"
import { CalledNavComponent } from "@/components/modules/support/called/data/nav/navigation-called"
import { useState, type FC } from "react"
import { useParams } from "react-router"

export const FormCalledComponent: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [selectedForm, setSelectedForm] = useState<string>("Dados Gerais")
  const [enabledForms, setEnabledForms] = useState<string[]>(["Dados Gerais"])

  const [formData, setFormData] = useState({})

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleNext = (currentForm: string, data: any) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    setFormData((prevData: any) => ({
      ...prevData,
      [currentForm.toLowerCase()]: data,
    }))

    const forms = ["Dados Gerais", "Central de Atendimento", "Descrição"]
    const nextFormIndex = forms.indexOf(currentForm) + 1

    if (nextFormIndex < forms.length) {
      const nextFormTitle = forms[nextFormIndex]
      if (!enabledForms.includes(nextFormTitle)) {
        setEnabledForms(prev => [...prev, nextFormTitle])
      }
      setSelectedForm(nextFormTitle)
    } else {
      // if (id) {
      //   updateRepresentativeMutation.mutate(formData)
      // } else {
      //   createRepresentativeMutation.mutate(formData)
      // }
    }
  }

  const renderForm = () => {
    switch (selectedForm) {
      case "Dados Gerais":
        return (
          <DadosGeraisCalled
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            onNext={(data: any) => handleNext("Dados Gerais", data)}
          />
        )
      case "Central de Atendimento":
        return <div>Central de Atendimento</div>
      case "Descrição":
        return <div>Descrição</div>
      default:
        return <div>Selecione uma opção para ver o formulário.</div>
    }
  }

  return (
    <div className="flex px-2">
      <aside className="w-96 bg-gray-100 h-screen items-center flex overscroll-none flex-col space-y-6">
        <h2 className="text-2xl font-semibold p-2">
          {id ? "Editar chamados" : "Cadastro chamados"}
        </h2>
        <CalledNavComponent
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
