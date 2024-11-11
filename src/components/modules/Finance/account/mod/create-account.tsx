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

export const CreateAccount: FC = () => {
  const { onClose, id, value, status, observations, bank, description } =
    useAccountsStore()

  const [formattedValue, setFormattedValue] = useState(value)

  useEffect(() => {
    if (id) {
      setFormattedValue(value)
    }
  }, [id, value])

  const form = useForm<TAccounts>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      value: formattedValue,
      description,
      observations,
      status,
      bank,
    },
  })

  const {
    register,
    formState: { errors },
  } = form

  const onSubmit = (data: TAccounts) => {
    if (id) {
      console.log("Atualizar conta:", data)
      toast.success("Conta atualizada com sucesso!")
    } else {
      console.log("Criar nova conta:", data)
      toast.success("Conta criada com sucesso!")
    }
    onClose()
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value
    const formatted = formatCurrency(rawValue)
    setFormattedValue(formatted)
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
            onSubmit={form.handleSubmit(onSubmit)}
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
              name="observations"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea {...register("observations")} {...field} />
                  </FormControl>
                  <FormMessage>
                    {errors.observations && (
                      <span>{errors.observations.message}</span>
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
