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
import { Flip, toast } from 'react-toastify'
import {
  schemaEstablished,
  type TSchemaEstablished,
} from '../zod-types-establishment/zod-establihment'
import { useEstablishmentZustand } from '../zustand-establishment/create-establishment'
import { FaRocket } from 'react-icons/fa'

type TAddEstablishment = {
  message: string
}

// Modificamos o tipo para remover o campo status
type TEstablishmentInput = Omit<TSchemaEstablished, 'status'>

export const AddEstablishmentModal = () => {
  const { onClose } = useEstablishmentZustand()

  const queryClient = useQueryClient()

  const { mutate: mutation, isSuccess } = useMutation({
    mutationKey: ['post-establishment'],
    mutationFn: async (data: TEstablishmentInput) => {
      const res = await api.post<TAddEstablishment>('/establishment', {
        ...data,
        status: true,
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-establishment'] })
      toast.success('Estabelecimento adicionado com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
      })
      onClose()
    },
    onError: error => {
      console.error('Erro ao adicionar estabelecimento:', error)
      toast.error(
        'Ocorreu um erro ao adicionar o estabelecimento. Por favor, tente novamente.' +
          (error.message || ''),
      )
    },
  })

  const form = useForm<TEstablishmentInput>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schemaEstablished.omit({ status: true })),
  })

  const { register } = form

  const onSubmit = async (data: TEstablishmentInput) => {
    console.log('Dados enviados:', data)
    try {
      await mutation(data)
      console.log('Requisição enviada com sucesso')
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro de Estabelecimentos
        </h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Estabelecimento</FormLabel>
                  <FormControl>
                    <Input
                      {...register('name')}
                      placeholder="Nome do estabelecimento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
