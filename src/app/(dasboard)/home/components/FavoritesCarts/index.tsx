import { Cart } from '@/@types/carts'
import { Skeleton } from '@/components/ui/skeleton'
import { CartCard } from '../CartCard'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface FavoritesCartsProps {
  isLoading: boolean
  carts?: Cart[]
}

const imageURL =
  'https://i.pinimg.com/originals/ac/34/84/ac348422c1fd4d46f9a652f32839f8d6.jpg'

export function FavoritesCarts({ isLoading, carts }: FavoritesCartsProps) {
  const [filteredCarts, setFilteredCarts] = useState<Cart[] | undefined>([])

  function handleFilterCarts() {
    carts?.sort(function (a, b) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    const lastCarts = carts?.slice(0, 4)
    setFilteredCarts(lastCarts)
  }

  useEffect(() => {
    if (carts) handleFilterCarts()
  }, [carts])

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-96 m-2" />
      ) : carts && carts?.length > 0 ? (
        <>
          {filteredCarts?.map((cart) => (
            <CartCard
              key={cart._id}
              imageURL={imageURL}
              model={cart.model}
              purchaseDate={
                cart.purchaseDate &&
                new Date(cart.purchaseDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })
              }
              year={cart.year}
              isFavorite={cart.isFavorite}
            />
          ))}
          <Card className="w-96 h-28 hover:cursor-pointer hover:bg-slate-900 transition-all m-2 flex items-center justify-center text-base">
            <p>Ver mais</p>
          </Card>
        </>
      ) : (
        <p>Você não adicionou nenhum carro aos seus favoritos.</p>
      )}
    </>
  )
}
