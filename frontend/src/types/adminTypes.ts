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
    order_status: string
    payment_status: string 
    order_placed_at: Date
}   

export type OrderDetailsAdmin = OrderAdmin & {
    address: string
    order_shipped_at?: Date
    order_received_at?: Date
}