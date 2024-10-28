import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { SignInFormDto } from '../dto/sign-in.dto'

import axios from 'axios'
import { loginUser } from './login'
import { showErrorMessage } from '@/common/messages/error/showErrorMessage'
import { showSuccessMessage } from '@/common/messages/success/showMessage'

export const useLogin = () => {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (data: SignInFormDto) => loginUser(data.email, data.password),
    onSuccess: () => {
      showSuccessMessage('Login realizado com sucesso!')
      navigate('/tela-principal')
    },
    onError: (error: unknown) => {
      let errorMessage = 'Verifique suas credenciais.'

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage
      }

      showErrorMessage(errorMessage)
      console.error('Erro de login:', error)
    },
  })

  return {
    loginMutation,
  }
}
