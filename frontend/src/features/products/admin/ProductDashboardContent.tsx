import React from "react"
import { toast } from "react-toastify"
import { useDebounce } from "use-debounce"
import { useQueryClient } from "@tanstack/react-query"
import type { ColumnFiltersState,SortingState, } from "@tanstack/react-table"
import { queryFetchAdminProducts, useFetchAdminProducts,useUpdateAdminProductStatus } from "@/features/products/productQueries"
import { getProductColumns } from "./ProductColumns"
import DataTable from "@/components/reusable/DataTable"
import Modal from "@/components/reusable/Modal"
import ProductEditForm from "./ProductEditForm"
import Confirmation from "@/components/reusable/Confirmation"

export type ProductAdminModalState = {
  slug?: string
  type: "create" | "edit" | "update_status"
}

const ProductDashboardContent = () =>  {
  const queryClient = useQueryClient();
  const [globalFilter,setGlobalFilter] = React.useState<string>(""); //global search
  const [debouncedFilter] = useDebounce(globalFilter,500); //debounced search
  const [sorting,setSorting] = React.useState<SortingState>([]); //sort per column
  const [columnFilters,setColumnFilters] = React.useState<ColumnFiltersState>([]); //dropdown filters
  const [pagination,setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 1
  });
  const [modalProperties,setModalProperties] = React.useState<ProductAdminModalState|undefined>();
  const params = {
    "page":pagination.pageIndex+1,
    "keyword":debouncedFilter,
    "sortBy":sorting[0]?.id,
    "sortOrder":sorting[0]?.desc,
    "filterBy":columnFilters[0]?.id,
    "filterValue":columnFilters[0]?.value
  }
  const { data,isLoading,isError,isFetching } = useFetchAdminProducts(params);
  const updateProductStatus = useUpdateAdminProductStatus();
  
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

  const columns = getProductColumns(
    slug => { //edit info 
      setModalProperties({
        type:"edit",
        slug
      })
    },
    slug => { //update status
      setModalProperties({
        type:"update_status",
        slug
      })
    }
  )

  const handleUpdateStatus = async (slug:string) => {
    try {
      await updateProductStatus.mutateAsync({slug});
      await queryClient.invalidateQueries({
        queryKey: ["admin/products",
                  pagination.pageIndex+1,
                  debouncedFilter,
                  sorting[0]?.id,
                  sorting[0]?.desc,
                  columnFilters[0]?.id,
                  columnFilters[0]?.value
        ]
      });
      toast.success("Product status has been updated");
      setModalProperties(undefined);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error!</div>

  return (
    <>
      {modalProperties && (
        modalProperties.type == 'update_status' ? (
          <Confirmation isOpen={true} message="Update the status of this product?"
                        confirmButton="Update"
                        onConfirm={() => handleUpdateStatus(modalProperties.slug ?? "")}
                        onCancel={() => setModalProperties(undefined)}/>
        ) : (
          <Modal class="md:w-2/5 w-4/5 max-h-11/12"
            isOpen={true}  
            onCancel={() => setModalProperties(undefined)}>
            {modalProperties.type == 'edit' ? (
              <ProductEditForm slug={modalProperties.slug ?? ""} searchParams={params} 
                    setModalProperties={setModalProperties}/>
            ) : <div>Create here</div>}
          </Modal>
        )
      )}
      <DataTable isFetching={isFetching}
                  columns={columns} 
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

export default ProductDashboardContent;