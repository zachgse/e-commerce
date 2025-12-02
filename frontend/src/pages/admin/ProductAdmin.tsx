import React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { type ColumnFiltersState, type SortingState, type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp,ArrowDown, MoreHorizontal } from "lucide-react"
import type { ProductAdmin } from "@/features/products/productType"
import { queryFetchAdminProducts, useFetchAdminProducts } from "@/features/products/productQueries"
import DataTable from "@/components/reusable/DataTable"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDebounce } from "use-debounce"
import { money_format } from "@/helpers/helper"

const columnsNew: ColumnDef<ProductAdmin>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="capitalize">{column.id}</div>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableGlobalFilter:true
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <div className="capitalize">{column.id}</div>
      )
    },
    cell: ({ row }) => <div>{row.getValue("slug")}</div>,
    enableGlobalFilter:true
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="text-left capitalize"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {column.id}
          {!column.getIsSorted() ? <ArrowUpDown /> : (
            column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
          )}
        </Button>
      )
    },
    cell: ({ row }) => <div>{money_format(row.getValue("price"))}</div>,
    enableGlobalFilter:false
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          className="text-left capitalize"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {column.id}
          {!column.getIsSorted() ? <ArrowUpDown /> : (
            column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
          )}
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("stock")}</div>,
    enableGlobalFilter:false
  },
  {
    accessorKey: "total_sold",
    header: ({ column }) => {
      return (
        <Button
          className="text-left capitalize"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {column.id.replace("_"," ")}
          {!column.getIsSorted() ? <ArrowUpDown /> : (
            column.getIsSorted() === "asc" ? <ArrowUp/> : <ArrowDown/>
          )}
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("total_sold")}</div>,
    enableGlobalFilter:false
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="capitalize">{column.id}</div>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    enableGlobalFilter:false
  },
  { 
    id: "actions",
    header: ({ column }) => {
      return (
        <div className="capitalize">{column.id}</div>
      )
    },
    cell: ({ row }) => {
      const product = row.original.data
      console.log("product:",product);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const ProductAdmin = () =>  {
  const queryClient = useQueryClient();
  const [globalFilter,setGlobalFilter] = React.useState<string>(""); //global search
  const [debouncedFilter] = useDebounce(globalFilter,500); //debounced search
  const [sorting,setSorting] = React.useState<SortingState>([]); //sort per column
  const [columnFilters,setColumnFilters] = React.useState<ColumnFiltersState>([]); //dropdown filters
  const [pagination,setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 1
  })

  const { data,isLoading,isError,isFetching } = useFetchAdminProducts({
                                      "page":pagination.pageIndex+1,
                                      "keyword":debouncedFilter,
                                      "sortBy":sorting[0]?.id,
                                      "sortOrder":sorting[0]?.desc,
                                      "filterBy":columnFilters[0]?.id,
                                      "filterValue":columnFilters[0]?.value
                                    });

  React.useEffect(() => {
    const nextPage = pagination.pageIndex + 2;
    queryClient.prefetchQuery(queryFetchAdminProducts({
                                "page":nextPage,
                                "keyword":debouncedFilter,
                                "sortBy":sorting[0]?.id,
                                "sortOrder":sorting[0]?.desc,
                                "filterBy":columnFilters[0]?.id,
                                "filterValue":columnFilters[0]?.value
                              }));
  },[pagination,debouncedFilter,sorting,columnFilters]);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error!</div>

  return (
    <>
        <DataTable 
          isFetching={isFetching}
          columns={columnsNew} 
          data={data.list} 
          totalItems={data.totalItems}
          keyword={globalFilter}
          placeholder={["Name","Slug"]}
          globalFilter={debouncedFilter} 
          onGlobalFilterChange={setGlobalFilter}
          pagination={pagination} 
          onPaginationChange={setPagination}
          sorting={sorting} 
          onSortingChange={setSorting}
          columnFilters={columnFilters} 
          onColumnFiltersChange={setColumnFilters}
          filters={
            [
              {columnName:"status",values:["active","inactive"]}
            ]
          }/>
    </>

  )
}

export default ProductAdmin;