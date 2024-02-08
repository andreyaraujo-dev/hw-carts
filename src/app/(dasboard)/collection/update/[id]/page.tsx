'use client'

import { Container } from '@/components/Container'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { CartDataForm, cartDataFormSchema } from '../../schemas/addCart'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { UpdateCartInput } from '@/@types/updateCartInput'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/Loading/Spinner'
import {
  useCartById,
  useUpdateCart
} from '@/services/react-query/hooks/useCarts'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import { Cart } from '@/@types/carts'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckedState } from '@radix-ui/react-checkbox'

interface UpdateCartProps {
  params: { id: string }
}

export default function UpdateCart({ params }: UpdateCartProps) {
  const router = useRouter()
  const form = useForm<CartDataForm>({
    resolver: zodResolver(cartDataFormSchema),
    defaultValues: {
      model: '',
      year: 0,
      value: 0,
      purchaseDate: new Date(),
      imageUrl: '',
      isFavorite: false
    }
  })
  const { data: session } = useSession()
  const { data, isLoading: isLoadingCartData } = useCartById(params.id)
  const {
    mutateAsync: updateCart,
    isLoading: isLoadingUpdateCart,
    error
  } = useUpdateCart()
  const [cart, setCart] = useState<Cart>()

  useEffect(() => {
    if (!isLoadingCartData) setCart(data)
  }, [isLoadingCartData, data])

  const handleUpdateCart: SubmitHandler<CartDataForm> = async (data) => {
    const cart: UpdateCartInput = {
      _id: params.id,
      userEmail: String(session?.user?.email),
      ...data
    }
    await updateCart(cart)
    if (!error) router.push('/collection')
  }

  function handleChangeInputs(e: React.ChangeEvent<HTMLInputElement>) {
    setCart({
      ...(cart as Cart),
      [e.target.name]: e.target.value
    })
  }

  function handleChangeCheckbox(checked: CheckedState) {
    setCart({
      ...(cart as Cart),
      isFavorite: !!checked
    })
  }

  return (
    <Container>
      <h1 className="font-bold text-3xl mb-3">Adicionar Carrinho</h1>

      <Card className="w-full">
        <CardContent className="p-3 flex flex-col space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateCart)}
              id="form-register-cart"
            >
              {isLoadingCartData ? (
                <div className="flex flex-col space-y-3">
                  <div className="flex space-x-3 w-full">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                  <div className="flex space-x-3 w-full">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modelo</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              variant={
                                form.formState.errors.model
                                  ? 'error'
                                  : 'default'
                              }
                              {...field}
                              value={cart?.model || ''}
                              onChange={handleChangeInputs}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              variant={
                                form.formState.errors.year ? 'error' : 'default'
                              }
                              // {...register('year', {
                              //   setValueAs: (v) => {
                              //     if (!v) return undefined
                              //     return Number(v)
                              //   },
                              // })}
                              {...field}
                              value={cart?.year || ''}
                              onChange={handleChangeInputs}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              variant={
                                form.formState.errors.value
                                  ? 'error'
                                  : 'default'
                              }
                              {...field}
                              value={cart?.value || ''}
                              onChange={handleChangeInputs}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
                    {/* <Input
                      type="date"
                      placeholder="Data da compra"
                      value={cart?.purchaseDate}
                      errorMessage={errors.purchaseDate?.message}
                      variant={errors.purchaseDate ? 'error' : 'default'}
                      {...register('purchaseDate', {
                        setValueAs: (v) => {
                          if (!v) return undefined
                          return new Date(v)
                        },
                        onChange: handleChangeInputs
                      })}
                    />

                     */}
                    {/* <Input type="file" placeholder="Imagem" /> */}
                  </div>
                  <div className="w-full flex space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
                    <FormField
                      control={form.control}
                      name="isFavorite"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0 py-3 rounded-md">
                          <FormControl>
                            <Checkbox
                              className="rounded-sm h-5 w-5 hover:cursor-pointer"
                              checked={cart?.isFavorite}
                              onCheckedChange={handleChangeCheckbox}
                              defaultChecked={cart?.isFavorite}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Adicionar aos favoritos</FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-3 flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
          <Button
            className="bg-blue-600 text-white font-medium text-base w-full"
            form="form-register-cart"
            type="submit"
            disabled={isLoadingUpdateCart}
          >
            {isLoadingUpdateCart && (
              <Spinner className="h-5 w-5 border-2 mr-2" />
            )}
            Salvar
          </Button>
          <Button
            onClick={() => router.back()}
            className="text-white font-medium text-base w-full"
            variant="ghost"
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}
