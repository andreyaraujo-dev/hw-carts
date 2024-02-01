'use client'

import { useCarts } from '@/services/react-query/hooks/useCarts'
import { CartCard } from './components/CartCard'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const { data, isLoading } = useCarts()

  const imageURL =
    'https://i.pinimg.com/originals/ac/34/84/ac348422c1fd4d46f9a652f32839f8d6.jpg'
  return (
    <div className="flex w-full h-full p-6 flex-col space-y-3">
      <div className="w-full">
        <h2 className="font-bold text-2xl mb-3">Favoritos</h2>
        <div className="flex items-center space-x-3 w-full flex-wrap">
          {isLoading ? (
            <Skeleton className="w-96 m-2" />
          ) : (
            data?.map((cart) => {
              if (cart.isFavorite) {
                return (
                  <CartCard
                    key={cart._id}
                    imageURL={imageURL}
                    model={cart.model}
                    purchaseDate={new Date(
                      cart.purchaseDate
                    ).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                    year={cart.year}
                    isFavorite={cart.isFavorite}
                  />
                )
              }
            })
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
