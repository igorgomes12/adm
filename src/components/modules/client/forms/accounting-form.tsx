import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import type { FC } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { HeaderClientForms } from "../header-client"
import { OwnerSchema, type TOwner } from "../zod-form/zod_owner.schema"
import { type Owner, useFormStore } from "../zustand/form-client.zustand"

interface IAccountingFormProps {
  onNext: (data: Owner) => void
  initialValues: Owner
}

export const OwnerForm: FC<IAccountingFormProps> = ({
  onNext,
  initialValues,
}) => {
  const defaultInitialValues: Owner = {
    name: "",
    cpf_cnpj: "",
    birth_date: "",
    observation: "",
  }
  const { updateFormData } = useFormStore()

  const form = useForm<TOwner>({
    resolver: zodResolver(OwnerSchema),
    defaultValues: {
      name: initialValues?.name || defaultInitialValues.name,
      cpf_cnpj: initialValues?.cpf_cnpj || defaultInitialValues.cpf_cnpj,
      birth_date: initialValues?.birth_date || defaultInitialValues.birth_date,
      observation:
        initialValues?.observation || defaultInitialValues.observation,
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form

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
          onSubmit={handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Proprietário</FormLabel>
                  <FormControl>
                    <Input {...field} {...register("name")} />
                    {errors.name && <p>{errors.name.message}</p>}
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="cpf_cnpj"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} {...register("cpf_cnpj")} />
                    {errors.cpf_cnpj && <p>{errors.cpf_cnpj.message}</p>}
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="birth_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} {...register("birth_date")} />
                    {errors.birth_date && <p>{errors.birth_date.message}</p>}
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="observation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea {...field} {...register("observation")} />
                    {errors.observation && <p>{errors.observation.message}</p>}
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <Button className="w-full" type="submit" variant="success">
              Enviar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
