import Loading from '@/components/Loading';
import { useFetchOrderDetails } from '@/services/queries/adminQueries'
import { statusBadgePills } from '@/utils/styleHelper';

type OrderViewProps = {
    referenceNumber: string
}

const OrderView = (props:OrderViewProps) => {
    const { data,isLoading } = useFetchOrderDetails(props.referenceNumber);
    if (isLoading) return <Loading/>

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Reference Number</label>
                <p className="flex-1 break-all">{props.referenceNumber}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Customer Name</label>
                <p className="flex-1 break-all">{data?.customer}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Order Details</label>
                <p className="flex-1 break-all">Lorem ipsum</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Amount</label>
                <p className="flex-1 break-all">{data?.order_amount}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Status</label>
                <p className="flex-1 break-all"><span className={statusBadgePills(data?.status)}>{data?.status}</span></p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Order placed at</label>
                <p className="flex-1 break-all">{data?.order_placed_at.toLocaleString()}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Order shipped at</label>
                <p className="flex-1 break-all">
                    {data?.order_shipped_at ? data.order_shipped_at.toLocaleString() : "---"}
                </p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Order received at</label>
                <p className="flex-1 break-all">
                    {data?.order_received_at ? data.order_received_at.toLocaleString() : "---"}
                </p>
            </div>
        </div>
    )
}

export default OrderView