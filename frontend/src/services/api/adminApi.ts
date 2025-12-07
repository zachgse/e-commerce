import { apiAuth } from "@/api/axiosClient"
import type { OrderAdmin, OrderDetailsAdmin, SearchParams } from "@/types/adminTypes"
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