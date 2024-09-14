import { AddCartInput, Cart } from '../types'
import { ENV_KEY_NAME, EnvironmentService } from '@/shared/services/environment'
import { createAxiosInstance } from '@/shared/services/axios'

const baseUrl = EnvironmentService.Instance.getKeyVault(
  ENV_KEY_NAME.nextPublicApiUrl
)
const api = createAxiosInstance(baseUrl)

export async function addCart(data: AddCartInput): Promise<Cart> {
  const { data: responseData } = await api.post<Cart>('/cart', data, {
    headers: { 'content-type': 'multipart/form-data' }
  })
  return responseData
}
