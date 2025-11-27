export type Order = {
    reference_number: string
    items: {
        slug: string
        name: string
        image?: string
        quantity: number
        subtotal: number      
        price: number
        can_rate: boolean
    }[]
    shipping_status: string
}

export type OrderDetail = Order & {
    total_amount: number
    order_amount: number
    shipping_amount: number
    payment_status: string
    order_placed_at: Date
    order_shipped_at?: Date
    order_received_at?: Date
}


