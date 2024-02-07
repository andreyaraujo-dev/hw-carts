'use client'

import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CartDataForm, cartDataFormSchema } from '../schemas/addCart'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'

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

  function handleRegisterCart(data) {
    console.log({ userEmail: session?.user?.email, ...data })
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
                errorMessage={errors.model && errors.model.message}
                {...register('model')}
              />
              <Input
                type="tel"
                placeholder="Ano"
                errorMessage={errors.year && errors.year.message}
                {...register('year')}
              />
            </div>
            <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
              <Input
                type="date"
                placeholder="Data da compra"
                errorMessage={
                  errors.purchaseDate && errors.purchaseDate.message
                }
                {...register('purchaseDate')}
              />
              <Input
                type="file"
                placeholder="Imagem"
                errorMessage={errors.image && errors.image.message}
                {...register('image')}
              />
            </div>
            <div className="w-full flex space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
              <div className="flex items-center space-x-2">
                <Checkbox id="isFavorite" {...register('isFavorite')} />
                <label
                  htmlFor="isFavorite"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
          >
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
