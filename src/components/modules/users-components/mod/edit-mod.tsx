import { Button } from '@/components/ui/button'
import { useUserEditZustand } from '../zustand/edit-zustand'
import { useForm, FormProvider } from 'react-hook-form'
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
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {
  UserEditSchemaDto,
  type TUserEditSchemaDto,
} from '../zod-types-user/zod-edit-ucer'

export const ModalUserEdit = () => {
  const { id, isOpen, onClose } = useUserEditZustand()
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<TUserEditSchemaDto>({
    defaultValues: {
      id: 0,
      name: '',
      email: '',
      password: '',
      channel: undefined,
      status: 'inativo',
      organization: 'lider',
    },
    resolver: zodResolver(UserEditSchemaDto),
  })

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['get-user', id],
    queryFn: async () => {
      if (id) {
        const response = await api.get(`/user`, { params: { id } })
        return (
          response.data.find((user: TUserEditSchemaDto) => user.id === id) ||
          null
        )
      }
      return null
    },
    enabled: !!id && isOpen,
  })

  useEffect(() => {
    if (user) {
      form.reset({
        id: user.id,
        name: user.name,
        status: user.status,
        channel: user.channel,
        email: user.email,
        organization: user.organization,
      })
    }
  }, [user, form])

  const { mutate, isSuccess: isUpdating } = useMutation({
    mutationKey: ['patch-user'],
    mutationFn: async (data: TUserEditSchemaDto) => {
      const { id, ...dataToSend } = data
      if (!dataToSend.password || dataToSend.password.trim() === '') {
        delete dataToSend.password
      }
      const res = await api.patch(`/user?id=${id}`, dataToSend)
      return res.data
    },
    onSuccess: () => {
      toast.success('Usuário atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      queryClient.invalidateQueries({ queryKey: ['get-user', id] })
      onClose()
    },
    onError: error => {
      console.error('Mutation error:', error)
      toast.error('Erro ao atualizar o usuário. Por favor, tente novamente.')
    },
  })

  const onSubmit = (data: TUserEditSchemaDto) => {
    mutate(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 gap-4 sm:w-2/3 lg:w-6/12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Edição de Usuário
        </h1>
        {isLoadingUser ? (
          <p>Carregando dados do usuário...</p>
        ) : (
          <FormProvider {...form}>
            <form
              className="w-full gap-5 flex flex-col p-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex gap-2 lg:flex-row flex-col w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 lg:flex-row flex-col w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Senha (deixe em branco para não alterar)
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Canal</FormLabel>
                      <Select
                        onValueChange={value => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um canal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Canal 1</SelectItem>
                          <SelectItem value="2">Canal 2</SelectItem>
                          <SelectItem value="3">Canal 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value === 'ativo'}
                        onCheckedChange={checked =>
                          field.onChange(checked ? 'ativo' : 'inativo')
                        }
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Usuário Ativo</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value === 'lider'}
                        onCheckedChange={checked =>
                          field.onChange(checked ? 'lider' : 'Quality')
                        }
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Organização</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row justify-center gap-2">
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
