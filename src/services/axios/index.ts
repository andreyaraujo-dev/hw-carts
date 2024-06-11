import axios from 'axios'
import { getSession } from 'next-auth/react'

export function createAxiosInstance(apiUrl: string) {
  const instance = axios.create({
    baseURL: apiUrl
  })

  // Interceptador para adicionar o token de autorização
  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession()
      if (session && session.user) {
        config.headers.Authorization = `Bearer ${session.access_token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return instance
}
