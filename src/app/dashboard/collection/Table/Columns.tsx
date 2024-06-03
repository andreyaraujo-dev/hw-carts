import { Cart } from '@/@types/carts'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Star } from 'lucide-react'

export const columns: ColumnDef<Cart>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="w-[1.125rem] h-[1.125rem] rounded-[0.25rem]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="w-[1.125rem] h-[1.125rem] rounded-[0.25rem]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'model',
    header: 'Modelo'
  },
  {
    accessorKey: 'year',
    header: 'Ano'
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Data de compra',
    cell: ({ row }) => {
      if (row.original.purchaseDate) {
        return new Date(row.original.purchaseDate).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      }

      return 'Não informado'
    }
  },
  {
    accessorKey: 'value',
    header: 'Valor',
    cell: ({ row }) =>
      Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }).format(row.original.value as unknown as number)
  },
  {
    accessorKey: 'isFavorite',
    header: 'Favorito',
    cell: ({ row }) => {
      row.original.isFavorite && <Star size={12} className="text-yellow-500" />
    }
  },
  {
    accessorKey: 'actions',
    header: 'Ações'
  }
]
