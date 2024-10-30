import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FC } from "react"
import { FaRocket } from "react-icons/fa"
import { Flip, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "@/infra/auth/database/acess-api/api"
import type { TClient } from "./zod-form/zod_client.schema"
import { Button } from "@/components/ui/button"
import { useFormClientStore } from "./zustand/form-client.zustand"

interface IHeaderClientFormsProps {
  title: string
  setActiveComponent?: (component: string | null) => void
}

export const HeaderClientForms: FC<IHeaderClientFormsProps> = ({
  title,
  setActiveComponent,
}) => {
  const { formData, updateFormData, setMutationSuccess } = useFormClientStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const createMutation = useMutation({
    mutationKey: ["post-client"],
    mutationFn: async (data: TClient) => {
      const res = await api.post<TClient>("/client", {
        ...data,
        status: "ativo",
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-representative"] })
      toast.success("Estabelecimento adicionado com sucesso!", {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
        autoClose: 1000,
        onClose: () => navigate("/clientes-de-venda"),
      })
      resetFormData()
      setActiveComponent?.("Clientes de venda")
      setMutationSuccess(true)
    },
    onError: (error: Error) => {
      console.error("Erro ao adicionar estabelecimento:", error)
      toast.error(
        `Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente.
          ${error.message || ""}`
      )
      setMutationSuccess(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: TClient) => {
      const res = await api.patch("/client", data, {
        params: { id },
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-client"] })
      toast.success("Representante atualizado com sucesso!", {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
        autoClose: 1000,
        onClose: () => navigate("/clientes-de-venda"),
      })
      resetFormData()
      setActiveComponent?.("Clientes de venda")
      setMutationSuccess(true)
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar representante:", error)
      toast.error(
        `Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente.
          ${error.message || ""}`
      )
      setMutationSuccess(false)
    },
  })

  const handleSave = () => {
    setMutationSuccess(false)

    const completeData: TClient = {
      corporate_name: formData.corporate_name || "Nome Empresarial",
      fantasy_name: formData.fantasy_name || "Nome Fantasia",
      contacts: formData.contacts || [],
      cpf_cnpj: formData.cpf_cnpj || "00000000000",
      state_registration: formData.state_registration || "Registro Estadual",
      municipal_registration: formData.municipal_registration || null,
      rural_registration: formData.rural_registration || null,
      address: formData.address || [],
      name_account: formData.name_account || "Nome da Conta",
      id_account: formData.id_account || 1,
      establishment_typeId: formData.establishment_typeId || 1,
      systemsId: formData.systemsId || 1,
      owner: formData.owner || [],
    }

    if (id) {
      updateMutation.mutate(completeData)
    } else {
      createMutation.mutate(completeData)
    }
  }

  const resetFormData = () => {
    updateFormData({
      address: [
        {
          postal_code: "",
          street: "",
          number: "",
          neighborhood: "",
          municipality_name: "",
          state: "",
          municipality_id: 0,
          state_id: 0,
          country_id: 0,
          region_id: 0,
          main: false,
        },
      ],
    })
  }

  return (
    <>
      <div className="flex items-start justify-between w-full">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          {title}
        </h1>
        <Button onClick={handleSave} variant={"blue"}>
          Salvar
        </Button>
      </div>
    </>
  )
}
