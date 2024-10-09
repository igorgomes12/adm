import axios from 'axios'

const API_URL = 'http://localhost:3333/login'

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}`, {
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
