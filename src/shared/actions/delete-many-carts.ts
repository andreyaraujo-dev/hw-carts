import { Cart } from '../types'
import { ENV_KEY_NAME, EnvironmentService } from '@/shared/services/environment'
import { createAxiosInstance } from '@/shared/services/axios'

const baseUrl = EnvironmentService.Instance.getKeyVault(
  ENV_KEY_NAME.nextPublicApiUrl
)
const api = createAxiosInstance(baseUrl)

export async function deleteManyCarts(ids: string[]): Promise<Cart> {
  const { data } = await api.post<Cart>(`/cart/delete-many`, { ids })
  return data
}
