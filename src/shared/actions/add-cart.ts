import { AddCartInput, Cart } from '@/types'
import { ApiHttpClientService } from '@/shared/services/api-http-client/api-http-client.service'

export async function addCart(data: AddCartInput): Promise<Cart> {
  const apiHttpClientService = new ApiHttpClientService()

  const { data: responseData } = await apiHttpClientService.post<
    AddCartInput,
    Cart
  >('/cart', data, {
    headers: { 'content-type': 'multipart/form-data' }
  })
  return responseData
}
