import { formatDateToCalendarInput } from '@/lib/utils'
import { createAxiosInstance } from '@/services/axios'
import { useMutation, useQuery, UseQueryResult } from 'react-query'
import { queryClient } from '../queryClient'
import { AddCartInput, Cart, CartResponse, UpdateCartInput } from '@/@types'
import { getCarts, getFavoriteCarts } from '@/actions'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const api = createAxiosInstance(apiUrl as string)

export async function addCart(data: AddCartInput): Promise<Cart> {
  const { data: responseData } = await api.post<Cart>('/cart', data, {
    headers: { 'content-type': 'multipart/form-data' }
  })
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

export async function deleteCart(id: string): Promise<Cart> {
  const { data } = await api.delete<Cart>(`/cart/${id}`)
  return data
}

export async function deleteManyCarts(ids: string[]): Promise<Cart> {
  const { data } = await api.post<Cart>(`/cart/delete-many`, { ids })
  return data
}

export function useCarts(userEmail?: string): UseQueryResult<Cart[], unknown> {
  return useQuery(['carts', userEmail], () => getCarts(userEmail), {
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
    // staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id
  })
}

export function useAddCart() {
  return useMutation(addCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', 'favoritesCarts'])
    }
  })
}

export function useUpdateCart() {
  return useMutation(updateCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', 'favoritesCarts', 'getCartById'])
    }
  })
}

export function useDeleteCart() {
  return useMutation(deleteCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', 'favoritesCarts', 'getCartById'])
    }
  })
}

export function useDeleteManyCarts() {
  return useMutation(deleteManyCarts, {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', 'favoritesCarts', 'getCartById'])
    }
  })
}
