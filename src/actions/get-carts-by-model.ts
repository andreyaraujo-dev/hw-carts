import { ENV_KEY_NAME, EnvironmentService } from '@/services/environment'
import { createAxiosInstance } from '@/services/axios'
import { Cart } from '@/@types'

const baseUrl = EnvironmentService.Instance.getKeyVault(
  ENV_KEY_NAME.nextPublicApiUrl
)
const api = createAxiosInstance(baseUrl)

export async function getCartsByModel(
  model: string,
  userEmail?: string
): Promise<Cart[]> {
  const { data } = await api.get<Cart[]>(
    `/cart?userEmail=${userEmail}&model=${model}`
  )
  return data
}
