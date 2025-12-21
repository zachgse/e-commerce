import { apiAuth } from "@/hooks/axiosClient"
import type { PaymentSession } from "@/types/paymentType"

export const fetchPaymentSession = async(referenceNumber:string) : Promise<PaymentSession> => {
    const response = await apiAuth.get(`payment/check-status/${referenceNumber}`); 
    //add auth header
    return response.data.data;
}