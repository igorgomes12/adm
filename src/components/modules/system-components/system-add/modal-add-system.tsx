import { Button } from '@/components/ui/button'
import { useSystemZustand } from './zustand-state/system-add-zustand'
import { useForm, FormProvider } from 'react-hook-form'
import {
  SystemSchemaDto,
  type TSystemSchemaDto,
} from './zod-types/types-system'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/components/sing-in/api/interceptors-axios'
import { toast } from 'react-toastify'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const ModalSystemAdd = () => {
  const { onClose } = useSystemZustand()
  const queryClient = useQueryClient()

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['post-system'],
    mutationFn: async (data: TSystemSchemaDto) => {
      const res = await api.post('/systems', data)
      return res.data
    },
    onSuccess: () => {
      toast.success('Sistema adicionado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['get-systems'] })
      onClose()
    },
    onError: error => {
      console.error('Mutation error:', error)
      toast.error('Erro ao salvar o sistema. Por favor, tente novamente.')
    },
  })

  const form = useForm<TSystemSchemaDto>({
    defaultValues: {
      name: '',
      image_url: '',
      description: '',
    },
    resolver: zodResolver(SystemSchemaDto),
  })

  const onSubmit = (data: TSystemSchemaDto) => {
    mutate(data)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro de Software's
        </h1>
        <FormProvider {...form}>
          <form
            className="gap-2 flex flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nome do software" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="URL da imagem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                      placeholder="Descrição do software"
                      rows={3}
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
