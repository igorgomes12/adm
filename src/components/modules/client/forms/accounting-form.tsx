import { Button } from "@/components/ui/button"
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { type FC, useEffect } from "react"
import { FormProvider, useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { HeaderClientForms } from "../header-client"
import { OwnerSchema, type TOwner } from "../zod-form/zod_owner.schema"
import { type Owner, useFormStore } from "../zustand/form-client.zustand"

interface IOwnerFormProps {
  onNext: (data: Owner) => void
  initialValues: {
    owners: Array<{
      birthDate: string
      cpfCnpj: string
      name: string
      observation?: string
    }>
  }
}

export const OwnerForm: FC<IOwnerFormProps> = ({ onNext, initialValues }) => {
  const defaultInitialValues: Owner = {
    name: "",
    cpf_cnpj: "",
    birth_date: "",
    observation: "",
  }
  const { updateFormData } = useFormStore()

  const form = useForm<TOwner>({
    resolver: zodResolver(OwnerSchema),
    defaultValues: defaultInitialValues,
  })

  const { control, setValue } = form

  useEffect(() => {
    if (initialValues.owners && initialValues.owners.length > 0) {
      const owner = initialValues.owners[0]
      setValue("name", owner.name || "")
      setValue("cpf_cnpj", owner.cpfCnpj || "")
      setValue("birth_date", owner.birthDate || "")
      setValue("observation", owner.observation || "")
    }
  }, [initialValues, setValue])

  const submitForm = async (data: TOwner) => {
    try {
      const ownerData: Owner = {
        ...data,
        observation: data.observation || "",
      }

      onNext(ownerData)
      updateFormData({ owner: ownerData })
      console.log("Form enviado com sucesso:", ownerData)
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
    }
  }

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <div className="flex w-full items-start justify-start">
        <HeaderClientForms title="Formulário de Proprietário" />
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
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
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Controller
              name="cpf_cnpj"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <Input {...field} />
                  <FormMessage>
                    {form.formState.errors.cpf_cnpj?.message}
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
                    {form.formState.errors.birth_date?.message}
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
                    {form.formState.errors.observation?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <Button className="w-full" type="submit" variant="success">
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
