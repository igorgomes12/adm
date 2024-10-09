import { Button } from '@/components/ui/button'
import { useSystemEditZustand } from './zustand-state/system-edit-zustand'
import { useForm, FormProvider } from 'react-hook-form'
import {
  SystemSchemaDto,
  type TSystemSchemaDto,
} from './zod-types/types-system'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import api from '@/components/sing-in/api/interceptors-axios'
import { toast } from 'react-toastify'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'

export const ModalSystemEdit = () => {
  const { id, isOpen, onClose } = useSystemEditZustand()
  const queryClient = useQueryClient()

  const form = useForm<TSystemSchemaDto>({
    defaultValues: {
      id: 0,
      name: '',
      image_url: '',
      description: '',
      stable_version: '',
    },
    resolver: zodResolver(SystemSchemaDto),
  })

  const { data: systemData, isLoading: isLoadingSystem } = useQuery({
    queryKey: ['get-system', id],
    queryFn: async () => {
      if (id) {
        const response = await api.get(`/systems`, { params: { id } })
        return (
          response.data.find((system: TSystemSchemaDto) => system.id === id) ||
          null
        )
      }
      return null
    },
    enabled: !!id && isOpen,
  })

  useEffect(() => {
    if (systemData) {
      form.reset({
        id: systemData.id,
        name: systemData.name,
        image_url: systemData.image_url,
        description: systemData.description,
        stable_version: systemData.stable_version || '',
      })
    }
  }, [systemData, form])

  const { mutate, isSuccess: isUpdating } = useMutation({
    mutationKey: ['patch-system'],
    mutationFn: async (data: TSystemSchemaDto) => {
      const res = await api.patch(`/systems`, data, { params: { id: data.id } })
      return res.data
    },
    onSuccess: () => {
      toast.success('Sistema atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['get-systems'] })
      queryClient.invalidateQueries({ queryKey: ['get-system', id] })
      onClose()
    },
    onError: error => {
      console.error('Mutation error:', error)
      toast.error('Erro ao atualizar o sistema. Por favor, tente novamente.')
    },
  })
  const onSubmit = (data: TSystemSchemaDto) => {
    mutate(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:w-2/3 lg:w-1/3">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Edição de Software
        </h1>
        {isLoadingSystem ? (
          <p>Carregando dados do sistema...</p>
        ) : (
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
                    <FormLabel>Nome do software</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>URL da imagem</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Descrição do software</FormLabel>
                    <FormControl>
                      <textarea
                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stable_version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Versão estável</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
