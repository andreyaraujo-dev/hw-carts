import { ENV_KEY_NAME, EnvironmentService } from '@/shared/services/environment'
import { createAxiosInstance } from '@/shared/services/axios'
import { Cart, CartResponse } from '../types'
import { formatDateToCalendarInput } from '@/shared/lib/utils'

const baseUrl = EnvironmentService.Instance.getKeyVault(
  ENV_KEY_NAME.nextPublicApiUrl
)
const api = createAxiosInstance(baseUrl)

export async function getCartById(id: string): Promise<Cart> {
  const { data } = await api.get<CartResponse>(`/cart/${id}`)
  let dateFormatted: Date | undefined
  if (data.purchaseDate) {
    dateFormatted = formatDateToCalendarInput(data.purchaseDate)
  }

  return {
    ...data,
    purchaseDate: dateFormatted
  }
}
