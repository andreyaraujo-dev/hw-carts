import { useToast } from '@/shared/components/ui/use-toast'
import { useDeleteCart } from '@/shared/services/react-query/hooks/useCarts'
import { AxiosError } from 'axios'
import { useQueryClient } from 'react-query'
import { DialogCustom } from '@/shared/components/DialogCustom'

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
    <DialogCustom
      title="Você tem certeza disso?"
      description="Esta operação não pode ser desfeita."
      onCancel={onClose}
      onConfirm={handleDelete}
      open={open}
      isLoading={isLoading}
    />
  )
}
