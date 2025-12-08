import { useFetchPaymentDetails } from "@/services/queries/adminQueries"
import Loading from "@/components/Loading";

type PaymentViewProps = {
    referenceNumber: string
}

const PaymentView = (props:PaymentViewProps) => {
    const { data,isLoading } = useFetchPaymentDetails(props.referenceNumber);
    if (isLoading) return <Loading/>

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Reference Number</label>
                <p className="flex-1 break-all">{props.referenceNumber}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Payment intent ID</label>
                <p className="flex-1 break-all">{data?.payment_intent_id}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Client key ID</label>
                <p className="flex-1 break-all">{data?.client_key_id}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Amount</label>
                <p className="flex-1 break-all">{data?.order_amount}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Status</label>
                <p className="flex-1 break-all">{data?.status}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Payment created at</label>
                <p className="flex-1 break-all">{data?.created_at.toLocaleString()}</p>
            </div>

            <div className="flex md:flex-row flex-col gap-4">
                <label className="font-bold w-40 shrink-0">Payment updated at</label>
                <p className="flex-1 break-all">
                    {data?.updated_at ? data.updated_at.toLocaleString() : "---"}
                </p>
            </div>
        </div>
    )
}

export default PaymentView