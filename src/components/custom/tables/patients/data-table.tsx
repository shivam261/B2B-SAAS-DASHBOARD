"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ColumnDef,
    ColumnFiltersState,
    SortingState,
  flexRender,
  getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
      getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
      const [sorting, setSorting] = React.useState<SortingState>([])
        const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
     getPaginationRowModel: getPaginationRowModel(),
     onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
            columnFilters,
    },  
  })

  return (
    <div>
       <div className="flex flex-col md:flex-row items-center gap-4 py-4 px-2">
  {/* Filter by Name */}
  

  {/* Filter by Age */}
<div className="w-full md:w-32">
  <Input
    type="number"
    placeholder="Age..."
    // Keep the value as a string for the input field's UI
    value={(table.getColumn("age")?.getFilterValue() as string) ?? ""}
    onChange={(event) => {
      const val = event.target.value;
      
      // Step 1: Check if input is empty
      if (val === "") {
        table.getColumn("age")?.setFilterValue(undefined);
        return;
      }

      // Step 2: Convert to Number so it matches your 'Patient' type
      // This is the part that makes 'equals' work!
      table.getColumn("age")?.setFilterValue(Number(val));
    }}
    className="border-slate-200 focus-visible:ring-blue-500"
  />
</div>
  {/* Filter by Last Visit */}
  <div className="w-full md:w-48">
    <Input
      placeholder="Last visit (e.g. 2024)..."
      value={(table.getColumn("lastVisit")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("lastVisit")?.setFilterValue(event.target.value)
      }
      className="border-slate-200 focus-visible:ring-blue-500"
    />
  </div>
  
  {/* Optional: Clear Filters Button */}
  <Button 
    variant="ghost" 
    onClick={() => table.resetColumnFilters()}
    className="text-slate-500 text-xs font-semibold cursor-pointer hover:text-red-600"
  >
    Reset Filters
  </Button>
</div>
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
 <div className="flex items-center justify-between px-2 py-4">
  {/* Left Side: Page Counter */}
  <div className="text-sm text-slate-500 font-medium">
    Page {table.getState().pagination.pageIndex + 1} of{" "}
    {table.getPageCount()}
  </div>

{/* Right Side: Enhanced Buttons */}
<div className="flex items-center space-x-2">
  <Button
    variant="outline"
    size="sm"
    // cursor-pointer for active, cursor-not-allowed for disabled
    className="h-8 w-8 p-0 lg:flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous Page</span>
  </Button>
  
  {/* Display current page number */}
  <div className="flex w-8 items-center justify-center text-sm font-bold text-slate-900 border rounded-md h-8 bg-slate-50">
     {table.getState().pagination.pageIndex + 1}
  </div>

  <Button
    variant="outline"
    size="sm"
    // cursor-pointer for active, cursor-not-allowed for disabled
    className="h-8 w-8 p-0 lg:flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next Page</span>
  </Button>
</div>
</div>  
    </div>
  )
}