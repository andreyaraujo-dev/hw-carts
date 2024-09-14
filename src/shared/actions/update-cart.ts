import { Cart, UpdateCartInput } from '../types'
import { ENV_KEY_NAME, EnvironmentService } from '@/shared/services/environment'
import { createAxiosInstance } from '@/shared/services/axios'

const baseUrl = EnvironmentService.Instance.getKeyVault(
  ENV_KEY_NAME.nextPublicApiUrl
)
const api = createAxiosInstance(baseUrl)

export async function updateCart(data: UpdateCartInput): Promise<Cart> {
  const { data: responseData } = await api.patch<Cart>(
    `/cart/${data._id}`,
    data
  )
  return responseData
}
