import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchOrderDetails, fetchOrders, updateOrder } from "../api/adminApi"
import type { OrderAdmin, SearchParams } from "@/types/adminTypes"
import type { PaginatedResponse } from "@/types/generalTypes"

// order module
export const queryFetchOrders = (params:SearchParams) => ({
    queryKey: ["admin/orders",
                params.page,
                params.keyword,
                params.sortBy,
                params.sortOrder,
                params.filterBy,
                params.filterValue],
    queryFn: () => fetchOrders(params),
    keepPreviousData:true,
    staleTime: 1000 * 60 * 5,
    select: (order:PaginatedResponse<OrderAdmin>) => {
        const list = order.data
        const totalItems = order.meta.total
        return {
            list,totalItems
        }
    }
})

export const useFetchOrders = (params:SearchParams) => {
    return useQuery(queryFetchOrders(params));
}

export const useFetchOrderDetails = (referenceNumber:string) => {
    return useQuery({
        queryKey: ['admin/orders',referenceNumber],
        queryFn: () => fetchOrderDetails(referenceNumber)
    })
}

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({referenceNumber}:{referenceNumber:string}) => updateOrder(referenceNumber),
        onSuccess: (_,variables) => {
            queryClient.invalidateQueries({queryKey:['admin/orders',variables.referenceNumber]});
        }
    });
}