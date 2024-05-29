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
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { formatCurrency, formatCurrencyOnKeyUp } from '@/utils/functions'

interface UpdateCartProps {
  params: { id: string }
}

const defaultValues = {
  model: '',
  year: undefined,
  value: undefined,
  purchaseDate: new Date(),
  imageUrl: '',
  isFavorite: false
}

export default function UpdateCart({ params }: UpdateCartProps) {
  const router = useRouter()
  const form = useForm<CartDataForm>({
    resolver: zodResolver(cartDataFormSchema),
    defaultValues,
    mode: 'onChange'
  })
  const { data: session } = useSession()
  const { data: cartData, isLoading: isLoadingCartData } = useCartById(
    params.id
  )
  const {
    mutateAsync: updateCart,
    isLoading: isLoadingUpdateCart,
    error
  } = useUpdateCart()

  useEffect(() => {
    if (!isLoadingCartData) form.reset(cartData)
  }, [isLoadingCartData, cartData, form])

  const handleUpdateCart: SubmitHandler<CartDataForm> = async (data) => {
    const cart: UpdateCartInput = {
      _id: params.id,
      userEmail: String(session?.user?.email),
      ...data
    }

    await updateCart(cart)
    if (!error) router.push('/collection')
  }

  return (
    <Container>
      <h1 className="font-bold text-3xl mb-3">Adicionar Carrinho</h1>

      <Card className="w-full">
        <CardContent className="w-full p-3 flex flex-col space-y-4">
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
                <div className="w-full flex flex-col space-y-4 p-3">
                  <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem className="w-full">
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
                              value={field.value}
                              onChange={(event) =>
                                field.onChange(event.target.value)
                              }
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
                        <FormItem className="w-full">
                          <FormLabel>Ano</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              variant={
                                form.formState.errors.year ? 'error' : 'default'
                              }
                              {...field}
                              value={field.value}
                              onChange={(event) =>
                                field.onChange(Number(event.target.value))
                              }
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
                        <FormItem className="w-full">
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
                              value={field.value}
                              onKeyUp={(event) =>
                                field.onChange(
                                  formatCurrencyOnKeyUp(
                                    event.currentTarget.value
                                  )
                                )
                              }
                              onChange={(event) =>
                                field.onChange(event.target.value)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
                    <FormField
                      control={form.control}
                      name="purchaseDate"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Data de compra</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full text-left font-normal h-12 px-3 py-2 text-base',
                                    !cartData?.purchaseDate &&
                                      'text-muted-foreground'
                                  )}
                                >
                                  {cartData?.purchaseDate ? (
                                    format(field.value as Date, 'PPP', {
                                      locale: ptBR
                                    })
                                  ) : (
                                    <span>Selecione uma data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(event) => field.onChange(event)}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01T00:00:00')
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormItem className="w-full">
                      <FormLabel>Imagem do carro</FormLabel>
                      <FormControl>
                        <Input type="file" placeholder="Selecione uma imagem" />
                      </FormControl>
                    </FormItem>
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
                              checked={field.value}
                              onCheckedChange={(event) => field.onChange(event)}
                              defaultChecked={field.value}
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
                </div>
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
            variant="outline"
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}
