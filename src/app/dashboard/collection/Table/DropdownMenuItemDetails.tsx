import { Cart } from '@/@types/carts'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

interface DropdownMenuItemDetailsProps {
  cart: Cart
}

export function DropdownMenuItemDetails({
  cart
}: DropdownMenuItemDetailsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <DropdownMenuItem
        onClick={() => setIsOpen(true)}
        onSelect={(e) => e.preventDefault()}
      >
        Detalhes
      </DropdownMenuItem>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 text-zinc-400">
            <span>
              <b>Modelo</b>: {cart.model}
            </span>
            <span>
              <b>Ano</b>: {cart.year}
            </span>
            <span>
              <b>Valor</b>:{' '}
              {Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL'
              }).format(cart.value as unknown as number)}
            </span>
            <span>
              <b>Data de compra</b>:{' '}
              {cart.purchaseDate
                ? new Date(cart.purchaseDate).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })
                : 'Não informado.'}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
