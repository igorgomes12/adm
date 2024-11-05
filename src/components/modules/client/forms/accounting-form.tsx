import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormProvider, useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { OwnerSchema, type TOwner } from "../zod-form/zod_owner.schema"
import { type Owner, useFormStore } from "../zustand/form-client.zustand"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"
import type { FC } from "react"
import { formatCpfCnpj } from "@/common/regex/cpf-cnpj"
import { HeaderClientForms } from "../header-client"

interface IOwnerFormProps {
  onNext: (data: Owner) => void
  initialValues: Owner
}

export const OwnerForm: FC<IOwnerFormProps> = ({ onNext, initialValues }) => {
  const { updateFormData } = useFormStore()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TOwner>({
    resolver: zodResolver(OwnerSchema),
    defaultValues: {
      name: initialValues.name || "",
      cpf_cnpj: initialValues.cpf_cnpj || "",
      birth_date: initialValues.birth_date || "",
      observation: initialValues.observation || "",
    },
  })

  const { control, handleSubmit, formState, reset } = form

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const submitForm = async (data: TOwner) => {
    setIsSubmitting(true)
    try {
      const ownerData: Owner = {
        ...data,
        observation: data.observation || "",
      }

      onNext(ownerData)
      updateFormData({ owner: ownerData })

      toast.success("Formulário enviado com sucesso!", {
        onClose: () => navigate("/clientes-de-venda"),
        autoClose: 2000,
      })
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
      toast.error(
        "Erro ao enviar os dados do proprietário. Por favor, tente novamente."
      )
    } finally {
      reset(initialValues)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <div className="flex w-full items-start justify-start">
        <HeaderClientForms title=" Formulário de Proprietário" />
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Proprietário</FormLabel>
                  <Input {...field} />
                  <FormMessage>{formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            <Controller
              name="cpf_cnpj"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <Input
                    {...field}
                    onChange={e => {
                      const formattedValue = formatCpfCnpj(e.target.value)
                      field.onChange(formattedValue)
                    }}
                  />
                  <FormMessage>
                    {formState.errors.cpf_cnpj?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Controller
              name="birth_date"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Input type="date" {...field} />
                  <FormMessage>
                    {formState.errors.birth_date?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <Controller
              name="observation"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Observação</FormLabel>
                  <Textarea {...field} />
                  <FormMessage>
                    {formState.errors.observation?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <Button
              className="w-full"
              type="submit"
              variant="success"
              disabled={isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </form>
      </FormProvider>
      <ToastContainer />
    </div>
  )
}
