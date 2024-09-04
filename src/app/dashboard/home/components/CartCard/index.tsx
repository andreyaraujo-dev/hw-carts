import { Card, CardContent } from '@/components/ui/card'
import { ImageOff, Star } from 'lucide-react'
import { DialogDetailsCart } from '@/components/DialogDetailsCart'
import { useState } from 'react'
import { Cart } from '@/@types'

interface CartCardProps {
  cart: Cart
}

export function CartCard({ cart }: CartCardProps) {
  const [openDialogDetails, setOpenDialogDetails] = useState<boolean>(false)

  function handleCloseDialogDetails() {
    setOpenDialogDetails(false)
  }

  return (
    <>
      <Card
        className="w-60 h-72 p-2 hover:cursor-pointer hover:bg-zinc-900 transition-all"
        onClick={() => setOpenDialogDetails(true)}
      >
        <CardContent className="flex flex-col justify-between p-0 w-full h-full">
          {cart.imageUrl ? (
            <div
              className="w-full h-3/5 bg-no-repeat bg-contain bg-center rounded-l-md"
              style={{
                backgroundImage: `url("${cart.imageUrl}")`
              }}
            />
          ) : (
            <section className="flex items-center justify-center w-full h-2/5">
              <ImageOff size={90} className="text-zinc-500" />
            </section>
          )}

          <section className="flex flex-col justify-start p-2">
            {cart.isFavorite && (
              <div className="w-full flex justify-end">
                <Star size={12} className="text-yellow-500" />
              </div>
            )}
            <p className="text-sm">
              <strong>Modelo: </strong>
              <span className="text-gray-400 font-medium">{cart.model}</span>
            </p>
            <p className="text-sm">
              <strong>Ano: </strong>
              <span className="text-gray-400 font-medium">
                {cart.year || 'Não informado'}
              </span>
            </p>
            <p className="text-sm">
              <strong>Compra: </strong>
              <span className="text-gray-400 font-medium">
                {cart.purchaseDate
                  ? new Date(cart.purchaseDate).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                  : 'Não informado'}
              </span>
            </p>
          </section>
        </CardContent>
      </Card>

      <DialogDetailsCart
        cart={cart}
        open={openDialogDetails}
        onClose={handleCloseDialogDetails}
      />
    </>
  )
}
