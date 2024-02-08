'use client'

import { Container } from '@/components/Container'
import { Skeleton } from '@/components/ui/skeleton'
import { useCarts } from '@/services/react-query/hooks/useCarts'
import { CartCard } from '../home/components/CartCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Collection() {
  const { data: session } = useSession()
  const { data, isLoading } = useCarts(
    session?.user?.email as string | undefined
  )
  const imageURL =
    'https://i.pinimg.com/originals/ac/34/84/ac348422c1fd4d46f9a652f32839f8d6.jpg'

  return (
    <Container>
      <div className="w-full flex justify-between">
        <span>
          <h1 className="font-bold text-3xl mb-3">Sua Coleção</h1>
        </span>

        <Link href="/collection/add">
          <Button className="bg-blue-600 text-white font-medium text-base">
            Adicionar
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-3 w-full flex-wrap">
        {isLoading ? (
          <Skeleton className="w-96 m-2" />
        ) : data && data?.length > 0 ? (
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
        ) : (
          <p>Você não adicionou nenhum carro à sua coleção.</p>
        )}
      </div>
    </Container>
  )
}
