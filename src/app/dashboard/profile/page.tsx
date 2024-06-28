'use client'

import { Container } from '@/components/Container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Cart } from '@/@types/carts'
import { useCarts } from '@/services/react-query/hooks/useCarts'

export default function Profile() {
  const { data: session } = useSession()
  const [carts, setCarts] = useState<Cart[] | undefined>([])
  const [lastCart, setLastCart] = useState<Cart | undefined>()
  const [firstCart, setFirstCart] = useState<Cart | undefined>()
  const { data } = useCarts(session?.user?.email as string | undefined)
  const [collectionValue, setCollectionValue] = useState<number | undefined>(0)
  const [mostExpensiveCart, setMostExpensiveCart] = useState<Cart | undefined>()
  const [cheapestCart, setCheapestCart] = useState<Cart | undefined>()

  useEffect(() => {
    setCarts(data)

    const cartsOrdered = data
      ?.filter((car) => car.purchaseDate !== undefined)
      .sort(
        (a, b) =>
          new Date(b.purchaseDate!).getTime() -
          new Date(a.purchaseDate!).getTime()
      )
    if (cartsOrdered) {
      setLastCart(cartsOrdered[0])
      setFirstCart(cartsOrdered[cartsOrdered?.length - 1])
    }

    if (data) {
      const totalValue = data.reduce((total, cart) => {
        if (cart.value) return total + cart.value
        return total
      }, 0)
      setCollectionValue(totalValue)
    }

    const mostExpensiveCar = data
      ?.filter((car) => car.value !== undefined)
      .reduce((prev, current) =>
        // @ts-expect-error-error
        current?.value > prev?.value ? current : prev
      )
    setMostExpensiveCart(mostExpensiveCar)

    const cheapestCar = data
      ?.filter((car) => car.value !== undefined)
      .reduce((prev, current) =>
        // @ts-expect-error-error
        current?.value < prev?.value ? current : prev
      )
    setCheapestCart(cheapestCar)
  }, [data])

  return (
    <Container>
      <div className="flex items-center justify-center h-full w-full">
        <Tabs defaultValue="account" className="w-96">
          <TabsList className="w-full justify-between">
            <TabsTrigger value="account" className="flex-1">
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="collection" className="flex-1">
              Dados da Coleção
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardContent>
                <div className="w-full flex items-center justify-center mb-4 p-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={session?.user?.image || ''} />
                    <AvatarFallback>
                      {session?.user?.name?.split(' ')[0].split('')[0]}
                      {session?.user?.name?.split(' ')[1].split('')[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex flex-col items-start space-y-2">
                  <span>
                    Nome:{' '}
                    <span className="text-zinc-500">{session?.user?.name}</span>
                  </span>
                  <span>
                    E-mail:{' '}
                    <span className="text-zinc-500">
                      {session?.user?.email}
                    </span>
                  </span>
                </div>
                <CardFooter className="p-0 mt-4">
                  <Button
                    variant="outline"
                    className="mt-2 border-red-400 hover:bg-red-400"
                  >
                    Sair
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="collection">
            <Card className="pt-6">
              <CardContent>
                <div className="flex flex-col items-start space-y-2">
                  <span>
                    Tamanho da coleção:{' '}
                    <span className="text-zinc-500">{carts?.length}</span>
                  </span>

                  <span>
                    Carros favoritos:{' '}
                    <span className="text-zinc-500">
                      {carts?.filter((cart) => cart.isFavorite).length}
                    </span>
                  </span>

                  <span>
                    Último carro comprado:{' '}
                    <span className="text-zinc-500">
                      {lastCart?.model} -{' '}
                      {lastCart?.purchaseDate &&
                        new Date(lastCart.purchaseDate).toLocaleDateString(
                          'pt-BR',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }
                        )}
                    </span>
                  </span>

                  <span>
                    Primeiro carro comprado:{' '}
                    <span className="text-zinc-500">
                      {firstCart?.model} -{' '}
                      {firstCart?.purchaseDate &&
                        new Date(firstCart.purchaseDate).toLocaleDateString(
                          'pt-BR',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }
                        )}
                    </span>
                  </span>

                  <span>
                    Total gasto na coleção:{' '}
                    <span className="text-zinc-500">
                      {Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(collectionValue as number)}
                    </span>
                  </span>

                  <span>
                    Carro mais caro:{' '}
                    <span className="text-zinc-500">
                      {Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(mostExpensiveCart?.value as number)}
                    </span>
                  </span>

                  <span>
                    Carro mais barato:{' '}
                    <span className="text-zinc-500">
                      {Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(cheapestCart?.value as number)}
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  )
}
