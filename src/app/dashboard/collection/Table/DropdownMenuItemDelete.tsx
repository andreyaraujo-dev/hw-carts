import { CircularLoader } from '@/components/CircularLoader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
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
  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: removeCart, isLoading, isError, error } = useDeleteCart()
  const { toast } = useToast()
  const queryClient = useQueryClient()

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
    <>
      <DropdownMenuItem
        className="text-red-600 focus:bg-red-500"
        onClick={() => setIsOpen(!isOpen)}
        onSelect={(e) => e.preventDefault()}
      >
        Deletar
      </DropdownMenuItem>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza disso?</DialogTitle>
            <DialogDescription>
              Esta operação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
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
    </>
  )
}
