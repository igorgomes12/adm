import React, { useEffect, useCallback } from "react"
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
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { ToastContainer } from "react-toastify"
import { useCalledStore } from "../entity/hook/use-called"
import type { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import type { TClient } from "@/components/modules/client/zod-form/zod_client.schema"
import { api } from "@/infra/auth/database/acess-api/api"
import type { TUserSchemaDto } from "@/components/modules/users-components/zod-types-user/zod-users"

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

export const DadosGeraisCalled: FC<FormProviderProps> = React.memo(
  ({ initialValues = {}, onNext }) => {
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

      if (!initialValues.createdAt) {
        const currentDate = new Date().toISOString().split("T")[0]
        setValue("createdAt", currentDate)
      }
      if (!initialValues.timestamp) {
        const currentTime = new Date().toLocaleTimeString("it-IT")
        setValue("timestamp", currentTime)
      }
    }, [
      formValues,
      setValue,
      updateFormData,
      initialValues.createdAt,
      initialValues.timestamp,
    ])

    const onSubmit = useCallback(
      (data: FormFields) => {
        onNext(data)
      },
      [onNext]
    )

    const { data, isLoading, error } = useQuery<TClient[]>({
      queryKey: ["clients"],
      queryFn: async () => {
        const response = await api.get("/client")
        return response.data
      },
    })

    const {
      data: users,
      isLoading: isLoadingUsers,
      error: errorUsers,
    } = useQuery<TUserSchemaDto[], Error>({
      queryKey: ["get-users"],
      queryFn: async () => {
        const res = await api.get<TUserSchemaDto[]>("/user")
        return res.data
      },
      refetchOnWindowFocus: true,
      staleTime: 0,
    })

    if (isLoading || isLoadingUsers) {
      return <div>Loading...</div>
    }
    if (error || errorUsers) {
      return <div>Error: {error?.message}</div>
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
                              {data
                                ?.filter(client => client.name_account)
                                .map(client => (
                                  <SelectItem
                                    key={client.id}
                                    value={
                                      client.name_account?.toLowerCase() ?? ""
                                    }
                                  >
                                    {client.name_account}
                                  </SelectItem>
                                ))}
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
                              {users
                                ?.filter(user => Number(user.profile) === 7)
                                .map(attendant => (
                                  <SelectItem
                                    key={attendant.id}
                                    value={attendant.name.toLowerCase()}
                                  >
                                    {attendant.name}
                                  </SelectItem>
                                ))}
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
)

DadosGeraisCalled.displayName = "DadosGeraisCalled"
