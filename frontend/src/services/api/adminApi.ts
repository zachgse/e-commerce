import { apiAuth } from "@/hooks/axiosClient"
import type { ChartType, DashboardStats, OrderAdmin, OrderDetailsAdmin, PaymentAdmin, PaymentDetailsAdmin, ProductStats, SearchParams, TransactionStats } from "@/types/adminTypes"
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

export const fetchChart = async(module:string,year?:number):Promise<ChartType> => {
    const response = await apiAuth.get(`/admin/chart?module=${module}&year=${year}`);
    return response.data.data;
}

export const fetchDashboardStats = async():Promise<DashboardStats> => {
    const response = await apiAuth.get('/admin');
    return response.data.data;
}

export const fetchProductStats = async(filterBy:string,filterOrder?:string):Promise<ProductStats> => {
    const response = await apiAuth.get(`/admin/products/stats?filterBy=${filterBy}&filterOrder=${filterOrder ?? "DESC"}`);
    return response.data.data;
} 

export const fetchTransactionStats = async():Promise<TransactionStats> => {
    const response = await apiAuth.get('/admin/payments/stats');
    return response.data.data;
}