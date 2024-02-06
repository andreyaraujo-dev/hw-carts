'use client'

import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function AddCart() {
  const router = useRouter()

  return (
    <Container>
      <h1 className="font-bold text-3xl mb-3">Adicionar Carrinho</h1>

      <Card className="w-full">
        <CardContent className="p-3 flex flex-col space-y-4">
          <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
            <Input type="text" placeholder="Modelo" />
            <Input type="tel" placeholder="Ano" />
          </div>
          <div className="w-full flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
            <Input type="date" placeholder="Data da compra" />
            <Input type="file" placeholder="Imagem" />
          </div>
          <div className="w-full flex space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Checkbox id="isFavorite" />
              <label
                htmlFor="isFavorite"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Adicionar aos favoritos
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-3 flex space-x-0 md:space-x-3 flex-col md:flex-row space-y-3 md:space-y-0">
          <Button className="bg-blue-600 text-white font-medium text-base w-full">
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
