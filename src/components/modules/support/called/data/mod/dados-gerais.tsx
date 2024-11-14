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

interface FormFields {
  createdAt: string
  timestamp: string
  name: string
  contact: string
  caller: string
}

interface FormProviderProps {
  initialValues: Partial<FormFields>
  onNext: (data: FormFields) => void
}

export const DadosGeraisCalled: FC<FormProviderProps> = ({
  initialValues = {},
  onNext,
}) => {
  const { updateFormData } = useCalledStore()

  const form = useForm<FormFields>({
    defaultValues: {
      createdAt: initialValues.createdAt || "",
      timestamp: initialValues.timestamp || "",
      name: initialValues.name || "",
      contact: initialValues.contact || "",
      caller: initialValues.caller || "",
    },
  })

  const { handleSubmit, control, setValue } = form
  const formValues = useWatch({ control })

  useEffect(() => {
    updateFormData("dadosGerais", formValues)
  }, [formValues, updateFormData])

  useEffect(() => {
    if (!initialValues.createdAt) {
      const currentDate = new Date().toISOString().split("T")[0]
      setValue("createdAt", currentDate)
    }
    if (!initialValues.timestamp) {
      const currentTime = new Date().toLocaleTimeString("it-IT")
      setValue("timestamp", currentTime)
    }
  }, [setValue, initialValues])

  const onSubmit = (data: FormFields) => {
    onNext(data)
  }

  return (
    <section className="w-full items-start justify-center p-4 flex flex-col">
      <HeaderForms title="Dados Gerais" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 p-4 w-full border-2 shadow-lg rounded-md flex flex-col"
        >
          <div className="flex flex-col w-full gap-2">
            <div className="flex lg:flex-row flex-col items-start w-full gap-2 justify-between">
              <FormField
                control={control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data Início</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="timestamp"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Hora Início</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-2 mt-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Clientes</SelectLabel>
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
                name="contact"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contato</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="caller"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Atendente</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o Atendente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Atendentes</SelectLabel>
                            <SelectItem value="joao">João</SelectItem>
                            <SelectItem value="maria">Maria</SelectItem>
                            <SelectItem value="carlos">Carlos</SelectItem>
                            <SelectItem value="ana">Ana</SelectItem>
                            <SelectItem value="lucas">Lucas</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
