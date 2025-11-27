import { axiosClient } from "./axiosClient"
import type { PaymentSession } from "../features/payment/paymentType"

export const fetchPaymentSession = async(referenceNumber:string) : Promise<PaymentSession> => {
    const response = await axiosClient.get(`payment/check-status/${referenceNumber}`); 
    //add auth header
    return response.data.data;
}