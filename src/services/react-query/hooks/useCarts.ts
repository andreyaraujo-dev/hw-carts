import { Cart } from '@/@types/carts'
import { createAxiosInstance } from '@/services/axios'
import { UseQueryResult, useQuery } from 'react-query'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const api = createAxiosInstance(apiUrl as string)

async function getCarts(): Promise<Cart[]> {
  const { data } = await api.get<Cart[]>('/cart')
  return data
}

export async function getFavoriteCarts(): Promise<Cart[]> {
  const { data } = await api.get<Cart[]>('/cart')
  return data.filter((cart) => cart.isFavorite)
}

export function useCarts(): UseQueryResult<Cart[], unknown> {
  return useQuery(['carts'], () => getCarts(), {
    staleTime: 1000 * 60 * 5 // 5 minutes
  })
}
