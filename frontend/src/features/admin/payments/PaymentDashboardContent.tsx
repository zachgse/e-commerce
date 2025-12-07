import React from 'react'
import { useDebounce } from 'use-debounce'
import { useQueryClient } from '@tanstack/react-query'
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table'
import { queryFetchPayments, useQueryFetchPayments } from '@/services/queries/adminQueries'
import { getPaymentColumns } from './PaymentColumns'
import DataTable from '@/components/reusable/DataTable'
import PaymentView from './PaymentView'
import Modal from '@/components/reusable/Modal'

const PaymentDashboardContent = () => {
    const queryClient = useQueryClient();
    const [globalFilter,setGlobalFilter] = React.useState<string>(""); //global search
    const [debouncedFilter] = useDebounce(globalFilter,500); //debounced search
    const [sorting,setSorting] = React.useState<SortingState>([]); //sort per column
    const [columnFilters,setColumnFilters] = React.useState<ColumnFiltersState>([]); //dropdown filters
    const [pagination,setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 1
    });
    const params = {
        "page":pagination.pageIndex+1,
        "keyword":debouncedFilter,
        "sortBy":sorting[0]?.id,
        "sortOrder":sorting[0]?.desc,
        "filterBy":columnFilters[0]?.id,
        "filterValue":columnFilters[0]?.value
    }
    const [referenceNumber,setReferenceNumber] = React.useState<string|null>()
    const { data,isFetching } = useQueryFetchPayments(params);

    const columns = getPaymentColumns(
        product => setReferenceNumber(product)
    );

    React.useEffect(() => {
        const nextPage = pagination.pageIndex + 2;
        queryClient.prefetchQuery(queryFetchPayments({
                                    "page":nextPage,
                                    "keyword":debouncedFilter,
                                    "sortBy":sorting[0]?.id,
                                    "sortOrder":sorting[0]?.desc,
                                    "filterBy":columnFilters[0]?.id,
                                    "filterValue":columnFilters[0]?.value
                                }));
    },[pagination,debouncedFilter,sorting,columnFilters]);

    return (
        <>
            {referenceNumber && (
                <Modal class="md:w-auto w-4/5 max-h-11/12"
                    isOpen={true}  
                    onCancel={() => setReferenceNumber(null)}>
                    <PaymentView referenceNumber={referenceNumber}/>
                </Modal>
            )}
            <DataTable isFetching={isFetching}
                        columns={columns} 
                        data={data?.list ?? []} 
                        totalItems={data?.totalItems ?? 0}
                        keyword={globalFilter}
                        placeholder={["Reference Number"]}
                        globalFilter={debouncedFilter} 
                        onGlobalFilterChange={setGlobalFilter}
                        pagination={pagination} 
                        onPaginationChange={setPagination}
                        sorting={sorting} 
                        onSortingChange={setSorting}
                        columnFilters={columnFilters} 
                        onColumnFiltersChange={setColumnFilters}
                        filters={[
                            {columnName:"status",values:["pending","success","failed"]}
                        ]}
            />
        </>
    )
}

export default PaymentDashboardContent