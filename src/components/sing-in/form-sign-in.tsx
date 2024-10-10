import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'
import { Button } from '../ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { loginUser } from './api/login'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'O email é obrigatório' })
    .email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'A senha é obrigatória' }),
})

type SignInForm = z.infer<typeof signInSchema>

export const SignInForm = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInForm>({
    defaultValues: {
      email: 'lideradm@gmail.com',
      password: '123456Ig',
    },
    resolver: zodResolver(signInSchema),
  })

  const loginMutation = useMutation({
    mutationFn: (data: SignInForm) => loginUser(data.email, data.password),
    onSuccess: () => {
      toast.success('Login realizado com sucesso!')
      navigate('/tela-principal')
    },
    onError: error => {
      toast.error('Erro ao realizar login. Verifique suas credenciais.')
      console.error('Erro de login:', error)
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }

  const onSubmit = (data: SignInForm) => {
    loginMutation.mutate(data)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-2 gap-2 items-center justify-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormControl>
                <Input
                  className="cursor-pointer p-2"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-80">
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className="cursor-pointer p-2 pr-10"
                    placeholder="Senha"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                  <div
                    className="absolute right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex py-2 items-start justify-center">
          <Button
            className="w-full"
            type="submit"
            disabled={loginMutation.isSuccess}
          >
            {loginMutation.isSuccess ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
        <ToastContainer />
      </form>
    </FormProvider>
  )
}
