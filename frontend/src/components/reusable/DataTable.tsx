import React from 'react'
import type { ColumnDef,SortingState,ColumnFiltersState, PaginationState,OnChangeFn, GlobalFilterTableState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaDeleteLeft } from "react-icons/fa6"

interface DataTableProps<TData, TValue> {
    isFetching: boolean
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    totalItems: number
    keyword: string
    globalFilter: string; // ← simple string
    onGlobalFilterChange: React.Dispatch<React.SetStateAction<string>>
    sorting: SortingState
    onSortingChange: OnChangeFn<SortingState>
    columnFilters: ColumnFiltersState 
    onColumnFiltersChange: OnChangeFn<ColumnFiltersState>
    pagination: PaginationState
    onPaginationChange: OnChangeFn<PaginationState>
    filters?:{
        columnName:string
        values:string[]
    }[]
}

const DataTable = <TData,TValue>({
    isFetching,
    columns,data,totalItems,keyword,
    globalFilter,onGlobalFilterChange,
    sorting,onSortingChange,
    columnFilters,onColumnFiltersChange,
    pagination,onPaginationChange,
    filters}
    :DataTableProps<TData,TValue>) => {

    // const [sorting, setSorting] = React.useState<SortingState>([]) //sort arrow key
    // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>( //sort dropdown
    //     []
    // )
    // const [globalFilter,setGlobalFilter] = React.useState<string>("") //keyword search bar

    const table = useReactTable({
        data,
        columns,
        manualPagination:true,
        manualSorting: true,
        manualFiltering: true,
        pageCount: Math.ceil(totalItems / pagination.pageSize),
        onGlobalFilterChange,
        onSortingChange,
        onColumnFiltersChange,
        onPaginationChange,
        getCoreRowModel:getCoreRowModel(),
        // getSortedRowModel: getSortedRowModel(),
        // getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter,
            columnFilters,
            pagination
        },
    })

    const clearFilter = () => {
        onGlobalFilterChange("");
        onColumnFiltersChange([]);
        onSortingChange([]);
    }

    if (isFetching) return <div>Fetching..</div>

    return (
        <>
            <div className="flex items-center gap-2 py-4">
                <Input placeholder="Email"
                    value={keyword}
                    onChange={(e) => onGlobalFilterChange(e.target.value)}
                    className="max-w-sm"
                />
                {filters?.map((filter,index) => (
                    <Select key={index} 
                        value={(table.getColumn(filter.columnName)?.getFilterValue() as string) ?? ""} 
                        onValueChange={(e) => table.getColumn(filter.columnName)?.setFilterValue(e)}>
                        <SelectTrigger className="w-[180px] capitalize">
                            <SelectValue placeholder={filter.columnName} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className='capitalize'>{filter.columnName}</SelectLabel>
                                {filter.values.map((filterValue,index) => (
                                    <SelectItem key={index} 
                                        className='capitalize'
                                        value={filterValue}>
                                        {filterValue}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                ))}
                <div onClick={clearFilter} 
                    className='bg-red-500 text-white rounded-md flex items-center gap-2 min-w-32 w-auto h-9 px-2 cursor-pointer hover:opacity-90'>
                    Clear filters
                    <span className='ml-auto'>
                        <FaDeleteLeft className='w-4 h-4'/>
                    </span>
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table className='text-center'>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead className='text-center' 
                                key={header.id}>
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                    {/* <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                    >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        {pageSize}
                        </option>
                    ))}
                    </select> */}
                    {/* can loop to get the page number */}
                    {/* {table.getPageCount()} */}  
                    {/* 
                        1. condition check if page count > 10 
                            > if <= 10  array from length: getPageCount
                            > else 
                    */}
                </div>
            </div>
        </>
    )
}

export default DataTable