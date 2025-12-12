import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchChartOrders, fetchOrderDetails, fetchOrders, fetchPaymentDetails, fetchPayments, updateOrder } from "../api/adminApi"
import type { OrderAdmin, PaymentAdmin, SearchParams } from "@/types/adminTypes"
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

// payment module
export const queryFetchPayments = (params:SearchParams) => ({
    queryKey: ["admin/payments",
                params.page,
                params.keyword,
                params.sortBy,
                params.sortOrder,
                params.filterBy,
                params.filterValue],
    queryFn: () => fetchPayments(params),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    select: (payment:PaginatedResponse<PaymentAdmin>) => {
        const list = payment.data;
        const totalItems = payment.meta.total;

        return {list,totalItems}
    }
})

export const useQueryFetchPayments = (params:SearchParams) => {
    return useQuery(queryFetchPayments(params));
}

export const useFetchPaymentDetails = (referenceNumber:string) => {
    return useQuery({
        queryKey: ["admin/payments",referenceNumber],
        queryFn: () => fetchPaymentDetails(referenceNumber)
    });
}

// chart module
export const queryFetchChartOrders = (year?:number) => ({
    queryKey: ['admin/chart/orders',year],
    queryFn: () => fetchChartOrders(year),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5
});

export const useFetchChartOrders = (year?:number) => {
    return useQuery(queryFetchChartOrders(year));
}