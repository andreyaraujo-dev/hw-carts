import { Cart } from '@/@types/carts'
import { createAxiosInstance } from '@/services/axios'
import { UseQueryResult, useQuery } from 'react-query'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const api = createAxiosInstance(apiUrl as string)

async function getCarts(userEmail?: string): Promise<Cart[]> {
  const { data } = await api.get<Cart[]>(`/cart?userEmail=${userEmail}`)
  console.log('🚀 ~ getCarts ~ data:', data)
  return data
}

export async function getFavoriteCarts(userEmail?: string): Promise<Cart[]> {
  const { data } = await api.get<Cart[]>(`/cart?userEmail=${userEmail}`)
  return data.filter((cart) => cart.isFavorite)
}

export function useCarts(userEmail?: string): UseQueryResult<Cart[], unknown> {
  return useQuery(['carts', userEmail], () => getCarts(userEmail), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!userEmail
  })
}

export function useFavoritesCarts(
  userEmail?: string
): UseQueryResult<Cart[], unknown> {
  return useQuery(
    ['favoritesCarts', userEmail],
    () => getFavoriteCarts(userEmail),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!userEmail
    }
  )
}
