'use client'

import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CartDataForm, cartDataFormSchema } from '../schemas/addCart'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useAddCart } from '@/services/react-query/hooks/useCarts'
import { AddCartInput } from '@/@types/addCartInput'
import { Spinner } from '@/components/Loading/Spinner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Checkbox } from '@/components/ui/checkbox'

const defaultValues = {
  model: '',
  year: undefined,
  value: undefined,
  purchaseDate: undefined,
  imageUrl: undefined,
  isFavorite: false
}

export default function AddCart() {
  const router = useRouter()
  const form = useForm<CartDataForm>({
    resolver: zodResolver(cartDataFormSchema),
    defaultValues,
    mode: 'onChange'
  })
  const { data: session } = useSession()
  const { mutateAsync: addCart, isLoading, error } = useAddCart()

  const handleRegisterCart: SubmitHandler<CartDataForm> = async (data) => {
    const cart: AddCartInput = {
      userEmail: String(session?.user?.email),
      ...data
    }

    await addCart(cart)
    if (!error) router.push('/collection')
  }

  return (
    <Container>
      <h1 className="font-bold text-3xl mb-3">Adicionar Carrinho</h1>

      <Card className="w-full">
        <CardContent className="p-3 flex flex-col space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegisterCart)}
              id="form-register-cart"
            >
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
                          placeholder="Digite o modelo do carro"
                          variant={
                            form.formState.errors.model ? 'error' : 'default'
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
                          placeholder="Digite o ano do carro"
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
                          placeholder="Digite o valor de compra do carro"
                          variant={
                            form.formState.errors.value ? 'error' : 'default'
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
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
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
                        <PopoverContent className="w-auto p-0" align="start">
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
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-3 flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
          <Button
            className="bg-blue-600 text-white font-medium text-base w-full"
            form="form-register-cart"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Spinner className="h-5 w-5 border-2 mr-2" />}
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
