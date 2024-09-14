import { useMutation, useQuery, UseQueryResult } from 'react-query'
import { queryClient } from '../queryClient'

import {
  addCart,
  deleteCart,
  deleteManyCarts,
  getCartById,
  getCarts,
  getFavoriteCarts,
  updateCart
} from '@/actions'
import { Cart } from '@/types'

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
