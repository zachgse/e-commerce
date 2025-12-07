import { useFetchOrderDetails } from '@/services/queries/adminQueries'

type OrderViewProps = {
    referenceNumber: string
}

const OrderView = (props:OrderViewProps) => {
    const { data,isLoading } = useFetchOrderDetails(props.referenceNumber);
    if (isLoading) return <div>Loading...</div> //refactor soon

    return (
        <div className="w-full flex justify-center">
            <div className="grid grid-cols-[200px_1fr] gap-y-4">
                <label className="font-bold" htmlFor="referenceNumber">Reference Number</label>
                <p id="referenceNumber">{props.referenceNumber}</p>

                <label className="font-bold" htmlFor="customer">Customer Name</label>
                <p id="customer">{data?.customer}</p>

                <label className="font-bold" htmlFor="details">Order Details</label>
                <p id="details">Lorem ipsum</p>

                <label className="font-bold" htmlFor="address">Address</label>
                <p id="address">{data?.address}</p>

                <label className="font-bold" htmlFor="amount">Amount</label>
                <p id="amount">{data?.order_amount}</p>

                <label className="font-bold" htmlFor="orderStatus">Order Status</label>
                <p id="orderStatus">{data?.order_status}</p>

                <label className="font-bold" htmlFor="paymentStatus">Payment Status</label>
                <p id="paymentStatus">{data?.payment_status}</p>

                <label className="font-bold" htmlFor="orderPlacedAt">Order placed at</label>
                <p id="orderPlacedAt">{data?.order_placed_at.toLocaleString()}</p>

                <label className="font-bold" htmlFor="orderShippedAt">Order shipped at</label>
                <p id="orderShippedAt">{data?.order_shipped_at?.toLocaleString()}</p>

                <label className="font-bold" htmlFor="orderDeliveredAt">Order delivered at</label>
                <p id="orderDeliveredAt">{data?.order_received_at?.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default OrderView