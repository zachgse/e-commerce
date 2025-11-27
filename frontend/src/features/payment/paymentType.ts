export type PaymentStatus = "pending" | "success" | "failed"

export type Payment = {
    orderAmount : Number;
    shippingAmount : Number;
    status: PaymentStatus
}

export type PaymentSession = {
    referenceNumber: string;
    status: PaymentStatus;
    is_payment_session_expired: boolean;
}
