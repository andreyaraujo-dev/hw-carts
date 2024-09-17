import { Cart, CartResponse } from '@/types'
import { formatDateToCalendarInput } from '@/shared/lib/utils'
import { ApiHttpClientService } from '@/shared/services/api-http-client/api-http-client.service'

export async function getCartById(id: string): Promise<Cart> {
  const apiHttpClientService = new ApiHttpClientService()

  const { data } = await apiHttpClientService.get<CartResponse>(`/cart/${id}`)
  let dateFormatted: Date | undefined
  if (data.purchaseDate) {
    dateFormatted = formatDateToCalendarInput(data.purchaseDate)
  }

  return {
    ...data,
    purchaseDate: dateFormatted
  }
}
