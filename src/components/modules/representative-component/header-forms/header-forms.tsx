import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FC } from "react"
import { FaRocket } from "react-icons/fa"
import { Flip, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import api from "../../../../infra/auth/database/acess-api/interceptors-axios"
import type { CreateRepresentativeSchemaDto } from "../zod/create-representative.dto"
import { useFormStore } from "../zustand/gerenciador-zustand"
import { Button } from "../../../ui/button"
import { useNavigate, useParams } from "react-router-dom"

interface IHeaderFormsProps {
  title: string
  setActiveComponent?: (component: string | null) => void
}

export const HeaderForms: FC<IHeaderFormsProps> = ({
  title,
  setActiveComponent,
}) => {
  const { formData, updateFormData, setMutationSuccess } = useFormStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const createMutation = useMutation({
    mutationKey: ["post-representative"],
    mutationFn: async (data: CreateRepresentativeSchemaDto) => {
      const res = await api.post<CreateRepresentativeSchemaDto>(
        "/representative",
        {
          ...data,
          status: "ativo",
        }
      )
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
        onClose: () => navigate("/canais"),
      })
      resetFormData()
      setActiveComponent?.("Canais")
      setMutationSuccess(true)
    },
    onError: (error: Error) => {
      console.error("Erro ao adicionar estabelecimento:", error)
      toast.error(
        `Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente. ${error.message || ""}`
      )
      setMutationSuccess(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (data: CreateRepresentativeSchemaDto) => {
      const res = await api.patch("/representative", data, {
        params: { id },
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-representative"] })
      toast.success("Representante atualizado com sucesso!", {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
        autoClose: 1000,
        onClose: () => navigate("/canais"),
      })
      resetFormData()
      setActiveComponent?.("Canais")
      setMutationSuccess(true)
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar representante:", error)
      toast.error(
        `Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente. ${error.message || ""}`
      )
      setMutationSuccess(false)
    },
  })

  const handleSave = () => {
    setMutationSuccess(false)

    const completeData: CreateRepresentativeSchemaDto = {
      type: formData.type || "REPRESENTATIVE",
      region: formData.region || "",
      supervisor: formData.supervisor || "",
      status: formData.status || "",
      name: formData?.name?.toUpperCase() || "",
      commission: {
        implantation: formData.commission?.implantation,
        mensality: formData.commission?.mensality,
      },
      contact: {
        email: formData.contact?.email || "",
        cellphone: formData.contact?.cellphone || "",
        phone: formData.contact?.phone || "",
      },
      address: {
        postal_code: formData.address?.postal_code || "",
        street: formData.address?.street || "",
        number: formData.address?.number || "",
        neighborhood: formData.address?.neighborhood || "",
        municipality_name: formData.address?.municipality_name || "",
        state: formData.address?.state || "",
        complement: formData.address?.complement || "",
      },
    }

    if (id) {
      updateMutation.mutate(completeData)
    } else {
      createMutation.mutate(completeData)
    }
  }

  const resetFormData = () => {
    updateFormData({
      name: "",
      type: "REPRESENTATIVE",
      region: "",
      supervisor: "",
      status: "ativo",
      commission: { implantation: 0, mensality: 1 },
      contact: { cellphone: "", phone: "", email: "" },
      address: {
        postal_code: "",
        street: "",
        number: "",
        neighborhood: "",
        municipality_name: "",
        state: "",
        complement: "",
      },
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
