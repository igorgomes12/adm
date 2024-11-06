import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FC } from "react"
import { FaRocket } from "react-icons/fa"
import { Flip, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "@/infra/auth/database/acess-api/api"
import type { TClient } from "./zod-form/zod_client.schema"
import { Button } from "@/components/ui/button"
import { useFormStore } from "./zustand/form-client.zustand"

interface IHeaderClientFormsProps {
  title: string
  setActiveComponent?: (component: string | null) => void
}

export const HeaderClientForms: FC<IHeaderClientFormsProps> = ({
  title,
  setActiveComponent,
}) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { formData, updateFormData } = useFormStore()

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
    },
    onError: (error: Error) => {
      console.error("Erro ao adicionar estabelecimento:", error)
      toast.error(
        `Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente. ${error.message || ""}`
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: TClient) => {
      if (!data || !id) {
        throw new Error("Dados ou ID inválidos fornecidos.")
      }
      const res = await api.patch(`/client/${id}`, data)
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
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar representante:", error)
      toast.error(
        `Ocorreu um erro ao atualizar o representante. Por favor, tente novamente. ${error.message || ""}`
      )
    },
  })

  const handleSave = () => {
    const representativeId =
      Number.parseInt(formData.representative as unknown as string, 10) || 1

    const completeData: TClient = {
      corporate_name: formData.corporate_name.trim(),
      fantasy_name: formData.fantasy_name.trim(),
      cpf_cnpj: formData.cpf_cnpj.replace(/\D/g, ""),
      state_registration: formData.state_registration || "", // Ensure non-undefined
      municipal_registration: formData.municipal_registration || "", // Ensure non-undefined
      rural_registration: formData.rural_registration || "", // Ensure non-undefined
      contacts: formData.contacts,
      name_account: formData.name_account.trim(),
      establishment_typeId: formData.establishment_typeId || 1,
      systemsId: formData.systemsId || 1,
      owner: {
        name: formData.owner.name.trim(),
        cpf_cnpj: formData.owner.cpf_cnpj.replace(/\D/g, ""),
        birth_date:
          formData.owner.birth_date || new Date().toISOString().split("T")[0],
        observation: formData.owner.observation || "",
      },
      addresses: formData.addresses.map(address => ({
        street: address.street || "Unknown street", // Provide defaults
        complement: address.complement || "",
        postal_code: address.postal_code || "00000-000", // Provide defaults
        number: address.number || "N/A", // Provide defaults
        neighborhood: address.neighborhood || "Unknown neighborhood", // Provide defaults
        municipality_id: address.municipality_id || 1, // Provide defaults
        municipality_name: address.municipality_name || "Unknown municipality", // Provide defaults
        state_id: address.state_id || 1, // Provide defaults
        state: address.state || "Unknown state", // Provide defaults
        country_id: address.country_id || 1, // Provide defaults
        region_id: address.region_id || 1, // Provide defaults
        description: address.description || "",
        favorite: address.favorite ?? false,
        main: address.main ?? false,
      })),
      representativeId,
    }

    if (id) {
      updateMutation.mutate(completeData)
    } else {
      createMutation.mutate(completeData)
    }
  }
  const resetFormData = () => {
    updateFormData({
      corporate_name: "",
      fantasy_name: "",
      cpf_cnpj: "",
      state_registration: "",
      municipal_registration: "",
      rural_registration: "",
      contacts: [],
      addresses: [
        {
          street: "",
          complement: "",
          postal_code: "",
          number: "",
          neighborhood: "",
          municipality_id: 0,
          municipality_name: "",
          state_id: 0,
          state: "",
          country_id: 0,
          region_id: 0,
          description: "",
          favorite: false,
          main: false,
        },
      ],
      name_account: "",
      establishment_typeId: 1,
      systemsId: 1,
      owner: {
        name: "",
        cpf_cnpj: "",
        birth_date: "",
        observation: "",
      },
    })
  }

  return (
    <div className="flex items-start justify-between w-full">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
        {title}
      </h1>
      <Button onClick={handleSave} variant="destructive">
        Salvar
      </Button>
    </div>
  )
}
