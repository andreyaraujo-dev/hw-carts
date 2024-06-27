import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CircularLoader } from '@/components/CircularLoader'

interface AlertdialogProps {
  title: string
  description: string
  onCancel: () => void
  onConfirm: () => void
  open: boolean
  isLoading?: boolean
}

export function DialogCustom({
  title,
  description,
  onCancel,
  onConfirm,
  open,
  isLoading = false
}: AlertdialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-3/4 rounded-md">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col space-y-2 md:space-y-0">
          <Button onClick={onCancel}>Cancelar</Button>
          <Button variant="secondary" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? <CircularLoader /> : 'Confirmar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
