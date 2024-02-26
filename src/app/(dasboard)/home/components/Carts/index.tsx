import { Cart } from '@/@types/carts'
import { Skeleton } from '@/components/ui/skeleton'
import { CartCard } from '../CartCard'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface CartsProps {
  isLoading: boolean
  carts?: Cart[]
  pageToRedirect: string
}

const imageURL =
  'https://i.pinimg.com/originals/ac/34/84/ac348422c1fd4d46f9a652f32839f8d6.jpg'

export function Carts({ isLoading, carts, pageToRedirect }: CartsProps) {
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
          <Link href={pageToRedirect}>
            <Card className="w-80 h-24 hover:cursor-pointer hover:bg-slate-900 transition-all flex items-center justify-center text-base">
              <p>Ver mais</p>
            </Card>
          </Link>
        </>
      ) : (
        <p>Nenhum carro para mostrar aqui.</p>
      )}
    </>
  )
}
