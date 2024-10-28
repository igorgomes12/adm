import { api } from '@/infra/auth/database/acess-api/api'
export const refreshToken = async () => {
  try {
    const response = await api.post(`http://localhost:3333/auth/refresh`, {
      refresh_token: localStorage.getItem('refresh_token'),
    })
    const { access_token, refresh_token } = response.data
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    return access_token
  } catch (error) {
    console.error('Erro ao atualizar o token:', error)
    logout()
    throw error
  }
}

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
