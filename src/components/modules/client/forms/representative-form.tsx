import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FC } from "react"
import { FormProvider, useForm } from "react-hook-form"
import type { TClient } from "../zod-form/zod_client.schema"

type FormValues = {
  representative: string
  channel_entry: string
  region: string
  accontings: string
}

export const RepresentativeForm: FC<{ onNext: (data: TClient) => void }> = ({
  onNext,
}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      representative: "",
      channel_entry: "",
      region: "",
      accontings: "",
    },
  })

  const submitForm = async (data: FormValues) => {
    console.log("Dados do formulário:", data)
    try {
      onNext(data as unknown as TClient)
      console.log("Form enviado com sucesso:", data)
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
    }
  }

  return (
    <div className="flex flex-col p-4 w-full h-screen">
      <div className="flex w-full items-start justify-start">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Formulário de Representante
        </h1>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex border bg-white rounded-xl shadow-lg p-4 flex-col space-y-4 w-full"
        >
          <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
            <FormField
              name="representative"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Representante</FormLabel>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um representante" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">João Silva</SelectItem>
                      <SelectItem value="2">Lucas Silva</SelectItem>
                      <SelectItem value="3">Maria Silva</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {form.formState.errors.representative?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="channel_entry"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Canal divulgação de entrada</FormLabel>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="Linkedin">Linkedin</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
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
            <FormField
              name="region"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Região</FormLabel>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma região" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Guarapari</SelectItem>
                      <SelectItem value="2">Cajamar</SelectItem>
                      <SelectItem value="3">Vitória</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {form.formState.errors.region?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="accontings"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contabilidade</FormLabel>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma contabilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {form.formState.errors.accontings?.message}
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
