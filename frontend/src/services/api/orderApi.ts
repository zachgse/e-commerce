import { apiAuth } from "@/hooks/axiosClient"
import type { Order,OrderDetail } from "@/types/orderType"

export const fetchListUserOrder = async():Promise<Order[]> => {
    const response = await apiAuth.get('user/order')
    return response.data.data;
}

export const fetchSingleUserOrder = async(referenceNumber:string):Promise<OrderDetail> => {
    const response = await apiAuth.get(`user/order/${referenceNumber}`)
    return response.data.data;
}

export const updateOrderStatus = async(referenceNumber:string):Promise<OrderDetail> => {
    const response = await apiAuth.put(`user/order/${referenceNumber}`);
    return response.data.data;
}
