import type { FC } from "react"
import { useCalledStore } from "../entity/hook/use-called"
import { Button } from "@/components/ui/button"
import { FormProvider, useForm } from "react-hook-form"
import { calledSchema, type CalledDto } from "../dto/called-dto"
import { zodResolver } from "@hookform/resolvers/zod"
import { TfiTimer } from "react-icons/tfi"

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
import { Textarea } from "@/components/ui/textarea"

export const CalledModuleData: FC = (): JSX.Element => {
  const {
    id,
    priority,
    caller,
    name,
    description,
    status,
    type,
    contact,
    system,
    requested,
    note,
    response,
    solutionType,
    duration,
    completedAt,
    timestampFinally,
    createdAt,
    timestamp,
    updatedAt,
    deletedAt,
    onClose,
  } = useCalledStore()

  const form = useForm<CalledDto>({
    resolver: zodResolver(calledSchema),
    defaultValues: {
      id: id || 0,
      priority: priority || "LOW",
      caller: caller || "",
      name: name || "",
      description: description || "",
      status: status !== undefined ? status : false,
      type: type || "BUG",
      contact: contact || "EMAIL",
      system: system || null,
      requested: requested || "",
      note: note || null,
      response: response || null,
      solutionType: solutionType || "REMOTE",
      duration: duration || null,
      completedAt: completedAt || null,
      timestampFinally: timestampFinally || null,
      createdAt: createdAt || null,
      timestamp: timestamp || null,
      updatedAt: updatedAt || null,
      deletedAt: deletedAt || null,
    },
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form

  const onSubmit = (data: CalledDto) => {
    console.log("Data:", data)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-9/12 ">
        <div className="flex items-start justify-between w-full">
          <h1 className="text-xl sm:text-2xl font-semibold  text-center justify-between">
            {id ? "Editar Chamado" : "Cadastro de Chamado"}
          </h1>
          <div className="flex items-start gap-2 h-full justify-center">
            <h1 className="text-xl text-black animate-pulse bg-gray-100 rounded-lg p-2">
              10h: 00m
            </h1>
            <TfiTimer className="text-lime-700 font-bold text-xl" />
          </div>
        </div>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    <FormMessage>
                      {errors.id && <span>{errors.id.message}</span>}
                    </FormMessage>
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
                    <FormMessage>
                      {errors.createdAt && (
                        <span>{errors.createdAt.message}</span>
                      )}
                    </FormMessage>
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
                    <FormMessage>
                      {errors.timestamp && (
                        <span>{errors.timestamp.message}</span>
                      )}
                    </FormMessage>
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
                    <FormMessage>
                      {errors.name && <span>{errors.name.message}</span>}
                    </FormMessage>
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
                    <FormMessage>
                      {errors.contact && <span>{errors.contact.message}</span>}
                    </FormMessage>
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
                    <FormMessage>
                      {errors.caller && <span>{errors.caller.message}</span>}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-2 mt-4">
              <FormField
                control={form.control}
                name="system"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Sistema</FormLabel>
                    <FormControl>
                      <Select>
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
                    <FormMessage>
                      {errors.system && <span>{errors.system.message}</span>}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="module"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Módulo</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um modulo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Modulo</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {errors.system && <span>{errors.system.message}</span>}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Select>
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
                    <FormMessage>
                      {errors.system && <span>{errors.system.message}</span>}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-2 mt-4">
              <FormField
                control={form.control}
                name="description"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...register("description")} />
                    </FormControl>
                    <FormMessage>
                      {errors.description && (
                        <span>{errors.description.message}</span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-2 mt-4">
              <FormField
                control={form.control}
                name="requested"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Solicitação</FormLabel>
                    <FormControl>
                      <Textarea {...register("requested")} />
                    </FormControl>
                    <FormMessage>
                      {errors.requested && (
                        <span>{errors.requested.message}</span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Solicitação</FormLabel>
                    <FormControl>
                      <Textarea {...register("note")} />
                    </FormControl>
                    <FormMessage>
                      {errors.note && <span>{errors.note.message}</span>}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="response"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Solicitação</FormLabel>
                    <FormControl>
                      <Textarea {...register("response")} />
                    </FormControl>
                    <FormMessage>
                      {errors.response && (
                        <span>{errors.response.message}</span>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
              <Button
                className="w-full"
                variant="destructive"
                onClick={onClose}
                type="button"
              >
                Fechar
              </Button>
              <Button className="w-full" type="submit" variant="success">
                Salvar
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
