import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import api from '@/infra/auth/database/acess-api/interceptors-axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaRocket } from 'react-icons/fa'
import { Flip, toast } from 'react-toastify'
import { TSchemaPayamentDtoForm, TSchemaPaymentDto } from '../dtos/payment.dto'
import { usePaymentZustand } from '../zustand-payment/payment-zustand'

type TAddEstablishment = {
  message: string
}
export const PaymentModal = () => {
  const { id, isOpen, mode, onClose } = usePaymentZustand()
  const queryClient = useQueryClient()

  const isEditMode = mode === 'edit'

  const { mutate: mutation, isSuccess } = useMutation({
    mutationKey: isEditMode ? ['edit-payment'] : ['post-payment'],
    mutationFn: async (data: TSchemaPayamentDtoForm) => {
      const endpoint = isEditMode ? `/payment?id=${id}` : '/payment'
      const method = isEditMode ? api.patch : api.post
      const res = await method<TAddEstablishment>(endpoint, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-payment'] })
      toast.success(
        `Forma de pagamento ${
          isEditMode ? 'editada' : 'adicionada'
        } com sucesso!`,
        {
          theme: 'dark',
          icon: <FaRocket />,
          progressStyle: { background: '#1f62cf' },
          transition: Flip,
        },
      )
      onClose()
    },
    onError: error => {
      console.error(
        `Erro ao ${isEditMode ? 'editar' : 'adicionar'} forma de pagamento:`,
        error,
      )
      toast.error(
        `Ocorreu um erro ao ${
          isEditMode ? 'editar' : 'adicionar'
        } a forma de pagamento. Por favor, tente novamente.` +
          (error.message || ''),
      )
    },
  })

  const form = useForm<TSchemaPayamentDtoForm>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(TSchemaPaymentDto),
  })

  const { register, setValue } = form

  useEffect(() => {
    if (isEditMode && id && isOpen) {
      const fetchPaymentById = async (paymentId: number) => {
        try {
          const response = await api.get<TSchemaPayamentDtoForm>(
            `/payment/${paymentId}`,
          )
          const paymentData = response.data
          setValue('name', paymentData.name)
        } catch (error) {
          console.error('Erro ao buscar dados do pagamento:', error)
        }
      }

      fetchPaymentById(id)
    }
  }, [isEditMode, id, isOpen, setValue])

  const onSubmit = async (data: TSchemaPayamentDtoForm) => {
    console.log('Dados enviados:', data)
    try {
      await mutation(data)
      console.log('Requisição enviada com sucesso')
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error)
    }
  }

  if (!isOpen || (mode !== 'edit' && mode !== 'add')) return null // Assegura que o modal renderiza para ambos os modos

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          {isEditMode
            ? 'Editar Formas de Pagamento'
            : 'Cadastro de Formas de Pagamento'}
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
                  <FormLabel>Formas de pagamento</FormLabel>
                  <FormControl>
                    <Input
                      {...register('name')}
                      placeholder="Nome das formas de pagamento"
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
