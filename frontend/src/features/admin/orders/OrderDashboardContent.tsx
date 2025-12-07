import React from 'react'
import { useDebounce } from 'use-debounce'
import { useQueryClient } from '@tanstack/react-query'
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table'
import { useFetchOrders,queryFetchOrders, useUpdateOrder } from '@/services/queries/adminQueries'
import { getOrderColumns } from './OrderColumns'
import DataTable from '@/components/reusable/DataTable'
import OrderView from './OrderView'
import Modal from '@/components/reusable/Modal'
import { toast } from 'react-toastify'
import Confirmation from '@/components/reusable/Confirmation'

type OrderProperties = {
    type: "view" | "update"
    referenceNumber: string
}

const OrderDashboardContent = () => {
    const queryClient = useQueryClient();
    const [globalFilter,setGlobalFilter] = React.useState<string>(""); //global search
    const [debouncedFilter] = useDebounce(globalFilter,500); //debounced search
    const [sorting,setSorting] = React.useState<SortingState>([]); //sort per column
    const [columnFilters,setColumnFilters] = React.useState<ColumnFiltersState>([]); //dropdown filters
    const [pagination,setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 1
    });
    const [modalProperties,setModalProperties] = React.useState<OrderProperties|undefined>();
    const params = {
        "page":pagination.pageIndex+1,
        "keyword":debouncedFilter,
        "sortBy":sorting[0]?.id,
        "sortOrder":sorting[0]?.desc,
        "filterBy":columnFilters[0]?.id,
        "filterValue":columnFilters[0]?.value
    }
    const { data,isFetching } = useFetchOrders(params);
    const updateOrderStatus = useUpdateOrder();

    React.useEffect(() => {
        const nextPage = pagination.pageIndex + 2;
        queryClient.prefetchQuery(queryFetchOrders({
                                    "page":nextPage,
                                    "keyword":debouncedFilter,
                                    "sortBy":sorting[0]?.id,
                                    "sortOrder":sorting[0]?.desc,
                                    "filterBy":columnFilters[0]?.id,
                                    "filterValue":columnFilters[0]?.value
                                }));
    },[pagination,debouncedFilter,sorting,columnFilters]);

    const columns = getOrderColumns(
        referenceNumber => {setModalProperties({type:"view",referenceNumber})},
        referenceNumber => {setModalProperties({type:"update",referenceNumber})},
    );

    const handleShipOrder = async(referenceNumber:string) => {
        try {
            await updateOrderStatus.mutateAsync({referenceNumber});
            await queryClient.invalidateQueries({
                queryKey: ["admin/orders",
                        pagination.pageIndex+1,
                        debouncedFilter,
                        sorting[0]?.id,
                        sorting[0]?.desc,
                        columnFilters[0]?.id,
                        columnFilters[0]?.value
                ]
            });
            toast.success("Order status has been updated!");
            setModalProperties(undefined);
        } catch(error){
            toast.error("Something went wrong!");
            console.log("error:",error);
        }     
    }

    return (
        <>
            {modalProperties && (
                modalProperties.type == "view" ? (
                    <Modal class="lg:w-1/3 w-4/5 max-h-11/12"
                        isOpen={true}  
                        onCancel={() => setModalProperties(undefined)}>
                        <OrderView referenceNumber={modalProperties.referenceNumber} />
                    </Modal>
                ) : (
                <Confirmation isOpen={true} confirmButton='Confirm' 
                    message='Cofirm shipment of the order?'
                    onConfirm={() => handleShipOrder(modalProperties.referenceNumber)}
                    onCancel={() => setModalProperties(undefined)}/>
                )
            )}  
            <DataTable isFetching={isFetching}
                        columns={columns} 
                        data={data?.list ?? []} 
                        totalItems={data?.totalItems ?? 0}
                        keyword={globalFilter}
                        placeholder={["Reference Number","Customer Name"]}
                        globalFilter={debouncedFilter} 
                        onGlobalFilterChange={setGlobalFilter}
                        pagination={pagination} 
                        onPaginationChange={setPagination}
                        sorting={sorting} 
                        onSortingChange={setSorting}
                        columnFilters={columnFilters} 
                        onColumnFiltersChange={setColumnFilters}
                        filters={[
                            {columnName:"order_status",values:["order placed","shipped","delivered"]},
                            {columnName:"payment_status",values:["pending","success","failed"]},
                        ]}
            />
        </>
    )
}

export default OrderDashboardContent