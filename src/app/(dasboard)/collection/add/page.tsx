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
import moment from 'moment-timezone'

export default function AddCart() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CartDataForm>({
    resolver: zodResolver(cartDataFormSchema)
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
          <form
            onSubmit={handleSubmit(handleRegisterCart)}
            id="form-register-cart"
          >
            <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
              <Input
                type="text"
                placeholder="Modelo"
                variant={errors.model ? 'error' : 'default'}
                {...register('model')}
              />
              <Input
                type="tel"
                placeholder="Ano"
                variant={errors.year ? 'error' : 'default'}
                {...register('year', {
                  setValueAs: (v) => {
                    if (!v) return undefined
                    return Number(v)
                  }
                })}
              />

              <Input
                type="tel"
                placeholder="Valor"
                variant={errors.value ? 'error' : 'default'}
                {...register('value', {
                  setValueAs: (v) => {
                    if (!v) return undefined
                    return Number(v)
                  }
                })}
              />
            </div>
            <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
              <Input
                type="date"
                placeholder="Data da compra"
                variant={errors.purchaseDate ? 'error' : 'default'}
                {...register('purchaseDate', {
                  setValueAs: (v) => {
                    if (!v) return undefined
                    return moment(v).toLocaleString()
                  }
                })}
              />

              <Input type="file" placeholder="Imagem" />
            </div>
            <div className="w-full flex space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFavorite"
                  {...register('isFavorite', {
                    setValueAs: (v) => {
                      if (!v) return false
                      return true
                    }
                  })}
                  className="rounded-md h-4 w-4 hover:cursor-pointer"
                />
                <label
                  htmlFor="isFavorite"
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
                >
                  Adicionar aos favoritos
                </label>
              </div>
            </div>
          </form>
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
