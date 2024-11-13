import { HeaderForms } from "@/components/modules/representative-component/header-forms/header-forms"
import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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
import { FormProvider, useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"

interface FormProviderProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onNext: (data: any) => void
}

export const DadosGeraisCalled: FC<FormProviderProps> = ({
  onNext,
}): JSX.Element => {
  const form = useForm({})
  const { handleSubmit, register } = form
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onSubmit = (data: any) => {
    console.log(data)
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
                control={form.control}
                name="id"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Cód</FormLabel>
                    <FormControl>
                      <Input {...register("id")} disabled />
                    </FormControl>
                    {/* <FormMessage>
                      {errors.id && <span>{errors.id.message}</span>}
                    </FormMessage> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="createdAt"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Data Inicio</FormLabel>
                    <FormControl>
                      <Input disabled type="date" {...register("createdAt")} />
                    </FormControl>
                    {/* <FormMessage>
                      {errors.createdAt && (
                        <span>{errors.createdAt.message}</span>
                      )}
                    </FormMessage> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timestamp"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Hora Inicio</FormLabel>
                    <FormControl>
                      <Input disabled type="time" {...register("timestamp")} />
                    </FormControl>
                    {/* <FormMessage>
                      {errors.timestamp && (
                        <span>{errors.timestamp.message}</span>
                      )}
                    </FormMessage> */}
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-2 mt-4">
              <FormField
                control={form.control}
                name="name"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Select>
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
                    {/* <FormMessage>
                      {errors.name && <span>{errors.name.message}</span>}
                    </FormMessage> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Contato</FormLabel>
                    <FormControl>
                      <Input {...register("contact")} />
                    </FormControl>
                    {/* <FormMessage>
                      {errors.contact && <span>{errors.contact.message}</span>}
                    </FormMessage> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="caller"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Atendente</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o Atendente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Atendentes</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {/* <FormMessage>
                      {errors.caller && <span>{errors.caller.message}</span>}
                    </FormMessage> */}
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
