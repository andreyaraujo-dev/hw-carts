import { Cart } from '@/@types/carts'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Star } from 'lucide-react'
import { DataTableColumnHeader } from './DataTableColumnHeader'
import { DropdownMenuItemDetails } from './DropdownMenuItemDetails'
import { DropdownMenuItemDelete } from './DropdownMenuItemDelete'
import { DropdownMenuItemCopy } from './DropdownMenuItemCopy'
import Link from 'next/link'

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo" />
    )
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ano" />
    ),
    cell: ({ row }) => {
      if (row.original.year) {
        return row.original.year
      }

      return <span className="text-muted-foreground italic">Não informado</span>
    },
    enableSorting: false
  },
  {
    accessorKey: 'purchaseDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de compra" />
    ),
    cell: ({ row }) => {
      if (row.original.purchaseDate) {
        return new Date(row.original.purchaseDate).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      }

      return <span className="text-muted-foreground italic">Não informado</span>
    }
  },
  {
    accessorKey: 'value',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => {
      if (row.original.value) {
        return Intl.NumberFormat('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }).format(row.original.value as unknown as number)
      }

      return <span className="text-muted-foreground italic">Não informado</span>
    },
    enableSorting: true
  },
  {
    accessorKey: 'isFavorite',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Favorito" />
    ),
    cell: ({ row }) => {
      if (row.original.isFavorite) {
        return <Star size={16} className="text-yellow-500 fill-yellow-500" />
      }

      return <Star size={16} className="text-yellow-500" />
    },
    enableSorting: false
  },
  {
    accessorKey: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItemCopy model={row.original.model} />
            <DropdownMenuSeparator />
            <DropdownMenuItemDetails cart={row.original} />
            <Link href={`/dashboard/collection/update/${row.original._id}`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link>
            <DropdownMenuItemDelete cartId={row.original._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false
  }
]

export const columnsMobile: ColumnDef<Cart>[] = [
  {
    accessorKey: 'model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo" />
    )
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ano" />
    ),
    cell: ({ row }) => {
      if (row.original.year) {
        return row.original.year
      }

      return <span className="text-muted-foreground italic">Não informado</span>
    },
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItemCopy model={row.original.model} />
              <DropdownMenuSeparator />
              <DropdownMenuItemDetails cart={row.original} />
              <Link href={`/dashboard/collection/update/${row.original._id}`}>
                <DropdownMenuItem>Editar</DropdownMenuItem>
              </Link>
              <DropdownMenuItemDelete cartId={row.original._id} />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false
  }
]
