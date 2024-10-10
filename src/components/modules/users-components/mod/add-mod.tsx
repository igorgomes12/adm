import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import api from '@/components/sing-in/api/interceptors-axios'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useAddUserZustand } from '../zustand/add-zustand'
import { UserSchemaDto, type TUserSchemaDto } from '../zod-types-user/zod-users'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type ProfileType =
  | 'ADMIN'
  | 'FINANCE'
  | 'REPRESENTATIVE'
  | 'REPRESENTATIVE_SUPERVISOR'
  | 'PROGRAMMING'
  | 'PROGRAMMING_SUPERVISOR'
  | 'SUPPORT'
  | 'SUPPORT_SUPERVISOR'

const profileMap: Record<number, ProfileType> = {
  1: 'ADMIN',
  2: 'FINANCE',
  3: 'REPRESENTATIVE',
  4: 'REPRESENTATIVE_SUPERVISOR',
  5: 'PROGRAMMING',
  6: 'PROGRAMMING_SUPERVISOR',
  7: 'SUPPORT',
  8: 'SUPPORT_SUPERVISOR',
}

export const ModalUserAdd = () => {
  const { onClose } = useAddUserZustand()
  const queryClient = useQueryClient()

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['post-system'],
    mutationFn: async (data: TUserSchemaDto) => {
      const res = await api.post('/user', data)
      return res.data
    },
    onSuccess: () => {
      toast.success('Usuário adicionado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      onClose()
    },
    onError: error => {
      console.error('Mutation error:', error)
      toast.error('Erro ao salvar o usuário. Por favor, tente novamente.')
    },
  })

  const form = useForm<TUserSchemaDto>({
    resolver: zodResolver(UserSchemaDto),
  })

  const onSubmit = (data: TUserSchemaDto) => {
    mutate(data)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-4 gap-4 sm:w-2/3 lg:w-6/12">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Cadastro de Usuários
        </h1>
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
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
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
                    <FormControl>
                      <Input placeholder="E-mail" type="email" {...field} />
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
                  <FormItem className="flex gap-2 w-full">
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="channel"
                render={({ field }) => (
                  <FormItem className="flex gap-2 w-full">
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

            <FormItem>
              <FormLabel>Perfil de Acesso</FormLabel>
              <div className="lg:grid lg:grid-cols-2 flex flex-col gap-2">
                {Object.entries(profileMap).map(([key, value]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name="profile"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value === value}
                            onCheckedChange={() => field.onChange(value)}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{value}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </FormItem>

            <div className="flex flex-col sm:flex-row justify-center gap-2">
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
