import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Cart } from '@/@types/carts'
import { DataTablePagination } from './DataTablePagination'
import { DataTableViewOptions } from './DataTableViewOptions'
import { Card, CardContent } from '@/components/ui/card'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends Cart, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [isOpenModalDeleteMany, setIsOpenModalDeleteMany] = useState(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  })

  function handleDeleteSelected() {
    const selectedRows = table.getSelectedRowModel().rows
    console.log(selectedRows)
    setIsOpenModalDeleteMany(true)
  }

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="mb-3 border rounded-md px-3"
      >
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="text-foreground">
            Opções da tabela
          </AccordionTrigger>
          <AccordionContent className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
            <DataTableViewOptions table={table} />

            <Button
              className="bg-red-500 text-foreground flex items-center justify-center space-x-2 hover:bg-red-600"
              disabled={table.getSelectedRowModel().rows.length <= 1}
              onClick={handleDeleteSelected}
            >
              <Trash2 size={16} />
              <span>Excluir em lote</span>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={`${header.id === 'model' && 'w-max'}`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} className="rounded-b-md">
                  <DataTablePagination table={table} />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={isOpenModalDeleteMany}
        onOpenChange={() => setIsOpenModalDeleteMany(!isOpenModalDeleteMany)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza disso?</DialogTitle>
            <DialogDescription>
              Esta operação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsOpenModalDeleteMany(false)}>
              Cancelar
            </Button>
            <Button variant="secondary">Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
