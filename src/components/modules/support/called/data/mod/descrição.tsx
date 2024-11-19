import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import type { FC } from "react"
import { useEffect } from "react"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { Flip, toast, ToastContainer } from "react-toastify"
import { useCalledStore } from "../entity/hook/use-called"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/infra/auth/database/acess-api/api"
import { FaRocket } from "react-icons/fa"
import { IoWarningOutline } from "react-icons/io5"
import { useNavigate } from "react-router"

type TDesc = {
  note: string
  priority: string
  requested: string
  response: string
  solutionType: string
}

interface IDescription {
  initialValues: Partial<TDesc>
}

export const DescriptionComponent: FC<IDescription> = ({
  initialValues = {},
}) => {
  const { updateFormData, formData, id } = useCalledStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm<TDesc>({
    defaultValues: {
      requested: initialValues.requested || "",
      note: initialValues.note || "",
      response: initialValues.response || "",
      solutionType: initialValues.solutionType || "",
      priority: initialValues.priority || "",
    },
  })

  const { handleSubmit, control } = form

  // Observar mudanças no formulário
  const formValues = useWatch({ control })

  useEffect(() => {
    updateFormData("descricao", formValues)
  }, [formValues, updateFormData])

  const { mutate } = useMutation({
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    mutationFn: async (data: any) => {
      if (id) {
        await api.put(`/called/${id}`, data)
        return
      }
      const res = await api.post("/called", data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-called"] })
      toast.success(`Modulo ${id ? "atualizado" : "cadastrado"} com sucesso!`, {
        theme: "dark",
        icon: <FaRocket />,
        progressStyle: { background: "#1f62cf" },
        transition: Flip,
        onClose: () => navigate("/chamados"),
        autoClose: 2000,
      })
    },
    onError: error => {
      console.error("Erro ao cadastrar o modulo:", error)
      toast.error("Erro ao cadastrar o modulo. Por favor, tente novamente.", {
        theme: "colored",
        icon: <IoWarningOutline />,
        transition: Flip,
      })
    },
  })

  const onSubmit = (data: TDesc) => {
    updateFormData("descricao", data)
    const completeData = {
      ...formData,
      descricao: data,
    }
    mutate(completeData)
  }

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
        Descrição
      </h1>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex flex-col lg:flex-row justify-center gap-2 mt-4">
            <FormField
              control={control}
              name="requested"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Solicitação</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="note"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="response"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Resposta</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col border rounded-lg lg:flex-row justify-around p-4 gap-2 mt-4">
            <FormField
              control={control}
              name="solutionType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Solução</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="PHONE" />
                        </FormControl>
                        <FormLabel className="font-normal">Telefone</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="REMOTE" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Acesso Remoto
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="IN_PERSON" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Presencial
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Prioridade</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="HIGH" />
                        </FormControl>
                        <FormLabel className="font-normal">Alta</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="MEDIUM" />
                        </FormControl>
                        <FormLabel className="font-normal">Média</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="LOW" />
                        </FormControl>
                        <FormLabel className="font-normal">Baixa</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
            <Button className="w-full" type="submit" variant="success">
              Salvar
            </Button>
          </div>
        </form>
      </FormProvider>
      <ToastContainer />
    </section>
  )
}
