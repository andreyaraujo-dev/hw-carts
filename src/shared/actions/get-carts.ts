import { ENV_KEY_NAME, EnvironmentService } from '@/shared/services/environment'
import { createAxiosInstance } from '@/shared/services/axios'
import { Cart } from '@/types'

export async function getCarts(userEmail?: string): Promise<Cart[]> {
  const envService = EnvironmentService.Instance
  const baseUrl = await envService.getKeyVault(ENV_KEY_NAME.nextPublicApiUrl)
  console.log('BASE URL => ', baseUrl)
  const api = createAxiosInstance(baseUrl)
  const { data } = await api.get<Cart[]>(`/cart?userEmail=${userEmail}`)
  return data
}
