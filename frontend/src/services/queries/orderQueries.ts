import { useQuery,useMutation } from "@tanstack/react-query"
import { fetchListUserOrder,fetchSingleUserOrder,updateOrderStatus } from "../api/orderApi"

export const useFetchListUserOrder = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => fetchListUserOrder()
    });
}

export const useFetchSingleUserOrder = (referenceNumber:string) => {
    return useQuery({
        queryKey: ["order",referenceNumber],
        queryFn: () => fetchSingleUserOrder(referenceNumber)
    });
}

export const useUpdateOrderStatus = () => {
    return useMutation({
        mutationFn: updateOrderStatus
    });
}