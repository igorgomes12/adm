import { useCalledStore } from "@/components/modules/support/called/data/entity/hook/use-called"
import { CenterCalledComponent } from "@/components/modules/support/called/data/mod/central-atendimentos"
import { DadosGeraisCalled } from "@/components/modules/support/called/data/mod/dados-gerais"
import { DescriptionComponent } from "@/components/modules/support/called/data/mod/descrição"
import { CalledNavComponent } from "@/components/modules/support/called/data/nav/navigation-called"
import { type FC, useState, useEffect } from "react"
import { BiTime } from "react-icons/bi"
import { useParams } from "react-router"

export const FormCalledComponent: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const { formData, updateFormData } = useCalledStore()
  const [selectedForm, setSelectedForm] = useState<string>("Dados Gerais")
  const [enabledForms, setEnabledForms] = useState<string[]>(["Dados Gerais"])
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  const formKeyMap: Record<string, keyof typeof formData> = {
    "Dados Gerais": "dadosGerais",
    "Central de Atendimento": "centralAtendimento",
    Descrição: "descricao",
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleNext = (currentForm: string, data: any) => {
    const mappedKey = formKeyMap[currentForm]
    if (mappedKey) {
      updateFormData(mappedKey, data)
    }

    const forms = ["Dados Gerais", "Central de Atendimento", "Descrição"]
    const nextFormIndex = forms.indexOf(currentForm) + 1

    if (nextFormIndex < forms.length) {
      const nextFormTitle = forms[nextFormIndex]
      if (!enabledForms.includes(nextFormTitle)) {
        setEnabledForms(prev => [...prev, nextFormTitle])
      }
      setSelectedForm(nextFormTitle)
    }
  }

  const renderForm = () => {
    switch (selectedForm) {
      case "Dados Gerais":
        return (
          <DadosGeraisCalled
            initialValues={{ ...formData.dadosGerais }}
            onNext={data => handleNext("Dados Gerais", data)}
          />
        )
      case "Central de Atendimento":
        return (
          <CenterCalledComponent
            initialValues={{ ...formData.centralAtendimento }}
            onNext={data => handleNext("Central de Atendimento", data)}
          />
        )
      case "Descrição":
        return (
          <DescriptionComponent initialValues={{ ...formData.descricao }} />
        )
      default:
        return <div>Selecione uma opção para ver o formulário.</div>
    }
  }
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex px-2">
      <aside className="w-96 bg-gray-100 h-screen items-center flex overscroll-none flex-col space-y-6">
        <div className="flex space-y-2 flex-col items-center">
          <h2 className="text-2xl font-semibold p-2">
            {id ? "Editar chamados" : "Cadastro chamados"}
          </h2>
          <p className="text-sm text-black">Duração</p>
          <div className="flex items-center border-2 border-indigo-700 rounded-lg p-2 space-x-2">
            <BiTime className="text-2xl text-indigo-600 " />
            <span className="font-semibold text-indigo-600 text-2xl">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
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
