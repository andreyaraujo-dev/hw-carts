import { Cart } from '@/types'
import { ApiHttpClientService } from '@/shared/services/api-http-client/api-http-client.service'

export async function getCartsByModel(
  model: string,
  userEmail?: string
): Promise<Cart[]> {
  const apiHttpClientService = new ApiHttpClientService()

  const { data } = await apiHttpClientService.get<Cart[]>(
    `/cart?userEmail=${userEmail}&model=${model}`
  )
  return data
}
