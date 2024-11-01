import { Button } from "@/components/ui/button"
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type FC, useEffect } from "react"
import { FormProvider, useForm, Controller } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { HeaderClientForms } from "../header-client"
import type { representative } from "../../representative-component/zod/types-representative"
import api from "@/infra/auth/database/acess-api/interceptors-axios"
import type { Representative } from "../zustand/form-client.zustand"

type FormValues = {
  representative: string
  channel_entry: string
  region: string
}

interface IRepresentativeFormProps {
  onNext: (data: Representative) => void
  initialValues: Representative
}

export const RepresentativeForm: FC<IRepresentativeFormProps> = ({
  onNext,
  initialValues,
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      representative: initialValues.representative || "",
      channel_entry: initialValues.channel_entry || "",
      region: initialValues.region || "",
    },
  })

  const { control, setValue } = form

  useEffect(() => {
    if (initialValues) {
      setValue("representative", initialValues.representative || "")
      setValue("channel_entry", initialValues.channel_entry || "")
      setValue("region", initialValues.region || "")
    }
  }, [initialValues, setValue])

  const {
    data: representatives,
    isLoading,
    isError,
  } = useQuery<representative[], Error>({
    queryKey: ["get-representative"],
    queryFn: async () => {
      const response = await api.get("/representative")
      return response.data
    },
  })

  const submitForm = async (data: FormValues) => {
    console.log("Dados do formulário:", data)
    try {
      onNext(data)
      console.log("Form enviado com sucesso:", data)
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
    }
  }

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <div className="flex w-full items-start justify-start">
        <HeaderClientForms title="Formulário de Representante" />
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <Controller
              name="representative"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Representante</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um representante" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading && <div>Carregando...</div>}
                      {isError && <div>Erro ao carregar representantes.</div>}
                      {representatives?.map(rep => (
                        <SelectItem key={rep.id} value={rep.name}>
                          {rep.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {form.formState.errors.representative?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Controller
              name="channel_entry"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Canal divulgação de entrada</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="Linkedin">Linkedin</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </>
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {form.formState.errors.channel_entry?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Região</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma região" />
                    </SelectTrigger>
                    <SelectContent>
                      <>
                        <SelectItem value="1">Guarapari</SelectItem>
                        <SelectItem value="2">Cajamar</SelectItem>
                        <SelectItem value="3">Vitória</SelectItem>
                      </>
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {form.formState.errors.region?.message}
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
