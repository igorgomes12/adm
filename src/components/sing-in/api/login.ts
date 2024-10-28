import api from '../../../infra/auth/database/acess-api/interceptors-axios'
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post(`login`, {
      email,
      password,
    })
    const { access_token } = response.data

    localStorage.setItem('access_token', access_token)

    return access_token
  } catch (error) {
    console.error('Erro no login:', error)
    throw error
  }
}
