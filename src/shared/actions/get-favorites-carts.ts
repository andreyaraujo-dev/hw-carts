import { ENV_KEY_NAME, EnvironmentService } from '@/shared/services/environment'
import { createAxiosInstance } from '@/shared/services/axios'
import { Cart } from '../types'

const baseUrl = EnvironmentService.Instance.getKeyVault(
  ENV_KEY_NAME.nextPublicApiUrl
)
const api = createAxiosInstance(baseUrl)

export async function getFavoriteCarts(userEmail?: string): Promise<Cart[]> {
  const { data } = await api.get<Cart[]>(`/cart?userEmail=${userEmail}`)
  return data.filter((cart) => cart.isFavorite)
}
