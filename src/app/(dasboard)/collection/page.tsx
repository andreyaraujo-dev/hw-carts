'use client'

import { Container } from '@/components/Container'
import { Skeleton } from '@/components/ui/skeleton'
import { useCarts } from '@/services/react-query/hooks/useCarts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { PenBox, Star, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

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

      <div className="">
        {isLoading ? (
          <Skeleton className="w-96 m-2" />
        ) : data && data?.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className=""></TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Ano</TableHead>
                    <TableHead>Data de compra</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data?.map((cart) => (
                    <TableRow key={cart._id}>
                      <TableCell>
                        {cart.isFavorite && (
                          <Star size={12} className="text-yellow-500" />
                        )}
                      </TableCell>
                      <TableCell>{cart.model}</TableCell>
                      <TableCell>{cart.year}</TableCell>
                      <TableCell>
                        {cart.purchaseDate
                          ? new Date(cart.purchaseDate).toLocaleDateString(
                              'pt-BR',
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              }
                            )
                          : 'Não informado'}
                      </TableCell>
                      <TableCell>
                        {Intl.NumberFormat('pt-br', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(cart.value as number)}
                      </TableCell>
                      <TableCell className="flex space-x-3">
                        <Link
                          href={`/collection/update/${cart._id}`}
                          className="text-blue-300"
                        >
                          <Button variant="outline">
                            <PenBox size={20} />
                          </Button>
                        </Link>

                        <Button variant="outline">
                          <Trash2
                            size={20}
                            className="text-red-300 hover:cursor-pointer"
                          />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <p>Você não adicionou nenhum carro à sua coleção.</p>
        )}
      </div>
    </Container>
  )
}
