import { Spinner } from '../Loading/Spinner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog'

interface AlertdialogProps {
  title: string
  description: string
  onCancel: () => void
  onConfirm: () => void
  open: boolean
  isLoading?: boolean
}

export function Alertdialog({
  title,
  description,
  onCancel,
  onConfirm,
  open,
  isLoading = false
}: AlertdialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-base" onClick={onCancel}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="text-base" onClick={onConfirm}>
            {isLoading ? (
              <Spinner className="h-5 w-5 border-2 mr-2" />
            ) : (
              'Continuar'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
