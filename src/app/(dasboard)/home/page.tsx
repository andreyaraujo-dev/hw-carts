'use client'

import {
  getFavoriteCarts,
  useCarts
} from '@/services/react-query/hooks/useCarts'
import { CartCard } from './components/CartCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from 'react-query'

export default function Home() {
  const { data, isLoading } = useCarts()
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery(
    ['favoriteCarts'],
    getFavoriteCarts
  )

  const imageURL =
    'https://i.pinimg.com/originals/ac/34/84/ac348422c1fd4d46f9a652f32839f8d6.jpg'
  return (
    <div className="flex w-full h-full p-6 flex-col space-y-5">
      <div className="w-full">
        <h2 className="font-bold text-2xl mb-3">Favoritos</h2>
        <div className="flex items-center space-x-3 w-full flex-wrap">
          {isLoadingFavorites ? (
            <Skeleton className="w-96 m-2" />
          ) : favorites && favorites?.length > 0 ? (
            favorites?.map((cart) => (
              <CartCard
                key={cart._id}
                imageURL={imageURL}
                model={cart.model}
                purchaseDate={new Date(cart.purchaseDate).toLocaleDateString(
                  'pt-BR',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }
                )}
                year={cart.year}
                isFavorite={cart.isFavorite}
              />
            ))
          ) : (
            <p>Você não adicionou nenhum carro aos seus favoritos.</p>
          )}
        </div>
      </div>

      <div className="w-full">
        <h2 className="font-bold text-2xl mb-3">Coleção</h2>
        <div className="flex items-center w-full flex-wrap">
          {isLoading ? (
            <Skeleton className="w-96 m-2" />
          ) : (
            data?.map((cart) => (
              <CartCard
                key={cart._id}
                imageURL={imageURL}
                model={cart.model}
                purchaseDate={new Date(cart.purchaseDate).toLocaleDateString(
                  'pt-BR',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }
                )}
                year={cart.year}
                isFavorite={cart.isFavorite}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
