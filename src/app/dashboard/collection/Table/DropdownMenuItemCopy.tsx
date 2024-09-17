import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu'
import { useToast } from '@/shared/components/ui/use-toast'

interface DropdownMenuItemCopyProps {
  model: string
}

export function DropdownMenuItemCopy({ model }: DropdownMenuItemCopyProps) {
  const { toast } = useToast()
  return (
    <DropdownMenuItem
      onClick={() => {
        navigator.clipboard.writeText(model)
        toast({
          title: 'Modelo copiado',
          description: 'Nome do modelo copiado para área de transferência!',
          duration: 2000
        })
      }}
    >
      Copiar modelo
    </DropdownMenuItem>
  )
}
