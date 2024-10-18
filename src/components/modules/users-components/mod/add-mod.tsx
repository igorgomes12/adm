import api from '@/components/sing-in/api/interceptors-axios'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { UserSchemaDto, type TUserSchemaDto } from '../zod-types-user/zod-users'
import { useAddUserZustand } from '../zustand/add-zustand'
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaRocket } from 'react-icons/fa'

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
  const [showPassword, setShowPassword] = useState(false)

  const { mutate, isSuccess } = useMutation({
    mutationKey: ['post-user'],
    mutationFn: async (data: TUserSchemaDto) => {
      const res = await api.post('/user', data)
      return res.data
    },
    onSuccess: () => {
      toast.success('Usuário adicionado com sucesso!', {
        theme: 'dark',
        icon: <FaRocket />,
        progressStyle: { background: '#1f62cf' },
        transition: Flip,
      })
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
    defaultValues: {
      name: '',
      email: '',
      password: '',
      status: 'ativo',
      profile: [],
    },
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
            className="w-full gap-2 lg:gap-5 flex flex-col p-2"
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
            <div className="flex gap-2 lg:flex-row flex-col items-center justify-center w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full relative">
                    <FormControl>
                      <Input
                        placeholder="Senha"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-4 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel className="text-md underline py-1 font-semibold">
                Perfil de Acesso
              </FormLabel>
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

            <div className="flex flex-col sm:flex-row mt-4 justify-center gap-2">
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
