'use client'

import {
  useCarts,
  useFavoritesCarts
} from '@/services/react-query/hooks/useCarts'
import { useSession } from 'next-auth/react'
import { Carts } from './components/Carts'

export default function Home() {
  const { data: session } = useSession()
  const { data, isLoading } = useCarts(
    session?.user?.email as string | undefined
  )
  const { data: favorites, isLoading: isLoadingFavorites } = useFavoritesCarts(
    session?.user?.email as string | undefined
  )

  return (
    <div className="flex w-full h-full p-6 flex-col space-y-5">
      <div className="w-full">
        <h2 className="font-bold text-3xl mb-3">Favoritos</h2>
        <div className="w-full grid grid-cols-3 gap-3">
          <Carts isLoading={isLoadingFavorites} carts={favorites} />
        </div>
      </div>

      <div className="w-full">
        <h2 className="font-bold text-3xl mb-3">Coleção</h2>
        <div className="w-full grid grid-cols-3 gap-3">
          <Carts isLoading={isLoading} carts={data} />
        </div>
      </div>
    </div>
  )
}
