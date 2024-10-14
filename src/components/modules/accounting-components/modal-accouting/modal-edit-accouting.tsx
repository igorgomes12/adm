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
import { toast } from 'react-toastify'
import {
  SchemaAccoutingDto,
  type TSchemaAccountingDto,
} from '../zod-types-accounting/zod-accouting'
import { useAccoutingEditZustand } from '../zustand-accounting/edit-zustand'

export const ModalAccountingEdit = () => {
  const { id, isOpen, onClose } = useAccoutingEditZustand()
  const queryClient = useQueryClient()

  const form = useForm<TSchemaAccountingDto>({
    defaultValues: {
      id: 0,
      name: '',
      phone: '',
      email: '',
      contact: '',
      crc: '',
      cnpj: '',
    },
    resolver: zodResolver(SchemaAccoutingDto),
  })

  const { data: accountingData, isLoading: isLoadingAccounting } = useQuery({
    queryKey: ['get-accounting', id],
    queryFn: async () => {
      if (id) {
        const response = await api.get(`/accouting`, { params: { id } })
        return (
          response.data.find(
            (system: TSchemaAccountingDto) => system.id === id,
          ) || null
        )
      }
      return null
    },
    enabled: !!id && isOpen,
  })

  useEffect(() => {
    if (accountingData) {
      form.reset({
        id: accountingData.id,
        name: accountingData.name,
        phone: accountingData.phone,
        email: accountingData.email,
        contact: accountingData.contact,
        crc: accountingData.crc,
        cnpj: accountingData.cnpj,
      })
    }
  }, [accountingData, form])

  const { mutate, isSuccess: isUpdating } = useMutation({
    mutationKey: ['patch-accounting'],
    mutationFn: async (data: TSchemaAccountingDto) => {
      const res = await api.patch(`/accouting`, data, {
        params: { id: data.id },
      })
      return res.data
    },
    onSuccess: () => {
      toast.success('Contabilidade atualizada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['get-accounting'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounting', id] })
      onClose()
    },
    onError: error => {
      console.error('Mutation error:', error)
      toast.error(
        'Erro ao atualizar a contabilidade. Por favor, tente novamente.',
      )
    },
  })

  const onSubmit = (data: TSchemaAccountingDto) => {
    mutate(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Edição de Contabilidade
        </h1>
        {isLoadingAccounting ? (
          <p>Carregando dados da contabilidade...</p>
        ) : (
          <FormProvider {...form}>
            <form
              className="gap-2 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {['name', 'cnpj', 'contact', 'crc', 'email', 'phone'].map(
                field => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof TSchemaAccountingDto}
                    render={({ field: { onChange, ...rest } }) => (
                      <FormItem>
                        <FormLabel>{getFieldLabel(field)}</FormLabel>
                        <FormControl>
                          <Input
                            {...rest}
                            onChange={e => {
                              onChange(e)
                              form.trigger(field as keyof TSchemaAccountingDto)
                            }}
                            type={field === 'email' ? 'email' : 'text'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ),
              )}

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

function getFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    name: 'Nome da Contabilidade',
    cnpj: 'CNPJ',
    contact: 'Contato',
    crc: 'CRC',
    email: 'Email',
    phone: 'Telefone',
  }
  return labels[field] || field
}