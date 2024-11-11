import type { FC } from "react"
import { useAccountsStore } from "../service/zustand"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { accountSchema, type TAccounts } from "../dto/account.dto"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { formatCurrency } from "@/common/regex/money"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/infra/auth/database/acess-api/api"
import axios from "axios"

export const CreateAccount: FC = () => {
  const { onClose, id, value } = useAccountsStore()

  const [formattedValue, setFormattedValue] = useState(value)

  const form = useForm<TAccounts>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      value: "",
      description: "",
      observation: "",
      status: true, // Default status for creation
      bank: false,
    },
  })

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = form

  // Load existing account data for editing
  useEffect(() => {
    if (id) {
      api
        .get(`/account/${id}`)
        .then(response => {
          const account = response.data
          setFormattedValue(account.value)
          reset({
            ...account,
            value: formatCurrency(account.value),
          })
        })
        .catch(error => {
          console.error("Erro ao carregar conta:", error)
          toast.error("Erro ao carregar conta para edição.")
        })
    }
  }, [id, reset])

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (account: TAccounts) => {
      if (account.id) {
        // Atualizar conta existente
        const response = await api.put(`/account?id=${account.id}`, account)
        return response.data
      }
      // Criar nova conta
      const response = await api.post("/account", { ...account, status: true })
      return response.data
    },
    onSuccess: () => {
      toast.success(`Conta ${id ? "atualizada" : "criada"} com sucesso!`)
      queryClient.invalidateQueries({ queryKey: ["get-account"] })
      onClose()
    },
    onError: (error: unknown) => {
      let errorMessage = "Erro ao processar a solicitação."
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }
      toast.error(errorMessage)
    },
  })

  const onSubmit = (data: TAccounts) => {
    mutation.mutate({ ...data, id })
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    const formatted = formatCurrency(rawValue)
    setFormattedValue(formatted)
    setValue("value", formatted)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-2/6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          {id ? "Editar Conta" : "Cadastro de Contas"}
        </h1>
        <FormProvider {...form}>
          <form
            className="gap-2 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex lg:flex-row flex-col w-full gap-2 items-start justify-between">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Saldo atual</FormLabel>
                    <FormControl>
                      <Input
                        {...register("value")}
                        value={formattedValue}
                        onChange={e => {
                          field.onChange(e)
                          handleValueChange(e)
                        }}
                        placeholder="R$ 0,00"
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.value && <span>{errors.value.message}</span>}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormItem className="w-full flex items-baseline gap-2 lg:mt-8 justify-start">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Checkbox
                          {...register("bank")}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="bank-checkbox"
                        />
                      </FormLabel>
                      <FormMessage>
                        {errors.bank && <span>{errors.bank.message}</span>}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormLabel htmlFor="bank-checkbox">Conta bancária</FormLabel>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descricão</FormLabel>
                  <FormControl>
                    <Input {...register("description")} {...field} />
                  </FormControl>
                  <FormMessage>
                    {errors.description && (
                      <span>{errors.description.message}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea {...register("observation")} {...field} />
                  </FormControl>
                  <FormMessage>
                    {errors.observation && (
                      <span>{errors.observation.message}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />

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
