import { useEffect } from "react"
import { useForm, FormProvider, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Flip, ToastContainer, toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { OwnerSchema, type TOwner } from "../zod-form/zod_owner.schema"
import { useNavigate } from "react-router-dom"
import { formatCpfCnpj } from "@/common/regex/cpf-cnpj"
import { useFormStore } from "../zustand/form-client.zustand"

export const OwnerForm: React.FC<{
  onNext?: (data: TOwner) => void
  initialValues?: TOwner
}> = ({ onNext, initialValues }) => {
  const { formData, updateFormData, setMutationSuccess } = useFormStore()
  const navigate = useNavigate()

  const form = useForm<TOwner>({
    defaultValues: {
      name: initialValues?.name || formData.owner?.name || "",
      cpf_cnpj: initialValues?.cpf_cnpj || formData.owner?.cpf_cnpj || "",
      birth_date: initialValues?.birth_date || formData.owner?.birth_date || "",
      observation:
        initialValues?.observation || formData.owner?.observation || "",
    },
    resolver: zodResolver(OwnerSchema),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form

  const watchedFields = useWatch({ control })

  useEffect(() => {
    updateFormData({
      owner: {
        name: watchedFields.name || "",
        cpf_cnpj: watchedFields.cpf_cnpj || "",
        birth_date: watchedFields.birth_date || "",
        observation: watchedFields.observation || "",
      },
    })
  }, [watchedFields, updateFormData])

  const submitForm = async (data: TOwner) => {
    try {
      updateFormData({
        owner: {
          name: data.name || "",
          cpf_cnpj: data.cpf_cnpj || "",
          birth_date: data.birth_date || "",
          observation: data.observation || "",
        },
      })
      if (onNext) onNext(data)
      setMutationSuccess(true)
      toast.success("Formulário enviado com sucesso!", {
        onClose: () => navigate("/clientes-de-venda"),
        autoClose: 2000,
        transition: Flip,
      })
      reset()
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
      toast.error("Erro ao enviar o formulário. Tente novamente.")
    }
  }

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
        Formulário de Proprietário
      </h1>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="name"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Proprietário</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="cpf_cnpj"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={e => {
                        const formattedValue = formatCpfCnpj(e.target.value)
                        field.onChange(formattedValue)
                        updateFormData({
                          owner: {
                            ...watchedFields,
                            cpf_cnpj: formattedValue,
                            name: watchedFields.name || "",
                            birth_date: watchedFields.birth_date || "",
                            observation: watchedFields.observation || "",
                          },
                        })
                      }}
                    />
                  </FormControl>
                  <FormMessage>{errors.cpf_cnpj?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="birth_date"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage>{errors.birth_date?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="observation"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage>{errors.observation?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </form>
      </FormProvider>
      <ToastContainer />
    </div>
  )
}
