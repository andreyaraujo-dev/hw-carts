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
import { useToast } from '@/components/ui/use-toast'
import { useDeleteCart } from '@/services/react-query/hooks/useCarts'
import { AxiosError } from 'axios'
import { useQueryClient } from 'react-query'

interface DropdownMenuItemDeleteProps {
  cartId: string
  open: boolean
  onClose: () => void
}

export function DropdownMenuItemDelete({
  cartId,
  open,
  onClose
}: DropdownMenuItemDeleteProps) {
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
      await queryClient.invalidateQueries(['favoritesCarts', 'getCartById'])
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Ops! Algo deu errado.',
          description: error.message,
          variant: 'destructive'
        })
      }
    } finally {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-4/5 md:w-full">
        <DialogHeader>
          <DialogTitle>Você tem certeza disso?</DialogTitle>
          <DialogDescription>
            Esta operação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex md:flex-row flex-col space-y-3 md:space-y-0">
          <Button onClick={() => onClose()}>Cancelar</Button>
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
