'use client'

import {
  useCarts,
  useFavoritesCarts
} from '@/shared/services/react-query/hooks/useCarts'
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
        <div className="md:max-w-6xl auto-cols-max grid grid-flow-col grid-rows-1 gap-3 overflow-x-scroll pb-3 scrollbar scrollbar-h-2 scrollbar-thumb-rounded-full scrollbar-thumb-accent">
          <Carts
            isLoading={isLoadingFavorites}
            carts={favorites}
            pageToRedirect="/dashboard/collection"
          />
        </div>
      </div>

      <div className="w-full mb-3">
        <h2 className="font-bold text-3xl mb-3">Coleção</h2>
        <div className="md:max-w-6xl auto-cols-max grid grid-flow-col grid-rows-1 gap-3 overflow-x-scroll pb-3 scrollbar scrollbar-h-2 scrollbar-thumb-rounded-full scrollbar-thumb-accent">
          <Carts
            isLoading={isLoading}
            carts={data}
            pageToRedirect="/dashboard/collection"
          />
        </div>
      </div>
    </div>
  )
}
