import { api } from '@/infra/auth/database/acess-api/api'
import axios from 'axios'
import { refreshToken } from './refresh-token'

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken
        return api(originalRequest)
      } catch (refreshError) {
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default api
