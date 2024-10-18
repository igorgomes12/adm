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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Flip, toast } from 'react-toastify'
import {
  schemaEstablished,
  type TSchemaEstablished,
} from '../zod-types-establishment/zod-establihment'
import { useEstablishmentEditZustand } from '../zustand-establishment/edit-establishment'
import { FaRocket } from 'react-icons/fa'

export const EditEstablishmentModal = () => {
  const { id, isOpen, onClose } = useEstablishmentEditZustand()
  const queryClient = useQueryClient()

  const form = useForm<TSchemaEstablished>({
    defaultValues: {
      id: 0,
      name: '',
      status: false,
    },
    resolver: zodResolver(schemaEstablished),
  })

  const { data: establishmentData, isLoading: isLoadingEstablishment } =
    useQuery({
      queryKey: ['get-establishment', id],
      queryFn: async () => {
        if (id) {
          const response = await api.get(`/establishment`, { params: { id } })
          return (
            response.data.find(
              (establishment: TSchemaEstablished) => establishment.id === id,
            ) || null
          )
        }
        return null
      },
      enabled: !!id && isOpen,
    })

  useEffect(() => {
    if (establishmentData) {
      form.reset({
        id: establishmentData.id,
        name: establishmentData.name,
        status: establishmentData.status,
      })
    }
  }, [establishmentData, form])

  const { mutate, isSuccess: isUpdating } = useMutation({
    mutationKey: ['patch-establishment'],
    mutationFn: async (data: TSchemaEstablished) => {
      const res = await api.patch(`/establishment`, data, {
        params: { id: data.id },
      })
      return res.data
    },
    onSuccess: () => {
      toast.success('Estabelecimento atualizado com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
      })
      queryClient.invalidateQueries({ queryKey: ['get-establishment'] })
      queryClient.invalidateQueries({ queryKey: ['get-establishment', id] })
      onClose()
    },
    onError: error => {
      console.error('Mutation error:', error)
      toast.error(
        'Erro ao atualizar o estabelecimento. Por favor, tente novamente.',
      )
    },
  })

  const onSubmit = (data: TSchemaEstablished) => {
    mutate(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Edição de Estabelecimento
        </h1>
        {isLoadingEstablishment ? (
          <p>Carregando dados do estabelecimento...</p>
        ) : (
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
                      <Input
                        placeholder="Nome do estabelecimento"
                        {...field}
                        onChange={e => {
                          field.onChange(e)
                          form.trigger('name')
                        }}
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
                  disabled={isUpdating}
                  type="button"
                >
                  Fechar
                </Button>
                <Button
                  className="w-full"
                  type="submit"
                  variant="success"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  )
}
