import { apiAuth } from "@/api/axiosClient"
import type { ChartType, OrderAdmin, OrderDetailsAdmin, PaymentAdmin, PaymentDetailsAdmin, SearchParams } from "@/types/adminTypes"
import type { PaginatedResponse } from "@/types/generalTypes";

export const fetchOrders = async(params:SearchParams):Promise<PaginatedResponse<OrderAdmin>> => {
    const response = await apiAuth.get('/admin/orders',{params});
    return response.data;
}

export const fetchOrderDetails = async(referenceNumber:string):Promise<OrderDetailsAdmin> => {
    const response = await apiAuth.get(`/admin/orders/${referenceNumber}`);
    return response.data.data;
}

export const updateOrder = async(referenceNumber:string) => {
    const response = await apiAuth.put(`/admin/orders/${referenceNumber}`);
    return response.data.data;
}

export const fetchPayments = async(params:SearchParams):Promise<PaginatedResponse<PaymentAdmin>> => {
    const response = await apiAuth.get('/admin/payments',{params});
    return response.data;
}

export const fetchPaymentDetails = async(referenceNumber:string):Promise<PaymentDetailsAdmin> => {
    const response = await apiAuth.get(`/admin/payments/${referenceNumber}`);
    return response.data.data;
}

export const fetchChartOrders = async(year?:number):Promise<ChartType> => {
    const response = await apiAuth.get(`/admin/chart/orders?year=${year}`);
    return response.data.data;
}

export const fetchChartUsers = async(year?:number):Promise<ChartType> => {
    const response = await apiAuth.get(`/admin/chart/users?year=${year ?? 0}`);
    return response.data.data;
}