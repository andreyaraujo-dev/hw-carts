import { AddCartInput } from '@/@types/addCartInput'
import { Cart } from '@/@types/carts'
import { UpdateCartInput } from '@/@types/updateCartInput'
import { formatDateToCalendarInput } from '@/lib/utils'
import { createAxiosInstance } from '@/services/axios'
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const api = createAxiosInstance(apiUrl as string)

async function getCarts(userEmail?: string): Promise<Cart[]> {
  const { data } = await api.get<Cart[]>(`/cart?userEmail=${userEmail}`)
  return data
}

export async function getFavoriteCarts(userEmail?: string): Promise<Cart[]> {
  const { data } = await api.get<Cart[]>(`/cart?userEmail=${userEmail}`)
  return data.filter((cart) => cart.isFavorite)
}

export async function addCart(data: AddCartInput): Promise<Cart> {
  const { data: responseData } = await api.post<Cart>('/cart', data)
  return responseData
}

export async function updateCart(data: UpdateCartInput): Promise<Cart> {
  const { data: responseData } = await api.patch<Cart>(
    `/cart/${data._id}`,
    data
  )
  return responseData
}

export async function getCartById(id: string): Promise<Cart> {
  const { data } = await api.get<Cart>(`/cart/${id}`)
  let dateFormatted: Date | undefined
  if (data.purchaseDate) {
    dateFormatted = formatDateToCalendarInput(data.purchaseDate)
  }
  return {
    ...data,
    purchaseDate: dateFormatted
  }
}

export async function deleteCart(id: string): Promise<Cart> {
  const { data } = await api.delete<Cart>(`/cart/${id}`)
  return data
}

export function useCarts(userEmail?: string): UseQueryResult<Cart[], unknown> {
  return useQuery(['carts', userEmail], () => getCarts(userEmail), {
    // staleTime: 1000 * 60 * 5, // 5 minutes
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
      // staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!userEmail
    }
  )
}

export function useCartById(id: string): UseQueryResult<Cart, unknown> {
  return useQuery(['getCartById', id], () => getCartById(id), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id
  })
}

export function useAddCart() {
  const client = useQueryClient()
  return useMutation(addCart, {
    onSuccess: () => {
      client.invalidateQueries(['carts', 'favoritesCarts'])
    }
  })
}

export function useUpdateCart() {
  const client = useQueryClient()
  return useMutation(updateCart, {
    onSuccess: () => {
      client.invalidateQueries(['carts', 'favoritesCarts', 'getCartById'])
    }
  })
}

export function useDeleteCart() {
  const client = useQueryClient()
  return useMutation(deleteCart, {
    onSuccess: () => {
      client.invalidateQueries(['carts', 'favoritesCarts'])
    }
  })
}
