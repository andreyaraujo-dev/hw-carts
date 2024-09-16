import { Cart, UpdateCartInput } from '@/types'
import { ApiHttpClientService } from '@/shared/services/api-http-client/api-http-client.service'

export async function updateCart(data: UpdateCartInput): Promise<Cart> {
  const apiHttpClientService = new ApiHttpClientService()

  const { data: responseData } = await apiHttpClientService.patch<
    UpdateCartInput,
    Cart
  >(`/cart/${data._id}`, data)
  return responseData
}
