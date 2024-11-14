import { useEffect } from "react"
import { HeaderForms } from "@/components/modules/representative-component/header-forms/header-forms"
import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FC } from "react"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import { useCalledStore } from "../entity/hook/use-called"

interface CentralAtendimentoData {
  system: string
  module: string
  type: string
  description: string
}

interface FormProviderProps {
  initialValues: Partial<CentralAtendimentoData>
  onNext: (data: CentralAtendimentoData) => void
}

export const CenterCalledComponent: FC<FormProviderProps> = ({
  initialValues = {},
  onNext,
}) => {
  const { updateFormData } = useCalledStore()

  const form = useForm<CentralAtendimentoData>({
    defaultValues: {
      system: initialValues.system || "",
      module: initialValues.module || "",
      type: initialValues.type || "",
      description: initialValues.description || "",
    },
  })

  const { handleSubmit, control } = form

  // Use `useWatch` para monitorar mudanças nos valores do formulário
  const formValues = useWatch({ control })

  useEffect(() => {
    updateFormData("centralAtendimento", formValues)
  }, [formValues, updateFormData])

  const onSubmit = (data: CentralAtendimentoData) => {
    onNext(data)
  }

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderForms title="Central de Atendimentos" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex flex-col lg:flex-row justify-center gap-2 mt-4">
            <FormField
              control={control}
              name="system"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sistema</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um sistema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sistema</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="module"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Módulo</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um módulo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Módulo</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-2 mt-4">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
            <Button className="w-full" type="submit" variant="success">
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
      <ToastContainer />
    </section>
  )
}
