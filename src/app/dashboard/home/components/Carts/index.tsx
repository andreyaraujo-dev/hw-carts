import { Skeleton } from '@/shared/components/ui/skeleton'
import { CartCard } from '../CartCard'
import { useEffect, useState } from 'react'
import { Cart } from '@/types'
import Link from 'next/link'
import { Card } from '@/shared/components/ui/card'

interface CartsProps {
  isLoading: boolean
  carts?: Cart[]
  pageToRedirect: string
}

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts])

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton className="w-60 h-72 m-2 bg-zinc-700" />
          <Skeleton className="w-60 h-72 m-2 bg-zinc-700" />
        </>
      ) : carts && carts?.length > 0 ? (
        <>
          {filteredCarts?.map((cart) => (
            <CartCard key={cart._id} cart={cart} />
          ))}
          <Link href={pageToRedirect}>
            <Card className="w-60 h-72 p-2 hover:cursor-pointer hover:bg-zinc-900 transition-all flex items-center justify-center text-base">
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
