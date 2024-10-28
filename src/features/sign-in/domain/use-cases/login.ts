import { AxiosError } from 'axios'
import api from '../../../../infra/auth/database/acess-api/interceptors-axios'
import { signInSchemaDto } from '../dto/sign-in.dto'
export const loginUser = async (email: string, password: string) => {
  const validationResult = signInSchemaDto.safeParse({ email, password })

  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors
      .map(err => err.message)
      .join(', ')
    throw new Error(`Erro de validação: ${errorMessages}`)
  }

  try {
    const response = await api.post('login', {
      email,
      password,
    })

    if (response && response.data && response.data.access_token) {
      const { access_token } = response.data
      localStorage.setItem('access_token', access_token)
      return access_token
    } else {
      throw new Error('A resposta da API não contém um token de acesso.')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.data)
        throw new Error(
          `Erro de login: ${
            error.response.data.message || 'Erro desconhecido'
          }`,
        )
      } else if (error.request) {
        console.error(
          'Erro de rede ou sem resposta do servidor:',
          error.request,
        )
        throw new Error(
          'Falha na comunicação com o servidor. Verifique sua conexão de rede.',
        )
      }
    } else {
      console.error('Erro:', error)
      throw new Error('Ocorreu um erro ao tentar fazer login.')
    }
  }
}
