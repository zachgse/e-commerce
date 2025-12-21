import { useQuery } from "@tanstack/react-query"
import { fetchPaymentSession } from "../api/paymentApi"
import type { PaymentSession } from "@/types/paymentType"
import type { ApiErrorType } from "@/types/apiErrorType"

export const useFetchPaymentSession = (referenceNumber:string) => {
    return useQuery<PaymentSession,ApiErrorType>({
        queryKey: ["paymentSession",referenceNumber],
        queryFn: () => fetchPaymentSession(referenceNumber),
        retry: false
    });
}