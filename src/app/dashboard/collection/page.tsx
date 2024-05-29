'use client'

import { Container } from '@/components/Container'
import { Skeleton } from '@/components/ui/skeleton'
import {
  getCartsByModel,
  useCarts,
  useDeleteCart
} from '@/services/react-query/hooks/useCarts'
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
import { PenBox, Search, Star, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Alertdialog } from '@/components/AlertDialog'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Cart } from '@/@types/carts'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { SearchCart, searchCartSchema } from './schemas/searchCart'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { queryClient } from '@/services/react-query/queryClient'

export default function Collection() {
  const { toast } = useToast()
  const { data: session } = useSession()
  const [carts, setCarts] = useState<Cart[] | []>()
  const [idForDelete, setIdForDelete] = useState('')
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [typeFilter, setTypeFilter] = useState<
    'all' | 'favorites' | 'non-favorites'
  >('all')

  const {
    data,
    isLoading,
    refetch: refetchCarts
  } = useCarts(session?.user?.email as string | undefined)
  const {
    mutateAsync: deleteCart,
    error,
    isLoading: isLoadingDeleteCart
  } = useDeleteCart()
  const searchForm = useForm<SearchCart>({
    resolver: zodResolver(searchCartSchema),
    defaultValues: { model: '' },
    mode: 'onChange'
  })

  useEffect(() => {
    if (!isLoading) setCarts(data)
  }, [data, isLoading])

  async function handleDeleteCart() {
    await deleteCart(idForDelete)
    if (!error) {
      setOpenDialogDelete(false)
      refetchCarts()
      setIdForDelete('')
    } else {
      toast({
        title: 'Ops! Algo deu errado.',
        description: 'Não foi possível deletar o registro, tente novamente.',
        variant: 'destructive',
        duration: 3000
      })
    }
  }

  function handleOpenDialogDelete(id: string) {
    setIdForDelete(id)
    setOpenDialogDelete(true)
  }

  async function handleFilterData(type: string) {
    let favorites
    let allCarts
    let nonFavorites
    switch (type) {
      case 'all':
        setTypeFilter('all')
        allCarts = await refetchCarts()
        setCarts(allCarts.data)
        break
      case 'favorites':
        setTypeFilter('favorites')
        allCarts = await refetchCarts()
        favorites = allCarts.data?.filter((cart) => cart.isFavorite)
        setCarts(favorites)
        break
      case 'non-favorites':
        setTypeFilter('non-favorites')
        allCarts = await refetchCarts()
        nonFavorites = allCarts.data?.filter((cart) => !cart.isFavorite)
        setCarts(nonFavorites)
        break
      default:
        setTypeFilter('all')
        allCarts = await refetchCarts()
        setCarts(allCarts.data)
        break
    }
  }

  async function handleSubmitSearch(data: SearchCart) {
    const cartsFiltered = await queryClient.fetchQuery('cartsByModel', {
      queryFn: () => getCartsByModel(data.model, session?.user?.email as string)
    })
    setCarts(cartsFiltered)
  }

  async function handleClearFilters() {
    searchForm.reset()
    handleFilterData('all')
  }

  return (
    <Container>
      <div className="w-full">
        <span>
          <h1 className="font-bold text-3xl mb-3">Sua Coleção</h1>
        </span>
      </div>
      <div className="w-full flex md:justify-between md:flex-row flex-col space-y-3 md:space-y-0">
        <div className="flex md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
          <Select value={typeFilter} onValueChange={(e) => handleFilterData(e)}>
            <SelectTrigger className="w-full md:w-[180px] h-12">
              <SelectValue placeholder="Tipo de carros" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="favorites">Favoritos</SelectItem>
              <SelectItem value="non-favorites">Não favoritos</SelectItem>
            </SelectContent>
          </Select>

          <Form {...searchForm}>
            <form
              onSubmit={searchForm.handleSubmit(handleSubmitSearch)}
              className="flex space-x-3 items-center md:justify-center"
            >
              <FormField
                control={searchForm.control}
                name="model"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="search"
                        placeholder="Pesquisar por modelo"
                        variant={
                          searchForm.formState.errors.model
                            ? 'error'
                            : 'default'
                        }
                        {...field}
                        value={field.value}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="default"
                className="bg-blue-600 text-white py-2 px-4 h-12"
                disabled={!searchForm.getValues('model')}
              >
                <Search size={15} />
              </Button>
            </form>
          </Form>

          <Button
            variant="secondary"
            className="h-12 text-base"
            type="button"
            onClick={handleClearFilters}
          >
            Limpar filtros
          </Button>
        </div>

        <Link href="/collection/add">
          <Button
            variant="default"
            className="text-white font-medium text-base h-12 w-full"
          >
            Adicionar
          </Button>
        </Link>
      </div>

      <div className="pb-4">
        {isLoading ? (
          <Skeleton className="w-96 m-2" />
        ) : carts && carts?.length > 0 ? (
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
                  {carts?.map((cart) => (
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
                        }).format(cart.value as unknown as number)}
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

                        <Button
                          variant="outline"
                          onClick={() => handleOpenDialogDelete(cart._id)}
                        >
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

      <Alertdialog
        title="Deletar Carrinho"
        description="Você tem certeza disso? Após a operação não será possível recuperar os dados."
        onCancel={() => setOpenDialogDelete(false)}
        onConfirm={() => handleDeleteCart()}
        open={openDialogDelete}
        isLoading={isLoadingDeleteCart}
      />
    </Container>
  )
}
