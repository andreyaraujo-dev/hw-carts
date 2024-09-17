import { Cart } from '@/types'
import { ApiHttpClientService } from '@/shared/services/api-http-client/api-http-client.service'

export async function deleteManyCarts(ids: string[]): Promise<Cart> {
  const apiHttpClientService = new ApiHttpClientService()

  const { data } = await apiHttpClientService.post<{ ids: string[] }, Cart>(
    `/cart/delete-many`,
    { ids }
  )
  return data
}
