import { Cart } from '@/@types/carts'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Link from 'next/link'

interface DropdownMenuItemDetailsProps {
  cart: Cart
}

export function DropdownMenuItemDetails({
  cart
}: DropdownMenuItemDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger className="px-2 py-1.5 text-sm text-start cursor-pointer w-full select-none rounded-sm hover:bg-accent hover:text-accent-foreground">
        Detalhes
      </DialogTrigger>
      <DialogContent className="w-4/5 md:w-full">
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
        <DialogFooter className="flex items-end w-full">
          <Link
            href={`/dashboard/collection/update/${cart._id}`}
            className="w-max"
          >
            <Button>Editar</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
