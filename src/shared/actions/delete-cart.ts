import { Cart } from '@/types'
import { ApiHttpClientService } from '@/shared/services/api-http-client/api-http-client.service'

export async function deleteCart(id: string): Promise<Cart> {
  const apiHttpClientService = new ApiHttpClientService()

  const { data } = await apiHttpClientService.delete<Cart>(`/cart/${id}`)
  return data
}
