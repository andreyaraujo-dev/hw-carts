'use client'

import { Container } from '@/shared/components/Container'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { useSession } from 'next-auth/react'
import { useMediaQuery } from 'usehooks-ts'

import { Search } from 'lucide-react'
import { DialogCustom } from '@/shared/components/DialogCustom'
import { useEffect, useState } from 'react'
import { useToast } from '@/shared/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select'
import { Cart } from '@/types'
import { Input } from '@/shared/components/ui/input'
import { useForm } from 'react-hook-form'
import { SearchCart, searchCartSchema } from './schemas/searchCart'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/shared/components/ui/form'
import { queryClient } from '@/shared/services/react-query/queryClient'
import { ContentHeader } from '@/shared/components/ContentHeader'
import { DataTable } from './Table/DataTable'
import { columns, columnsMobile } from './Table/Columns'
import { getCartsByModel } from '@/actions'
import {
  useCarts,
  useDeleteCart
} from '@/shared/services/react-query/hooks/useCarts'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'

export default function Collection() {
  const { toast } = useToast()
  const { data: session } = useSession()
  const [carts, setCarts] = useState<Cart[] | []>()
  const [idForDelete, setIdForDelete] = useState('')
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [typeFilter, setTypeFilter] = useState<
    'all' | 'favorites' | 'non-favorites'
  >('all')
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false
  })
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
      await refetchCarts()
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

  async function handleFilterData(type: string) {
    let favorites
    let allCarts
    let nonFavorites
    const searchModel = searchForm.getValues('model')
    const regex = new RegExp(`^${searchModel}|${searchModel}$`, 'i')
    switch (type) {
      case 'all':
        setTypeFilter('all')
        allCarts = await refetchCarts()
        if (allCarts && 'data' in allCarts) {
          allCarts = allCarts.data
        }
        if (searchModel) {
          allCarts = allCarts?.filter((cart) => regex.test(cart.model))
        }
        setCarts(allCarts)
        break
      case 'favorites':
        setTypeFilter('favorites')
        allCarts = await refetchCarts()
        favorites = allCarts.data?.filter((cart) => {
          if (searchModel) {
            if (regex.test(cart.model) && cart.isFavorite) return cart
          } else {
            if (cart.isFavorite) return cart
          }
        })
        setCarts(favorites)
        break
      case 'non-favorites':
        setTypeFilter('non-favorites')
        allCarts = await refetchCarts()
        nonFavorites = allCarts.data?.filter((cart) => {
          if (searchModel) {
            if (regex.test(cart.model) && !cart.isFavorite) return cart
          } else {
            if (!cart.isFavorite) return cart
          }
        })
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
    let cartsFiltered = await queryClient.fetchQuery('cartsByModel', {
      queryFn: () => getCartsByModel(data.model, session?.user?.email as string)
    })
    cartsFiltered = cartsFiltered.filter((cart) => {
      if (typeFilter === 'favorites') return cart.isFavorite
      if (typeFilter === 'non-favorites') return !cart.isFavorite
      return cart
    })
    setCarts(cartsFiltered)
  }

  async function handleClearFilters() {
    searchForm.reset()
    await handleFilterData('all')
  }

  return (
    <Container>
      <ContentHeader
        title="Sua Coleção"
        previousLink="/dashboard/home"
        currentPath="Coleção de carrinhos"
        previousPath="Home"
      />
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
                className="bg-blue-600 text-white py-2 px-4 h-12 hover:bg-blue-800"
                disabled={!searchForm.getValues('model')}
              >
                <Search size={15} />
              </Button>
            </form>
          </Form>

          <Button
            variant="outline"
            className="h-12 text-base bg-zinc-500 hover:bg-zinc-600 hover:text-zinc-100 text-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-800"
            type="button"
            onClick={handleClearFilters}
          >
            Limpar filtros
          </Button>
        </div>

        <Link href="/dashboard/collection/add">
          <Button
            variant="secondary"
            className="text-white font-medium text-base h-12 w-full bg-blue-800 hover:bg-blue-900"
          >
            Adicionar
          </Button>
        </Link>
      </div>

      <div className="pb-4">
        {isLoading ? (
          <Skeleton className="w-96 m-2" />
        ) : carts && carts?.length > 0 ? (
          <DataTable
            columns={isDesktop ? columns : columnsMobile}
            data={carts}
          />
        ) : (
          <p>Você não adicionou nenhum carro à sua coleção.</p>
        )}
      </div>

      <DialogCustom
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
