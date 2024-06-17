import { CircularLoader } from '@/components/CircularLoader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useDeleteCart } from '@/services/react-query/hooks/useCarts'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

interface DropdownMenuItemDeleteProps {
  cartId: string
}

export function DropdownMenuItemDelete({
  cartId
}: DropdownMenuItemDeleteProps) {
  const { mutateAsync: removeCart, isLoading, isError, error } = useDeleteCart()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  async function handleDelete() {
    try {
      await removeCart(cartId)

      if (isError) {
        console.log('🚀 ~ error:', error)
        toast({
          title: 'Ops...',
          description: 'Ocorreu um erro na operação, tente novamente!',
          variant: 'destructive'
        })
      }

      toast({
        description: 'Registro deletado com sucesso!',
        duration: 2000
      })
      await queryClient.refetchQueries(['carts'])
      queryClient.invalidateQueries(['favoritesCarts', 'getCartById'])
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Ops! Algo deu errado.',
          description: error.message,
          variant: 'destructive'
        })
      }
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="px-2 py-1.5 text-sm text-red-600 focus:bg-red-500 focus:text-foreground w-full rounded-md text-start">
        Deletar
      </DialogTrigger>
      <DialogContent className="w-4/5 md:w-full">
        <DialogHeader>
          <DialogTitle>Você tem certeza disso?</DialogTitle>
          <DialogDescription>
            Esta operação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex md:flex-row flex-col space-y-3 md:space-y-0">
          <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button
            variant="secondary"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <CircularLoader /> : 'Confirmar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
