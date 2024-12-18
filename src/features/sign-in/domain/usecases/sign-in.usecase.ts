import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import type { SignInFormDto } from '../dto/sign-in.dto'
import { loginUser } from '@/infra/http/api-sign-in/login'
import { showMessageSuccess } from '@/common/messages/Success/toast-success'
import { showMessageError } from '@/common/messages/Err/toast-err'
import axios from 'axios'

export const useLogin = () => {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (data: SignInFormDto) => loginUser(data.email, data.password),
    onSuccess: () => {
      showMessageSuccess({
        message: 'Login realizado com sucesso!',
      })
      navigate('/tela-principal')
    },
    onError: (error: unknown) => {
      let errorMessage = 'Verifique suas credenciais.'

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }

      showMessageError(errorMessage)
      console.error('Erro de login:', error)
    },
  })

  return {
    loginMutation,
  }
}
