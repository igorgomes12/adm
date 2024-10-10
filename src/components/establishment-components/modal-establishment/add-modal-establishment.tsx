import api from '@/components/sing-in/api/interceptors-axios'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  schemaEstablished,
  type TSchemaEstablished,
} from '../zod-types-establishment/zod-establihment'
import { useEstablishmentZustand } from '../zustand-establishment/create-establishment'
import { Switch } from '@/components/ui/switch'

type TAddEstablishment = {
  message: string
}

export const AddEstablishmentModal = () => {
  const { onClose } = useEstablishmentZustand()

  const queryClient = useQueryClient()

  const { mutateAsync: mutation, isSuccess } = useMutation({
    mutationFn: async (data: TSchemaEstablished) => {
      const res = await api.post<TAddEstablishment>('/establishment', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-establishment'] })
      toast.success('Estabelecimento adicionado com sucesso!')
      onClose()
    },
    onError: error => {
      toast.error(
        'Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente.' +
          error.message,
      )
    },
  })

  const form = useForm<TSchemaEstablished>({
    defaultValues: {
      name: '',
      status: false,
    },
    resolver: zodResolver(schemaEstablished),
  })

  const onSubmit = async (data: TSchemaEstablished) => {
    await mutation(data)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro de Estabelecimentos
        </h1>
        <FormProvider {...form}>
          <form
            className="gap-4 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Estabelecimento</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do estabelecimento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
              <Button
                className="w-full"
                variant="destructive"
                onClick={onClose}
                type="button"
                disabled={isSuccess}
              >
                Fechar
              </Button>
              <Button
                className="w-full"
                type="submit"
                variant="success"
                disabled={isSuccess}
              >
                {isSuccess ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
