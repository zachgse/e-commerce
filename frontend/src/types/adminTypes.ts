export type SearchParams = {
    page: number
    keyword: string | ""
    sortBy?: string
    sortOrder?: boolean
    filterBy?: string
    filterValue?: string | unknown
}

export type OrderAdmin = {
    reference_number: string
    customer: string
    order_amount: number
    status: string 
    order_placed_at: Date
}   

export type OrderDetailsAdmin = OrderAdmin & {
    address: string
    order_shipped_at?: Date
    order_received_at?: Date
}

export type PaymentAdmin = {
    reference_number: string
    status: string
    order_amount: number
    created_at: Date
    updated_at ?: Date
}

export type PaymentDetailsAdmin = PaymentAdmin & {
    payment_intent_id: string
    client_key_id: string
}