import { useQuery,useMutation } from "@tanstack/react-query"
import { fetchListUserOrder,fetchSingleUserOrder,updateOrderStatus } from "../../api/orderApi"

export const useFetchListUserOrder = (token:string) => {
    return useQuery({
        queryKey: ["orders",token],
        queryFn: () => fetchListUserOrder(token)
    });
}

export const useFetchSingleUserOrder = (token:string,referenceNumber:string) => {
    return useQuery({
        queryKey: ["order",referenceNumber],
        queryFn: () => fetchSingleUserOrder(token,referenceNumber)
    });
}

export const useUpdateOrderStatus = () => {
    return useMutation({
        mutationFn: updateOrderStatus
    });
}