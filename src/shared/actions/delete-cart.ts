import { Cart } from '../types'
import { ENV_KEY_NAME, EnvironmentService } from '@/shared/services/environment'
import { createAxiosInstance } from '@/shared/services/axios'

const baseUrl = EnvironmentService.Instance.getKeyVault(
  ENV_KEY_NAME.nextPublicApiUrl
)
const api = createAxiosInstance(baseUrl)

export async function deleteCart(id: string): Promise<Cart> {
  const { data } = await api.delete<Cart>(`/cart/${id}`)
  return data
}
