'use client'

import { Container } from '@/components/Container'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { CartDataForm, cartDataFormSchema } from '../../schemas/addCart'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { UpdateCartInput } from '@/@types'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { formatCurrency, formatCurrencyOnKeyUp } from '@/utils/functions'
import { ContentHeader } from '@/components/ContentHeader'
import { useToast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface UpdateCartProps {
  params: { id: string }
}

const defaultValues = {
  model: '',
  collection: '',
  year: undefined,
  value: undefined,
  purchaseDate: undefined,
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
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoadingCartData)
      form.reset({ ...cartData, value: formatCurrency(cartData?.value) })
  }, [isLoadingCartData, cartData, form])

  const handleUpdateCart: SubmitHandler<CartDataForm> = async (data) => {
    try {
      const cart: UpdateCartInput = {
        _id: params.id,
        userEmail: String(session?.user?.email),
        ...data,
        value: Number(data.value)
      }

      await updateCart(cart)
      toast({ description: 'Registro atualizado com sucesso!', duration: 3000 })
      if (!error) router.push('/dashboard/collection')
    } catch (error) {
      toast({
        title: 'Ops!',
        variant: 'destructive',
        description:
          'Não foi possível realizar a atualização, tente novamente!',
        duration: 3000
      })
    }
  }

  return (
    <Container>
      <ContentHeader
        title="Atualizar carrinho"
        previousLink="/dashboard/collection"
        currentPath="Atualizar registro"
        previousPath="Coleção"
      />

      <Card className="w-full">
        <CardContent className="w-full p-3 flex flex-col space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateCart)}
              id="form-register-cart"
              className="space-y-2"
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
                              value={field.value || ''}
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
                      name="collection"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Coleção</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              variant={
                                form.formState.errors.collection
                                  ? 'error'
                                  : 'default'
                              }
                              {...field}
                              value={field.value || ''}
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
                              value={field.value || ''}
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
                              value={field.value || ''}
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
                                    (!cartData?.purchaseDate || !field.value) &&
                                      'text-muted-foreground'
                                  )}
                                >
                                  {field?.value ? (
                                    format(field?.value as Date, 'PPP', {
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
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem className="w-full">
                          <FormLabel>Imagem do carro</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              placeholder="Selecione uma imagem"
                              {...field}
                              // value={value?.name || ''}
                              variant={
                                form.formState.errors.image
                                  ? 'error'
                                  : 'default'
                              }
                              onChange={(event) =>
                                onChange(event.target.files?.item(0))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isFavorite"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Adicionar aos favoritos?</FormLabel>
                          <Select
                            onValueChange={(e) => field.onChange(e === 'true')}
                            defaultValue={
                              cartData?.isFavorite ? 'true' : 'false'
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="true">Sim</SelectItem>
                              <SelectItem value="false">Não</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full flex space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem className="md:w-2/3 w-full">
                          <FormLabel>Observações</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Adicione alguma observação ou detalhes do carro"
                              {...field}
                              value={cartData?.comments}
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
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-3 flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
          <Button
            className="bg-blue-600 text-white font-medium text-base w-full hover:bg-blue-700"
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
