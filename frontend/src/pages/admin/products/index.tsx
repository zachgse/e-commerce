import React from "react"
import { useDebounce } from "use-debounce"
import { useQueryClient } from "@tanstack/react-query"
import type { ColumnFiltersState,SortingState,ColumnDef } from "@tanstack/react-table"
import type { ProductAdmin } from "@/features/products/productType"
import { queryFetchAdminProducts, useFetchAdminProducts } from "@/features/products/productQueries"
import DataTable from "@/components/reusable/DataTable"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import Modal from "@/components/reusable/Modal"
import { ArrowUpDown, ArrowUp,ArrowDown, MoreHorizontal } from "lucide-react"
import { money_format } from "@/helpers/helper"
import Info from "./edit/info"
import Status from "./edit/status"

export type ProductAdminModalState = {
  type?: "create" | "info" | "status"
  message?: string
}

const index = () =>  {
  const queryClient = useQueryClient();
  const [globalFilter,setGlobalFilter] = React.useState<string>(""); //global search
  const [debouncedFilter] = useDebounce(globalFilter,500); //debounced search
  const [sorting,setSorting] = React.useState<SortingState>([]); //sort per column
  const [columnFilters,setColumnFilters] = React.useState<ColumnFiltersState>([]); //dropdown filters
  const [pagination,setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 1
  });
  const [modalProperties,setModalProperties] = React.useState<ProductAdminModalState>();
  const [productToEdit,setProductToEdit] = React.useState<string>("");
  const params = {
    "page":pagination.pageIndex+1,
    "keyword":debouncedFilter,
    "sortBy":sorting[0]?.id,
    "sortOrder":sorting[0]?.desc,
    "filterBy":columnFilters[0]?.id,
    "filterValue":columnFilters[0]?.value
  }
  const { data,isLoading,isError,isFetching } = useFetchAdminProducts(params);

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
      cell: ({ row }:any) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                                          setModalProperties({type:"info"});
                                          setProductToEdit(row.original.slug);
                                        }}>
                <p className="mx-auto cursor-pointer">
                  Edit
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                                          setModalProperties({
                                              type:"status",
                                              "message" : row.original.status});
                                          setProductToEdit(row.original.slug);
                                        }}>
                <p className="mx-auto cursor-pointer">
                  {row.original.status == "active" ? "Deactivate" : "Activate"}
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error!</div>

  return (
    <>
      {productToEdit && modalProperties && (
        <Modal class="md:w-2/5 w-4/5"
          isOpen={true}  
          onCancel={() => {
            setModalProperties(undefined);
            setProductToEdit("");
        }}>
          {modalProperties.type == "info" && (
            <Info slug={productToEdit} searchParams={params} 
                  setModalProperties={setModalProperties} setProductToEdit={setProductToEdit}/>
          )}
          {modalProperties.type == "status" && (
            <Status slug={productToEdit} searchParams={params} status={modalProperties.message}
                    setModalProperties={setModalProperties} setProductToEdit={setProductToEdit}/>
          )}
        </Modal>
      )}

      <DataTable isFetching={isFetching}
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
                  filters={[{columnName:"status",values:["active","inactive"]}]}
      />
    </>
  )
}

export default index;