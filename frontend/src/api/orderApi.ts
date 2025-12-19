import { axiosClient,apiAuth } from "./axiosClient"
import type { Order,OrderAdmin,OrderDetail } from "../types/orderType"

export const fetchListUserOrder = async(token:string):Promise<Order[]> => {
    const response = await axiosClient.get('user/order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data;
}

export const fetchSingleUserOrder = async(token:string,referenceNumber:string):Promise<OrderDetail> => {
    const response = await axiosClient.get(`user/order/${referenceNumber}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data;
}

export const updateOrderStatus = async(referenceNumber:string):Promise<OrderDetail> => {
    const response = await apiAuth.put(`user/order/${referenceNumber}`);
    return response.data.data;
}
